import {
  inject,
  async,
} from '@angular/core/testing';

import { nowPlaylist, NowPlaylistActions, YoutubeMediaPlaylist } from './index';
import { YoutubeMediaItemsMock } from '../../../../../tests/mocks/youtube.media.items';

describe('The Now Playlist Reducer', () => {
  const nowPlaylistActions = new NowPlaylistActions();

  it('should return current state when no valid actions have been made', () => {
    const state = { selectedId: '', videos: [], filter: '' };
    const actual = nowPlaylist(state, { type: 'INVALID_ACTION', payload: {} });
    const expected = state;
    expect(actual).toBe(expected);
  });

  it('should select the chosen video', () => {
    const state = { selectedId: 0, videos: [...YoutubeMediaItemsMock], filter: '' };
    const actual = nowPlaylist(<any>state, {
      type: NowPlaylistActions.SELECT,
      payload: YoutubeMediaItemsMock[0]
    });
    const expected = YoutubeMediaItemsMock[0];
    expect(actual.selectedId).toBe(expected.id);
  });

  it('should queue the selected video to the list', () => {
    let videos = [...YoutubeMediaItemsMock];
    let newVideo = videos.pop();
    const state = { selectedId: 0, videos: [...videos], filter: '' };
    const actual = nowPlaylist(<any>state, { type: NowPlaylistActions.QUEUE, payload: newVideo });
    const expected = newVideo;
    expect(actual.videos.pop().etag).toBe(expected.etag);
  });

  it('should select the next track when media ended and not at end of playlist', () => {
    const state = { selectedId: YoutubeMediaItemsMock[4].id, videos: [...YoutubeMediaItemsMock], filter: '' };
    const actual = nowPlaylist(<any>state, nowPlaylistActions.mediaEnded());
    const expected = state.videos[5];
    expect(actual.selectedId).toMatch(expected.id);
  });
});
