import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EchoesState } from '../../core/store';
import { Store } from '@ngrx/store';
import { UserProfileActions } from '../../core/store/user-profile';
import { NowPlaylistActions, LoadPlaylistAction, PlayPlaylistAction } from '../../core/store/now-playlist';

@Component({
  selector: 'playlist-view',
  styleUrls: [ './playlist-view.component.scss' ],
  templateUrl: './playlist-view.html'
  // providers: [PlaylistViewService]
})

export class PlaylistViewComponent implements OnInit, OnDestroy {
  public videos: GoogleApiYouTubeVideoResource[] = [];
  public playlist: GoogleApiYouTubePlaylistResource;

  constructor(
    private store: Store<EchoesState>,
    private route: ActivatedRoute,
    private userProfileActions: UserProfileActions,
  ) { }

  ngOnInit() {
    this.route.data.take(1).subscribe((data: { videos; playlist }) => {
      this.videos = data.videos;
      this.playlist = data.playlist;
      // this.store.dispatch(this.userProfileActions.setViewPlaylist(data.playlist.id));
    });
  }

  ngOnDestroy() {
    this.store.dispatch(this.userProfileActions.setViewPlaylist(''));
  }

  playPlaylist (playlist: GoogleApiYouTubePlaylistResource) {
    // this.userPlayerService.playSelectedPlaylist(playlist);
    this.store.dispatch(new PlayPlaylistAction(playlist.id));
  }

  queuePlaylist(playlist: GoogleApiYouTubePlaylistResource) {
    this.store.dispatch(new LoadPlaylistAction(playlist.id));
  }

  queueVideo(media: GoogleApiYouTubeVideoResource) {
    // this.userPlayerService.queueVideo(media);
  }

  playVideo(media: GoogleApiYouTubeVideoResource) {
    // this.userPlayerService.playVideo(media);
  }

  get playlistHeader() {
    const { snippet, contentDetails } = this.playlist;
    return `${snippet.title} (${contentDetails.itemCount} videos)`;
  }
}
