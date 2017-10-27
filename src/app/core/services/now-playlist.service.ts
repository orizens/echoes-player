import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { EchoesState } from '../store';
import * as NowPlaylist from '../store/now-playlist';
import { YoutubeVideosInfo } from './youtube-videos-info.service';

@Injectable()
export class NowPlaylistService {
  public playlist$: Observable<NowPlaylist.INowPlaylist>;

  constructor(
    public store: Store<EchoesState>,
    private youtubeVideosInfo: YoutubeVideosInfo,
    private nowPlaylistActions: NowPlaylist.NowPlaylistActions
  ) {
    this.playlist$ = this.store.let(NowPlaylist.getNowPlaylist$);
  }

  queueVideo(mediaId: string) {
    return this.youtubeVideosInfo.api.list(mediaId).map(items => items[0]);
  }

  queueVideos(medias: GoogleApiYouTubeVideoResource[]) {
    this.store.dispatch(new NowPlaylist.QueueVideos(medias));
  }

  removeVideo(media) {
    this.store.dispatch(new NowPlaylist.RemoveVideo(media));
  }

  selectVideo(media) {
    this.store.dispatch(new NowPlaylist.SelectVideo(media));
  }

  updateFilter(filter: string) {
    this.store.dispatch(new NowPlaylist.FilterChange(filter));
  }

  clearPlaylist() {
    this.store.dispatch(new NowPlaylist.RemoveAll());
  }

  selectNextIndex() {
    this.store.dispatch(new NowPlaylist.SelectNext());
  }

  selectPreviousIndex() {
    this.store.dispatch(new NowPlaylist.SelectPrevious());
  }

  trackEnded() {
    this.store.dispatch(new NowPlaylist.MediaEnded());
  }

  getCurrent() {
    let media;
    this.playlist$.take(1).subscribe(playlist => {
      media = playlist.videos.find(video => video.id === playlist.selectedId);
    });
    return media;
  }

  updateIndexByMedia(mediaId: string) {
    this.store.dispatch(new NowPlaylist.UpdateIndexByMedia(mediaId));
  }

  isInLastTrack(): boolean {
    let nowPlaylist: NowPlaylist.INowPlaylist;
    this.playlist$.take(1).subscribe(_nowPlaylist => (nowPlaylist = _nowPlaylist));
    const currentVideoId = nowPlaylist.selectedId;
    const indexOfCurrentVideo = nowPlaylist.videos.findIndex(video => video.id === currentVideoId);
    const isCurrentLast = indexOfCurrentVideo + 1 === nowPlaylist.videos.length;
    return isCurrentLast;
  }

  toggleRepeat() {
    this.store.dispatch(this.nowPlaylistActions.toggleRepeat());
  }

  seekToTrack(trackEvent) {
    this.store.dispatch(this.nowPlaylistActions.seekTo(trackEvent));
  }
}
