/*
 * Testing a Service
 * More info: https://angular.io/docs/ts/latest/guide/testing.html
 */
import { TestBed, inject, } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { PlayerSearchActions } from '../store/player-search';
import { YoutubeDataApi } from './youtube-data-api';
import { YoutubeSearch } from './youtube.search';

describe('Youtube Search Service', () => {
  let service: YoutubeSearch;
  let youtubeDataApiSpy: YoutubeDataApi;

  beforeEach(() => {
    youtubeDataApiSpy = jasmine.createSpyObj('youtubeDataApiSpy',
      [ 'list', 'delete', 'insert', 'update' ]
    );

    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [
        YoutubeSearch,
        PlayerSearchActions,
        { provide: YoutubeDataApi, useValue: youtubeDataApiSpy },
      ]
    });
  });

  // instantiation through framework injection
  beforeEach(inject([YoutubeSearch], (youtubeSearch) => {
    service = youtubeSearch;
  }));

  it('should have a search method', () => {
    const actual = service.search;
    expect(actual).toBeDefined();
  });

  it('should perform search with the api', () => {
    const actual = youtubeDataApiSpy.list;
    service.search('ozrics');
    expect(actual).toHaveBeenCalled();
  });

  it('should search with same value when searching more', () => {
    const query = 'ozrics';
    const nextPageToken = 'fdsaf#42441';
    service.search(query);
    service.searchMore(nextPageToken);
    service.search(query);
    const actual = youtubeDataApiSpy.list;
    const expected = {
      part: 'snippet,id',
      q: query,
      type: 'video',
      pageToken: nextPageToken
    };
    expect(actual).toHaveBeenCalledWith('search', expected);
  });

  it('should reset the page token', () => {
    const query = 'ozrics';
    service.searchMore('fakePageToken$#@$$!');
    service.resetPageToken();
    service.search(query);
    const actual = youtubeDataApiSpy.list;
    const expected = {
      part: 'snippet,id',
      q: query,
      type: 'video',
      pageToken: ''
    };
    expect(actual).toHaveBeenCalledWith('search', expected);
  });
});
