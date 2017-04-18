import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { AppPlayerActions } from './app-player.actions';

type GoogleApiYoutubeVideo = GoogleApiYouTubeVideoResource | GoogleApiYouTubeSearchResource;

export * from './app-player.actions';

export interface AppPlayerState {
  mediaId: { videoId: string };
  index: number;
  media?: GoogleApiYoutubeVideo | any;
  showPlayer: boolean;
  playerState: number;
  isFullscreen: boolean;
}
const initialPlayerState: AppPlayerState = {
  mediaId: { videoId: 'NONE' },
  index: 0,
  media: {
    snippet: { title: 'No Media Yet' }
  },
  showPlayer: true,
  playerState: 0,
  isFullscreen: false
};
export function player (state: AppPlayerState = initialPlayerState, action: Action): AppPlayerState {

  switch (action.type) {
    case AppPlayerActions.PLAY:
      return playVideo(state, action.payload);

    case AppPlayerActions.QUEUE:
      return state;

    case AppPlayerActions.TOGGLE_PLAYER:
      return toggleVisibility(state);

    case AppPlayerActions.STATE_CHANGE:
      return changePlayerState(state, action.payload);

    case AppPlayerActions.FULLSCREEN:
      return Object.assign({}, state, { isFullscreen: !state.isFullscreen });

    case AppPlayerActions.RESET:
      return Object.assign({}, state, {
        isFullscreen: false,
        playerState: 0
      });

    default:
      return state;
  }
};

export const playerRegister = {
  reducer: { player },
  actions: AppPlayerActions
};

export function playVideo(
  state: AppPlayerState,
  media: GoogleApiYoutubeVideo) {
  return Object.assign({}, state, {
    mediaId: media.id,
    media
  });
}

export function toggleVisibility(state: AppPlayerState) {
  return Object.assign({}, state, { showPlayer: !state.showPlayer });
}

export function changePlayerState(state: AppPlayerState, playerState: YT.PlayerState) {
  return Object.assign({}, state, { playerState: playerState });
}
