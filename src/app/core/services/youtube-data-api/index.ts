import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Authorization } from '../authorization.service';

export const DataApiProviders = {
  SEARCH: 'search',
  PLAYLISTS: 'playlists'
};

export const _defaultUrlParams = {
  part: 'snippet,id',
  maxResults: '50',
  key: environment.youtube.API_KEY
};

/**
 * Performs http requests using HttpClientModule to youtube-api v3.
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
 *       // Subscribe to the observable to get the parsed videos
 *       .subscribe(response => this.videos = response.videos);
 *   }
 * }
 * ```
 */
@Injectable()
export class YoutubeDataApi {
  // public _config: HttpParams = new HttpParams();

  private _apiPrefixUrl = 'https://www.googleapis.com/youtube';
  private _apiVersion = 'v3';
  private get _apiUrl() {
    return `${this._apiPrefixUrl}/${this._apiVersion}`;
  }

  constructor(private http: HttpClient, private auth: Authorization) {
  }

  list(api: string, options) {
    const params = { ..._defaultUrlParams, ...options };
    const _options = {
      params,
      headers: this.createHeaders(false)
    };
    return this.http.get(this.getApi(api), _options);
  }

  delete(api: string, options) {
    return this._request(api);
  }

  insert(api: string, options) {
    return this.http.post(this.getApi(api), {});
  }

  update(api) {
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
    return new HttpHeaders(headersOptions);
  }

  private getApi(api: string): string {
    return `${this._apiUrl}/${api}`;
  }
}
