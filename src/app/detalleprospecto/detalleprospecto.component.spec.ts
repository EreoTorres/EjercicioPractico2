import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleprospectoComponent } from './detalleprospecto.component';

describe('DetalleprospectoComponent', () => {
  let component: DetalleprospectoComponent;
  let fixture: ComponentFixture<DetalleprospectoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleprospectoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleprospectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
