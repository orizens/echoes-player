import {
  inject,
  async,
} from '@angular/core/testing';

import { nowPlaylist, NowPlaylistActions } from './index';
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

  it('should select the NEXT track when media ended and not at end of playlist', () => {
    const state = { selectedId: YoutubeMediaItemsMock[4].id, videos: [...YoutubeMediaItemsMock], filter: '' };
    const actual = nowPlaylist(<any>state, nowPlaylistActions.mediaEnded());
    const expected = state.videos[5];
    expect(actual.selectedId).toMatch(expected.id);
  });

  it('should select the correct NEXT track when filter is with a value', () => {
    const videos = [...YoutubeMediaItemsMock];
    const filter = '2015';
    const filteredVideos = videos.filter(video => JSON.stringify(video).includes(filter));
    const state = {
      videos,
      filter,
      selectedId: filteredVideos[0].id
    };
    const newState = nowPlaylist(<any>state, nowPlaylistActions.selectNext());
    const actual = newState.selectedId;
    const expected = filteredVideos[1].id;
    expect(actual).toMatch(expected);
  });

  it('should select the correct PREVIOUS track when filter is with a value', () => {
    const videos = [...YoutubeMediaItemsMock];
    const filter = '2015';
    const filteredVideos = videos.filter(video => JSON.stringify(video).includes(filter));
    const state = {
      videos,
      filter,
      selectedId: filteredVideos[1].id
    };
    const newState = nowPlaylist(<any>state, nowPlaylistActions.selectPrevious());
    const actual = newState.selectedId;
    const expected = filteredVideos[0].id;
    expect(actual).toMatch(expected);
  });

  it('should remove all videos and reset the selected ID and filter', () => {
    const videos = [...YoutubeMediaItemsMock];
    const filter = '2015';
    const state = {
      videos,
      filter,
      selectedId: videos[5].id
    };
    const newState = nowPlaylist(<any>state, nowPlaylistActions.removeAll());
    const actual = newState;
    const expected = { videos: [], selectedId: '', filter: '' };
    expect(actual).toEqual(expected);
  });

  it('should filter with lower case the when selecting NEXT/PREVIOUS track', () => {
    const videos = [...YoutubeMediaItemsMock];
    const filter = 'Full';
    const filteredVideos = videos.filter(video => JSON.stringify(video).toLowerCase().includes(filter.toLowerCase()));
    const state = {
      videos,
      filter,
      selectedId: filteredVideos[0].id
    };
    const newState = nowPlaylist(<any>state, nowPlaylistActions.selectNext());
    const actual = newState.selectedId;
    const expected = filteredVideos[1].id;
    expect(actual).toMatch(expected);
  });
});
