import { Component, Inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ITeam } from '../../../models/team.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-delete-team-dialog',
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
  templateUrl: './delete-team-dialog.component.html',
  styleUrl: './delete-team-dialog.component.scss',
})
export class DeleteTeamDialogComponent {
  public teamForm!: FormGroup;
  public teamList: ITeam[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: { teamList: ITeam[] }) {
    this.teamList = data.teamList;
    this.createFormControls();
  }

  ngOnInit(): void {
    this.teamForm.get('id')?.valueChanges.subscribe((value) => {
      this.teamForm.get('name')?.setValue(this.getTeamName(value));
    });
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
      return team.name;
    }
    return '';
  }
}
