import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamLeadersDetailComponent } from './team-leaders-detail.component';

describe('TeamLeadersDetailComponent', () => {
  let component: TeamLeadersDetailComponent;
  let fixture: ComponentFixture<TeamLeadersDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamLeadersDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamLeadersDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
