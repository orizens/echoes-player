import { PlayerSearchActions, SearchTypes } from '../../core/store/player-search';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EchoesState } from '../../core/store';

// actions
import { NowPlaylistActions } from '../../core/store/now-playlist';
import { AppPlayerActions } from '../../core/store/app-player';
// selectors
import { getPlayerSearchResults$, getNowPlaylist$ } from '../../core/store/reducers';

@Component({
  selector: 'youtube-playlists',
  styles: [`
    :host .youtube-items-container {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
    }
  `],
  // styleUrls: [ './youtube-videos.scss' ],
  template: `
  <section class="videos-list">
    <div class="list-unstyled ux-maker youtube-items-container clearfix">
      <youtube-playlist
        *ngFor="let playlist of results$ | async"
        [media]="playlist"
        (play)="playSelectedMedia(playlist)"
        (queue)="queueSelectedMedia(playlist)">
      </youtube-playlist>
    </div>
  </section>
  `
})
export class YoutubePlaylistsComponent implements OnInit {
  results$ = this.store.let(getPlayerSearchResults$);

  constructor(
    private store: Store<EchoesState>,
    private nowPlaylistActions: NowPlaylistActions,
    private appPlayerActions: AppPlayerActions,
    private playerSearchActions: PlayerSearchActions
  ) { }

  ngOnInit() {
    this.store.dispatch(this.playerSearchActions.updateSearchType(SearchTypes.PLAYLIST));
    this.store.dispatch(PlayerSearchActions.PLAYLISTS_SEARCH_START.creator());
  }

  playSelectedMedia (media: GoogleApiYouTubeVideoResource) {
    // this.store.dispatch(this.appPlayerActions.loadAndPlay(media));
    // this.store.dispatch(this.nowPlaylistActions.selectVideo(media));
  }

  queueSelectedMedia (media: GoogleApiYouTubeVideoResource) {
    // this.store.dispatch(this.nowPlaylistActions.queueVideo(media));
  }
}
