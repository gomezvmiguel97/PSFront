import { TestBed } from '@angular/core/testing';

import { ConnectdevicesService } from './connectdevices.service';

describe('ConnectdevicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConnectdevicesService = TestBed.get(ConnectdevicesService);
    expect(service).toBeTruthy();
  });
});
