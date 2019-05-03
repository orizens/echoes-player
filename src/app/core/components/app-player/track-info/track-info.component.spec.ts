import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackInfoComponent } from './track-info.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MediaParserService } from '../../../../core/services';
import {
  MediaParserServiceMock,
  ParseTracksMockPipe
} from './track-info.mocks';

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
