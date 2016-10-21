import { Component, EventEmitter, Input, Output } from '@angular/core';
import { YoutubeMediaPlaylist } from '../../core/store/now-playlist';

import './now-playlist.less';

@Component({
  selector: 'now-playlist',
  template: `
  <section class="now-playlist"
    [ngClass]="{
      'transition-in': playlist?.videos?.length
    }">
    <ul class="nav nav-list ux-maker nicer-ux">
      <li class="now-playlist-track"
        [ngClass]="{
          'active': playlist?.index === video.id,
          'playlist-media': isPlaylistMedia(video)
        }"
        *ngFor="let video of playlist?.videos | search:playlist.filter; let index = index"
        >
        <a class="" title="{{ video.snippet.title }}"
          (click)="selectVideo(video)">
          <span class="label label-primary fa fa-list-ul playlist-track"
            title="Includes specific cued tracks - soon to come..."
          ></span>
          <span class="track-number">{{ index + 1 }}</span>
          <img class="video-thumb" draggable="false" 
            src="{{ video.snippet.thumbnails.default.url }}" 
            title="Drag to sort">
          <span class="video-title">{{ video.snippet.title }}</span>
          <span class="badge badge-info">
            {{ toFriendlyDuration(video.contentDetails.duration) }}
          </span>
          <span class="label label-danger ux-maker remove-track" title="Remove From Playlist"
            (click)="removeVideo(video)"><i class="fa fa-remove"></i></span>
        </a>
      </li>
    </ul>
  </section>
  `
})
export class NowPlaylist {
  @Input() playlist: YoutubeMediaPlaylist;
  @Output() select = new EventEmitter();
  @Output() sort = new EventEmitter();
  @Output() remove = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  // TODO - extract to video info service
  toFriendlyDuration (time) {
    let t = time.split('PT')[1];
    let ts = [];
    if (t) {
      t = t.replace(/(H|M)/g, ':')
      .replace('S', '');
      ts = t.split(':');
      ts = ts.map(function(d){
        return d.length === 1 ? '0' + d : d;
      });
    } else {
      t = time.split('P')[1];
      t = t.replace('D', '');
      ts = [parseInt(t, 10) * 24, ':00:00'];
    }
    return ts.join(':');
  }

  selectVideo (media) {
    this.select.next(media);
  }

  removeVideo (media: GoogleApiYouTubeSearchResource) {
    this.remove.next(media);
  }

  sortVideo (media) {
    this.sort.next(media);
  }

  // TODO - extract to a service
  isPlaylistMedia (media) {
    const hasTracksRegexp = new RegExp(
      '(([0-9]{0,1}[0-9]):([0-9][0-9]){0,1}:{0,1}([0-9][0-9]){0,1})',
      'gm'
    );
    const tracks = media.snippet.description.match(hasTracksRegexp);
    return Array.isArray(tracks);
  }
}
