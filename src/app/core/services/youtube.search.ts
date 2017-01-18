import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { EchoesState } from '../store';
import { YoutubeVideosActions } from '../store/youtube-videos';
import { YoutubeSearchApi } from './api/youtube-search.api';

@Injectable()
export class YoutubeSearch {

  constructor(
    private store: Store<EchoesState>,
    public youtubeVideosActions: YoutubeVideosActions,
    public youtubeSearchApi: YoutubeSearchApi
    ) { }

  search(query: string, params?: any) {
    if (query) {
      const preset = params ? params.preset : '';
      this.youtubeSearchApi.config.set('q', `${query} ${preset}`);
    }
    // this.store.dispatch(this.youtubeVideosActions.searchStarted(true));
    return this.youtubeSearchApi.list('video');
  }

  searchMore() {
    return this.youtubeSearchApi.fetchNextPage();
  }

  resetPageToken () {
    return this.youtubeSearchApi.resetPageToken();
  }
}
