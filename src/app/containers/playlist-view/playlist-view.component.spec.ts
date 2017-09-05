import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PlaylistViewComponent } from './playlist-view.component';
import { PlaylistProxy } from './playlist-view.proxy';

describe('PlaylistView Component', () => {
  let component: PlaylistViewComponent;
  let playlistProxySpy: PlaylistProxy;

  // register all needed dependencies
  beforeEach(() => {
    playlistProxySpy = jasmine.createSpyObj('playlistProxySpy', [
      'playPlaylist',
      'queuePlaylist',
      'playVideo',
      'queueVideo',
      'fetchPlaylist',
      'fetchPlaylistVideos',
      'fetchPlaylistHeader'
    ]);
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        { provide: PlaylistProxy, useValue: playlistProxySpy },
        PlaylistViewComponent
      ]
    });
  });

  // instantiation through framework injection
  beforeEach(inject([PlaylistViewComponent], (PlaylistViewComponent) => {
    component = PlaylistViewComponent;
  }));

  it('should have an instance', () => {
    expect(component).toBeDefined();
  });

  it('should show playlist (observable)', () => {
    const actual = playlistProxySpy.fetchPlaylist;
    expect(actual).toHaveBeenCalled();
  });

  it('should show videos (observable)', () => {
    const actual = playlistProxySpy.fetchPlaylistVideos;
    expect(actual).toHaveBeenCalled();
  });

  it('should show a header (observable)', () => {
    const actual = playlistProxySpy.fetchPlaylistHeader;
    expect(actual).toHaveBeenCalled();
  });

  describe('Playlist Functionality', () => {
    let playlist: GoogleApiYouTubePlaylistResource;

    beforeEach(() => {
      playlist = { id: 'mocked-playlist' } as GoogleApiYouTubePlaylistResource;
    });

    it('should play playlist', () => {
      component.playPlaylist(playlist);
      const actual = playlistProxySpy.playPlaylist;
      const expected = playlist;
      expect(actual).toHaveBeenCalledWith(expected);
    });

    it('should queue playlist', () => {
      component.queuePlaylist(playlist);
      const actual = playlistProxySpy.queuePlaylist;
      const expected = playlist;
      expect(actual).toHaveBeenCalledWith(expected);
    });
  });

  describe('Video Functionality', () => {
    let media: GoogleApiYouTubeVideoResource;

    beforeEach(() => {
      media = { id: 'mocked-playlist' } as GoogleApiYouTubeVideoResource;
    });

    it('should play a video', () => {
      component.playVideo(media);
      const actual = playlistProxySpy.playVideo;
      const expected = media;
      expect(actual).toHaveBeenCalledWith(expected);
    });

    it('should queue a video', () => {
      component.queueVideo(media);
      const actual = playlistProxySpy.queueVideo;
      const expected = media;
      expect(actual).toHaveBeenCalledWith(expected);
    });
  });
});
