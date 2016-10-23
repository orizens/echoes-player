import {
  inject,
  TestBed
} from '@angular/core/testing';

// Load the implementations that should be tested
import { App } from './app.component';
import { YoutubeSearch, YoutubePlayerService, NowPlaylistService } from './core/services';
import { PlayerActions } from './core/store/youtube-player';
import { AppLayoutActions } from './core/store/app-layout';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

describe('App', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    let youtubePlayerServiceSpy = jasmine.createSpyObj('YoutubePlayerService', [ 'playVideo' ]);
    youtubePlayerServiceSpy.player$ = {};
    let notifyMock = {
      subscribe: (fn) => fn(),
      requestPermission: () => notifyMock
    };
    const nowPlaylistSpy = jasmine.createSpyObj('NowPlaylistService', [
      'updateIndexByMedia', 'selectNextIndex', 'getCurrent'
    ]);
    const storeSpy = jasmine.createSpyObj('Store', [ 'dispatch', 'subscribe', 'select' ]);
    const playerActionsSpy = jasmine.createSpyObj('PlayerActions', ['playVideo']);
    const appLayoutActionsSpy = jasmine.createSpyObj('AppLayoutActions', ['toggleSidebar']);
    return TestBed.configureTestingModule({
      providers: [
        App,
        { provide: YoutubeSearch, useClass: class YoutubeSearch {} },
        { provide: YoutubePlayerService, useValue: youtubePlayerServiceSpy },
        { provide: PlayerActions, useValue: playerActionsSpy },
        { provide: AppLayoutActions, useValue: appLayoutActionsSpy },
        { provide: NowPlaylistService, useValue: nowPlaylistSpy },
        { provide: Store, useValue: storeSpy }
      ]
    });
  });

  it('should define an app component', inject([ App ], (app) => {
    expect(app).toBeDefined();
  }));

  it('should create a reference to the player$ Observable', inject([ App ], (app) => {
    app.ngOnInit();
    const expected = app.playerService.player$;
    const actual = app.player;
    expect(actual).toBe(expected);
  }));

  /*
  it('should request permission to show notifications', inject([ App, Notify ], (app, notify) => {
    spyOn(notify, 'subscribe').and.callThrough();
    spyOn(notify, 'requestPermission').and.callFake(() => notify);
    app.ngOnInit();
    const actuals = [
      notify.requestPermission,
      notify.subscribe
    ];
    actuals.forEach(actual => expect(actual).toHaveBeenCalled());
  }));
  */
  it('should dispatch a play video action when the player control next is clicked',
  inject([ App, Store, PlayerActions ], (app, store, playerActions) => {
      app.ngOnInit();
      app.playNextVideo({});
      const actuals = [
        store.dispatch,
        playerActions.playVideo
      ];
      actuals.forEach(actual => expect(actual).toHaveBeenCalled());
  }));

  it('should select a video in playlist',
  inject([ App, Store, PlayerActions ], (app, store, playerActions) => {
    const media = { id: 'mocked-media-object' };
    const expected = media.id;
    const specs = [
      { actual: playerActions.playVideo, expected: media },
      { actual: app.nowPlaylistService.updateIndexByMedia, expected: media.id }
    ];
    app.selectVideo(media);
    specs.forEach(spec => expect(spec.actual).toHaveBeenCalledWith(spec.expected));
  }));

  it('should play the next video while not in the end of the playlist', inject([ App ], (app) => {
    spyOn(app, 'isLastIndex').and.returnValue(false);
    spyOn(app, 'playNextVideo');
    const actuals = [
      app.isLastIndex,
      app.playNextVideo,
    ];
    app.handleVideoEnded({});
    actuals.forEach(actual => expect(actual).toHaveBeenCalled());
  }));

  it('should NOT play the next video when it reached the end of the playlist',
  inject([ App ], (app) => {
    spyOn(app, 'isLastIndex').and.returnValue(true);
    spyOn(app, 'playNextVideo');
    const actual = app.playNextVideo;
    app.handleVideoEnded({});
    expect(actual).not.toHaveBeenCalled();
  }));
});
