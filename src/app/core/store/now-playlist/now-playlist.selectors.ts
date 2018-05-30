import { Store, createSelector } from '@ngrx/store';
import { Observable } from 'rxjs';
import { INowPlaylist } from './now-playlist.reducer';
import { EchoesState } from '@store/reducers';

export const getNowPlaylist = (state: EchoesState) => state.nowPlaylist;
export const isPlayerInRepeat = createSelector(
  getNowPlaylist,
  (nowPlaylist: INowPlaylist) => nowPlaylist.repeat
);
export const getPlaylistVideos = createSelector(
  getNowPlaylist,
  (nowPlaylist: INowPlaylist) => nowPlaylist.videos
);
export const getPlaylistMediaIds = createSelector(
  getPlaylistVideos,
  (playlist: GoogleApiYouTubeVideoResource[]) => playlist.map(media => media.id)
);
export const getSelectedMediaId = createSelector(
  getNowPlaylist,
  (nowPlaylist: INowPlaylist) => nowPlaylist.selectedId
);
export const getSelectedMedia = createSelector(
  getNowPlaylist,
  getSelectedMediaId,
  (nowPlaylist: INowPlaylist, selectedId: string) => {
    const mediaIds = nowPlaylist.videos.map(video => video.id);
    const selectedMediaIndex = mediaIds.indexOf(selectedId);
    return nowPlaylist.videos[selectedMediaIndex];
  }
);
