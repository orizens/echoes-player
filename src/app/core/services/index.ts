import { UserManager } from './user-manager.service';
import { YoutubeSearch } from './youtube.search';
import { YoutubePlayerService } from './youtube-player.service';
import { NowPlaylistService } from './now-playlist.service';
import { YoutubeVideosInfo } from './youtube-videos-info.service';

export * from './user-manager.service';
export * from './youtube.search';
export * from './youtube-player.service';
export * from './now-playlist.service';
export * from './youtube-videos-info.service';

export default [
  UserManager,
  YoutubeSearch,
  YoutubePlayerService,
  NowPlaylistService,
  YoutubeVideosInfo
];
