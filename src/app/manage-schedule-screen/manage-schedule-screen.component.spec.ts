import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageScheduleScreenComponent } from './manage-schedule-screen.component';

describe('ManageScheduleScreenComponent', () => {
  let component: ManageScheduleScreenComponent;
  let fixture: ComponentFixture<ManageScheduleScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageScheduleScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageScheduleScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
