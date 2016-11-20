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
import 'rxjs/add/operator/let';

describe('App', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    const storeSpy = jasmine.createSpyObj('Store', [ 'dispatch', 'subscribe', 'select' ]);
    return TestBed.configureTestingModule({
      providers: [
        App,
        { provide: Store, useValue: storeSpy }
      ]
    });
  });

  it('should define an app component', inject([ App ], (app) => {
    expect(app).toBeDefined();
  }));

  xit('should create a reference to the playlist$ Observable', inject([ App ], (app) => {
    app.ngOnInit();
    const expected = app.nowPlaylistService.playlist$;
    const actual = app.nowPlaylist$;
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
});
