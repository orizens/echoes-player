import { Observable } from 'rxjs/Observable';
import { UserProfile } from '../services';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class PlaylistVideosResolver implements Resolve<any> {
  constructor(
    private userProfile: UserProfile,
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const playlistId = route.params['id'];
    return this.userProfile.fetchAllPlaylistItems(playlistId);
  }
}
