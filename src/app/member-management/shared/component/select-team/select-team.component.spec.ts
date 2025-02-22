import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTeamComponent } from './select-team.component';

describe('SelectTeamComponent', () => {
  let component: SelectTeamComponent;
  let fixture: ComponentFixture<SelectTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectTeamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
