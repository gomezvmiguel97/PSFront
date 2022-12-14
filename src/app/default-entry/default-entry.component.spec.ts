import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultEntryComponent } from './default-entry.component';

describe('DefaultEntryComponent', () => {
  let component: DefaultEntryComponent;
  let fixture: ComponentFixture<DefaultEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
