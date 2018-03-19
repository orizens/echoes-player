import { Action } from '@ngrx/store';
import * as fromActions from './now-playlist.actions';

export interface INowPlaylist {
  videos: GoogleApiYouTubeVideoResource[];
  selectedId: string;
  filter: string;
  repeat: boolean;
}

const initialState: INowPlaylist = {
  videos: [],
  selectedId: '',
  filter: '',
  repeat: false
};
interface UnsafeAction extends Action {
  payload?: any;
}
export function nowPlaylist(
  state: INowPlaylist = initialState,
  action: UnsafeAction
): INowPlaylist {
  switch (action.type) {
    case fromActions.ActionTypes.SELECT:
      return { ...state, selectedId: action.payload.id };

    case fromActions.ActionTypes.QUEUE:
      return { ...state, videos: addMedia(state.videos, action.payload) };

    case fromActions.ActionTypes.QUEUE_VIDEOS:
      return { ...state, videos: addMedias(state.videos, action.payload) };

    case fromActions.ActionTypes.REMOVE:
      return { ...state, videos: removeMedia(state.videos, action.payload) };

    // updates index by media
    case fromActions.ActionTypes.UPDATE_INDEX:
      return { ...state, selectedId: action.payload };

    case fromActions.ActionTypes.FILTER_CHANGE:
      return { ...state, filter: action.payload };

    case fromActions.ActionTypes.REMOVE_ALL:
      return { ...state, videos: [], filter: '', selectedId: '' };

    case fromActions.ActionTypes.SELECT_NEXT: {
      return {
        ...state,
        selectedId: selectNextIndex(
          state.videos,
          state.selectedId,
          state.filter,
          state.repeat
        )
      };
    }

    case fromActions.ActionTypes.SELECT_PREVIOUS:
      return {
        ...state,
        selectedId: selectPreviousIndex(
          state.videos,
          state.selectedId,
          state.filter
        )
      };

    case fromActions.ActionTypes.MEDIA_ENDED:
      return selectNextOrPreviousTrack(state, state.filter);

    case fromActions.ActionTypes.TOGGLE_REPEAT: {
      return {
        ...state,
        repeat: !state.repeat
      };
    }

    case fromActions.ActionTypes.LOAD_PLAYLIST_END: {
      return {
        ...state
      };
    }

    default:
      return state;
  }
}

function addMedia(videos: GoogleApiYouTubeVideoResource[], media: any) {
  const newMedia = videos.findIndex(video => video.id === media.id);
  const newMedias = [];
  if (newMedia === -1) {
    newMedias.push(media);
  }
  return [...videos, ...newMedias];
}

function addMedias(videos, medias) {
  const allVideoIds = videos.map(video => video.id);
  const newVideos = medias.filter(media => !allVideoIds.includes(media.id));
  return [...videos, ...newVideos];
}

function filterVideos(videos: GoogleApiYouTubeVideoResource[], filter: string) {
  const sanitizedFilter = filter.toLowerCase();
  return videos.filter(video =>
    JSON.stringify(video)
      .toLowerCase()
      .includes(sanitizedFilter)
  );
}

function getSelectedInFilteredVideos(
  videos: GoogleApiYouTubeVideoResource[],
  filter: string,
  selectedId: string
) {
  const filteredVideos = filterVideos(videos, filter);
  const currentIndex: number = filteredVideos.findIndex(
    video => video.id === selectedId
  );
  return {
    filteredVideos,
    currentIndex
  };
}

function selectNextIndex(
  videos: GoogleApiYouTubeVideoResource[],
  selectedId: string,
  filter: string,
  isRepeat: boolean
): string {
  const { filteredVideos, currentIndex } = getSelectedInFilteredVideos(
    videos,
    filter,
    selectedId
  );
  let nextIndex = currentIndex + 1;
  if (!filteredVideos.length) {
    nextIndex = 0;
  }
  if (filteredVideos.length === nextIndex) {
    nextIndex = isRepeat ? 0 : currentIndex;
  }

  return filteredVideos[nextIndex].id || '';
}

function selectPreviousIndex(
  videos: GoogleApiYouTubeVideoResource[],
  selectedId: string,
  filter: string
): string {
  const { filteredVideos, currentIndex } = getSelectedInFilteredVideos(
    videos,
    filter,
    selectedId
  );
  let previousIndex = currentIndex - 1;
  if (!filteredVideos.length || previousIndex < 0) {
    previousIndex = 0;
  }

  return filteredVideos[previousIndex].id || '';
}

function selectNextOrPreviousTrack(
  state: INowPlaylist,
  filter: string
): INowPlaylist {
  const { videos, selectedId, repeat } = state;
  const { filteredVideos, currentIndex } = getSelectedInFilteredVideos(
    videos,
    filter,
    selectedId
  );
  const isCurrentLast = currentIndex + 1 === filteredVideos.length;
  const nextId = isCurrentLast
    ? getNextIdForPlaylist(filteredVideos, repeat, selectedId)
    : selectNextIndex(filteredVideos, selectedId, filter, repeat);
  return {
    ...state,
    selectedId: nextId
  };
}

function getNextIdForPlaylist(
  videos: GoogleApiYouTubeVideoResource[],
  repeat: boolean,
  currentId: string = ''
) {
  let id = '';
  if (videos.length && repeat) {
    id = videos[0].id;
  }
  return id;
}

function removeMedia(
  videos: GoogleApiYouTubeVideoResource[],
  media: GoogleApiYouTubeVideoResource
): GoogleApiYouTubeVideoResource[] {
  return videos.filter(
    (_media: GoogleApiYouTubeVideoResource) => _media.id !== media.id
  );
}
