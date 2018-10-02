import { Store, createSelector } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAppPlayer } from './app-player.reducer';
import { EchoesState } from '@store/reducers';

export const getPlayer = (state: EchoesState) => state.player;
export const getCurrentMedia = createSelector(getPlayer, (player: IAppPlayer) => player.media);
export const getIsPlayerPlaying = createSelector(getPlayer, (player: IAppPlayer) => player.playerState === 1);
export const getShowPlayer = createSelector(getPlayer, (player: IAppPlayer) => player.showPlayer);
export const getPlayerFullscreen = createSelector(getPlayer, (player: IAppPlayer) => player.fullscreen);
