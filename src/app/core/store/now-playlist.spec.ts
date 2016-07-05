import {
  it,
  inject,
  async,
  describe,
  expect
} from '@angular/core/testing';

// import {MockBackend} from 'angular2/http/testing';

// Load the implementations that should be tested
import { nowPlaylist } from './now-playlist';
import { SELECT, QUEUE, REMOVE, UPDATE_INDEX, FILTER_CHANGE, REMOVE_ALL } from './now-playlist';
import { YoutubeMediaItemsMock } from '../../../../test/mocks/youtube.media.items';

describe('The Now Playlist Reducer', () => {
    it('should return current state when no valid actions have been made', () => {
      const state = { videos: [] };
      const actual = nowPlaylist(state, { type: 'INVALID_ACTION', payload: {} });
      const expected = state;
      expect(actual).toBe(expected);
    });

    it('should select the chosen video', () => {
      const state = { index: 0, videos: [...YoutubeMediaItemsMock] };
      const actual = nowPlaylist(state, { type: SELECT, payload: YoutubeMediaItemsMock[0] });
      const expected = state;
      expect(actual.index).toBe(expected.index);
    });

    it('should queue the selected video to the list', () => {
      let videos = [...YoutubeMediaItemsMock];
      let newVideo = videos.pop();
      const state = { index: 0, videos: [...videos] };
      const actual = nowPlaylist(state, { type: QUEUE, payload: newVideo });
      const expected = newVideo;
      expect(actual.videos.pop().etag).toBe(expected.etag);
    });

    // it('should change the state of the player', () => {
    //   const state = { mediaId: 'mocked', playerState: 0 };
    //     const actual = player(state, { type: STATE_CHANGE, payload: 1 });
    //     const expected = state;
    //     expect(actual.playerState).toBe(expected.playerState);
    // });
});
