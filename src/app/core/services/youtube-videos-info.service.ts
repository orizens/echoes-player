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
      idKey: 'id',
      config: {
        part: 'snippet,contentDetails,statistics'
      }
    });
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

  mediaToFriendlyDuration (media: GoogleApiYouTubeVideoResource) {
    let newMedia = Object.assign({}, media);
    newMedia.contentDetails.duration = this.toFriendlyDuration(media.contentDetails.duration);
    return newMedia;
  }

  toFriendlyDuration (time) {
    let t = time.split('PT')[1];
    let ts = [];
    if (t) {
      t = t.replace(/(H|M)/g, ':')
      .replace('S', '');
      ts = t.split(':');
      ts = ts.map(function(d){
        return d.length === 1 ? '0' + d : d;
      });
    } else {
      t = time.split('P')[1];
      t = t.replace('D', '');
      ts = [parseInt(t, 10) * 24, ':00:00'];
    }
    return ts.join(':');
  }
}
