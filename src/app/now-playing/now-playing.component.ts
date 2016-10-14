import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { EchoesState } from '../core/store';
import { NowPlaylistService } from '../core/services/now-playlist.service';
import { YoutubeMediaPlaylist } from '../core/store/now-playlist';
import { PlayerActions } from '../core/store/youtube-player';
import { Notify } from "@ngrx/notify";

@Component({
  selector: 'now-playing',
  template: `
  <div class="sidebar-pane">
    <now-playlist-filter
      [playlist]="nowPlaylist | async"
      (clear)="clearPlaylist()"
      (filter)="updateFilter($event)"
      (reset)="resetFilter()"
    ></now-playlist-filter>
    <now-playlist
      [playlist]="nowPlaylist | async"
      (select)="selectVideo($event)"
      (sort)="sortVideo($event)"
      (remove)="removeVideo($event)"
    ></now-playlist>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NowPlaying implements OnInit {
  public nowPlaylist: Observable<YoutubeMediaPlaylist>;

  constructor(
    private store: Store<EchoesState>,
    public nowPlaylistService: NowPlaylistService,
    private playerActions: PlayerActions,
    private notify: Notify
  ) {}

  ngOnInit() {
    this.nowPlaylist = this.nowPlaylistService.playlist$;
  }

  selectVideo (media: GoogleApiYouTubeVideoResource) {
    this.store.dispatch(this.playerActions.playVideo(media));
    this.nowPlaylistService.updateIndexByMedia(media.id);

    this.notify.open(`Now Playing: ${media.snippet.title}`, {
      icon: media.snippet.thumbnails['high'].url,
      body: media.snippet.description
    })
    // Automatically close the notification after 5 seconds
    .takeUntil(Observable.timer(5000))
    // Close the notification after it has been clicked once
    .take(1)
    .subscribe(notification => {
      // console.log('notification closed!');
    });
  }

  sortVideo () { }

  updateFilter (searchFilter: string) {
		this.nowPlaylistService.updateFilter(searchFilter);
	}

	resetFilter () {
		this.nowPlaylistService.updateFilter('');
	}

  clearPlaylist () {
		this.nowPlaylistService.clearPlaylist();
	}

  removeVideo (media) {
    this.nowPlaylistService.removeVideo(media);
  }
}
