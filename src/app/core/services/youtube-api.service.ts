import { Http, URLSearchParams, RequestOptionsArgs, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { YOUTUBE_API_KEY } from './constants';
import { Authorization } from './authorization.service';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/fromPromise';

interface YoutubeApiServiceOptions {
  url?: string;
  http?: Http;
  idKey?: string;
  authService?: Authorization;
  config?: any;
  authorize?: boolean;
}

// @Injectable()
export class YoutubeApiService {
  url: string;
  http: Http;
  idKey: string;
  authorize = false;
  isSearching = false;
  config: URLSearchParams = new URLSearchParams();
  nextPageToken: string;

  // constructor(options: YoutubeApiServiceOptions, private authService?: Authorization) {
  constructor(options: any, private authService?: Authorization) {
    this.resetConfig();
    if (authService) {
      this.authorize = true;
    }
    if (options) {
      this.url = options.url;
      this.http = options.http;
      this.idKey = options.idKey || '';
      if (options.config) {
        this.setConfig(options.config);
      }
    }
  }

  setConfig(config) {
    Object.keys(config).forEach(option => {
      this.config.set(option, config[option]);
    });
  }

  hasToken(): boolean {
    return this.authService && this.authService.accessToken.length > 0;
  }

  resetConfig() {
    this.config.set('part', 'snippet,contentDetails');
    this.config.set('key', YOUTUBE_API_KEY);
    this.config.set('maxResults', '50');
    this.config.set('pageToken', '');
  }

  getList() {
    this.isSearching = true;
    let options: RequestOptionsArgs = {
      search: this.config,
      headers: this.createHeaders()
    };
    return this.http.get(this.url, options)
      .map(response => response.json());
  }

  list(id) {
    if (this.idKey) {
      this.config.set(this.idKey, id);
    }

    this.isSearching = true;
    let options: RequestOptionsArgs = {
      search: this.config,
      headers: this.createHeaders()
    };
    return this.http.get(this.url, options)
      .map(response => response.json())
      .map(response => {
        this.nextPageToken = response.nextPageToken;
        this.isSearching = false;
        return response;
      });
  }

  fetchNextPage() {
    if (!this.isSearching) {
      this.config.set('pageToken', this.nextPageToken);
    }
  }

  resetPageToken() {
    this.config.set('pageToken', '');
  }

  createHeaders() {
    const accessToken = this.authService && this.authService.accessToken;
    const headersOptions = {};
    if (accessToken && this.authorize) {
      headersOptions['authorization'] = `Bearer ${accessToken}`;
    }
    return new Headers(headersOptions);
  }
}
