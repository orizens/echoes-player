import { Inject, Injectable, OpaqueToken } from '@angular/core';
import { Http } from '@angular/http';
import { YoutubeApiService } from '../youtube-api.service';

// export const SearchApi = new OpaqueToken('SearchApi');

@Injectable()
export class YoutubeSearchApi extends YoutubeApiService {
  
}

export function searchApiFactory() {
  return (http: Http) => {
    const url = 'https://www.googleapis.com/youtube/v3/search';
    const options = {
      url: url,
      http: http,
      idKey: 'type'
    };
    const api = new YoutubeApiService(options);
    api.config.set('part', 'snippet,id');
    api.config.set('q', '');
    api.config.set('type', 'video');
    return api;
  };
};
