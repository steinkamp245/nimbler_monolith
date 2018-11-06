import { TestBed } from '@angular/core/testing';

import { SharedSignOutService } from './shared-sign-out.service';

describe('SharedSignOutService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharedSignOutService = TestBed.get(SharedSignOutService);
    expect(service).toBeTruthy();
  });
});
