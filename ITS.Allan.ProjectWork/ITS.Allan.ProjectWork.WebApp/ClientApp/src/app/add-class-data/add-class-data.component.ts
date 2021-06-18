//modules
import { Component, ViewEncapsulation } from '@angular/core';
import { createElement } from '@syncfusion/ej2-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { DateTimePicker } from '@syncfusion/ej2-calendars';
import {
  EventSettingsModel, ScheduleComponent, EventRenderedArgs, DayService, WeekService,
  WorkWeekService, MonthService, AgendaService, PopupOpenEventArgs, ResizeService, DragAndDropService, PopupCloseEventArgs
} from '@syncfusion/ej2-angular-schedule';
import { L10n } from '@syncfusion/ej2-base';

//models
import Lesson from '../shared/models/Lesson';
import Teacher from '../shared/models/Teacher';

//services
import TeacherService from '../shared/services/teacher.service';
import SubjectService from '../shared/services/subject.service';
import ClassroomService from '../shared/services/classroom.service';
import CourseService from '../shared/services/course.service';
import LessonService from '../shared/services/lesson.service';
import Subject from '../shared/models/Subject';
import Classroom from '../shared/models/Classroom';
import Course from '../shared/models/Course';

L10n.load({
  'en-US': {
    'schedule': {
      'saveButton': 'Add',
      'cancelButton': 'Close',
      'deleteButton': 'Remove',
      'newEvent': 'Add Lesson',
    },
  }
});

@Component({
  selector: 'control-content',
  templateUrl: './add-class-data.component.html',
  styles: [`.custom-field-row, .custom-field-row1, .custom-field-row2, .custom-field-row3, .start-time, .end-time {
        margin-bottom: 20px;
    }`],
  encapsulation: ViewEncapsulation.None,
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, ResizeService, DragAndDropService]
})

export class AddClassDataComponent {
  public lessons: Array<Lesson>;
  public teachers: Array<Teacher>;
  public subjects: Array<Subject>;
  public classrooms: Array<Classroom>;
  public courses: Array<Course>;

  public dropDownTeacher: { [key: string]: Object }[] = [
    { Name: '', Id :'' }
  ];
  public dropDownSubject: { [key: string]: Object }[] = [
    { Name: '', Id: '' }
  ];
  public dropDownClassroom: { [key: string]: Object }[] = [
    { Name: '', Id: '' }
  ];
  public dropDownCourse: { [key: string]: Object }[] = [
    { Name: '', Id: '' }
  ];
  public selectedDate: Date = new Date(2018, 1, 15);
  public views: Array<string> = ['Day', 'Week', 'WorkWeek', 'Month'];
  public eventSettings: EventSettingsModel;
  //@ViewChild('scheduleObj')
  public scheduleObj: ScheduleComponent;
  public showQuickInfo: Boolean = false

  public drowDownListTeachers: DropDownList;
  public drowDownListSubjects: DropDownList;
  public drowDownListCourses: DropDownList;
  public drowDownListClassrooms: DropDownList;

  public teacherFields: Object = { text: 'TeacherText', value: 'TeacherText' };
  public subjectFields: Object = { text: 'SubjectText', value: 'SubjectText' };
  public classroomFields: Object = { text: 'ClassroomText', value: 'ClassroomText' };
  public courseFields: Object = { text: 'CourseText', value: 'CourseText' };

  constructor(
    private lessonService: LessonService,
    private teacherService: TeacherService,
    private subjectService: SubjectService,
    private classroomService: ClassroomService,
    private courseService: CourseService) {

    this.lessonService.getAll().subscribe(data => {
      this.lessons = data;
      for (let lesson of this.lessons) {
        //GET teacher by id
        this.teacherService.get(lesson.idTeacher.toString()).subscribe(data => {
          lesson.teacherName = data.firstName + " " + data.lastName;
        });
        //GET subject by id
        this.subjectService.get(lesson.idSubject.toString()).subscribe(data => {
          lesson.subjectName = data.subjectName;
        });
        //GET classroom by id
        this.classroomService.get(lesson.idClassroom.toString()).subscribe(data => {
          lesson.classroomName = data.classroomName;
        });
        //GET course by id
        this.courseService.get(lesson.idCourse.toString()).subscribe(data => {
          lesson.courseName = data.courseName;
        });
      }
      this.eventSettings = {
        dataSource: this.lessons
        

        
      };
      console.log(this.eventSettings);

      this.teacherService.getAll().subscribe(data => {
        this.teachers = data;

        for (let teacher of this.teachers) {
          this.dropDownTeacher.push({
            Name: teacher.firstName + " " + teacher.lastName, Id : teacher.idTeacher.toString()
          });
        }
        
      });

      this.subjectService.getAll().subscribe(data => {
        this.subjects = data;

        for (let subject of this.subjects) {
          this.dropDownSubject.push({
            Name: subject.subjectName, Id: subject.idSubject.toString()
          });
        }

      });

      this.classroomService.getAll().subscribe(data => {
        this.classrooms = data;

        for (let classroom of this.classrooms) {
          this.dropDownClassroom.push({
            Name: classroom.classroomName, Id: classroom.idClassroom.toString()
          });
        }

      });

      this.courseService.getAll().subscribe(data => {
        this.courses = data;

        for (let course of this.courses) {
          this.dropDownCourse.push({
            Name: course.courseName, Id: course.idCourse.toString()
          });
        }

      });

    });
  }

