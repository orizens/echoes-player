import {Reducer, Action} from '@ngrx/store';

export const PLAY = 'PLAY';
export const QUEUE = 'REMOVE';
export const TOGGLE_PLAYER = 'TOGGLE_PLAYER';
export const STATE_CHANGE = 'STATE_CHANGE';
export const FULLSCREEN = 'FULLSCREEN';

export interface YoutubePlayerState {
    mediaId: string,
    index: number,
    media?: any,
    showPlayer: boolean,
    playerState: number,
    isFullscreen: boolean
}
let initialPlayerState: YoutubePlayerState = {
    mediaId: 'NONE',
    index: 0,
    media: {
        snippet: { title: 'No Media Yet' }
    },
    showPlayer: true,
    playerState: 0,
    isFullscreen: false
}
export const player: Reducer<any> = (state: YoutubePlayerState = initialPlayerState, action: Action) => {

    switch (action.type) {
        case PLAY:
            return playVideo(state, action.payload);

        case QUEUE:
            return state;

        case TOGGLE_PLAYER:
            return toggleVisibility(state);

        case STATE_CHANGE:
            return changePlayerState(state, action.payload);

        case FULLSCREEN:
            return Object.assign({}, state, { isFullscreen: !state.isFullscreen })

        default:
            return state;
    }
}

export function playVideo(state: YoutubePlayerState, media: GoogleApiYouTubeVideoResource) {
    return Object.assign({}, state, { 
        mediaId: media.id, 
        media, 
        showPlayer: true 
    });
}

export function toggleVisibility(state: YoutubePlayerState) {
    return Object.assign({}, state, { showPlayer: !state.showPlayer });
}

export function changePlayerState (state: YoutubePlayerState, playerState: YT.PlayerState) {
    return Object.assign({}, state, { playerState: playerState })
}