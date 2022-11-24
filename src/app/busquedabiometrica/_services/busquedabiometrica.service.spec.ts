import { TestBed } from '@angular/core/testing';

import { BusquedabiometricaService } from './busquedabiometrica.service';

describe('BusquedabiometricaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BusquedabiometricaService = TestBed.get(BusquedabiometricaService);
    expect(service).toBeTruthy();
  });
});