  oneventRendered(args: EventRenderedArgs): void {
    let categoryColor: string = args.data.CategoryColor as string;
    if (!args.element || !categoryColor) {
      return;
    }
    if (this.scheduleObj.currentView === 'Agenda') {
      (args.element.firstChild as HTMLElement).style.borderLeftColor = categoryColor;
    } else {
      args.element.style.backgroundColor = categoryColor;
    }
  }

  onPopupClose(args: PopupCloseEventArgs): void {
    console.log(this.eventSettings);
  }

  onPopupOpen(args: PopupOpenEventArgs): void {

    if (args.type === 'Editor') {
      // Create required custom elements in initial time
      if (!args.element.querySelector('.custom-field-row')) {
        let row: HTMLElement = createElement('div', { className: 'custom-field-row' });
        let formElement: HTMLElement = <HTMLElement>args.element.querySelector('.e-schedule-form');
        formElement.firstChild.insertBefore(row, args.element.querySelector('.e-title-location-row'));
        let container: HTMLElement = createElement('div', { className: 'custom-field-container' });
        let inputEle: HTMLInputElement = createElement('input', {
          className: 'e-field', attrs: { name: 'Teacher' }
        }) as HTMLInputElement;
        container.appendChild(inputEle);
        row.appendChild(container);

        this.drowDownListTeachers = new DropDownList({
          
          dataSource: this.dropDownTeacher.slice(1),

          fields:
          {
            text: 'Name',
            value: 'Name'
          },
          value: (args.data as { [key: string]: Object }).EventType as string,
          floatLabelType: 'Auto',
          placeholder: 'Teacher',
          allowFiltering: true,
          filterBarPlaceholder: 'Search',

        });

        this.drowDownListTeachers.appendTo(inputEle);
        inputEle.setAttribute('name', 'teacherName');
      }
      if (!args.element.querySelector('.custom-field-row1')) {
        let row: HTMLElement = createElement('div', { className: 'custom-field-row1' });
        let formElement: HTMLElement = <HTMLElement>args.element.querySelector('.e-schedule-form');
        formElement.firstChild.insertBefore(row, args.element.querySelector('.e-title-location-row'));
        let container: HTMLElement = createElement('div', { className: 'custom-field-container1' });
        let inputEle: HTMLInputElement = createElement('input', {
          className: 'e-field', attrs: { name: 'Subject' }
        }) as HTMLInputElement;
        container.appendChild(inputEle);
        row.appendChild(container);

        this.drowDownListSubjects = new DropDownList({

          dataSource: this.dropDownSubject.slice(1),

          fields:
          {
            text: 'Name',
            value: 'Name',
          },
          value: (args.data as { [key: string]: Object }).EventType as string,
          floatLabelType: 'Auto',
          placeholder: 'Subject',
          allowFiltering: true,
          filterBarPlaceholder: 'Search',

        });
        console.log(this.drowDownListSubjects.value);

        this.drowDownListSubjects.appendTo(inputEle);
        inputEle.setAttribute('name', 'subjectName'); //da conflitto con subject -> title
      }
      
      if (!args.element.querySelector('.custom-field-row2')) {
        let row: HTMLElement = createElement('div', { className: 'custom-field-row2' });
        let formElement: HTMLElement = <HTMLElement>args.element.querySelector('.e-schedule-form');
        formElement.firstChild.insertBefore(row, args.element.querySelector('.e-title-location-row'));
        let container: HTMLElement = createElement('div', { className: 'custom-field-container2' });
        let inputEle: HTMLInputElement = createElement('input', {
          className: 'e-field', attrs: { name: 'Classroom' }
        }) as HTMLInputElement;
        container.appendChild(inputEle);
        row.appendChild(container);

        this.drowDownListClassrooms = new DropDownList({

          dataSource: this.dropDownClassroom.slice(1),

          fields:
          {
            text: 'Name',
            value: 'Name'
          },
          value: (args.data as { [key: string]: Object }).EventType as string,
          floatLabelType: 'Auto',
          placeholder: 'Classroom',
          allowFiltering: true,
          filterBarPlaceholder: 'Search',

        });

        this.drowDownListClassrooms.appendTo(inputEle);
        inputEle.setAttribute('name', 'classroomName');
      }
      if (!args.element.querySelector('.custom-field-row3')) {
        let row: HTMLElement = createElement('div', { className: 'custom-field-row3' });
        let formElement: HTMLElement = <HTMLElement>args.element.querySelector('.e-schedule-form');
        formElement.firstChild.insertBefore(row, args.element.querySelector('.e-title-location-row'));
        let container: HTMLElement = createElement('div', { className: 'custom-field-container3' });
        let inputEle: HTMLInputElement = createElement('input', {
          className: 'e-field', attrs: { name: 'Course' }
        }) as HTMLInputElement;
        container.appendChild(inputEle);
        row.appendChild(container);
        this.drowDownListCourses = new DropDownList({
          dataSource: this.dropDownCourse.slice(1),

          fields:
          {
            text: 'Name',
            value: 'Name'
          },
          value: (args.data as { [key: string]: Object }).EventType as string,
          floatLabelType: 'Auto',
          placeholder: 'Course',
          allowFiltering: true,
          filterBarPlaceholder: 'Search',

        });

        this.drowDownListCourses.appendTo(inputEle);
        inputEle.setAttribute('name', 'courseName');
      }
      
      
    }
  }
}
