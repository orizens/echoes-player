import { Observable } from 'rxjs/Observable';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { YoutubeApiService } from '../services/youtube-api.service';

@Injectable()
export class PlaylistResolver implements Resolve<any> {
  constructor(private youtubeApiService: YoutubeApiService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<GoogleApiYouTubePlaylistResource> {
    const playlistId = route.params['id'];
    return this.youtubeApiService.getPlaylist(playlistId)
      .map(response => response.items[0]);
  }
}
