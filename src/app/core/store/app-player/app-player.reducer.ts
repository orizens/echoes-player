import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { ActionTypes, Actions } from './app-player.actions';

type GoogleApiYoutubeVideo = GoogleApiYouTubeVideoResource | GoogleApiYouTubeSearchResource | any;

export * from './app-player.actions';

export interface IAppPlayer {
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
  isFullscreen: boolean;
}
const initialPlayerState: IAppPlayer = {
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
  },
  isFullscreen: false
};
export function player(state: IAppPlayer = initialPlayerState, action: Actions): IAppPlayer {
  switch (action.type) {
    case ActionTypes.PLAY:
      return playVideo(state, action.payload);

    case ActionTypes.QUEUE:
      return state;

    case ActionTypes.TOGGLE_PLAYER:
      return toggleVisibility(state);

    case ActionTypes.STATE_CHANGE:
      return changePlayerState(state, action.payload);

    case ActionTypes.FULLSCREEN: {
      const on = !state.fullscreen.on;
      let { height, width } = initialPlayerState.fullscreen;
      if (on) {
        height = window.innerHeight;
        width = window.innerWidth;
      }
      const fullscreen = { on, height, width };
      return { ...state, fullscreen };
    }

    case ActionTypes.RESET:
      return {
        ...state,
        isFullscreen: false,
        playerState: 0
      };

    case ActionTypes.RESET_FULLSCREEN: {
      const fullscreen = initialPlayerState.fullscreen;
      return { ...initialPlayerState, ...state, fullscreen };
    }

    default:
      return { ...initialPlayerState, ...state };
  }
}

export function playVideo(state: IAppPlayer, media: GoogleApiYoutubeVideo) {
  return { ...state, mediaId: media.id, media };
}

export function toggleVisibility(state: IAppPlayer) {
  return { ...state, showPlayer: !state.showPlayer };
}

export function changePlayerState(state: IAppPlayer, playerState: YT.PlayerState | any) {
  return { ...state, playerState: playerState };
}
