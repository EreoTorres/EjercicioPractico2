import { TestBed } from '@angular/core/testing';

import { DetalleprospectoService } from './detalleprospecto.service';

describe('DetalleprospectoService', () => {
  let service: DetalleprospectoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetalleprospectoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
