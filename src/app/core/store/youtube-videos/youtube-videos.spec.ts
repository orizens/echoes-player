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
        const actual = videos(state, { type: YoutubeVideosActions.ADD, payload: YoutubeMediaItemsMock });
        const expected = [...state, ...YoutubeMediaItemsMock];
        expect(actual.length).toBe(expected.length);
    });

    it('should empty the state when RESET', () => {
      const state = [...YoutubeMediaItemsMock];
      const actual = videos(state, { type: YoutubeVideosActions.RESET });
      const expected = 0;
      expect(actual.length).toEqual(expected);
    });

    it('should replace add new 50 objects when updating data when state is empty', () => {
      const state = [...mockedState];
      const actual = videos(state, { type: YoutubeVideosActions.UPDATE_METADATA, payload: YoutubeMediaItemsMock });
      const expected = YoutubeMediaItemsMock.length;
      expect(actual.length).toBe(expected);
    });

    it('should replace 50 objects when updating data when state is not empty', () => {
      const state = [...YoutubeMediaItemsMock, ...YoutubeMediaItemsMock];
      const actual = videos(state, { type: YoutubeVideosActions.UPDATE_METADATA, payload: YoutubeMediaItemsMock });
      const expected = state.length;
      expect(actual.length).toBe(expected);
    });
});