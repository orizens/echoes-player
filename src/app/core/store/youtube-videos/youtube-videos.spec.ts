import {
  inject,
  async,
} from '@angular/core/testing';

import { videos } from './youtube-videos.reducer';
import { YoutubeVideosActions } from './youtube-videos.actions';
import { YoutubeMediaItemsMock } from '../../../../../tests/mocks/youtube.media.items';

describe('The Youtube Videos reducer', () => {
    const mockedState = [];
    it('should return current state when no valid actions have been made', () => {
        const state = [...mockedState];
        const actual = videos(state, {type: 'INVALID_ACTION', payload: {}});
        const expected = state;
        expect(actual).toBe(expected);
    });

    it('should ADD videos', () => {
        const state = [...mockedState];
        const actual = videos(state, { type: YoutubeVideosActions.ADD, payload: YoutubeMediaMock });
        const expected = state;
        expect(actual.mediaId.videoId).toBe(YoutubeMediaMock.id.videoId);
    });

    it('should toggle visibility of the player', () => {
      const state = Object.assign({}, mockedState, {
        mediaId: 'mocked',
        showPlayer: false
      });
      const actual = videos(state, { type: YoutubeVideosActions.TOGGLE_PLAYER, payload: true });
      const expected = state;
      expect(actual.showPlayer).toBe(!expected.showPlayer);
    });

    it('should change the state of the player', () => {
      const state = Object.assign({}, mockedState, {
        mediaId: 'mocked',
        playerState: 0
      });
      const actual = videos(state, { type: YoutubeVideosActions.STATE_CHANGE, payload: 1 });
      const expected = state;
      expect(actual.playerState).toBe(1);
    });
});
