import { Headers, Http, RequestOptionsArgs, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { YOUTUBE_API_KEY } from './constants';
import { Authorization } from './authorization.service';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/fromPromise';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

interface YoutubeApiServiceOptions {
  url?: string;
  idKey?: string;
  authService?: Authorization;
  config?: any;
  authorize?: boolean;
}


@Injectable()
export class YoutubeApiService {
  private playlistInfoOptions: YoutubeApiServiceOptions = {
    url: 'https://www.googleapis.com/youtube/v3/playlistItems',
    idKey: 'playlistId',
    config: {
      mine: 'true'
    }
  };

  private playlistsOptions: YoutubeApiServiceOptions = {
    url: 'https://www.googleapis.com/youtube/v3/playlists',
    config: {
      mine: 'true',
      part: 'snippet,id,contentDetails'
    },
  };

  private playlistOptions: YoutubeApiServiceOptions = {
    url: 'https://www.googleapis.com/youtube/v3/playlists',
    idKey: 'id',
    config: {
      part: 'snippet,id,contentDetails'
    }
  };


  authorize = false;
  isSearching = false;
  nextPageToken: string;

  // constructor(options: YoutubeApiServiceOptions, private authService?: Authorization) {
  constructor(private http: Http,
              private authService?: Authorization) {
  }

  hasToken(): boolean {
    return this.authService && this.authService.accessToken.length > 0;
  }

  fetchPlaylistItems(playlistId: string, pageToken = '') {
    // const token = this.playlists.config.get('access_token');
    // if ('' === pageToken) {
    //   this.playlistInfo.config.delete('pageToken');
    // } else {
    //   this.playlistInfo.config.set('pageToken', pageToken);
    // }
    return this.getPlaylistItems(playlistId)
      .switchMap(response => {
        const videoIds = response.items.map(video => video.snippet.resourceId.videoId).join(',');
        return this.getVideos(videoIds);
      });
  }

  fetchAllPlaylistItems(playlistId: string) {
    let items = [];
    const subscriptions: Subscription[] = [];
    const items$ = new Subject();
    let nextPageToken = '';
    const fetchMetadata = (response) => {
      const videoIds = response.items.map(video => video.snippet.resourceId.videoId).join(',');
      nextPageToken = response.nextPageToken;
      return this.getVideos(videoIds);
    };
    const collectItems = (videos) => {
      items = [...items, ...videos];
      if (nextPageToken) {
        fetchItems(playlistId, nextPageToken);
      } else {
        items$.next(items);
        subscriptions.forEach(_s => _s.unsubscribe());
        items$.complete();
      }
    };
    const fetchItems = (id, token) => {
      // this.playlistInfo.config.set('pageToken', token);
      const sub = this.getPlaylistItems(id)
        .switchMap((response) => fetchMetadata(response))
        .subscribe((response) => collectItems(response));
      subscriptions.push(sub);
      return sub;
    };

    fetchItems(playlistId, '');
    return items$.take(1);
  }

  getPlaylists2(isNewPage: boolean) {
    // const hasAccessToken = this.playlists.hasToken();
    // if (!hasAccessToken) {
    //   return;
    // }
    // if (isNewPage) {
    //   this.playlists.resetPageToken();
    // }
    // TODO - extract to a reducer or/and an @Effect - SEARCH_START, SEARCH_COMPLETED

    return this.getPlaylists();
  }

  defaaultConfig() {
    const config = new URLSearchParams();

    config.set('part', 'snippet,contentDetails');
    config.set('key', YOUTUBE_API_KEY);
    config.set('maxResults', '50');
    config.set('pageToken', '');

    return config;
  }
  getPlaylists() {
    const apiOptions = this.playlistsOptions;

    const config = this.defaaultConfig();
    let url;

    if (apiOptions) {
      url = apiOptions.url;
      if (apiOptions.config) {
         this.mergeParams(apiOptions.config, config);
      }
    }

    const options: RequestOptionsArgs = {
      search: config,
      headers: this.createHeaders()
    };
    return this.http.get(url, options)
      .map(response => response.json());
  }

  getPlaylist(id) {
    return this.list(id, this.playlistOptions);
  }


  getPlaylistItems(playlistId: string) {
    return this.list(playlistId, this.playlistInfoOptions);
  }

  private mergeParams (source, target: URLSearchParams) {
    Object.keys(source)
      .forEach(param => target.set(param, source[param]));
  }

  private list(id, apiOptions) {
    const config = this.defaaultConfig();
    let idKey;
    let url;

    if (apiOptions) {
      url = apiOptions.url;
      idKey = apiOptions.idKey || '';
      if (apiOptions.config) {
        this.mergeParams(apiOptions.config, config);
      }
    }

    if (idKey) {
      config.set(idKey, id);
    }

    const options: RequestOptionsArgs = {
      search: config,
      headers: this.createHeaders()
    };

    return this.http.get(url, options)
      .map(response => response.json())
      .map(response => {
        this.nextPageToken = response.nextPageToken;
        this.isSearching = false;
        return response;
      });
  }

  createHeaders() {
    const accessToken = this.authService && this.authService.accessToken;
    const headersOptions = {};
    if (accessToken) {
      headersOptions['authorization'] = `Bearer ${accessToken}`;
    }
    return new Headers(headersOptions);
  }

  getVideos(id) {
    const apiOptions = {
      url: 'https://www.googleapis.com/youtube/v3/videos',
      idKey: 'id',
      config: {
        part: 'snippet,contentDetails,statistics'
      }
    };

    const config = this.defaaultConfig();
    let idKey;
    let url;

    if (apiOptions) {
      url = apiOptions.url;
      idKey = apiOptions.idKey || '';
      if (apiOptions.config) {
        this.mergeParams(apiOptions.config, config);
      }
    }

    const videoId = id.videoId || id;
    config.set(idKey, videoId);

    return this.http.get(url, { search: config })
      .map(res => res.json().items);
  }

}
