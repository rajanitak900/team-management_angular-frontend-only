import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTeamMemberDailogComponent } from './delete-team-member-dailog.component';

describe('DeleteTeamMemberDailogComponent', () => {
  let component: DeleteTeamMemberDailogComponent;
  let fixture: ComponentFixture<DeleteTeamMemberDailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteTeamMemberDailogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteTeamMemberDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
