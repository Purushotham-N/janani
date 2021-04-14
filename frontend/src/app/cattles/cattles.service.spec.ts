import { TestBed } from '@angular/core/testing';

import { CattlesService } from './cattles.service';

describe('CattlesService', () => {
  let service: CattlesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CattlesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
