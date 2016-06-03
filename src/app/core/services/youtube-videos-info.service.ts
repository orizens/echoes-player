import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { YoutubeApiService } from './youtube-api.service';

@Injectable()
export class YoutubeVideosInfo {
  public api: any;

  constructor(private http: Http) {
    this.api = new YoutubeApiService({
      url: 'https://www.googleapis.com/youtube/v3/videos',
      http: this.http,
      idKey: 'id'
    });
  }
}