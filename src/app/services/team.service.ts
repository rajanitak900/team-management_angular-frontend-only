import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITeam } from '../models/team.model';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private apiUrl = 'http://localhost:5000/api/teams';
  private mockTeams: ITeam[] = [
    { id: 1, name: 'Team A' },
    { id: 2, name: 'Team B' },
    { id: 3, name: 'Team C' },
  ];

  constructor(private http: HttpClient) {}
  getTeams(): Observable<ITeam[]> {
    return new Observable((observer) => {
      observer.next(this.mockTeams);
      observer.complete();
    });
  }

  createTeam(team: { name: string }): Observable<ITeam> {
    const mockTeam: ITeam = {
      id: Math.floor(Math.random() * 1000),
      name: team.name,
    };
    this.mockTeams.push(mockTeam);
    return new Observable((observer) => {
      observer.next(mockTeam);
      observer.complete();
    });
  }

  deleteTeam(id: number): Observable<void> {
    return new Observable((observer) => {
      observer.next();
      observer.complete();
    });
  }

  updateTeam(updateTeam: ITeam): Observable<ITeam> {
    const team = this.mockTeams.find((t) => t.id === updateTeam.id);
    if (team) {
      team.name = updateTeam.name;
    }

    return new Observable((observer) => {
      observer.next(team);
      observer.complete();
    });
  }
}
