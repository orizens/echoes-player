import { inject, async } from '@angular/core/testing';

import * as NowPlaylist from './index';
import { YoutubeMediaItemsMock } from '../../../../../tests/mocks/youtube.media.items';

describe('The Now Playlist Reducer', () => {
  const nowPlaylistActions = new NowPlaylist.NowPlaylistActions();
  const createState = (props = {}) => {
    const defaultState = {
      selectedId: '',
      videos: [],
      filter: '',
      repeat: false
    };
    return { ...defaultState, ...props };
  };

  it('should return current state when no valid actions have been made', () => {
    const state = createState();
    const actual = NowPlaylist.nowPlaylist(state, { type: 'INVALID_ACTION', payload: {} });
    const expected = state;
    expect(actual).toBe(expected);
  });

  it('should select the chosen video', () => {
    const state = createState({
      selectedId: 0,
      videos: [...YoutubeMediaItemsMock]
    });
    const actual = NowPlaylist.nowPlaylist(<any>state, {
      type: NowPlaylist.NowPlaylistActions.SELECT,
      payload: YoutubeMediaItemsMock[0]
    });
    const expected = YoutubeMediaItemsMock[0];
    expect(actual.selectedId).toBe(expected.id);
  });

  it('should queue the selected video to the list', () => {
    const videos = [...YoutubeMediaItemsMock];
    const newVideo = videos.pop();
    const state = createState({
      selectedId: 0,
      videos: [...videos]
    });
    const actual = NowPlaylist.nowPlaylist(<any>state, {
      type: NowPlaylist.NowPlaylistActions.QUEUE,
      payload: newVideo
    });
    const expected = newVideo;
    expect(actual.videos.pop().etag).toBe(expected.etag);
  });

  it('should select the NEXT track when media ended and not at end of playlist', () => {
    const state = createState({
      selectedId: YoutubeMediaItemsMock[4].id,
      videos: [...YoutubeMediaItemsMock]
    });
    const actual = NowPlaylist.nowPlaylist(<any>state, new NowPlaylist.MediaEnded());
    const expected = state.videos[5];
    expect(actual.selectedId).toMatch(expected.id);
  });

  it('should select the correct NEXT track when filter is with a value', () => {
    const videos = [...YoutubeMediaItemsMock];
    const filter = '2015';
    const filteredVideos = videos.filter(video => JSON.stringify(video).includes(filter));
    const state = createState({
      videos,
      filter,
      selectedId: filteredVideos[0].id
    });
    const newState = NowPlaylist.nowPlaylist(<any>state, new NowPlaylist.SelectNext());
    const actual = newState.selectedId;
    const expected = filteredVideos[1].id;
    expect(actual).toMatch(expected);
  });

  it('should select the correct PREVIOUS track when filter is with a value', () => {
    const videos = [...YoutubeMediaItemsMock];
    const filter = '2015';
    const filteredVideos = videos.filter(video => JSON.stringify(video).includes(filter));
    const state = createState({
      videos,
      filter,
      selectedId: filteredVideos[1].id
    });
    const newState = NowPlaylist.nowPlaylist(<any>state, new NowPlaylist.SelectPrevious());
    const actual = newState.selectedId;
    const expected = filteredVideos[0].id;
    expect(actual).toMatch(expected);
  });

  it('should remove all videos and reset the selected ID and filter', () => {
    const videos = [...YoutubeMediaItemsMock];
    const filter = '2015';
    const state = createState({
      videos,
      filter,
      selectedId: videos[5].id
    });
    const newState = NowPlaylist.nowPlaylist(<any>state, new NowPlaylist.RemoveAll());
    const actual = newState;
    const expected = createState();
    expect(actual).toEqual(expected);
  });

  it('should filter with lower case the when selecting NEXT/PREVIOUS track', () => {
    const videos = [...YoutubeMediaItemsMock];
    const filter = 'Full';
    const filteredVideos = videos.filter(video =>
      JSON.stringify(video)
        .toLowerCase()
        .includes(filter.toLowerCase())
    );
    const state = createState({
      videos,
      filter,
      selectedId: filteredVideos[0].id
    });
    const newState = NowPlaylist.nowPlaylist(<any>state, new NowPlaylist.SelectNext());
    const actual = newState.selectedId;
    const expected = filteredVideos[1].id;
    expect(actual).toMatch(expected);
  });
});
