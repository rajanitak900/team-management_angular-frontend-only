import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  NO_ERRORS_SCHEMA,
  OnInit,
} from '@angular/core';
import { ITeam } from '../../models/team.model';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MemberService } from '../../services/member.service';
import { IMember } from '../../models/member.model';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AddTeamMemberDailogComponent } from './add-team-member-dailog/add-team-member-dailog.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NotificationService } from '../shared/component/select-team/service/notification.service';
import { MoveTeamMemberDailogComponent } from './move-team-member-dailog/move-team-member-dailog.component';
import { DeleteTeamMemberDailogComponent } from '../shared/component/select-team/dialog/delete-team-member-dailog/delete-team-member-dailog.component';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.scss',
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class MemberListComponent implements OnInit {
  public selected: ITeam | null = null;
  public memberList: IMember[] = [];
  public dataSource = new MatTableDataSource<IMember>([]);

  @Input()
  set selectedTeam(value: ITeam | null) {
    this.selected = value;
    this.memberList = [];
    this.loadMemberListByTeamId(value?.id);
  }

  displayedColumns: string[] = ['username', 'name', 'email', 'action'];

  constructor(
    private dialog: MatDialog,
    private memberService: MemberService,
    private notifier: NotificationService
  ) {}

  ngOnInit(): void {}

  openAddMemberDialog() {
    const dialogRef = this.dialog.open(AddTeamMemberDailogComponent, {
      width: '450px',
      data: { id: this.selected?.id, teamMember: null },
    });

    dialogRef.afterClosed().subscribe((result: IMember) => {
      if (!result) {
        return;
      } // If the dialog is closed without any data
      this.memberService.addMember(result).subscribe((response) => {
        if (response) {
          this.memberList.push(response);
          this.dataSource.data = this.memberList;
          console.log('addMember', response);
          this.notifier.success(
            `member added to team ${this.selected?.name} successful!`
          );
        }
      });
    });
  }

  updateTeamMember(member: IMember) {
    const dialogRef = this.dialog.open(AddTeamMemberDailogComponent, {
      width: '450px',
      data: { id: this.selected?.id, teamMember: member },
    });

    dialogRef.afterClosed().subscribe((result: IMember) => {
      if (!result) {
        return;
      } // If the dialog is closed without any data
      this.memberService.updateMember(result).subscribe((response) => {
        if (response) {
          this.memberList.map((m) => {
            if (m.id === response.id) {
              m = response;
            }
          });
          this.dataSource.data = this.memberList;
          console.log('updateMember', response);
          this.notifier.success(`member updated successful!`);
        }
      });
    });
  }

  moveMemberToOtherTeam(member: IMember) {
    const dialogRef = this.dialog.open(MoveTeamMemberDailogComponent, {
      width: '450px',
      data: { selectedTeam: this.selected },
    });

    dialogRef.afterClosed().subscribe((result: ITeam) => {
      if (!result) {
        return;
      }
      this.memberService
        .moveMemberToTeam(member.id, result.id)
        .subscribe((response) => {
          if (response) {
            this.memberList = this.memberList.filter((m) => m.id !== member.id);
            this.dataSource.data = this.memberList;
            console.log('updateMember', response);
            this.notifier.success(
              `member moved to another team ${result.name} successful!`
            );
          }
        });
    });
  }

  deleteTeamMember(member: IMember) {
    const dialogRef = this.dialog.open(DeleteTeamMemberDailogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.memberService.deleteMember(member.id).subscribe(() => {
          this.memberList = this.memberList.filter((m) => m.id !== member.id);
          this.dataSource.data = this.memberList;
          this.notifier.success(`member deleted successful!`);
        });
      }
    });
  }

  private loadMemberListByTeamId(teamId: number | undefined) {
    this.memberService.getMembersByTeamId(teamId).subscribe((members) => {
      this.memberList = members;
      this.dataSource.data = this.memberList;
    });
  }
}
