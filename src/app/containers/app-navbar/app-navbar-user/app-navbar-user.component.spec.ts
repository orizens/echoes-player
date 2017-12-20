import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppNavbarUserComponent } from './app-navbar-user.component';

describe('AppNavbarUserComponent', () => {
  let component: AppNavbarUserComponent;
  let fixture: ComponentFixture<AppNavbarUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AppNavbarUserComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppNavbarUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a component', () => {
    expect(component).toBeTruthy();
  });

  it('should have an empty image url by default', () => {
    expect(component.userImageUrl).toBe('');
  });

  it('should NOT be signed in by default', () => {
    expect(component.signedIn).toBeFalsy();
  });

  it('should emit an event when signed in', () => {
    spyOn(component.signIn, 'emit');
    component.handleSignIn();
    expect(component.signIn.emit).toHaveBeenCalledTimes(1);
  });
});
