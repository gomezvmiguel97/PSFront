import { TestBed } from '@angular/core/testing';

import { BusquedabiometricacatalogoService } from './busquedabiometricacatalogo.service';

describe('BusquedabiometricacatalogoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BusquedabiometricacatalogoService = TestBed.get(BusquedabiometricacatalogoService);
    expect(service).toBeTruthy();
  });
});
