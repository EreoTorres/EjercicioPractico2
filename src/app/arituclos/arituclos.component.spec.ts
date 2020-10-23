import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArituclosComponent } from './arituclos.component';

describe('ArituclosComponent', () => {
  let component: ArituclosComponent;
  let fixture: ComponentFixture<ArituclosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArituclosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArituclosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
