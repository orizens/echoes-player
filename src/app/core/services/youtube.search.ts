import { Http, URLSearchParams, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { EchoesState } from '../store';
import { YoutubeVideosActions } from '../store/youtube-videos';
import { PlayerSearchActions } from '../store/player-search';
import { YoutubeApiService } from './youtube-api.service';

@Injectable()
export class YoutubeSearch {
  url: string = 'https://www.googleapis.com/youtube/v3/search';
  api: YoutubeApiService;
  isSearching: Boolean = false;
  private _config: URLSearchParams = new URLSearchParams();

  constructor(
    private http: Http,
    private store: Store<EchoesState>,
    public youtubeVideosActions: YoutubeVideosActions,
    public playerSearchActions: PlayerSearchActions
    ) {
    this.api = new YoutubeApiService({
      url: this.url,
      http: http,
      idKey: 'type'
    });
    this.api.config.set('part', 'snippet,id');
    this.api.config.set('q', '');
    this.api.config.set('type', 'video');
  }

  search(query: string, dontReset: Boolean, params?: any) {
    const isNewSearch = query && query !== this.api.config.get('q');
    const shouldBeReset = !dontReset;

    if (shouldBeReset || isNewSearch) {
      this.resetPageToken();
      this.store.dispatch(this.youtubeVideosActions.reset());
    }
    if (query) {
      const preset = params ? params.preset : '';
      this.api.config.set('q', `${query} ${preset}`);
      this.store.dispatch({ type: PlayerSearchActions.UPDATE_QUERY, payload: query });
    }
    this.isSearching = true;
    return this.api.list('video')
      .then(response => {
        this.isSearching = false;
        this.store.dispatch(this.youtubeVideosActions.addVideos([ ...response.items ]));
        return response;
      });
  }

  searchMore(params: any) {
    if (!this.isSearching) {
      this.api.config.set('pageToken', this.api.nextPageToken);
      this.search('', true, params);
    }
  }

  resetPageToken () {
    this.api.resetPageToken();
  }

  setPreset (preset: string) {
    this.store.dispatch(this.playerSearchActions.updateQueryParam({ preset }));
  }
}
