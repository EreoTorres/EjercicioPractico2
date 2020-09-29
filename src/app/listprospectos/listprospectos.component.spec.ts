import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListprospectosComponent } from './listprospectos.component';

describe('ListprospectosComponent', () => {
  let component: ListprospectosComponent;
  let fixture: ComponentFixture<ListprospectosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListprospectosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListprospectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
