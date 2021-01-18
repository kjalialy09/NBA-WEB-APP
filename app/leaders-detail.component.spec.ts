import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadersDetailComponent } from './leaders-detail.component';

describe('LeadersDetailComponent', () => {
  let component: LeadersDetailComponent;
  let fixture: ComponentFixture<LeadersDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadersDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadersDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
