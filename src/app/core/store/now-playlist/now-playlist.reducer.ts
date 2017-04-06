import { Action } from '@ngrx/store';
import { NowPlaylistActions } from './now-playlist.actions';

export interface NowPlaylistInterface {
  videos: GoogleApiYouTubeVideoResource[];
  selectedId: string;
  filter: string;
}

const initialState: NowPlaylistInterface = {
  videos: [],
  selectedId: '',
  filter: ''
};

export function nowPlaylist(state: NowPlaylistInterface = initialState, action: Action): NowPlaylistInterface {
  switch (action.type) {
    case NowPlaylistActions.SELECT:
      return Object.assign({}, state, { selectedId: action.payload.id });

    case NowPlaylistActions.QUEUE:
      return Object.assign({}, state, { videos: addMedia(state.videos, action.payload) });

    case NowPlaylistActions.QUEUE_VIDEOS:
      return Object.assign({}, state, { videos: addMedias(state.videos, action.payload) });

    case NowPlaylistActions.REMOVE:
      return Object.assign({}, state, { videos: removeMedia(state.videos, action.payload) });

    // updates index by media
    case NowPlaylistActions.UPDATE_INDEX:
      return Object.assign({}, state, { selectedId: action.payload });

    case NowPlaylistActions.FILTER_CHANGE:
      return Object.assign({}, state, { filter: action.payload });

    case NowPlaylistActions.REMOVE_ALL:
      return Object.assign({}, state, { videos: [], filter: '', selectedId: '' });

    case NowPlaylistActions.SELECT_NEXT:
      return Object.assign({}, state, {
        selectedId: selectNextIndex(state.videos, state.selectedId, state.filter)
      });

    case NowPlaylistActions.SELECT_PREVIOUS:
      return Object.assign({}, state, {
        selectedId: selectPreviousIndex(state.videos, state.selectedId, state.filter)
      });

    case NowPlaylistActions.MEDIA_ENDED:
      return selectNextOrPreviousTrack(state, state.filter);

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
  const newMedias = [];
  if (newMedia === -1) {
    newMedias.push(media);
  }
  return [...videos, ...newMedias];
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

function filterVideos(videos: GoogleApiYouTubeVideoResource[], filter: string) {
  return videos.filter(video => JSON.stringify(video).toLowerCase().includes(filter.toLowerCase()));
}

function selectNextIndex(videos: GoogleApiYouTubeVideoResource[], selectedId: string, filter: string): string {
  const filteredVideos = filterVideos(videos, filter);
  const currentIndex: number = filteredVideos.findIndex(video => video.id === selectedId);
  let nextIndex = currentIndex + 1;
  if (!filteredVideos.length) {
    nextIndex = 0;
  }
  if (filteredVideos.length === nextIndex) {
    nextIndex = 0;
  }

  return filteredVideos[nextIndex].id || '';
}

function selectPreviousIndex(videos: GoogleApiYouTubeVideoResource[], selectedId: string, filter: string): string {
  const filteredVideos = filterVideos(videos, filter);
  const currentIndex: number = filteredVideos.findIndex(video => video.id === selectedId);
  let previousIndex = currentIndex - 1;
  if (!filteredVideos.length || previousIndex < 0) {
    previousIndex = 0;
  }

  return filteredVideos[previousIndex].id || '';
}

function selectNextOrPreviousTrack(state: NowPlaylistInterface, filter: string): NowPlaylistInterface {
  const videosPlaylist = state.videos;
  const currentId = state.selectedId;
  const indexOfCurrentVideo = videosPlaylist.findIndex(video => currentId === video.id);
  const isCurrentLast = indexOfCurrentVideo + 1 === videosPlaylist.length;
  const nextId = isCurrentLast
    ? videosPlaylist.length ? videosPlaylist[0].id : ''
    : selectNextIndex(videosPlaylist, currentId, filter);
  return Object.assign({}, state, { selectedId: nextId });
}

function removeMedia(videos: GoogleApiYouTubeVideoResource[], media: GoogleApiYouTubeVideoResource): GoogleApiYouTubeVideoResource[] {
  return videos.filter((_media: GoogleApiYouTubeVideoResource) => _media.id !== media.id);
}
