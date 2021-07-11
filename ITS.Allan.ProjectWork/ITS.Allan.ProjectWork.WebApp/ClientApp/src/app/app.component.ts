import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  DayService,
  WeekService,
  WorkWeekService,
  MonthService,
  AgendaService
} from '@syncfusion/ej2-angular-schedule';
import AuthService from './shared/services/auth.service';

@Component({
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService], 
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';


  constructor(private authService: AuthService,
    private router: Router) {
  }

  logout() {
    this.authService.logoutUser();
    this.router.navigate(['login']);
  }
 
}
