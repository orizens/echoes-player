import { Injectable } from '@angular/core';
import { ActionReducer, Action } from '@ngrx/store';
import { NowPlaylistActions } from './now-playlist.actions';

export interface YoutubeMediaPlaylist {
  videos: GoogleApiYouTubeVideoResource[];
  index: string;
  filter: string;
}
let initialState: YoutubeMediaPlaylist = {
  videos: [],
  index: '',
  filter: ''
};
export const nowPlaylist: ActionReducer<YoutubeMediaPlaylist> = (
  state: YoutubeMediaPlaylist = initialState,
  action: Action) => {

  let matchMedia = (media: GoogleApiYouTubeVideoResource) => media.id === action.payload.id;
  let isDifferent = (media: GoogleApiYouTubeVideoResource) => media.id !== action.payload.id;

  switch (action.type) {
    case NowPlaylistActions.SELECT:
      return Object.assign({}, state, { index: action.payload.id });

    case NowPlaylistActions.QUEUE:
      return Object.assign({}, state, { videos: addMedia(state.videos, action.payload) });

    case NowPlaylistActions.QUEUE_VIDEOS:
      return Object.assign({}, state, { videos: addMedias(state.videos, action.payload) });

    case NowPlaylistActions.REMOVE:
      return Object.assign({}, state, { videos: state.videos.filter(isDifferent) });

    // updates index by media
    case NowPlaylistActions.UPDATE_INDEX:
      return Object.assign({}, state, { index: action.payload });

    case NowPlaylistActions.FILTER_CHANGE:
      return Object.assign({}, state, { filter: action.payload });

    case NowPlaylistActions.REMOVE_ALL:
      return Object.assign({}, state, { videos: [], filter: '', index: 0 });

    case NowPlaylistActions.SELECT_NEXT:
      return Object.assign({}, state, { index: selectNextIndex(state.videos, state.index) });

    case NowPlaylistActions.SELECT_PREVIOUS:
      return Object.assign({}, state, { index: selectPreviousIndex(state.videos, state.index) });

    default:
      return state;
  }
};

export const nowPlaylistRegister = {
  reducer: { nowPlaylist },
  actions: NowPlaylistActions
};

function addMedia(videos: GoogleApiYouTubeVideoResource[], media: any) {
  const newMedia = [...videos].findIndex(video => video.id === media.id);
  const newVideos = newMedia === -1 ? videos.push(media) : videos;
  return [...videos];
}

function addMedias(videos, medias) {
  const allVideoIds = videos.map(video => video.id);
  let newVideos = [];
  medias.forEach(media => {
    if (allVideoIds.indexOf(media.id) === -1) {
      newVideos.push(media);
    }
  });
  return videos.concat(newVideos);
}

function selectNextIndex(videos: GoogleApiYouTubeVideoResource[], index: string): string {
  let currentIndex: number = videos.findIndex(video => video.id === index);
  let nextIndex = currentIndex + 1;
  if (!videos.length) {
    nextIndex = 0;
  }
  if (videos.length === nextIndex) {
    nextIndex = 0;
  }

  return videos[nextIndex].id || '';
}

function selectPreviousIndex(videos: GoogleApiYouTubeVideoResource[], index: string): string {
  let currentIndex: number = videos.findIndex(video => video.id === index);
  let previousIndex = currentIndex - 1;
  if (!videos.length || previousIndex < 0) {
    previousIndex = 0;
  }

  return videos[previousIndex].id || '';
}
