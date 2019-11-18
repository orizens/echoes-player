/*
 * Testing a Service
 * More info: https://angular.io/docs/ts/latest/guide/testing.html
 */
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { PlayerSearchActions } from '@store/player-search';
import { YoutubeDataApi } from './youtube-data-api';
import { YoutubeSearch, SearchTypes } from './youtube.search';

describe('Youtube Search Service', () => {
  let service: YoutubeSearch;
  let youtubeDataApiSpy: YoutubeDataApi;

  beforeEach(() => {
    youtubeDataApiSpy = jasmine.createSpyObj('youtubeDataApiSpy', [
      'list',
      'delete',
      'insert',
      'update'
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        YoutubeSearch,
        PlayerSearchActions,
        { provide: YoutubeDataApi, useValue: youtubeDataApiSpy }
      ]
    });
  });

  // instantiation through framework injection
  beforeEach(inject([YoutubeSearch], youtubeSearch => {
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
    const params = { preset: '' };
    const nextPageToken = 'fdsaf#42441';
    service.search(query, params);
    service.searchMore(nextPageToken);
    service.searchFor(SearchTypes.VIDEO, query, params);
    const actual = youtubeDataApiSpy.list;
    const expected = {
      part: 'snippet,id',
      q: `${query} ${params.preset}`,
      type: 'video',
      pageToken: nextPageToken,
      videoType: 'any',
      videoDuration: 'any',
      videoDefinition: 'any'
    };
    expect(actual).toHaveBeenCalledWith('search', expected);
  });

  it('should reset the page token', () => {
    const query = 'ozrics';
    const params = { preset: '' };
    service.searchMore('fakePageToken$#@$$!');
    service.resetPageToken();
    service.searchFor(SearchTypes.VIDEO, query, params);
    const actual = youtubeDataApiSpy.list;
    const expected = {
      part: 'snippet,id',
      q: `${query} ${params.preset}`,
      type: 'video',
      pageToken: '',
      videoType: 'any',
      videoDuration: 'any',
      videoDefinition: 'any'
    };
    expect(actual).toHaveBeenCalledWith('search', expected);
  });
});
