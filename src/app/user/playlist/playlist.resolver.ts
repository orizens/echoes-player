import { Observable } from 'rxjs/Rx';
import { UserProfile } from '../../core/services';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class PlaylistVideosResolver implements Resolve<any> {
  constructor(
    private userProfile: UserProfile,
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<GoogleApiYouTubeVideoResource[]> {
    const playlistId = route.params['id'];
    return this.userProfile.fetchPlaylistItems(playlistId);
  }
}

@Injectable()
export class PlaylistResolver implements Resolve<any> {
  constructor(
    private userProfile: UserProfile,
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<GoogleApiYouTubePlaylistResource> {
    const playlistId = route.params['id'];
    return this.userProfile.fetchPlaylist(playlistId)
      .map(response => response.items[0]);
  }
}
