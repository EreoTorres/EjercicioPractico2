import { TestBed } from '@angular/core/testing';

import { ListprospectosService } from './listprospectos.service';

describe('ListprospectosService', () => {
  let service: ListprospectosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListprospectosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
