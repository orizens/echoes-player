import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAppComponent } from './app-app.component';

describe('AppAppComponent', () => {
  let component: AppAppComponent;
  let fixture: ComponentFixture<AppAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
