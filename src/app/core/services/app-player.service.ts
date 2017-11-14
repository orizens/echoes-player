import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IAppPlayer } from '../store/app-player/app-player.reducer';
import { YoutubePlayerService } from './youtube-player.service';
import { YoutubeVideosInfo } from './youtube-videos-info.service';

const INIT_STATE: IAppPlayer = {
  mediaId: { videoId: 'NONE' },
  index: 0,
  media: {
    snippet: { title: 'No Media Yet' }
  },
  showPlayer: true,
  playerState: 0,
  fullscreen: {
    on: false,
    height: 270,
    width: 367
  },
  isFullscreen: false
};


@Injectable()
export class AppPlayerService {
  appPlayer: Observable<IAppPlayer>;

  private appPlayerSubject: BehaviorSubject<IAppPlayer>;

  constructor(private youtubePlayerService: YoutubePlayerService,
              private youtubeVideosInfo: YoutubeVideosInfo) {
    this.appPlayerSubject = new BehaviorSubject(INIT_STATE);
    this.appPlayer = this.appPlayerSubject.asObservable();

    this.resetFullScreen();
  }

  play(media: GoogleApiYouTubeVideoResource) {
    // mediaId?, just for testing?

    // return { ...state, mediaId: action.payload.id, media: action.payload };

    // @Effect()
    //   playVideo$ = this.actions$
    //     .ofType(AppPlayer.ActionTypes.PLAY)
    //     .map(toPayload)
    //     .switchMap(media =>
    //       of(this.youtubePlayerService.playVideo(media)).map((video: any) => new AppPlayer.PlayStarted(video))
    //     );

    this.appPlayerSubject.next({
      ...this.appPlayerSubject.getValue(),
      media
    });

    // new AppPlayer.PlayStarted(video)) not being used ???
    this.youtubePlayerService.playVideo(media);
  }

  togglePlayer() {
    // return { ...state, showPlayer: !state.showPlayer };
    const appPlayer = this.appPlayerSubject.getValue();
    this.appPlayerSubject.next({
      ...appPlayer,
      showPlayer: !appPlayer.showPlayer
    });
  }

  loadAndPlay(media: GoogleApiYouTubeVideoResource) {
    // media.id || media.id.videoId ???

    // @Effect()
    //   loadAndPlay$ = this.actions$
    //     .ofType(AppPlayer.ActionTypes.LOAD_AND_PLAY)
    //     .map(toPayload)
    //     .switchMap((media: any) =>
    //       this.youtubeVideosInfo
    //         .fetchVideoData(media.id || media.id.videoId)
    //         .map((video: any) => new AppPlayer.PlayVideo(video))
    //     );

    this.youtubeVideosInfo.fetchVideoData(media.id)
      .subscribe((video: any) => {
        this.play(video);
      });
  }

  updateState(playerState: YT.PlayerState | any) {
    // return { ...state, playerState: playerState };

    this.appPlayerSubject.next({
      ...this.appPlayerSubject.getValue(),
      playerState
    });
  }

  fullScreen() {
    // case ActionTypes.FULLSCREEN: {
    //     const on = !state.fullscreen.on;
    //     let { height, width } = initialPlayerState.fullscreen;
    //     if (on) {
    //       height = window.innerHeight;
    //       width = window.innerWidth;
    //     }
    //     const fullscreen = { on, height, width };
    //     return { ...state, fullscreen };
    //   }

    // @Effect({ dispatch: false })
    //   toggleFullscreen$ = this.actions$
    //     .ofType(AppPlayer.ActionTypes.FULLSCREEN)
    //     .withLatestFrom(this.store.let(getPlayerFullscreen$))
    //     .do((states: [any, { on; height; width }]) =>
    //       this.youtubePlayerService.setSize(states[1].height, states[1].width)
    //     );

    const appPlayer = this.appPlayerSubject.getValue();

    const on = !appPlayer.fullscreen.on;
    let { height, width } = INIT_STATE.fullscreen;
    if (on) {
      height = window.innerHeight;
      width = window.innerWidth;
    }
    const fullscreen = { on, height, width };

    const newAppPlayer = {
      ...appPlayer,
      fullscreen
    };

    this.appPlayerSubject.next(newAppPlayer);
    this.youtubePlayerService.setSize(fullscreen.height, fullscreen.width);
  }

  private resetFullScreen() {
    // case ActionTypes.RESET_FULLSCREEN: {
    //     const fullscreen = initialPlayerState.fullscreen;
    //     return { ...initialPlayerState, ...state, fullscreen };
    //   }

    const fullscreen = INIT_STATE.fullscreen;

    this.appPlayerSubject.next({
      ...INIT_STATE,
      ...this.appPlayerSubject.getValue(),
      fullscreen
    });
  }

  reset() {
    // case ActionTypes.RESET:
    //   return {
    //     ...state,
    //     isFullscreen: false,
    //     playerState: 0
    //   };

    this.appPlayerSubject.next({
      ...this.appPlayerSubject.getValue(),
      isFullscreen: false,
      playerState: 0
    });
  }
}
