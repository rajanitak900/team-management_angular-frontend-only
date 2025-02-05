import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMember } from '../models/member.model';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private apiUrl = 'http://localhost:5000/api/members';

  private mockMembers: IMember[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@mail.com',
      username: 'johndoe',
      teamId: 1,
    },
    {
      id: 2,
      firstName: 'Jack',
      lastName: 'smith',
      email: 'jacksmith@mail.com',
      username: 'jacksmith',
      teamId: 2,
    },
    {
      id: 3,
      firstName: 'Alex',
      lastName: 'Doe',
      email: 'alexdoe@mail.com',
      username: 'alexdoe',
      teamId: 1,
    },
    {
      id: 4,
      firstName: 'kerry',
      lastName: 'smith',
      email: 'kerrysmith@mail.com',
      username: 'kerrysmith',
      teamId: 2,
    },
  ];

  constructor(private http: HttpClient) {}

  getMembersByTeamId(teamId: number | undefined): Observable<IMember[]> {
    // Mocking the API endpoint
    return new Observable((observer) => {
      // Simulate a successful response with a delay
      setTimeout(() => {
        const members = this.mockMembers.filter(
          (member) => member.teamId === teamId
        );
        observer.next(members);
        observer.complete();
      }, 1000);
    });
  }

  addMember(member: IMember): Observable<IMember> {
    // Mocking the API endpoint
    return new Observable((observer) => {
      // Simulate a successful response with a delay
      setTimeout(() => {
        const newMember: IMember = {
          id: member.id,
          email: member.email,
          firstName: member.firstName,
          lastName: member.lastName,
          teamId: member.teamId,
          username: member.username,
        };
        this.mockMembers.push(newMember);
        observer.next(newMember);
        observer.complete();
      }, 100);
    });
  }

  updateMember(member: IMember): Observable<IMember> {
    // Mocking the API endpoint
    return new Observable((observer) => {
      // Simulate a successful response with a delay
      setTimeout(() => {
        const updatedMember = this.mockMembers.find((m) => m.id === member.id);
        if (updatedMember) {
          updatedMember.firstName = member.firstName;
          updatedMember.lastName = member.lastName;
          updatedMember.email = member.email;
          updatedMember.username = member.username;
          observer.next(updatedMember);
        } else {
          observer.error(new Error('Member not found'));
        }
        observer.complete();
      }, 1000);
    });
  }

  deleteMember(id: number): Observable<void> {
    // Mocking the API endpoint
    return new Observable((observer) => {
      const deletedData = this.mockMembers.findIndex((m) => m.id === id);
      if (deletedData === -1) {
        observer.error(new Error('Member not found'));
      } else {
        this.mockMembers.splice(deletedData, 1);
        // Simulate a successful response with a delay
        setTimeout(() => {
          observer.next();
          observer.complete();
        }, 1000);
      }
    });
  }

  moveMemberToTeam(memberId: number, teamId: number): Observable<IMember> {
    // Mocking the API endpoint
    return new Observable((observer) => {
      // Simulate a successful response with a delay
      setTimeout(() => {
        const updatedMember = this.mockMembers.find(
          (member) => member.id === memberId
        );
        if (updatedMember) {
          updatedMember.teamId = teamId;
          observer.next(updatedMember);
        } else {
          observer.error(new Error('Member not found'));
        }
        observer.complete();
      }, 1000);
    });
  }
}
