import { Http, URLSearchParams, RequestOptionsArgs, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { YOUTUBE_API_KEY } from '../constants';
import { Authorization } from '../authorization.service';

export const DataApiProviders = {
  SEARCH: 'search',
  PLAYLISTS: 'playlists'
};

/**
 * Performs http requests using HttpModule to youtube-api v3.
 *
 * `YoutubeApi` is available as an injectable class, with methods to perform youtube api
 *  methods requests
 *
 * ### Example
 *
 * ```typescript
 * import {YoutubeDataApi} from './services/YoutubeDataApi';
 * @Component({
 *   selector: 'yt-app',
 * })
 * class VideosComponent {
 *   options = {
 *    part: 'snippet,id',
 *    q: 'chillstep'
 *   };
 *   constructor(yt: YoutubeDataApi) {
 *     yt.list('search', options)
 *       // no need for .map(res => res.json())
 *       // Subscribe to the observable to get the parsed videos
 *       .subscribe(response => this.videos = response.videos);
 *   }
 * }
 * ```
 */
@Injectable()
export class YoutubeDataApi {
  public _config: URLSearchParams = new URLSearchParams();

  private _apiPrefixUrl = 'https://www.googleapis.com/youtube';
  private _apiVersion = 'v3';
  private get _apiUrl () {
    return `${this._apiPrefixUrl}/${this._apiVersion}`;
  }
  private _defaultUrlParams = {
    part: 'snippet,id',
    maxResults: '50',
    key: YOUTUBE_API_KEY
  };

  constructor (private http: Http, private auth: Authorization) {
    this._config = this.mergeParams(this._defaultUrlParams, this._config);
  }

  list (api: string, options) {
    const config = this.mergeParams(options, this._config);
    const _options: RequestOptionsArgs = {
      search: config,
      headers: this.createHeaders(false)
    };
    return this.http.get(this.getApi(api), _options)
      .map(response => response.json());
  }

  delete (api: string, options) {
    return this._request(api);
  }

  insert (api: string, body: any, config: any) {
    const _config = this.mergeParams(config, this._config);
    const _options = {
      search: _config,
      headers: this.createHeaders(true)
    };
    return this.http.post(this.getApi(api), body, _options)
      .map(response => response.json());
  }

  update (api) {
    return this._request(api);
  }

  private _request(api) {
    // const options: RequestOptionsArgs = {
    //   search: this.config,
    //   headers: this.createHeaders()
    // };
    // this.http.
  }

  private createHeaders(addAuth: boolean) {
    const accessToken = this.auth.accessToken;
    const headersOptions = {};
    if (accessToken && addAuth) {
      headersOptions['authorization'] = `Bearer ${accessToken}`;
    }
    return new Headers(headersOptions);
  }

  private getApi(api: string): string {
    return `${this._apiUrl}/${api}`;
  }

  private mergeParams (source, target: URLSearchParams) {
    const targetConfig = target.clone();
    return Object.keys(source)
      .reduce((acc, param) => {
        targetConfig.set(param, source[param]);
        return targetConfig;
      }, targetConfig);
  }
}
