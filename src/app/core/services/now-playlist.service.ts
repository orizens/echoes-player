import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { EchoesState } from '../store';
import * as NowPlaylist from '../store/now-playlist';
import { YoutubeVideosInfo } from './youtube-videos-info.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { INowPlaylist } from '../store/now-playlist/now-playlist.reducer';
import { MediaParserService } from './media-parser.service';
import { YoutubePlayerService } from './youtube-player.service';

const INIT_STATE: INowPlaylist = {
  videos: [],
  selectedId: '',
  filter: '',
  repeat: false
};

@Injectable()
export class NowPlaylistService {
  public playlist$: Observable<INowPlaylist>;

  private playlistSubject: BehaviorSubject<INowPlaylist>;


  constructor(public store: Store<EchoesState>,
              private youtubeVideosInfo: YoutubeVideosInfo,
              private mediaParser: MediaParserService,
              private playerService: YoutubePlayerService,
              private nowPlaylistActions: NowPlaylist.NowPlaylistActions) {

    // this.playlist$ = this.store.let(NowPlaylist.getNowPlaylist$);

    this.playlistSubject = new BehaviorSubject(INIT_STATE);
    this.playlist$ = this.playlistSubject.asObservable();
  }

  static addMedia(videos: GoogleApiYouTubeVideoResource[], media: any) {
    const newMedia = [...videos].findIndex(video => video.id === media.id);
    const newMedias = [];
    if (newMedia === -1) {
      newMedias.push(media);
    }
    return [...videos, ...newMedias];
  }

  static addMedias(videos, medias) {
    const allVideoIds = videos.map(video => video.id);
    const newVideos = [];
    medias.forEach(media => {
      if (allVideoIds.indexOf(media.id) === -1) {
        newVideos.push(media);
      }
    });
    return videos.concat(newVideos);
  }

  static removeMedia(videos: GoogleApiYouTubeVideoResource[],
                     media: GoogleApiYouTubeVideoResource): GoogleApiYouTubeVideoResource[] {
    return videos.filter((_media: GoogleApiYouTubeVideoResource) => _media.id !== media.id);
  }


  static filterVideos(videos: GoogleApiYouTubeVideoResource[], filter: string) {
    return videos.filter(video =>
      JSON.stringify(video)
        .toLowerCase()
        .includes(filter.toLowerCase())
    );
  }

  static selectNextIndex(videos: GoogleApiYouTubeVideoResource[],
                         selectedId: string,
                         filter: string,
                         isRepeat: boolean): string {
    const filteredVideos = NowPlaylistService.filterVideos(videos, filter);
    const currentIndex: number = filteredVideos.findIndex(video => video.id === selectedId);
    let nextIndex = currentIndex + 1;
    if (!filteredVideos.length) {
      nextIndex = 0;
    }
    if (filteredVideos.length === nextIndex) {
      nextIndex = isRepeat ? 0 : currentIndex;
    }

    return filteredVideos[nextIndex].id || '';
  }

  static getNextIdForPlaylist(videos: GoogleApiYouTubeVideoResource[],
                              repeat: boolean,
                              currentId: string = '') {
    let id = '';
    if (videos.length && repeat) {
      id = videos[0].id;
    }
    return id;
  }

  static selectNextOrPreviousTrack(state: INowPlaylist, filter: string): INowPlaylist {
    const videosPlaylist = state.videos;
    const currentId = state.selectedId;
    const indexOfCurrentVideo = videosPlaylist.findIndex(video => currentId === video.id);
    const isCurrentLast = indexOfCurrentVideo + 1 === videosPlaylist.length;
    const nextId = isCurrentLast
      ? NowPlaylistService.getNextIdForPlaylist(videosPlaylist, state.repeat, currentId)
      : NowPlaylistService.selectNextIndex(videosPlaylist, currentId, filter, state.repeat);
    return Object.assign({}, state, { selectedId: nextId });
  }

  static selectPreviousIndex(videos: GoogleApiYouTubeVideoResource[],
                             selectedId: string,
                             filter: string): string {
    const filteredVideos = NowPlaylistService.filterVideos(videos, filter);
    const currentIndex: number = filteredVideos.findIndex(video => video.id === selectedId);
    let previousIndex = currentIndex - 1;
    if (!filteredVideos.length || previousIndex < 0) {
      previousIndex = 0;
    }

    return filteredVideos[previousIndex].id || '';
  }


  // ???
  queueVideo(mediaId: string) {
    return this.youtubeVideosInfo.api.getVideos(mediaId).map(items => items[0]);
  }

  queueVideo2(media) {
    // case NowPlaylistActions.QUEUE:
    //   return { ...state, videos: addMedia(state.videos, action.payload) };

    const playlist = this.playlistSubject.getValue();

    this.playlistSubject.next({
      ...playlist,
      videos: NowPlaylistService.addMedia(playlist.videos, media)
    });
  }

  queueVideos(medias: GoogleApiYouTubeVideoResource[]) {
    // this.store.dispatch(new NowPlaylist.QueueVideos(medias));
    const playlist = this.playlistSubject.getValue();

    this.playlistSubject.next({
      ...playlist,
      videos: NowPlaylistService.addMedias(playlist.videos, medias)
    });
  }

