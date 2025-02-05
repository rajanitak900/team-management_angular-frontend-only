import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { NotificationService } from '../member-management/shared/component/select-team/service/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  credentials = { username: '', password: '' };

  constructor(
    private authService: AuthService,
    private notifier: NotificationService,
    private router: Router
  ) {}

  onSubmit() {
    this.authService.login(this.credentials).subscribe(
      (response) => {
        // Handle successful login
        console.log('Logged in:', response);
        this.notifier.success('Login successful');
        this.router.navigate(['/team-member']);
      },
      (error) => {
        this.notifier.error('Login failed');
        console.error('Login failed:', error);
      }
    );
  }
}
