import {
  inject,
  TestBed
} from '@angular/core/testing';

// Load the implementations that should be tested
import { AppComponent } from './app.component';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/let';

describe('App', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    const storeSpy = jasmine.createSpyObj('Store', [ 'dispatch', 'subscribe', 'select', 'let' ]);
    return TestBed.configureTestingModule({
      providers: [
        AppComponent,
        { provide: Store, useValue: storeSpy }
      ]
    });
  });

  it('should define an app component', inject([ AppComponent ], (app) => {
    expect(app).toBeDefined();
  }));

  xit('should create a reference to the playlist$ Observable', inject([ AppComponent ], (app) => {
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
