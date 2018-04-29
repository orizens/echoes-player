import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { YoutubeApiService } from './youtube-api.service';
import { Authorization } from './authorization.service';
import { map } from 'rxjs/operators';

interface IYoutubeVideosInfo {
  items: GoogleApiYouTubeVideoResource[];
}
@Injectable()
export class YoutubeVideosInfo {
  public api: YoutubeApiService;

  constructor(private http: HttpClient, auth: Authorization) {
    this.api = new YoutubeApiService(
      {
        url: 'https://www.googleapis.com/youtube/v3/videos',
        http: this.http,
        idKey: 'id',
        config: {
          part: 'snippet,contentDetails,statistics'
        }
      },
      auth
    );
  }

  fetchVideoData(mediaId: string) {
    return this.api.list(mediaId).pipe(map(response => response.items[0]));
  }

  fetchVideosData(mediaIds: string) {
    return this.api.list(mediaIds).pipe(map(response => response.items));
  }
}
