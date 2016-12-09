import { Http, URLSearchParams, Response } from '@angular/http';
import { Inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { EchoesState } from '../store';
import { YoutubeVideosActions } from '../store/youtube-videos';
import { PlayerSearchActions } from '../store/player-search';
import { YoutubeSearchApi } from './api/youtube-search.api';

@Injectable()
export class YoutubeSearch {
  isSearching: Boolean = false;

  constructor(
    private http: Http,
    private store: Store<EchoesState>,
    public youtubeVideosActions: YoutubeVideosActions,
    public playerSearchActions: PlayerSearchActions,
    public youtubeSearchApi: YoutubeSearchApi
    ) { }

  search(query: string, dontReset: Boolean, params?: any) {
    const isNewSearch = query && query !== this.youtubeSearchApi.config.get('q');
    const shouldBeReset = !dontReset;

    if (shouldBeReset || isNewSearch) {
      this.resetPageToken();
      this.store.dispatch(this.youtubeVideosActions.reset());
    }
    if (query) {
      const preset = params ? params.preset : '';
      this.youtubeSearchApi.config.set('q', `${query} ${preset}`);
      this.store.dispatch({ type: PlayerSearchActions.UPDATE_QUERY, payload: query });
    }
    this.isSearching = true;
    return this.youtubeSearchApi.list('video')
      .then(response => {
        this.isSearching = false;
        this.store.dispatch(this.youtubeVideosActions.addVideos([ ...response.items ]));
        return response;
      });
  }

  searchMore(params: any) {
    if (!this.isSearching) {
      this.youtubeSearchApi.fetchNextPage();
      this.search('', true, params);
    }
  }

  resetPageToken () {
    this.youtubeSearchApi.resetPageToken();
  }

  setPreset (preset: string) {
    this.store.dispatch(this.playerSearchActions.updateQueryParam({ preset }));
  }
}
