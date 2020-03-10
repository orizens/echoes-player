import { AppApi } from '@api/app.api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'add-to-playlist',
  styleUrls: ['./add-to-playlist.scss'],
  template: `
  <div class="add-to-playlist" *ngIf="show$ | async">
    <div class="header is-sticky" *ngIf="media$ | async as media">
      <h4 class="text-success">Add To Playlist: {{media.snippet.title}}</h4>
        <button-icon class="is-absolute" icon="times" (click)="closeModal()" types="btn btn-danger"></button-icon>
    </div>
    <section class="is-flex-row content" *ngIf="media$ | async as media">
      <div class="media-to-add is-flex-column is-sticky">
        <youtube-media [media]="media"></youtube-media>
      </div>
      <div class="playlists" *ngIf="playlists$ | async as playlists">
        <input [value]="playlistsFilter" placeholder="filter playlists..." class="form-control" #searchFilter (input)
        ="handleFilterChange(searchFilter.value)" type="search">
        <ul class="nav nav-list">
          <li *ngFor="let playlist of playlists | search:playlistsFilter">
            <button class="btn btn-success" title="Click to add the video to this playlist" (click)="addToPlaylist(playlist, media)">
              {{playlist.snippet.title}} ({{playlist.contentDetails.itemCount}})
            </button>
          </li>
        </ul>
      </div>
    </section>
  </div>
  `
})
export class AddToPlaylistComponent implements OnInit {
  show$ = this.appApi.showAddToPlaylist$;
  playlists$ = this.appApi.usersPlaylists$;
  media$ = this.appApi.mediaToPlaylist$;

  playlistsFilter = '';

  constructor(private appApi: AppApi) { }
  ngOnInit() { }

  closeModal() {
    this.appApi.toggleModal(false);
  }

  handleFilterChange(filter: string) {
    this.playlistsFilter = filter;
  }

  addToPlaylist(playlist: GoogleApiYouTubePlaylistResource, media: GoogleApiYouTubeVideoResource) {
    this.appApi.addToPlaylist(playlist, media);
  }
}
