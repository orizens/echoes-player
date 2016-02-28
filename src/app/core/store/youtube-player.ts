import {Reducer, Action} from '@ngrx/store';

export const PLAY = 'PLAY';
export const QUEUE = 'REMOVE';
export const TOGGLE_PLAYER = 'TOGGLE_PLAYER';

let initialPlayerState = {
    mediaId: 'NONE',
    index: 0,
    media: {
        snippet: { title: 'No Media Yet' }
    },
    showPlayer: true
}
export const player: Reducer<any> = (state: Object = initialPlayerState, action: Action) => {

    switch (action.type) {
        case PLAY:
            return playVideo(state, action.payload);

        case QUEUE:
            return state;

        case TOGGLE_PLAYER:
            return toggleVisibility(state);

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
    return {
        mediaId: state.mediaId,
        index: 0,
        media: state.media,
        showPlayer: !state.showPlayer
    }
}