  removeVideo(media) {
    // this.store.dispatch(new NowPlaylist.RemoveVideo(media));

    // case NowPlaylistActions.REMOVE:
    //   return { ...state, videos: removeMedia(state.videos, action.payload) };

    const playlist = this.playlistSubject.getValue();

    this.playlistSubject.next({
      ...playlist,
      videos: NowPlaylistService.removeMedia(playlist.videos, media)
    });
  }

  selectVideo(media) {
    // this.store.dispatch(new NowPlaylist.SelectVideo(media));
    const playlist = this.playlistSubject.getValue();

    this.playlistSubject.next({
      ...playlist, selectedId: media.id,
      videos: NowPlaylistService.addMedia(playlist.videos, media)
    });
  }

  updateFilter(filter: string) {
    // this.store.dispatch(new NowPlaylist.FilterChange(filter));
    // case NowPlaylistActions.FILTER_CHANGE:
    //   return { ...state, filter: action.payload };

    const playlist = this.playlistSubject.getValue();

    this.playlistSubject.next({
      ...playlist,
      filter: filter
    });
  }

  clearPlaylist() {
    // this.store.dispatch(new NowPlaylist.RemoveAll());

    // case NowPlaylistActions.REMOVE_ALL:
    //   return { ...state, videos: [], filter: '', selectedId: '' };

    this.playlistSubject.next({
      ...this.playlistSubject.getValue(),
      videos: [], filter: '', selectedId: ''
    });
  }

  selectNextIndex() {
    // this.store.dispatch(new NowPlaylist.SelectNext());
    // case NowPlaylistActions.SELECT_NEXT: {
    //     return {
    //       ...state,
    //       selectedId: selectNextIndex(state.videos, state.selectedId, state.filter, state.repeat)
    //     };
    //   }

    const playlist = this.playlistSubject.getValue();

    this.playlistSubject.next({
      ...playlist,
      selectedId: NowPlaylistService.selectNextIndex(playlist.videos, playlist.selectedId, playlist.filter, playlist.repeat)
    });
  }

  selectPreviousIndex() {
    // this.store.dispatch(new NowPlaylist.SelectPrevious());

    // case NowPlaylistActions.SELECT_PREVIOUS:
    //   return {
    //     ...state,
    //     selectedId: selectPreviousIndex(state.videos, state.selectedId, state.filter)
    //   };

    const playlist = this.playlistSubject.getValue();

    this.playlistSubject.next({
      ...playlist,
      selectedId: NowPlaylistService.selectPreviousIndex(playlist.videos, playlist.selectedId, playlist.filter)
    });
  }

  trackEnded() {
    // this.store.dispatch(new NowPlaylist.MediaEnded());

    // case NowPlaylistActions.MEDIA_ENDED:
    //   return selectNextOrPreviousTrack(state, state.filter);

    const playlist = this.playlistSubject.getValue();
    this.playlistSubject.next(NowPlaylistService.selectNextOrPreviousTrack(playlist, playlist.filter));
  }

  getCurrent() {
    let media = null;
    this.playlist$.take(1).subscribe(playlist => {
      media = playlist.videos.find(video => video.id === playlist.selectedId);
    });
    return media;
  }

  updateIndexByMedia(mediaId: string) {
    // this.store.dispatch(new NowPlaylist.UpdateIndexByMedia(mediaId));

    // case NowPlaylistActions.UPDATE_INDEX:
    //   return { ...state, selectedId: action.payload };

    this.playlistSubject.next({
      ...this.playlistSubject.getValue(), selectedId: mediaId
    });
  }

  isInLastTrack(): boolean {
    // better than bahavior subject?
    let nowPlaylist: NowPlaylist.INowPlaylist;
    this.playlist$.take(1).subscribe(_nowPlaylist => (nowPlaylist = _nowPlaylist));
    const currentVideoId = nowPlaylist.selectedId;
    const indexOfCurrentVideo = nowPlaylist.videos.findIndex(video => video.id === currentVideoId);
    const isCurrentLast = indexOfCurrentVideo + 1 === nowPlaylist.videos.length;
    return isCurrentLast;
  }

  toggleRepeat() {
    // this.store.dispatch(this.nowPlaylistActions.toggleRepeat());

    // case NowPlaylistActions.TOGGLE_REPEAT: {
    //     return {
    //       ...state,
    //       repeat: !state.repeat
    //     };
    //   }

    const playlist = this.playlistSubject.getValue();

    this.playlistSubject.next({
      ...playlist,
      repeat: !playlist.repeat
    });
  }

  seekToTrack(trackEvent) {
    // this.store.dispatch(this.nowPlaylistActions.seekTo(trackEvent));

    // @Effect()
    //   selectBeforeSeekToTime$ = this.actions$
    //     .ofType(NowPlaylist.NowPlaylistActions.SELECT_AND_SEEK_TO_TIME)
    //     .map(toPayload)
    //     .map(trackEvent => new NowPlaylist.UpdateIndexByMedia(trackEvent.media.id));
    //
    // @Effect({ dispatch: false })
    //   seekToTime$ = this.actions$
    //     .ofType(NowPlaylist.NowPlaylistActions.SELECT_AND_SEEK_TO_TIME)
    //     .map(toPayload)
    //     .do(trackEvent => this.playerService.seekTo(this.mediaParser.toNumber(trackEvent.time)));
    // }

    // ???
    this.updateIndexByMedia(trackEvent.media.id);

    this.playerService.seekTo(this.mediaParser.toNumber(trackEvent.time));
  }
}
