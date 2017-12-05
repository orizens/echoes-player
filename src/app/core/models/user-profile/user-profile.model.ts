export interface IUserProfile {
  access_token: string;
  playlists: GoogleApiYouTubePlaylistResource[];
  data?: {};
  nextPageToken?: string;
  profile: GoogleBasicProfile;
  viewedPlaylist?: string;
}

export interface GoogleBasicProfile {
  name?: string;
  imageUrl?: string;
}
