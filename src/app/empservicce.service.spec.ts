import { TestBed } from '@angular/core/testing';

import { EmpservicceService } from './empservicce.service';

describe('EmpservicceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmpservicceService = TestBed.get(EmpservicceService);
    expect(service).toBeTruthy();
  });
});
