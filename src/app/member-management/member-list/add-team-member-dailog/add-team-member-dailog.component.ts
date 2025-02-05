import { Component, Inject, Input, OnInit } from '@angular/core';
import { IMember } from '../../../models/member.model';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCard, MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { ITeam } from '../../../models/team.model';

@Component({
  selector: 'app-add-team-member-dailog',
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
  ],
  templateUrl: './add-team-member-dailog.component.html',
  styleUrl: './add-team-member-dailog.component.scss',
})
export class AddTeamMemberDailogComponent implements OnInit {
  public heading: string = 'Add Team Member';
  memberForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { id: number; teamMember?: IMember }
  ) {}

  ngOnInit(): void {
    if (this.data.teamMember) {
      this.heading = 'Edit Team Member';
    }

    // Initialize the form group with dynamic values
    this.memberForm = this.fb.group({
      id: [this.data.teamMember?.id || Math.floor(Math.random() * 1000)],
      firstName: [this.data.teamMember?.firstName || '', Validators.required],
      lastName: [this.data.teamMember?.lastName || '', Validators.required],
      email: [
        this.data.teamMember?.email || '',
        [Validators.required, Validators.email],
      ],
      username: [this.data.teamMember?.username || '', Validators.required],
      teamId: [this.data.id, Validators.required],
    });
  }

  // onSubmit() {
  //   if (this.memberForm.valid) {
  //     console.log('Form submitted:', this.memberForm.value);
  //     this.member = this.memberForm.value;
  //     console.log('member:', this.member);
  //   }
  // }
}
