import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import { Action, Dispatcher } from '@ngrx/store';
import { AppPlayerActions } from './app-player.actions';

type GoogleApiYoutubeVideo = GoogleApiYouTubeVideoResource | GoogleApiYouTubeSearchResource;

export * from './app-player.actions';

export interface AppPlayerState {
  mediaId: { videoId: string };
  index: number;
  media?: GoogleApiYoutubeVideo | any;
  showPlayer: boolean;
  playerState: number;
  fullscreen: {
    on: boolean;
    height: number;
    width: number;
  };
}
const initialPlayerState: AppPlayerState = {
  mediaId: { videoId: 'NONE' },
  index: 0,
  media: {
    snippet: { title: 'No Media Yet' }
  },
  showPlayer: true,
  playerState: 0,
  fullscreen: {
    on: false,
    height: 270,
    width: 367
  }
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

    case AppPlayerActions.FULLSCREEN: {
      const on = !state.fullscreen.on;
      let { height, width } = initialPlayerState.fullscreen;
      if (on) {
        height = window.innerHeight;
        width = window.innerWidth;
      }
      const fullscreen = { on, height, width };
      return Object.assign({}, state, { fullscreen });
    }

    case AppPlayerActions.RESET:
      return Object.assign({}, state, {
        isFullscreen: false,
        playerState: 0
      });

    case Dispatcher.INIT: {
      const fullscreen = initialPlayerState.fullscreen;
      return Object.assign({}, initialPlayerState, state, { fullscreen });
    };

    default:
      return Object.assign({}, initialPlayerState, state);
  }
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
