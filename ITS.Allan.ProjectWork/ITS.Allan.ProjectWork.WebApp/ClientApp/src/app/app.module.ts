
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { DisplayClassDataComponent } from './display-class-data/display-class-data.component';
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

import { DatePickerAllModule, TimePickerAllModule, DateTimePickerAllModule } from '@syncfusion/ej2-angular-calendars';

import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import BuildingService from './shared/services/building.service';
import FloorService from './shared/services/floor.service';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    DisplayClassDataComponent,
    AddClassDataFormComponent,
    DisplayScheduleReadOnly
  ],

  imports: [
    DateTimePickerAllModule,
    TimePickerAllModule,
    DatePickerAllModule,
    ButtonModule,
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
      { path: 'display-class-data', component: DisplayClassDataComponent },
      { path: 'add-class-data-form', component: AddClassDataFormComponent },
      { path: 'display-schedule-read-only', component: DisplayScheduleReadOnly }
    ])
  ],
  providers: [ClassService, TeacherService, SubjectService, ClassroomService, CourseService, BuildingService, FloorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
