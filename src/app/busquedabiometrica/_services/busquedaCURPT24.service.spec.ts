import { TestBed } from '@angular/core/testing';

import { busquedaCURPT24Service } from './busquedaCURPT24.service';

describe('busquedaCURPT24Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: busquedaCURPT24Service = TestBed.get(busquedaCURPT24Service);
    expect(service).toBeTruthy();
  });
});