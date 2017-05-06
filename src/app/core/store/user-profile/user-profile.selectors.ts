import { Observable } from 'rxjs/Observable';
import { IUserProfile } from './user-profile.reducer';
import { EchoesState } from '../reducers';

export function getUser$(state$: Observable<EchoesState>): Observable<IUserProfile> {
  return state$.select(state => state.user);
}

export function getUserPlaylists$(state$: Observable<EchoesState>): Observable<GoogleApiYouTubePlaylistResource[]> {
  return state$.select(state => state.user.playlists);
};

export function getUserViewPlaylist$(state$: Observable<EchoesState>) {
  return state$.select(state => state.user.viewedPlaylist);
};
export function getIsUserSignedIn$(state$: Observable<EchoesState>) {
  return state$.select(state => {
    return state.user.access_token !== ''; });
};
