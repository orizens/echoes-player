import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { YoutubeApiService } from './youtube-api.service';
import { Authorization } from './authorization.service';

@Injectable()
export class YoutubeVideosInfo {
  public api: YoutubeApiService;
  whichMedia = '';

  constructor(private http: Http, auth: Authorization) {
    this.api = new YoutubeApiService({
      url: 'https://www.googleapis.com/youtube/v3/videos',
      http: this.http,
      idKey: 'id',
      config: {
        part: 'snippet,contentDetails,statistics'
      }
    }, auth);
    this.api.list = function(id) {
      const videoId = id.videoId || id;
      this.config.set(this.idKey, videoId);
      this.isSearching = true;
      return this.http.get(this.url, { search: this.config })
        .map(res => res.json().items);
    };
  }

  fetchVideoData (mediaId: string) {
    return this.api
      .list(mediaId)
      .map(items => items[0]);
  }

  fetchVideosData (mediaIds: string) {
    return this.api
      .list(mediaIds)
      .map(items => items);
  }
}
