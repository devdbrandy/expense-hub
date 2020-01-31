import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentTeamComponent } from './department-team.component';

describe('DepartmentTeamComponent', () => {
  let component: DepartmentTeamComponent;
  let fixture: ComponentFixture<DepartmentTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
