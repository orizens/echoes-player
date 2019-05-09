import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackInfoComponent } from './track-info.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MediaParserService } from '../../../../core/services';
import { MediaParserServiceMock } from './track-info.mocks';
import { ParseTracksPipe } from '../../../../shared/pipes/parseTracks.pipe';

describe('TrackInfoComponent', () => {
  let component: TrackInfoComponent;
  let fixture: ComponentFixture<TrackInfoComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TrackInfoComponent, ParseTracksPipe],
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
