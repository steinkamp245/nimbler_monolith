import { TestBed } from '@angular/core/testing';

import { UserDataCacheService } from './user-data-cache.service';

describe('UserDataCacheService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserDataCacheService = TestBed.get(UserDataCacheService);
    expect(service).toBeTruthy();
  });
});
