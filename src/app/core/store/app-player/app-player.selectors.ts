import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { IAppPlayer } from './app-player.reducer';
import { EchoesState } from '../reducers';

export function getPlayer$(state$: Store<EchoesState>): Observable<IAppPlayer> {
  return state$.select(state => state.player);
}

export function getCurrentMedia$(state$: Store<EchoesState>): Observable<IAppPlayer> {
  return state$.select(state => state.player.media);
}

export function getIsPlayerPlaying$(state$: Store<EchoesState>): Observable<boolean> {
  return state$
    .select(state => state.player.playerState)
    .map((playerState: YT.PlayerState) => playerState === 1);
}

export function getShowPlayer$(state$: Store<EchoesState>): Observable<boolean> {
  return state$.select(state => state.player.showPlayer);
}

export function getPlayerFullscreen$(state$: Store<EchoesState>) {
  return state$.select(state => state.player.fullscreen);
}
