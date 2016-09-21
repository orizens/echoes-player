import { UserManager } from './user-manager.service';
import { YoutubeSearch } from './youtube.search';
import { YoutubePlayerService } from './youtube-player.service';
import { NowPlaylistService } from './now-playlist.service';
import { YoutubeVideosInfo } from './youtube-videos-info.service';
import { GapiLoader } from './gapi-loader.service';
import { Authorization } from './authorization.service';

export * from './user-manager.service';
export * from './youtube.search';
export * from './youtube-player.service';
export * from './now-playlist.service';
export * from './youtube-videos-info.service';
export * from './gapi-loader.service';
export * from './authorization.service';

export default [
  UserManager,
  YoutubeSearch,
  YoutubePlayerService,
  NowPlaylistService,
  YoutubeVideosInfo,
  GapiLoader,
  Authorization
];
