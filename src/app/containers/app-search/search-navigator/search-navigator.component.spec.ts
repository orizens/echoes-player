import { TestBed, inject } from '@angular/core/testing';

import { SearchNavigatorComponent } from './search-navigator.component';

describe('a search-navigator component', () => {
  let component: SearchNavigatorComponent;

  // register all needed dependencies
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SearchNavigatorComponent
      ]
    });
  });

  // instantiation through framework injection
  beforeEach(inject([SearchNavigatorComponent], (SearchNavigatorComponent) => {
    component = SearchNavigatorComponent;
  }));

  it('should have an instance', () => {
    expect(component).toBeDefined();
  });
});
