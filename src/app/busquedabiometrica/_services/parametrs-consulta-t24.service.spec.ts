import { TestBed } from '@angular/core/testing';

import { ParametrsConsultaT24Service } from './parametrs-consulta-t24.service';

describe('ParametrsConsultaT24Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ParametrsConsultaT24Service = TestBed.get(ParametrsConsultaT24Service);
    expect(service).toBeTruthy();
  });
});
