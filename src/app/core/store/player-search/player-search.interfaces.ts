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
  static TOPIC = 'topic';
}

export class CPresetTypes {
  static FULL_ALBUMS = 'full albums';
  static LIVE = 'live';
}

export class CTopicIds {
  static JAZZ = '/m/03_d0';
  static ELECTRONIC = '/m/02lkt';
  static HIPHOP = '/m/0glt670';
  static POP = '/m/064t9';
  static RNB = '/m/06j6l';
  static ROCK = '/m/06by7';
} 
