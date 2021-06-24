import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { DisplayClassDataComponent } from './display-class-data/display-class-data.component';
import { AddClassDataComponent } from './add-class-data/add-class-data.component';
import { AddClassDataFormComponent } from './add-class-data-form/add-class-data-form.component';
import { DisplayScheduleReadOnly } from './display-schedule-read-only/display-schedule-read-only.component';

import ClassService from './shared/services/lesson.service';
import TeacherService from './shared/services/teacher.service';
import SubjectService from './shared/services/subject.service';
import ClassroomService from './shared/services/classroom.service';
import CourseService from './shared/services/course.service';

import { MatSliderModule } from '@angular/material/slider';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';

import { TimePickerModule } from '@syncfusion/ej2-angular-calendars';

import { ButtonModule } from '@syncfusion/ej2-angular-buttons';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    AddClassDataComponent,
    DisplayClassDataComponent,
    AddClassDataFormComponent,
    DisplayScheduleReadOnly
  ],

  imports: [
    ButtonModule,
    TimePickerModule,
    DropDownListModule,
    ScheduleModule,
    NgxMaterialTimepickerModule,
    MatSliderModule,
    NoopAnimationsModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'add-class-data', component: AddClassDataComponent },
      { path: 'display-class-data', component: DisplayClassDataComponent },
      { path: 'add-class-data-form', component: AddClassDataFormComponent },
      { path: 'display-schedule-read-only', component: DisplayScheduleReadOnly }
    ])
  ],
  providers: [ClassService, TeacherService, SubjectService, ClassroomService, CourseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
