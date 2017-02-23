import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Rx';
import { Action } from '@ngrx/store';
import { PlayerActions } from './youtube-player.actions';

type GoogleApiYoutubeVideo = GoogleApiYouTubeVideoResource | GoogleApiYouTubeSearchResource;

export * from './youtube-player.actions';

export interface YoutubePlayerState {
  mediaId: { videoId: string };
  index: number;
  media?: GoogleApiYoutubeVideo | any;
  showPlayer: boolean;
  playerState: number;
  isFullscreen: boolean;
}
let initialPlayerState: YoutubePlayerState = {
  mediaId: { videoId: 'NONE' },
  index: 0,
  media: {
    snippet: { title: 'No Media Yet' }
  },
  showPlayer: true,
  playerState: 0,
  isFullscreen: false
};
export function player (state: YoutubePlayerState = initialPlayerState, action: Action): YoutubePlayerState {

  switch (action.type) {
    case PlayerActions.PLAY:
      return playVideo(state, action.payload);

    case PlayerActions.QUEUE:
      return state;

    case PlayerActions.TOGGLE_PLAYER:
      return toggleVisibility(state);

    case PlayerActions.STATE_CHANGE:
      return changePlayerState(state, action.payload);

    case PlayerActions.FULLSCREEN:
      return Object.assign({}, state, { isFullscreen: !state.isFullscreen });

    case PlayerActions.RESET:
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
  actions: PlayerActions
};

export function playVideo(
  state: YoutubePlayerState,
  media: GoogleApiYoutubeVideo) {
  return Object.assign({}, state, {
    mediaId: media.id,
    media
  });
}

export function toggleVisibility(state: YoutubePlayerState) {
  return Object.assign({}, state, { showPlayer: !state.showPlayer });
}

export function changePlayerState(state: YoutubePlayerState, playerState: YT.PlayerState) {
  return Object.assign({}, state, { playerState: playerState });
}

export function getCurrentMedia(state$: Observable<YoutubePlayerState>) {
  return state$.select(state => state.media);
}

export function isPlayerPlaying(state$: Observable<YoutubePlayerState>) {
  return state$.select(state => state.playerState)
    .map((playerState: YT.PlayerState) => playerState === 1);
}
