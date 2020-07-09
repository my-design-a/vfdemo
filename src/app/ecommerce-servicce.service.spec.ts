import { TestBed } from '@angular/core/testing';

import { EcommerceServicceService } from './ecommerce-servicce.service';

describe('EcommerceServicceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EcommerceServicceService = TestBed.get(EcommerceServicceService);
    expect(service).toBeTruthy();
  });
});
