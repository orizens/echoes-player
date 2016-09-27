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
    this.api.list = function(id) {
      const videoId = id.videoId || id;
  		this.config.set(this.idKey, videoId);
  		this.isSearching = true;
  		return this.http.get(this.url, { search: this.config })
        .map(res => res.json().items);
  	}
  }

  fetchVideoData (mediaId: string) {
		return this.api
			.list(mediaId)
			.map(items => items[0])
	}
}
