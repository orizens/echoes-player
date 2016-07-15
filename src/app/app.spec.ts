import {
  beforeEachProviders,
  inject,
  it, xit
} from '@angular/core/testing';

// Load the implementations that should be tested
import { App } from './app.component';
// import { AppState } from './app.service';

describe('App', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    // AppState,
    App
  ]);

  xit('should have a start', inject([ App ], (app) => {
    console.log(app);
    expect(app.start).toEqual(true);
  }));

});
