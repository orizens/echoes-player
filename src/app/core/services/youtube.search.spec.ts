/*
 * Testing a Service
 * More info: https://angular.io/docs/ts/latest/guide/testing.html
 */
import { TestBed, async, inject } from '@angular/core/testing';
import { Http, HttpModule } from '@angular/http';
import { Store } from '@ngrx/store';
import { YoutubeVideosActions } from '../store/youtube-videos';
import { PlayerSearchActions } from '../store/player-search';
import { YoutubeSearchApi } from './api/youtube-search.api';
import { YoutubeSearch } from './youtube.search';

describe('Youtube Search Service', () => {
  let service: YoutubeSearch;

  beforeEach(() => {
    let storeSpy = jasmine.createSpyObj('Store', ['subscribe', 'dispatch']);
    let youtubeSearchApiSpy = jasmine.createSpyObj('youtubeSearchApiSpy', 
      [ 'setConfig', 'setToken', 'fetchNextPage', 'resetPageToken' ]
    );
    youtubeSearchApiSpy.list = (val) => {
      return {
        then: (fn) => fn({ items: [ 'mock' ] })
      };
    };
    youtubeSearchApiSpy.config = {
      q: '',
      get: (q) => { youtubeSearchApiSpy.config.q },
      set: (q) => { youtubeSearchApiSpy.config.q = q }
    };
    spyOn(youtubeSearchApiSpy, 'list').and.callThrough();

    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [
        YoutubeSearch,
        YoutubeVideosActions,
        PlayerSearchActions,
        { provide: YoutubeSearchApi, useValue: youtubeSearchApiSpy },
        { provide: Store, useValue: storeSpy }
      ]
    });
  });

  // instantiation through framework injection
  beforeEach(inject([YoutubeSearch], (youtubeSearch) => {
    service = youtubeSearch;
  }));

  it('should have an api instance', () => {
    const actual = service.youtubeSearchApi;
    expect(actual).toBeDefined();
  });

  it('should perform search with the api', () => {
    const actual = service.youtubeSearchApi.list;
    service.search('ozrics', true);
    expect(actual).toHaveBeenCalled();
  });

  xit('should search with same value when searching more', () => {
    const query = 'ozrics';
    service.search(query, true);
    service.searchMore({});
    const actual = service.youtubeSearchApi.config.get('q');
    const expected = query;
    expect(actual).toMatch(expected);
  });

  it('should NOT reset search when searching more', () => {
    const query = 'ozrics';
    service.searchMore({});
    const actual = service.youtubeSearchApi.resetPageToken;
    expect(actual).not.toHaveBeenCalled();
  });
});
