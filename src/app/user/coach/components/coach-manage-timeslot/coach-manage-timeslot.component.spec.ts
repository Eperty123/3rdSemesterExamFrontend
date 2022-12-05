import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachManageTimeslotComponent } from './coach-manage-timeslot.component';

describe('CoachManageTimeslotComponent', () => {
  let component: CoachManageTimeslotComponent;
  let fixture: ComponentFixture<CoachManageTimeslotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachManageTimeslotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoachManageTimeslotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
