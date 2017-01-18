import {
  inject,
  async,
} from '@angular/core/testing';

import { videos } from './youtube-videos.reducer';
import { YoutubeVideosActions } from './youtube-videos.actions';
import { YoutubeMediaItemsMock } from '../../../../../tests/mocks/youtube.media.items';

describe('The Youtube Videos reducer', () => {
  const mockedState = (videos = []) => ({
    videos: videos ? videos : [],
    isSearching: false
  });
  it('should return current state when no valid actions have been made', () => {
    const state = mockedState();
    const actual = videos(state, { type: 'INVALID_ACTION', payload: {} });
    const expected = state;
    expect(actual).toBe(expected);
  });

  it('should ADD videos', () => {
    const state = mockedState();
    const actual = videos(state, {
      type: YoutubeVideosActions.ADD,
      payload: YoutubeMediaItemsMock
    });
    const expected = [...state.videos, ...YoutubeMediaItemsMock];
    expect(actual.videos.length).toBe(expected.length);
  });

  it('should empty the state when RESET', () => {
    const state = mockedState([...YoutubeMediaItemsMock]);
    const actual = videos(state, { type: YoutubeVideosActions.RESET });
    const expected = 0;
    expect(actual.videos.length).toEqual(expected);
  });
});
