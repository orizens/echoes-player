import { Observable } from 'rxjs/Observable';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { YoutubeApiService } from '../services/youtube-api.service';

@Injectable()
export class PlaylistVideosResolver implements Resolve<any> {
  constructor(private youtubeApiService: YoutubeApiService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const playlistId = route.params['id'];
    return this.youtubeApiService.fetchAllPlaylistItems(playlistId);
  }
}
