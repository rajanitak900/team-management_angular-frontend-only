import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TeamService } from '../services/team.service';
import { MatDialog } from '@angular/material/dialog';
import { ITeam } from '../models/team.model';
import { CommonModule } from '@angular/common';
import { AddTeamDialogComponent } from './add-team-dialog/add-team-dialog/add-team-dialog.component';
import { MemberListComponent } from './member-list/member-list.component';
import { SelectTeamComponent } from './shared/component/select-team/select-team.component';
import { NotificationService } from './shared/component/select-team/service/notification.service';
import { DeleteTeamDialogComponent } from './delete-team-dialog/delete-team-dialog/delete-team-dialog.component';

@Component({
  selector: 'app-member-management',
  standalone: true,
  imports: [
    MemberListComponent,
    SelectTeamComponent,
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './member-management.component.html',
  styleUrl: './member-management.component.scss',
})
export class MemberManagementComponent {
  public teams: ITeam[] = [];
  public selectedTeam: ITeam | null = null;

  // ############
  public teamForm: FormGroup = new FormGroup({
    teamName: new FormControl(null),
  });

  constructor(
    private teamService: TeamService,
    private dialog: MatDialog,
    private notifier: NotificationService
  ) {}

  ngOnInit() {
    this.teamService.getTeams().subscribe((response) => {
      this.teams = response;
      this.teamForm.get('teamName')?.setValue(this.teams[0].id);
    });
  }

  addTeamDialog() {
    const dialogRef = this.dialog.open(AddTeamDialogComponent, {
      width: '450px',
      data: { teamList: null, isEdit: false },
    });

    dialogRef.afterClosed().subscribe((result: ITeam) => {
      if (result && result.id === 0 && result.name) {
        this.teamService.createTeam(result).subscribe((response) => {
          //this.teams.push(response);------------
          this.notifier.success('Team added successful!');
          console.log('The dialog was closed', response);
        });
      }
    });
  }

  editTeamDialog() {
    const dialogRef = this.dialog.open(AddTeamDialogComponent, {
      width: '450px',
      data: { teamList: this.teams, isEdit: true },
    });

    dialogRef.afterClosed().subscribe((result: ITeam) => {
      this.teamService.updateTeam(result).subscribe((response) => {
        if (response) {
          this.teams.map((team) => {
            if (team.id === response.id) {
              team.name = response.name;
            }
          });
          this.notifier.success('Team update successful!');
        }

        console.log('The dialog was closed', response);
      });
    });
  }

  deleteTeamDialog() {
    const dialogRef = this.dialog.open(DeleteTeamDialogComponent, {
      width: '450px',
      data: { teamList: this.teams },
    });
    dialogRef.afterClosed().subscribe((result: ITeam) => {
      if (result && result.id !== 0 && result.name) {
        this.teamService.deleteTeam(result.id).subscribe(() => {
          this.teams = this.teams.filter((m) => m.id !== result.id);
          this.notifier.success(`Team deleted successful!`);
        });
      }
    });
  }

  receiveMessage(message: ITeam) {
    this.selectedTeam = message; // Handle the message received from the child
  }
}
