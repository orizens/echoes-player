import { UserProfile } from './user-profile.service';
import { YoutubeSearch } from './youtube.search';
import { YoutubePlayerService } from './youtube-player.service';
import { NowPlaylistService } from './now-playlist.service';
import { YoutubeVideosInfo } from './youtube-videos-info.service';
import { GapiLoader } from './gapi-loader.service';
import { Authorization } from './authorization.service';
import { YoutubeDataApi } from './youtube-data-api';
import { VersionCheckerService } from './version-checker.service';
import { MediaParserService } from './media-parser.service';

export * from './user-profile.service';
export * from './youtube.search';
export * from './youtube-player.service';
export * from './now-playlist.service';
export * from './youtube-videos-info.service';
export * from './gapi-loader.service';
export * from './authorization.service';
export * from './version-checker.service';
export * from './media-parser.service';

export const APP_SERVICES = [
  { provide: UserProfile, useClass: UserProfile },
  { provide: YoutubeSearch, useClass: YoutubeSearch },
  { provide: YoutubePlayerService, useClass: YoutubePlayerService },
  { provide: NowPlaylistService, useClass: NowPlaylistService },
  { provide: YoutubeVideosInfo, useClass: YoutubeVideosInfo },
  { provide: GapiLoader, useClass: GapiLoader },
  { provide: Authorization, useClass: Authorization },
  { provide: YoutubeDataApi, useClass: YoutubeDataApi },
  VersionCheckerService,
  MediaParserService
];
