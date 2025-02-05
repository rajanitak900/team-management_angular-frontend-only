import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveTeamMemberDailogComponent } from './move-team-member-dailog.component';

describe('MoveTeamMemberDailogComponent', () => {
  let component: MoveTeamMemberDailogComponent;
  let fixture: ComponentFixture<MoveTeamMemberDailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoveTeamMemberDailogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoveTeamMemberDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
