import { Http, URLSearchParams, Response } from '@angular/http';
import { Injectable, NgZone } from '@angular/core';
import { window } from '@angular/platform-browser/src/facade/browser';

import { YoutubeApiService } from './youtube-api.service';
import { YoutubeVideosInfo } from './youtube-videos-info.service';

import { GoogleBasicProfile } from '../store/user-profile';

@Injectable()
export class UserProfile {
  isSearching: Boolean = false;
  public playlistInfo: YoutubeApiService;
  public playlists: YoutubeApiService;

  constructor(
    private http: Http,
    private zone: NgZone,
    private youtubeVideosInfo: YoutubeVideosInfo,
  ) {
    this.playlistInfo = new YoutubeApiService({
      url: 'https://www.googleapis.com/youtube/v3/playlistItems',
      http: this.http,
      idKey: 'playlistId',
      config: {
        mine: 'true'
      }
    });
    // TODO - extract to a Model / Reducer?
    // Reducer - because nextPageToken is changed
    // Model - new _config should be recreated easily with a new nextPageToken
    this.playlists = new YoutubeApiService({
      url: 'https://www.googleapis.com/youtube/v3/playlists',
      http: this.http,
      config: {
        mine: 'true',
        part: 'snippet,id,contentDetails'
      }
    });
  }

  setAccessToken(token: string) {
    // TODO - should save token once for all services
    this.playlistInfo.setToken(token);
    return this.playlists.setToken(token);
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
    this.playlists.config.set('pageToken', pageToken);
  }

  resetPageToken() {
    this.playlists.config.set('pageToken', '');
  }

  fetchPlaylistItems(playlistId: string) {
    // const token = this.playlists.config.get('access_token');
    this.playlistInfo.config.delete('pageToken');
    return this.playlistInfo
      .list(playlistId)
      .then(response => {
        const videoIds = response.items.map(video => video.snippet.resourceId.videoId).join(',');
        return this.youtubeVideosInfo.api.list(videoIds);
      });
  }

  isTokenValid(token) {
    const accessToken = this.playlists.config.get('access_token');
    // TODO - should check if the current accessToken is still valid - google api
    return accessToken === token;
  }

  toUserJson (profile): GoogleBasicProfile {
    let _profile: GoogleBasicProfile = {};
    if (profile) {
      _profile.imageUrl = profile.getImageUrl();
      _profile.name = profile.getName();
    }
    return _profile;
  }
}
