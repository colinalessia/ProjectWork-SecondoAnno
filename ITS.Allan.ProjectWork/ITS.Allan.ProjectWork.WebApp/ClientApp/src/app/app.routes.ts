import { Routes } from '@angular/router';

import { DisplayClassDataComponent } from './display-class-data/display-class-data.component';
import { AddClassDataFormComponent } from './add-class-data-form/add-class-data-form.component';
import { DisplayScheduleReadOnly } from './display-schedule-read-only/display-schedule-read-only.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './shared/services/auth-guard.service';

export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'student-scheduler', component: DisplayScheduleReadOnly },
  { path: 'admin-scheduler', component: DisplayClassDataComponent, canActivate: [AuthGuardService]},
  { path: 'admin-form', component: AddClassDataFormComponent, canActivate: [AuthGuardService] },
  { path: '', redirectTo: 'student-scheduler', pathMatch: 'full' },
];
