import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MemberManagementComponent } from './member-management/member-management.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'team-member', component: MemberManagementComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
