import { inject, async } from '@angular/core/testing';

import { search, IPlayerSearch } from './player-search.reducer';
import { PlayerSearchActions } from './player-search.actions';
import { YoutubeMediaItemsMock } from '../../../../../tests/mocks/youtube.media.items';

describe('The Player Search reducer', () => {
  const mockedState = (results = []): IPlayerSearch => ({
    query: '',
    filter: '',
    searchType: '',
    queryParams: {
      preset: '',
      duration: -1
    },
    presets: [],
    pageToken: {
      next: '',
      prev: ''
    },
    results: results ? results : [],
    isSearching: false
  });

  const playerSearchActions = new PlayerSearchActions();

  // it('should return current state when no valid actions have been made', () => {
  //   const state = mockedState();
  //   const actual = search(state, { type: 'INVALID_ACTION' });
  //   const expected = state;
  //   expect(actual).toEqual(expected);
  // });

  it('should ADD videos', () => {
    const state = mockedState();
    const actual = search(state, playerSearchActions.addResults(YoutubeMediaItemsMock));
    const expected = [...state.results, ...YoutubeMediaItemsMock];
    expect(actual.results.length).toBe(expected.length);
  });

  it('should empty the state when RESET', () => {
    const state = mockedState([...YoutubeMediaItemsMock]);
    const actual = search(state, playerSearchActions.resetResults());
    const expected = 0;
    expect(actual.results.length).toEqual(expected);
  });
});
