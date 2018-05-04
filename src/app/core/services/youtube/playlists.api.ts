import { Injectable } from '@angular/core';
import { YoutubeDataApi, DataApiProviders } from '../youtube-data-api';

@Injectable()
export class PlaylistsApi {
  private api = DataApiProviders.PLAYLISTS;
  // config for authenticated user playlist
  private apiOptionsUser = {
    mine: 'true',
    part: 'snippet,id,contentDetails'
  };
  // config for not authenticated user
  private apiOptionsAny = {
    id: '',
    part: 'snippet,id,contentDetails'
  };

  constructor(private youtubeDataApi: YoutubeDataApi) { }

  list(playlistId: string) {
    return this.youtubeDataApi.list(this.api, {});
  }

  /**
   * creates a new playlist
   * @param title name for the playlist
   */
  insert (title: string, description = '', _privacy = 'private') {
    const config = {
      part: 'snippet,status',
      alt: 'json'
    };
    const body = {
      snippet: {
        title, description
      },
      status: {
        privacyStatus: _privacy
      }
    };
    return this.youtubeDataApi.insert(this.api, body, config);
  }
}
