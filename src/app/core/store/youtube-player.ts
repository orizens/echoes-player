import { Injectable } from '@angular/core';
import { ActionReducer, Action } from '@ngrx/store';
import { PlayerActions } from './youtube-player.actions';

export * from './youtube-player.actions';

export interface YoutubePlayerState {
    mediaId: { videoId: string },
    index: number,
    media?: any,
    showPlayer: boolean,
    playerState: number,
    isFullscreen: boolean
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
}
export const player: ActionReducer<YoutubePlayerState> = (state: YoutubePlayerState = initialPlayerState, action: Action) => {

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
            return Object.assign({}, state, { isFullscreen: !state.isFullscreen })

        default:
            return state;
    }
}

export function playVideo(state: YoutubePlayerState, media: GoogleApiYouTubeVideoResource | GoogleApiYouTubeSearchResource) {
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
