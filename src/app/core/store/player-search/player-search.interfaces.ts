export type videoDurations = 'any' | 'long';
export type videoDefinition = 'any' | 'high';
export type videoTypes = 'any' | 'movie' | 'episode';
export interface IQueryParams {
  preset: string;
  videoType: videoTypes;
  videoDuration: videoDurations;
  videoDefinition: videoDefinition;
}
export interface IPlayerSearch {
  query: string;
  filter: string;
  searchType: string;
  queryParams: any;
  queryParamsNew: IQueryParams;
  presets: IPresetParam[];
  pageToken: {
    next: string;
    prev: string;
  };
  isSearching: boolean;
  results: any[];
}

export interface ISearchQueryParam {
  [property: string]: any;
}

export interface IPresetParam {
  label: string;
  value: CPresetTypes | string;
}

export class CSearchTypes {
  static VIDEO = 'video';
  static PLAYLIST = 'playlist';
}

export class CPresetTypes {
  static FULL_ALBUMS = 'full albums';
  static LIVE = 'live';
}
