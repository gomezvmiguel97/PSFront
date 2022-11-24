import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowuserdataComponent } from './showuserdata.component';

describe('ShowuserdataComponent', () => {
  let component: ShowuserdataComponent;
  let fixture: ComponentFixture<ShowuserdataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowuserdataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowuserdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
