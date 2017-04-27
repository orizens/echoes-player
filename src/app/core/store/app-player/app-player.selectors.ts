import { Observable } from 'rxjs/Observable';
import { AppPlayerState } from './app-player.reducer';
import { EchoesState } from '../reducers';

export function getPlayer$ (state$: Observable<EchoesState>): Observable<AppPlayerState> {
  return state$.select(state => state.player);
}

export function getCurrentMedia$ (state$: Observable<EchoesState>): Observable<AppPlayerState> {
  return state$.select(state => state.player.media);
}

export function getIsPlayerPlaying$ (state$: Observable<EchoesState>): Observable<boolean> {
  return state$.select(state => state.player.playerState)
    .map((playerState: YT.PlayerState) => playerState === 1);
}

export function getShowPlayer$(state$: Observable<EchoesState>): Observable<boolean> {
  return state$.select(state => state.player.showPlayer);
}

export function getPlayerFullscreen$(state$: Observable<EchoesState>) {
  return state$.select(state => state.player.fullscreen);
}
