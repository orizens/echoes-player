import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { YoutubeApiService } from './youtube-api.service';

@Injectable()
export class YoutubeVideosInfo {

  constructor(private http: Http, public api: YoutubeApiService) {
  }

  fetchVideoData(mediaId: string) {
    return this.api.getVideos(mediaId)
      .map(items => items[0]);
  }

  fetchVideosData(mediaIds: string) {
    return this.api.getVideos(mediaIds)
      .map(items => items);
  }
}
