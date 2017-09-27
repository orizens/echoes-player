import { Injectable } from '@angular/core';
import { YoutubeDataApi, DataApiProviders } from './youtube-data-api';

const SearchTypes = {
  VIDEO: 'video',
  PLAYLIST: 'playlist',
  CHANNEL: 'channel'
};

export const SearchParams = {
  Types: {
    [SearchTypes.VIDEO]: 'video',
    [SearchTypes.PLAYLIST]: 'playlist',
    [SearchTypes.CHANNEL]: 'channel'
  }
};

@Injectable()
export class YoutubeSearch {
  private _api = DataApiProviders.SEARCH;
  private _apiOptions = {
    part: 'snippet,id',
    q: '',
    type: 'video',
    pageToken: ''
  };

  constructor(
    private youtubeDataApi: YoutubeDataApi
    ) { }

  /**
   * search for video
   * @param query {string}
   * @param params {key/value object}
   */
  search(query: string, params?: any) {
    if (query || '' === query) {
      const preset = params ? ` ${params.preset}` : '';
      this._apiOptions.q = `${query}${preset}`;
    }
    return this.youtubeDataApi.list(this._api, this._apiOptions);
  }

  /**
   * resolves which type to search for
   * @param type any type of SearchTypes
   * @param query any string
   * @param params params of api
   */
  searchFor(type: string, query: string, params?: any) {
    switch (type) {
      case SearchTypes.VIDEO: {
        return this.searchVideo(query, params);
      }

      case SearchTypes.PLAYLIST: {
        return this.searchForPlaylist(query, params);
      }
    }
  }
  /**
   * search for video
   * @param query {string}
   * @param params {key/value object}
   */
  searchVideo(query: string, params?: any) {
    this._apiOptions.type = SearchParams.Types[SearchTypes.VIDEO];
    return this.search(query, params);
  }

  /**
   * search for playlist
   * @param query {string}
   * @param params {key/value object}
   */
  searchForPlaylist(query: string, params?: any) {
    this._apiOptions.type = SearchParams.Types[SearchTypes.PLAYLIST];
    return this.search(query, params)
      .switchMap((response) => {
        const options = {
          part: 'snippet,id,contentDetails',
          id: response.items.map(pl => pl.id.playlistId).join(',')
        };
        return this.youtubeDataApi.list(DataApiProviders.PLAYLISTS, options);
      });
  }

  searchMore(nextPageToken: string) {
    this._apiOptions.pageToken = nextPageToken;
    return this;
  }

  resetPageToken () {
    this._apiOptions.pageToken = '';
    return this;
  }
}
