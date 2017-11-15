import { Injectable } from '@angular/core';
import { NowPlaylistService } from '../../core/services';
import { AppPlayerService } from '../../core/services/app-player.service';
import { YoutubeApiService } from '../../core/services/youtube-api.service';

@Injectable()
export class UserPlayerService {
  constructor(private nowPlaylistService: NowPlaylistService,
              private appPlayerService: AppPlayerService,
              private youtubeApiService: YoutubeApiService) {
  }

  playSelectedPlaylist(playlist: GoogleApiYouTubePlaylistResource) {
    this.youtubeApiService
      .fetchPlaylistItems(playlist.id, '')
      .subscribe((items: GoogleApiYouTubeVideoResource[]) => {
        // this.store.dispatch(new NowPlaylist.QueueVideos(items));
        this.nowPlaylistService.queueVideos(items);

        this.nowPlaylistService.updateIndexByMedia(items[0].id);

        // this.store.dispatch(new AppPlayer.LoadAndPlay(items[0]));
        this.appPlayerService.loadAndPlay(items[0]);

      });
  }

  queuePlaylist(playlist: GoogleApiYouTubePlaylistResource) {
    this.youtubeApiService
      .fetchPlaylistItems(playlist.id, '')
      .subscribe((items: GoogleApiYouTubeVideoResource[]) => {
        // this.store.dispatch(new NowPlaylist.QueueVideos(items));
        this.nowPlaylistService.queueVideos(items);

        return items;
      });
  }

  queueVideo(media: GoogleApiYouTubeVideoResource) {
    // this.store.dispatch(new NowPlaylist.QueueVideo(media));
    this.nowPlaylistService.queueVideo2(media);
  }

  playVideo(media: GoogleApiYouTubeVideoResource) {
    // this.store.dispatch(new AppPlayer.LoadAndPlay(media));
    this.appPlayerService.loadAndPlay(media);

    // todo: select triggers queue, why call it again?
    // this.store.dispatch(new NowPlaylist.QueueVideo(media));
    this.nowPlaylistService.queueVideo2(media);

    // this.store.dispatch(new NowPlaylist.SelectVideo(media));
    this.nowPlaylistService.selectVideo(media);
  }
}
