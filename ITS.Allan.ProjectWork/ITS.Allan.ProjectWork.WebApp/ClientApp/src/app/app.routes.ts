import { Routes } from '@angular/router';

import { DisplayClassDataComponent } from './display-class-data/display-class-data.component';
import { AddClassDataFormComponent } from './add-class-data-form/add-class-data-form.component';
import { DisplayScheduleReadOnly } from './display-schedule-read-only/display-schedule-read-only.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './shared/services/auth-guard.service';

export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'display-schedule-read-only', component: DisplayScheduleReadOnly },
  { path: 'display-class-data', component: DisplayClassDataComponent, canActivate: [AuthGuardService]},
  { path: 'add-class-data-form', component: AddClassDataFormComponent, canActivate: [AuthGuardService] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
