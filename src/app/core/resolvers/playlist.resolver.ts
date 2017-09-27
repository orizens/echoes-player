import { Observable } from 'rxjs/Observable';
import { UserProfile } from '../services';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';

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
