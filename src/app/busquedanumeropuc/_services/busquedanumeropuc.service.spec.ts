import { TestBed } from '@angular/core/testing';

import { BusquedanumeropucService } from './busquedanumeropuc.service';

describe('BusquedanumeropucService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BusquedanumeropucService = TestBed.get(BusquedanumeropucService);
    expect(service).toBeTruthy();
  });
});
