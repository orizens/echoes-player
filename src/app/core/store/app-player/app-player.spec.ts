import {
  inject,
  async,
} from '@angular/core/testing';

import { player, AppPlayerState } from './app-player.reducer';
import { AppPlayerActions } from './app-player.actions';
import { YoutubeMediaMock } from '../../../../../tests/mocks/youtube.media.item';

describe('The Youtube Player reducer', () => {
    const mockedState = {
      mediaId: { videoId: 'NONE'},
      index: 0,
      media: {},
      showPlayer: true,
      playerState: 0,
      isFullscreen: false
    };
    it('should return current state when no valid actions have been made', () => {
        const state = Object.assign({}, mockedState);
        const actual = player(<AppPlayerState>state, {type: 'INVALID_ACTION', payload: {}});
        const expected = state;
        expect(actual).toBe(expected);
    });

    it('should set the new media id by the new PLAYED youtube media item', () => {
        const state = Object.assign({}, mockedState);
        const actual = player(state, { type: AppPlayerActions.PLAY, payload: YoutubeMediaMock });
        const expected = state;
        expect(actual.mediaId.videoId).toBe(YoutubeMediaMock.id.videoId);
    });

    it('should toggle visibility of the player', () => {
      const state = Object.assign({}, mockedState, {
        mediaId: 'mocked',
        showPlayer: false
      });
      const actual = player(state, { type: AppPlayerActions.TOGGLE_PLAYER, payload: true });
      const expected = state;
      expect(actual.showPlayer).toBe(!expected.showPlayer);
    });

    it('should change the state of the player', () => {
      const state = Object.assign({}, mockedState, {
        mediaId: 'mocked',
        playerState: 0
      });
      const actual = player(state, { type: AppPlayerActions.STATE_CHANGE, payload: 1 });
      const expected = state;
      expect(actual.playerState).toBe(1);
    });
});
