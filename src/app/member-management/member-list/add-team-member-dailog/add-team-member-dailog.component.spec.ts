import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTeamMemberDailogComponent } from './add-team-member-dailog.component';

describe('AddTeamMemberDailogComponent', () => {
  let component: AddTeamMemberDailogComponent;
  let fixture: ComponentFixture<AddTeamMemberDailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTeamMemberDailogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTeamMemberDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
