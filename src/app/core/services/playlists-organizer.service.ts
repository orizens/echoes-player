import { Injectable } from '@angular/core';
import { YoutubeDataApi, DataApiProviders } from './youtube-data-api';
import { switchMap } from 'rxjs/operators';
import { IQueryParams } from '../store/player-search';

export const SearchTypes = {
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

const createOptions = (videoId, playlistId, position = 0) => ({
  part: 'snippet',
  snippet: {
    playlistId,
    position,
    resourceId: {
      kind: "youtube#video",
      videoId
    }
  }
});

@Injectable()
export class PlaylistsOrganizer {
  private _api = DataApiProviders.PLAYLIST_ITEMS;

  constructor(private youtubeDataApi: YoutubeDataApi) { }

  addToPlaylist = (videoId, playlistId) => {
    const options = createOptions(videoId, playlistId);
    return this.youtubeDataApi.insert(this._api, options);
  }

}
