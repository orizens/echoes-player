import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { INowPlaylist } from './now-playlist.reducer';
import { EchoesState } from '../reducers';

export function getNowPlaylist$(state$: Store<EchoesState>): Observable<INowPlaylist> {
  return state$.select(state => state.nowPlaylist);
}
export function isPlayerInRepeat$(state$: Store<EchoesState>): Observable<boolean> {
  return state$.select(state => state.nowPlaylist.repeat);
}

export function getPlaylistVideos$(state$: Store<EchoesState>): Observable<GoogleApiYouTubeVideoResource[]> {
  return state$.select(state => state.nowPlaylist.videos);
}

export function getSelectedMediaId$(state$: Store<EchoesState>): Observable<string> {
  return state$.select(state => state.nowPlaylist.selectedId);
}

export function getSelectedMedia$(state$: Store<EchoesState>) {
  return state$.select(state => {
    const selectedId = state.nowPlaylist.selectedId;
    const mediaIds = state.nowPlaylist.videos.map(video => video.id);
    const selectedMediaIndex = mediaIds.indexOf(selectedId);
    return state.nowPlaylist.videos[selectedMediaIndex];
  });
}
