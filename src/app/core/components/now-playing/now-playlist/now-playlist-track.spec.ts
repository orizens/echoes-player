import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PIPES } from '../../../../shared/pipes';
import { NowPlaylistTrackComponent } from './now-playlist-track.component';
import { VideoMock, VideoMockWithSpecialChars } from '../../../../../../tests/mocks/now-playlist-track.mocks';
import { MediaParserService } from '../../../services';

describe('NowPlaylistTrackComponent', () => {
  let component: NowPlaylistTrackComponent;
  let fixture: ComponentFixture<NowPlaylistTrackComponent>;

  function createComponent(video = VideoMock) {
    fixture = TestBed.createComponent(NowPlaylistTrackComponent);
    component = fixture.componentInstance;
    component.video = <any>video;
    fixture.detectChanges();
  };

  beforeEach(async(() => {
    const mediaParserSpy = jasmine.createSpyObj('mediaParserSpy', [
      'extractTracks', 'verifyTracksCue', 'extractTime', 'parseTracks'
    ]);
    TestBed.configureTestingModule({
      declarations: [ NowPlaylistTrackComponent, ...PIPES ],
      providers: [
        { provide: MediaParserService, useValue: mediaParserSpy }
      ]
    })
    .compileComponents();
  }));

  it('should create a component', () => {
    createComponent();
    expect(component).toBeDefined();
  });
});
