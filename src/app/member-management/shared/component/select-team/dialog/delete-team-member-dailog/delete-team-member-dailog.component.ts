import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-team-member-dailog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './delete-team-member-dailog.component.html',
  styleUrl: './delete-team-member-dailog.component.scss',
})
export class DeleteTeamMemberDailogComponent {}
