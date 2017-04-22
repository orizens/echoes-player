import { TestBed, inject } from '@angular/core/testing';

import { VersionCheckerService } from './version-checker.service';

describe('VersionCheckerService', () => {
  let service: VersionCheckerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VersionCheckerService]
    });
  });

  beforeEach(inject([VersionCheckerService], (_service: VersionCheckerService) => {
    service = _service;
  }));

  it('should ...', () => {
    expect(service).toBeTruthy();
  });

  it('should have a "check" method', () => {
    expect(service.check).toBeDefined();
  });

  it('should return an observable when "check()"', () => {

  });
});
