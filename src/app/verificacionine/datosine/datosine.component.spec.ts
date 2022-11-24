import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosineComponent } from './datosine.component';

describe('DatosineComponent', () => {
  let component: DatosineComponent;
  let fixture: ComponentFixture<DatosineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
