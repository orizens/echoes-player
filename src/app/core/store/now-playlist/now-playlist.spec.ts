import {
  inject,
  async,
} from '@angular/core/testing';

import { nowPlaylist, NowPlaylistActions, YoutubeMediaPlaylist } from './index';
import { YoutubeMediaItemsMock } from '../../../../../tests/mocks/youtube.media.items';

describe('The Now Playlist Reducer', () => {
    it('should return current state when no valid actions have been made', () => {
      const state = { index: '', videos: [], filter: '' };
      const actual = nowPlaylist(state, { type: 'INVALID_ACTION', payload: {} });
      const expected = state;
      expect(actual).toBe(expected);
    });

    it('should select the chosen video', () => {
      const state = { index: 0, videos: [...YoutubeMediaItemsMock], filter: '' };
      const actual = nowPlaylist(<any>state, {
        type: NowPlaylistActions.SELECT,
        payload: YoutubeMediaItemsMock[0]
      });
      const expected = YoutubeMediaItemsMock[0];
      expect(actual.index).toBe(expected.id);
    });

    it('should queue the selected video to the list', () => {
      let videos = [...YoutubeMediaItemsMock];
      let newVideo = videos.pop();
      const state = { index: 0, videos: [...videos], filter: '' };
      const actual = nowPlaylist(<any>state, { type: NowPlaylistActions.QUEUE, payload: newVideo });
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
