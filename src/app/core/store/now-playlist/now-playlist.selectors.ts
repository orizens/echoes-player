import { Observable } from 'rxjs/Observable';
import { NowPlaylistInterface } from './now-playlist.reducer';
import { EchoesState } from '../reducers';

export function isPlayerInRepeat$(state$: Observable<EchoesState>): Observable<boolean> {
  return state$.select(state => state.nowPlaylist.repeat);
}

export function getPlaylistVideos$(state$: Observable<EchoesState>): Observable<GoogleApiYouTubeVideoResource[]> {
  return state$.select(state => state.nowPlaylist.videos);
}

export function getSelectedMediaId$(state$: Observable<EchoesState>): Observable<string> {
  return state$.select(state => state.nowPlaylist.selectedId);
}

export function getSelectedMedia$(state$: Observable<EchoesState>) {
  return state$.select(state => {
    const selectedId = state.nowPlaylist.selectedId;
    const mediaIds = state.nowPlaylist.videos.map(video => video.id);
    const selectedMediaIndex = mediaIds.indexOf(selectedId);
    return state.nowPlaylist.videos[selectedMediaIndex];
  });
}
