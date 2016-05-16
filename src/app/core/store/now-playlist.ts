import {Reducer, Action} from '@ngrx/store';

export const SELECT = 'SELECT';
export const QUEUE = 'QUEUE';
export const REMOVE = 'REMOVE';
export const UPDATE_INDEX = 'UPDATE_INDEX';
export const FILTER_CHANGE = 'FILTER_CHANGE';
export const REMOVE_ALL = 'REMOVE_ALL';
export const SELECT_NEXT = 'SELECT_NEXT';
export const QUEUE_VIDEOS = 'QUEUE_VIDEOS';

export interface YoutubeMediaPlaylist {
    videos: GoogleApiYouTubeSearchResource[],
    index: number,
    filter: string
}
let initialState: YoutubeMediaPlaylist = {
    videos: [],
    index: 0,
    filter: ''
}
export const nowPlaylist: Reducer<any> = (state: YoutubeMediaPlaylist = initialState, action: Action) => {
    let matchMedia = (media) => media.id.videoId === action.payload.id.videoId;
    let isDifferent = (media) => media.id.videoId !== action.payload.id.videoId;

    switch (action.type) {
        case SELECT:
            return Object.assign({}, state, { index: state.videos.findIndex(matchMedia) });

        case QUEUE:
            return Object.assign({}, state, { videos: addMedia(state.videos, action.payload) });

        case QUEUE_VIDEOS:
            return Object.assign({}, state, { videos: addMedias(state.videos, action.payload) });

        case REMOVE:
            return Object.assign({}, state, { videos: state.videos.filter(isDifferent) });

        // updates index by media 
        case UPDATE_INDEX:
            return Object.assign({}, state, { index: getIndexByMedia(state.videos, action.payload) });

        case FILTER_CHANGE:
            return Object.assign({}, state, { filter: action.payload });

        case REMOVE_ALL:
            return Object.assign({}, state, { videos: [], filter: '', index: 0 });

         case SELECT_NEXT:
            return Object.assign({}, state, { index: selectNextIndex(state.videos, state.index) })

        default:
            return state;
    }
}

function addMedia(videos: GoogleApiYouTubeSearchResource[], media: any) {
    const newMedia = [...videos].findIndex(video => video.id.videoId === media.id.videoId);
    const newVideos = newMedia === -1 ? videos.push(media) : videos;
    return [...videos];
}

function addMedias(videos, medias) {
    const allVideoIds = videos.map(video => video.id.videoId);
    let newVideos = [];
    medias.forEach(media => {
        if (allVideoIds.indexOf(media.id) === -1) {
            newVideos.push(media);
        }
    });
    return videos.concat(newVideos);
}
function selectNextIndex(videos: GoogleApiYouTubeSearchResource[], index: number) {
    let nextIndex: number = index + 1;
    if (!videos.length) {
        nextIndex = videos.length;
    }
    if (videos.length === nextIndex) {
        nextIndex = 0;
    }

    return nextIndex;
}

function getIndexByMedia(videos: GoogleApiYouTubeSearchResource[], media: GoogleApiYouTubeSearchResource) {
    let nextIndex: number = 0;
    if (videos.length) {
        nextIndex = videos.findIndex(video => video.id.videoId === media.id.videoId);
    }
    return nextIndex === -1 ? 0 : nextIndex;
}