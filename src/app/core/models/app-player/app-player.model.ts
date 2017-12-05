type GoogleApiYoutubeVideo = GoogleApiYouTubeVideoResource | GoogleApiYouTubeSearchResource | any;

export interface IAppPlayer {
  mediaId: { videoId: string };
  index: number;
  media?: GoogleApiYoutubeVideo | any;
  showPlayer: boolean;
  playerState: number;
  fullscreen: {
    on: boolean;
    height: number;
    width: number;
  };
  isFullscreen: boolean;
}
