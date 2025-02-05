import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ITeam } from '../../../models/team.model';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { TeamService } from '../../../services/team.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-move-team-member-dailog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
  ],
  templateUrl: './move-team-member-dailog.component.html',
  styleUrl: './move-team-member-dailog.component.scss',
})
export class MoveTeamMemberDailogComponent {
  public teamForm!: FormGroup;
  public teamList: ITeam[] = [];
  public selectedTeam: ITeam | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { selectedTeam: ITeam },
    private teamService: TeamService
  ) {
    this.selectedTeam = data.selectedTeam;
    this.getTeams();
  }

  getTeams() {
    this.teamService.getTeams().subscribe((response) => {
      this.teamList = response.filter(
        (team) => team.id !== this.selectedTeam?.id
      );

      this.createFormControls();
    });
  }

  createFormControls() {
    this.teamForm = new FormGroup({
      teamName: new FormControl(this.teamList[0].id),
    });
  }

  getselectedTeam(): ITeam {
    return this.teamList.find(
      (team) => team.id === this.teamForm.get('teamName')?.value
    ) as ITeam;
  }
}
