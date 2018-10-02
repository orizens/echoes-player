import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EchoesState } from '@store/reducers';
import * as fromNowPlaylist from '@store/now-playlist';
import { YoutubeVideosInfo } from './youtube-videos-info.service';
import { map, take } from 'rxjs/operators';

@Injectable()
export class NowPlaylistService {
  public playlist$: Observable<fromNowPlaylist.INowPlaylist>;

  constructor(
    public store: Store<EchoesState>,
    private youtubeVideosInfo: YoutubeVideosInfo
  ) {
    this.playlist$ = this.store.pipe(select(fromNowPlaylist.getNowPlaylist));
  }

  queueVideo(mediaId: string) {
    return this.youtubeVideosInfo.api
      .list(mediaId)
      .pipe(map(items => items[0]));
  }

  queueVideos(medias: GoogleApiYouTubeVideoResource[]) {
    this.store.dispatch(new fromNowPlaylist.QueueVideos(medias));
  }

  removeVideo(media) {
    this.store.dispatch(new fromNowPlaylist.RemoveVideo(media));
  }

  selectVideo(media) {
    this.store.dispatch(new fromNowPlaylist.SelectVideo(media));
  }

  updateFilter(filter: string) {
    this.store.dispatch(new fromNowPlaylist.FilterChange(filter));
  }

  clearPlaylist() {
    this.store.dispatch(new fromNowPlaylist.RemoveAll());
  }

  selectNextIndex() {
    this.store.dispatch(new fromNowPlaylist.SelectNext());
  }

  selectPreviousIndex() {
    this.store.dispatch(new fromNowPlaylist.SelectPrevious());
  }

  trackEnded() {
    this.store.dispatch(new fromNowPlaylist.MediaEnded());
  }

  getCurrent() {
    let media;
    this.playlist$.pipe(take(1)).subscribe(playlist => {
      media = playlist.videos.find(video => video.id === playlist.selectedId);
    });
    return media;
  }

  updateIndexByMedia(mediaId: string) {
    this.store.dispatch(new fromNowPlaylist.UpdateIndexByMedia(mediaId));
  }

  isInLastTrack(): boolean {
    let nowPlaylist: fromNowPlaylist.INowPlaylist;
    this.playlist$
      .pipe(take(1))
      .subscribe(_nowPlaylist => (nowPlaylist = _nowPlaylist));
    const currentVideoId = nowPlaylist.selectedId;
    const indexOfCurrentVideo = nowPlaylist.videos.findIndex(
      video => video.id === currentVideoId
    );
    const isCurrentLast = indexOfCurrentVideo + 1 === nowPlaylist.videos.length;
    return isCurrentLast;
  }

  seekToTrack(trackEvent) {
    this.store.dispatch(new fromNowPlaylist.SeekTo(trackEvent));
  }
}
