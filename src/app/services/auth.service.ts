import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<any> {
    // Mock API response
    const mockResponse = {
      token: 'mock-jwt-token',
      user: {
        id: 1,
        username: credentials.username,
        password : credentials.password,
        email: 'mockuser@example.com',
      },
    };

    return new Observable((observer) => {
      observer.next(mockResponse);
      observer.complete();
    });
  }
}
