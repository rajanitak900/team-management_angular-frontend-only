import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ITeam } from '../../../models/team.model';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-team-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSelectModule,
  ],
  templateUrl: './add-team-dialog.component.html',
  styleUrl: './add-team-dialog.component.scss',
})
export class AddTeamDialogComponent implements OnInit {
  public teamForm!: FormGroup;
  public newTeam: ITeam = { id: 0, name: '' };
  public teamList: ITeam[] = [];
  public headerText = 'Add Team';
  public isEdit = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { teamList: ITeam[]; isEdit: boolean }
  ) {
    if (data.isEdit) {
      this.headerText = 'Edit Team';
      this.teamList = data.teamList;
      this.isEdit = true;
      this.createFormControls();
    }
  }

  ngOnInit(): void {
    if (this.isEdit) {
      this.teamForm.get('id')?.valueChanges.subscribe((value) => {
        this.teamForm.get('name')?.setValue(this.getTeamName(value));
      });
    }
  }

  createFormControls() {
    this.teamForm = new FormGroup({
      id: new FormControl(this.teamList[0].id),
      name: new FormControl(this.teamList[0].name),
    });
  }

  getTeamName(id: number): string {
    if (id) {
      const team = this.teamList.find((t) => t.id === id);
      if (!team) {
        throw new Error(`Team with id ${id} not found`);
      }
      this.newTeam.name = team.name;
      return team.name;
    }
    return '';
  }

  saveTeam(): ITeam {
    if (this.isEdit) {
      return this.teamForm.value;
    } else {
      return this.newTeam;
    }
  }
}
