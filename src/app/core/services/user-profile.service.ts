import { Subject, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';

import { YoutubeApiService } from './youtube-api.service';
import { YoutubeVideosInfo } from './youtube-videos-info.service';
import { Authorization } from './authorization.service';

import { GoogleBasicProfile } from '@store/user-profile';
import { switchMap, take } from 'rxjs/operators';

@Injectable()
export class UserProfile {
  isSearching: Boolean = false;
  public playlistInfo: YoutubeApiService;
  public playlists: YoutubeApiService;
  public playlistApi: YoutubeApiService;

  constructor(
    private http: HttpClient,
    private zone: NgZone,
    private youtubeVideosInfo: YoutubeVideosInfo,
    private authorization: Authorization
  ) {
    this.playlistInfo = new YoutubeApiService(
      {
        url: 'https://www.googleapis.com/youtube/v3/playlistItems',
        http: this.http,
        idKey: 'playlistId',
        config: {
          mine: 'true'
        }
      },
      authorization
    );
    // TODO - extract to a Model / Reducer?
    // Reducer - because nextPageToken is changed
    // Model - new _config should be recreated easily with a new nextPageToken
    this.playlists = new YoutubeApiService(
      {
        url: 'https://www.googleapis.com/youtube/v3/playlists',
        http: this.http,
        config: {
          mine: 'true',
          part: 'snippet,id,contentDetails'
        }
      },
      authorization
    );
    this.playlistApi = new YoutubeApiService(
      {
        url: 'https://www.googleapis.com/youtube/v3/playlists',
        http: this.http,
        idKey: 'id',
        config: {
          part: 'snippet,id,contentDetails'
        }
      },
      authorization
    );
  }

  getPlaylists(isNewPage: boolean) {
    const hasAccessToken = this.playlists.hasToken();
    if (!hasAccessToken) {
      return;
    }
    if (isNewPage) {
      this.playlists.resetPageToken();
    }
    // TODO - extract to a reducer or/and an @Effect - SEARCH_START, SEARCH_COMPLETED
    this.isSearching = true;
    return this.playlists.getList();
  }

  updatePageToken(pageToken: string) {
    this.playlists.setPageToken(pageToken);
  }

  resetPageToken() {
    this.playlists.resetPageToken();
  }

  fetchPlaylist(playlistId: string) {
    return this.playlistApi.list(playlistId);
  }

  fetchPlaylistItems(playlistId: string, pageToken = '') {
    // const token = this.playlists.config.get('access_token');
    if ('' === pageToken) {
      this.playlistInfo.deletePageToken();
    } else {
      this.playlistInfo.setPageToken(pageToken);
    }
    return this.playlistInfo.list(playlistId).pipe(
      switchMap((response: any) => {
        const videoIds = response.items
          .map(video => video.snippet.resourceId.videoId)
          .join(',');
        return this.youtubeVideosInfo.api.list(videoIds);
      })
    );
  }

  fetchAllPlaylistItems(playlistId: string) {
    let items = [];
    const subscriptions: Subscription[] = [];
    const items$ = new Subject();
    let nextPageToken = '';
    const fetchMetadata = response => {
      const videoIds = response.items
        .map(video => video.snippet.resourceId.videoId)
        .join(',');
      nextPageToken = response.nextPageToken;
      return this.youtubeVideosInfo.api.list(videoIds);
    };
    const collectItems = videos => {
      items = [...items, ...videos.items];
      if (nextPageToken) {
        fetchItems(playlistId, nextPageToken);
      } else {
        items$.next(items);
        subscriptions.forEach(_s => _s.unsubscribe());
        items$.complete();
      }
    };
    const fetchItems = (id, token) => {
      this.playlistInfo.setPageToken(token);
      const sub = this.playlistInfo
        .list(id)
        .pipe(switchMap(response => fetchMetadata(response)))
        .subscribe(response => collectItems(response));
      subscriptions.push(sub);
      return sub;
    };
    fetchItems(playlistId, '');
    return items$.pipe(take(1));
  }

  toUserJson(profile): GoogleBasicProfile {
    const _profile: GoogleBasicProfile = {};
    if (profile) {
      _profile.imageUrl = profile.getImageUrl();
      _profile.name = profile.getName();
    }
    return _profile;
  }

  fetchMetadata(items: GoogleApiYouTubeVideoResource[]) {
    const videoIds = items.map(video => video.id).join(',');
    return this.youtubeVideosInfo.api.list(videoIds);
  }
}
