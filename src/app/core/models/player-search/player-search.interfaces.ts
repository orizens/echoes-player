export interface IQueryParam {
  preset: string;
  duration: number;
}
export interface IPlayerSearch {
  query: string;
  filter: string;
  searchType: string;
  queryParams: IQueryParam;
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
  static VIDEO =  'video';
  static PLAYLIST = 'playlist';
}

export class CPresetTypes {
  static FULL_ALBUMS = 'full albums';
  static LIVE = 'live';
}
