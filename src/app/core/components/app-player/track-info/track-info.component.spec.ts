import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackInfoComponent } from './track-info.component';
import {
  NO_ERRORS_SCHEMA,
  PipeTransform,
  Pipe,
  Injectable
} from '@angular/core';
import { MediaParserService } from '../../../../core/services';

@Pipe({ name: 'parseTracks' })
class ParseTracksMockPipe implements PipeTransform {
  constructor() {}

  transform(value: any): any {
    return value;
  }
}
@Injectable()
class MediaParserServiceMock {
  extractTracks() {}
  extractTime() {}
}
describe('TrackInfoComponent', () => {
  let component: TrackInfoComponent;
  let fixture: ComponentFixture<TrackInfoComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TrackInfoComponent, ParseTracksMockPipe],
        providers: [
          {
            provide: MediaParserService,
            useValue: MediaParserServiceMock
          }
        ],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
