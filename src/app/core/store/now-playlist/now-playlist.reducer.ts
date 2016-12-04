import { Injectable } from '@angular/core';
import { ActionReducer, Action } from '@ngrx/store';
import { NowPlaylistActions } from './now-playlist.actions';

export interface YoutubeMediaPlaylist {
  videos: GoogleApiYouTubeVideoResource[];
  selectedId: string;
  filter: string;
}
let initialState: YoutubeMediaPlaylist = {
  videos: [],
  selectedId: '',
  filter: ''
};
export const nowPlaylist: ActionReducer<YoutubeMediaPlaylist> = (
  state: YoutubeMediaPlaylist = initialState,
  action: Action) => {

  let matchMedia = (media: GoogleApiYouTubeVideoResource) => media.id === action.payload.id;
  let isDifferent = (media: GoogleApiYouTubeVideoResource) => media.id !== action.payload.id;

  switch (action.type) {
    case NowPlaylistActions.SELECT:
      return Object.assign({}, state, { selectedId: action.payload.id });

    case NowPlaylistActions.QUEUE:
      return Object.assign({}, state, { videos: addMedia(state.videos, action.payload) });

    case NowPlaylistActions.QUEUE_VIDEOS:
      return Object.assign({}, state, { videos: addMedias(state.videos, action.payload) });

    case NowPlaylistActions.REMOVE:
      return Object.assign({}, state, { videos: state.videos.filter(isDifferent) });

    // updates index by media
    case NowPlaylistActions.UPDATE_INDEX:
      return Object.assign({}, state, { selectedId: action.payload });

    case NowPlaylistActions.FILTER_CHANGE:
      return Object.assign({}, state, { filter: action.payload });

    case NowPlaylistActions.REMOVE_ALL:
      return Object.assign({}, state, { videos: [], filter: '', selectedId: 0 });

    case NowPlaylistActions.SELECT_NEXT:
      return Object.assign({}, state, { selectedId: selectNextIndex(state.videos, state.selectedId) });

    case NowPlaylistActions.SELECT_PREVIOUS:
      return Object.assign({}, state, { selectedId: selectPreviousIndex(state.videos, state.selectedId) });

    case NowPlaylistActions.MEDIA_ENDED:
      return selectNextOrPreviousTrack(state);

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

function selectNextIndex(videos: GoogleApiYouTubeVideoResource[], selectedId: string): string {
  let currentIndex: number = videos.findIndex(video => video.id === selectedId);
  let nextIndex = currentIndex + 1;
  if (!videos.length) {
    nextIndex = 0;
  }
  if (videos.length === nextIndex) {
    nextIndex = 0;
  }

  return videos[nextIndex].id || '';
}

function selectPreviousIndex(videos: GoogleApiYouTubeVideoResource[], selectedId: string): string {
  let currentIndex: number = videos.findIndex(video => video.id === selectedId);
  let previousIndex = currentIndex - 1;
  if (!videos.length || previousIndex < 0) {
    previousIndex = 0;
  }

  return videos[previousIndex].id || '';
}

function selectNextOrPreviousTrack(state: YoutubeMediaPlaylist): YoutubeMediaPlaylist {
  const videosPlaylist = state.videos;
  const currentId = state.selectedId;
  const indexOfCurrentVideo = videosPlaylist.findIndex(video => currentId === video.id);
  const isCurrentLast = indexOfCurrentVideo + 1 === videosPlaylist.length;
  const nextId = isCurrentLast
    ? videosPlaylist.length ? videosPlaylist[0].id : ''
    : selectNextIndex(videosPlaylist, currentId);
  return Object.assign({}, state, { selectedId: nextId });
}
