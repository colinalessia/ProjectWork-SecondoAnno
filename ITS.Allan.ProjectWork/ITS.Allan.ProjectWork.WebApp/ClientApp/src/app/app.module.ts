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
import ClassService from './shared/services/class.service';
import TeacherService from './shared/services/teacher.service';
import SubjectService from './shared/services/subject.service';
import ClassroomService from './shared/services/classroom.service';
import CourseService from './shared/services/course.service';

import { MatSliderModule } from '@angular/material/slider';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    AddClassDataComponent,
    DisplayClassDataComponent,
  ],
  imports: [
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
    ])
  ],
  providers: [ClassService, TeacherService, SubjectService, ClassroomService, CourseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
