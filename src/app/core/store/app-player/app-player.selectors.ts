import { Store, createSelector } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { IAppPlayer } from './app-player.reducer';
import { EchoesState } from '@store/reducers';

export const getPlayer = (state: EchoesState) => state.player;
/** Why createSelector?
  reusing the getPlayer function (memoized)
  the last function arg (the actual selector) runs only when needed
  and not every time, i.e - if it was defined as:

  export const getCurrentMedia = (state: EchoesState) => {
    const player = getPlayer(state);
    return player.media;
  }
*/
export const getCurrentMedia = createSelector(getPlayer, (player: IAppPlayer) => player.media);
export const getIsPlayerPlaying = createSelector(getPlayer, (player: IAppPlayer) => player.playerState === 1);
export const getShowPlayer = createSelector(getPlayer, (player: IAppPlayer) => player.showPlayer);
export const getPlayerFullscreen = createSelector(getPlayer, (player: IAppPlayer) => player.fullscreen);
