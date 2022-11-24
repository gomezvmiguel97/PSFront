import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TogglemenuComponent } from './mainbuttonbar.component';

describe('TogglemenuComponent', () => {
  let component: TogglemenuComponent;
  let fixture: ComponentFixture<TogglemenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TogglemenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TogglemenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
