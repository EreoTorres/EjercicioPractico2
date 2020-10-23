import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcuponesComponent } from './editcupones.component';

describe('EditcuponesComponent', () => {
  let component: EditcuponesComponent;
  let fixture: ComponentFixture<EditcuponesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditcuponesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcuponesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
