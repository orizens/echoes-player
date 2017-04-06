import { UserPlayerService } from '../user-player.service';
import { ActivatedRoute } from '@angular/router';
import { EchoesState } from '../../../core/store';
import { UserProfileActions } from '../../../core/store/user-profile';
import { Component, HostBinding, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';


@Component({
  selector: 'playlist',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./playlist.scss'],
  template: `
  <playlist-cover [playlist]="playlist"
    (play)="playPlaylist($event)"
    (queue)="queuePlaylist($event)"></playlist-cover>
  <section class="col-md-12">
    <youtube-list
      [list]="videos"
      (play)="playVideo($event)"
      (queue)="queueVideo($event)"
    ></youtube-list>
  </section>
  `
})
export class PlaylistComponent implements OnInit, OnDestroy {
  public videos: GoogleApiYouTubeVideoResource[] = [];
  public playlist: GoogleApiYouTubePlaylistResource;

  @HostBinding('class.clearfix') style = true;

  constructor(
    private store: Store<EchoesState>,
    private route: ActivatedRoute,
    private userPlayerService: UserPlayerService,
    private userProfileActions: UserProfileActions
  ) {
  }

  ngOnInit() {
    this.route.data.take(1).subscribe((data: { videos; playlist }) => {
      this.videos = data.videos;
      this.playlist = data.playlist;
      this.store.dispatch(this.userProfileActions.setViewPlaylist(data.playlist.id));
    });
    // this.videos$ = this.userProfile.fetchPlaylistItems(playlistId);
    // this.playlist$ = this.userProfile.fetchPlaylist(playlistId)
    //   .map(response => response.items[0]);
  }

  ngOnDestroy() {
    this.store.dispatch(this.userProfileActions.setViewPlaylist(''));
  }

  playPlaylist (playlist: GoogleApiYouTubePlaylistResource) {
    this.userPlayerService.playSelectedPlaylist(playlist);
  }

  queueVideo(media: GoogleApiYouTubeVideoResource) {
    this.userPlayerService.queueVideo(media);
  }

  playVideo(media: GoogleApiYouTubeVideoResource) {
    this.userPlayerService.playVideo(media);
  }

  queuePlaylist(playlist: GoogleApiYouTubePlaylistResource) {
    this.userPlayerService.queuePlaylist(playlist);
  }
}
