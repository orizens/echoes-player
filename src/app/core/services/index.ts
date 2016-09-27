import { UserProfile } from './user-profile.service';
import { YoutubeSearch } from './youtube.search';
import { YoutubePlayerService } from './youtube-player.service';
import { NowPlaylistService } from './now-playlist.service';
import { YoutubeVideosInfo } from './youtube-videos-info.service';
import { GapiLoader } from './gapi-loader.service';
import { Authorization } from './authorization.service';

export * from './user-profile.service';
export * from './youtube.search';
export * from './youtube-player.service';
export * from './now-playlist.service';
export * from './youtube-videos-info.service';
export * from './gapi-loader.service';
export * from './authorization.service';

export const APP_SERVICES = [
  UserProfile,
  YoutubeSearch,
  YoutubePlayerService,
  NowPlaylistService,
  YoutubeVideosInfo,
  GapiLoader,
  Authorization
];
