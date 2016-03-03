import {Reducer, Action} from '@ngrx/store';

export const PLAY = 'PLAY';
export const QUEUE = 'REMOVE';
export const TOGGLE_PLAYER = 'TOGGLE_PLAYER';
export const STATE_CHANGE = 'STATE_CHANGE';

export interface YoutubePlayerState {
    mediaId: string,
    index: number,
    media?: GoogleApiYouTubeSearchResource,
    showPlayer: boolean,
    playerState: number
}
let initialPlayerState: YoutubePlayerState = {
    mediaId: 'NONE',
    index: 0,
    media: {
        snippet: { title: 'No Media Yet' }
    },
    showPlayer: true,
    playerState: 0
}
export const player: Reducer<any> = (state: Object = initialPlayerState, action: Action) => {

    switch (action.type) {
        case PLAY:
            return playVideo(state, action.payload);

        case QUEUE:
            return state;

        case TOGGLE_PLAYER:
            return toggleVisibility(state);

        case STATE_CHANGE:
            return changePlayerState(state, action.payload);

        default:
            return state;
    }
}

export function playVideo(state: any, media: any) {
    return {
        mediaId: media.id.videoId,
        index: 0,
        media: media,
        showPlayer: true
    }
}

export function toggleVisibility(state: any) {
    return Object.assign({}, state, { showPlayer: !state.showPlayer });
}

export function changePlayerState (state: any, playerState: YT.PlayerState) {
    return Object.assign({}, state, { playerState: playerState })
}