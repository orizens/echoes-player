import { Headers, Http, RequestOptionsArgs, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { YOUTUBE_API_KEY } from './constants';
import { Authorization } from './authorization.service';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/fromPromise';

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
    http: this.http,
    config: {
      mine: 'true',
      part: 'snippet,id,contentDetails'
    },
  };

  private playlistOptions: YoutubeApiServiceOptions = {
    url: 'https://www.googleapis.com/youtube/v3/playlists',
    http: this.http,
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

  defaaultConfig() {
    const config = new URLSearchParams();

    config.set('part', 'snippet,contentDetails');
    config.set('key', YOUTUBE_API_KEY);
    config.set('maxResults', '50');
    config.set('pageToken', '');

    return config;
  }

  newConfig(config) {
    Object.keys(config).forEach(option => {
      config.set(option, config[option]);
    });

    return config;
  }

  getPlaylists() {
    const apiOptions = this.playlistsOptions;

    let config = this.defaaultConfig();
    let url;

    if (apiOptions) {
      url = apiOptions.url;
      if (apiOptions.config) {
        config = this.newConfig(apiOptions.config);
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

  private list(id, apiOptions) {
    let config = this.defaaultConfig();
    let idKey;
    let url;

    if (apiOptions) {
      url = apiOptions.url;
      idKey = apiOptions.idKey || '';
      if (apiOptions.config) {
        config = this.newConfig(apiOptions.config);
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

    let config = this.defaaultConfig();
    let idKey;
    let url;

    if (apiOptions) {
      url = apiOptions.url;
      idKey = apiOptions.idKey || '';
      if (apiOptions.config) {
        config = this.newConfig(apiOptions.config);
      }
    }

    const videoId = id.videoId || id;
    config.set(idKey, videoId);

    return this.http.get(url, { search: config })
      .map(res => res.json().items);
  }

}
