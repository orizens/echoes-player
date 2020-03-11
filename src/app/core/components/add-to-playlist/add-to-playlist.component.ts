import { AppApi } from '@api/app.api';
import { Component, OnInit } from '@angular/core';

const MODAL_ANIMATION_TIMEOUT = 50;
@Component({
  selector: 'add-to-playlist',
  styleUrls: ['./add-to-playlist.scss'],
  template: `
  <div *ngIf="{show: show$ | async, media: media$ | async  } as video">
    <div class="backdrop is-fixed" *ngIf="video.show"></div>
    <div [ngClass]="{ 'add-to-playlist': true, 'show-modal': animateShow }" *ngIf="video.show && video.media.id">
      <img class="is-absolute thumb-image thumb-shadow"
        [src]="video.media.snippet.thumbnails.high.url" >
      <div class="header is-sticky">
        <h4 class="text-success">Add To Playlist: {{video.media.snippet.title}}</h4>
          <button-icon class="is-absolute" icon="times" (click)="closeModal()" types="btn btn-danger"></button-icon>
      </div>
      <section class="is-flex-row content">
        <div class="media-to-add is-flex-column is-sticky">
          <youtube-media [media]="video.media"></youtube-media>
        </div>
        <div class="playlists is-strechable" *ngIf="playlists$ | async as playlists">
          <input [value]="playlistsFilter" placeholder="filter playlists..." class="form-control" #searchFilter (input)
          ="handleFilterChange(searchFilter.value)" type="search">
          <section class="is-flex-row is-flex-wrap">
            <article class="playlist" *ngFor="let playlist of playlists | search:playlistsFilter">
              <button class="btn btn-transparent" title="Click to add the video to this playlist" (click)="addToPlaylist(playlist, video.media)">
                <youtube-playlist [media]="playlist" [playIcon]="'check 2x'" (play)="addToPlaylist(playlist, video.media)" (navigated)="closeModal()"></youtube-playlist>
              </button>
            </article>
          </section>
        </div>
      </section>
    </div>
</div>
  `
})
export class AddToPlaylistComponent implements OnInit {
  show$ = this.appApi.showAddToPlaylist$;
  playlists$ = this.appApi.usersPlaylists$;
  media$ = this.appApi.mediaToPlaylist$;

  playlistsFilter = '';
  animateShow = false;

  constructor(private appApi: AppApi) {
    this.show$.subscribe(show => {
      if (show) {
        setTimeout(() => this.animateShow = true, MODAL_ANIMATION_TIMEOUT);
      }
    });
  }
  ngOnInit() {

  }

  closeModal() {
    this.animateShow = false;
    setTimeout(() => {
      this.appApi.toggleModal(false)
    }, MODAL_ANIMATION_TIMEOUT * 10);
  }

  handleFilterChange(filter: string) {
    this.playlistsFilter = filter;
  }

  addToPlaylist(playlist: GoogleApiYouTubePlaylistResource, media: GoogleApiYouTubeVideoResource) {
    this.appApi.addToPlaylist(playlist, media);
  }
}
