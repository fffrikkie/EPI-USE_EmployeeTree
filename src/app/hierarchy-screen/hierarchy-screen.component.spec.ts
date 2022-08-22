import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HierarchyScreenComponent } from './hierarchy-screen.component';

describe('HierarchyScreenComponent', () => {
  let component: HierarchyScreenComponent;
  let fixture: ComponentFixture<HierarchyScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HierarchyScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HierarchyScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
