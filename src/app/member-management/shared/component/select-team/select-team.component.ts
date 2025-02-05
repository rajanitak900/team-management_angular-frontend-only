import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ITeam } from '../../../../models/team.model';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-select-team',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatCardModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './select-team.component.html',
  styleUrl: './select-team.component.scss',
})
export class SelectTeamComponent {
  public teamForm!: FormGroup;
  public teamList: ITeam[] = [];
  public selectedTeam: ITeam | null = null;
  @Input()
  set teams(value: ITeam[] | null) {
    this.teamList = value || [];
    this.createFormControls();
  }
  @Output() selectedTeamEvent = new EventEmitter<ITeam>();

  getTeamName(id: number): ITeam | undefined {
    if (id) {
      const team = this.teamList.find((t) => t.id === id);
      this.selectedTeam = team || null;

      if (!team) {
        throw new Error(`Team with id ${id} not found`);
      }

      this.selectedTeamEvent.emit(team);

      return team;
    }
    return undefined;
  }

  createFormControls() {
    this.teamForm = new FormGroup({
      teamName: new FormControl(this.teamList[0].id),
    });
  }
}
