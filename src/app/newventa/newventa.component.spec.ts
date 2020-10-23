import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewventaComponent } from './newventa.component';

describe('NewventaComponent', () => {
  let component: NewventaComponent;
  let fixture: ComponentFixture<NewventaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewventaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewventaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
