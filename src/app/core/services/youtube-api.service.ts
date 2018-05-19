import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Authorization } from './authorization.service';
import { map } from 'rxjs/operators';

interface YoutubeApiServiceOptions {
  url?: string;
  http?: HttpClient;
  idKey?: string;
  authService?: Authorization;
  config?: any;
  authorize?: boolean;
}

const defaultParams = {
  part: 'snippet,contentDetails',
  key: environment.youtube.API_KEY,
  maxResults: '50',
  pageToken: ''
};

// @Injectable()
export class YoutubeApiService {
  url: string;
  http: HttpClient;
  idKey: string;
  authorize = false;
  isSearching = false;
  params: HttpParams;
  nextPageToken: string;

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

  setConfig(options) {
    this.params = Object.keys(options).reduce((params, option) => {
      return params.set(option, options[option]);
    }, this.params);
  }

  hasToken(): boolean {
    return this.authService && this.authService.accessToken.length > 0;
  }

  resetConfig() {
    this.params = new HttpParams({ fromObject: defaultParams });
  }

  getList() {
    this.isSearching = true;
    const options = {
      params: this.params,
      headers: this.createHeaders()
    };
    return this.http.get(this.url, options);
  }

  list(id) {
    if (this.idKey) {
      this.setConfig({ [this.idKey]: id });
      // this.params[this.idKey] = id;
    }

    this.isSearching = true;
    const options = {
      params: this.params,
      headers: this.createHeaders()
    };
    return this.http.get(this.url, options).pipe(
      map((response: any) => {
        this.nextPageToken = response.nextPageToken;
        this.isSearching = false;
        return response;
      })
    );
  }

  fetchNextPage() {
    if (!this.isSearching) {
      // this.params['pageToken'] = this.nextPageToken;
      this.setPageToken(this.nextPageToken);
    }
  }

  resetPageToken() {
    // this.params['pageToken'] = '';
    this.setPageToken('');
  }

  setPageToken(pageToken) {
    this.setConfig({ pageToken });
  }

  deletePageToken() {
    this.params = this.params.delete('pageToken');
  }

  createHeaders() {
    const accessToken = this.authService && this.authService.accessToken;
    const headers = {};
    if (accessToken && this.authorize) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return headers;
  }
}
