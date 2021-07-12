import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  TimelineViewsService, AgendaService, GroupModel, EventSettingsModel, ResizeService, DragAndDropService,
  PopupOpenEventArgs, ScheduleComponent, PopupCloseEventArgs, TimeScaleModel, EventRenderedArgs, ActionEventArgs, Timezone, RenderCellEventArgs
} from '@syncfusion/ej2-angular-schedule';

import { FormGroup } from '@angular/forms';
import { createElement, extend } from '@syncfusion/ej2-base';
import { DropDownList } from '@syncfusion/ej2-angular-dropdowns';
import { isNullOrUndefined } from 'util';
import { L10n, Internationalization } from '@syncfusion/ej2-base';

//models
import Lesson from '../shared/models/Lesson';
import Teacher from '../shared/models/Teacher';
import Subject from '../shared/models/Subject';
import Classroom from '../shared/models/Classroom';
import Course from '../shared/models/Course';
import Building from '../shared/models/Building';
import Floor from '../shared/models/Floor';

//services
import TeacherService from '../shared/services/teacher.service';
import SubjectService from '../shared/services/subject.service';
import ClassroomService from '../shared/services/classroom.service';
import CourseService from '../shared/services/course.service';
import LessonService from '../shared/services/lesson.service';
import BuildingService from '../shared/services/building.service';
import FloorService from '../shared/services/floor.service';
import { DateTimePickerComponent } from '@syncfusion/ej2-angular-calendars';


L10n.load({
  'en-US': {
    'schedule': {
      'cancelButton': 'Close',
      'deleteButton': 'Remove',
      'newEvent': 'Add Lesson',
      'editEvent': 'Edit Lesson'
    },
  }
});
@Component({
  selector: 'app-root',
  templateUrl: 'display-class-data.component.html',
  styleUrls: ['./display-class-data.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [TimelineViewsService, AgendaService, ResizeService, DragAndDropService]
})

export class DisplayClassDataComponent implements OnInit {
  public lessons: Array<Lesson>;
  public teachers: Array<Teacher>;
  public subjects: Array<Subject>;
  public classrooms: Array<Classroom>;
  public courses: Array<Course>;
  public buildings: Array<Building>;
  public floors: Array<Floor>;

  public drowDownListTeachers: DropDownList;
  public drowDownListSubjects: DropDownList;
  public drowDownListCourses: DropDownList;

  // Flag variable to set up the delay to the schedule tooltip
  public isTootipDelayApplied: boolean = false;

  @ViewChild('scheduleObj', { static: true })
  public scheduleObj: ScheduleComponent;
  public instance: Internationalization = new Internationalization();
  @ViewChild('date', { static: true })
  public myDate: DateTimePickerComponent;

  public timeScale: TimeScaleModel = {
    enable: true,
    interval: 60,
    slotCount: 1
  };

  public data: object[] = [{
    IdLesson: 0,
    IdSubject: 0,
    IdTeacher: 0,
    IdCourse: 0,
    Subject: "",
    Teacher: "",
    Classroom: "",
    Course: "",
    StartTime: "",
    EndTime: "",
    Building: 0
  }];
  public dropDownTeacher: { [key: string]: Object }[] = [
    { Name: '', Id: '' }
  ];
  public dropDownSubject: { [key: string]: Object }[] = [
    { Name: '', Id: '' }
  ];
  public dropDownCourse: { [key: string]: Object }[] = [
    { Name: '', Id: '' }
  ];

  public eventSettings: EventSettingsModel;
  public currentDate = new Date();
  public selectedDate: Date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDay());

  public group: GroupModel = {
    resources: ['Buildings', 'Classrooms']
  };

  @ViewChild('orderForm', { static: true })
  public orderForm: FormGroup;
  public orderData: Object = [];

  public buildingDataSource: resourceObject[] = [];
  public classroomDataSource: resourceObject[] = [];
  public courseDataSource: resourceObject[] = [];


  public allowMultiple: Boolean = false;
  public showQuickInfo: Boolean = false;

  public enablePersistence: Boolean = true;
  constructor(
    private lessonService: LessonService,
    private teacherService: TeacherService,
    private subjectService: SubjectService,
    private classroomService: ClassroomService,
    private courseService: CourseService,
    private buildingService: BuildingService,
    private floorService: FloorService) {


  }
  ngOnInit() {
    console.log(this.selectedDate);
    this.lessonService.getAll().subscribe(res => {
      this.lessons = res;

      for (let lesson of this.lessons) {
        //GET teacher by id
        this.teacherService.get(lesson.idTeacher.toString()).subscribe(data => {
          lesson.teacherName = data.firstName + " " + data.lastName;
          //GET subject by id
          this.subjectService.get(lesson.idSubject.toString()).subscribe(data => {
            lesson.subjectName = data.subjectName;

            //GET course by id
            this.courseService.get(lesson.idCourse.toString()).subscribe(data => {
              lesson.courseName = data.courseName;
              
              //GET classroom by id
              this.classroomService.get(lesson.idClassroom.toString()).subscribe(data => {

                let classroom = data
                this.floorService.get(classroom.idFloor.toString()).subscribe(data => {
                  let building = data.idBuilding
                  //aggiunto il +1 nelle aule e negli edifici per un bug del id 0
                  this.data.push({
                    Id: lesson.idLesson,
                    IdSubject: lesson.idSubject,
                    IdTeacher: lesson.idTeacher,
                    IdCourse: lesson.idCourse,
                    Subject: lesson.subjectName,
                    Teacher: lesson.teacherName,
                    Classroom: lesson.idClassroom + 1,
                    Course: lesson.courseName,
                    StartTime: lesson.startTime,
                    EndTime: lesson.endTime,
                    Building: building + 1
                  })

                  this.eventSettings = {
                    dataSource: this.data.slice(1),
                    enableTooltip: false,
                    //riempe totalmente la cella
                    enableMaxHeight: true,
                    enableIndicator: false
                  };
                });
              });
            });
          });
        });
      }
    });
    //get all buildings
    this.buildingService.getAll().subscribe(data => {
      this.buildings = data;
      for (let building of this.buildings) {
        this.buildingDataSource.push({
          text: building.buildingName, id: building.idBuilding + 1, groupId: 0, color: ''
        });
      }
      console.log(this.buildingDataSource);
    });

    //get all teachers
    this.teacherService.getAll().subscribe(data => {
      this.teachers = data;
      for (let teacher of this.teachers) {
        this.dropDownTeacher.push({
          Name: teacher.firstName + " " + teacher.lastName, Id: teacher.idTeacher.toString()
        });
      }


    });

    //get all subjects
    this.subjectService.getAll().subscribe(data => {
      this.subjects = data;

      for (let subject of this.subjects) {

        this.dropDownSubject.push({
          Name: subject.subjectName, Id: subject.idSubject.toString()
        });
      }

    });

    //get all classrooms
    this.classroomService.getAll().subscribe(data => {
      this.classrooms = data;
      for (let classroom of this.classrooms) {
        //get floor by id
        this.floorService.get(classroom.idFloor.toString()).subscribe(data => {
          this.classroomDataSource.push({
            text: classroom.classroomName, id: classroom.idClassroom + 1, groupId: data.idBuilding + 1, color: ''
          });
        });
      }
      console.log(this.classroomDataSource);

    });

    //get all courses
    this.courseService.getAll().subscribe(data => {
      this.courses = data;

      for (let course of this.courses) {
        this.dropDownCourse.push({
          Name: course.courseName, Id: course.idCourse.toString()
        });
        this.courseDataSource.push({
          text: course.courseName, id: course.idCourse, color: this.getRandomColor(), groupId: 0
        });
      }

    });

  }
  //genera un colore casuale
  public getRandomColor(): string {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  //renderizza l'appuntamento con il colore appropriato in base al corso
  oneventRendered(args: EventRenderedArgs): void {

    for (let course of this.courseDataSource) {

      if (course.text == args.data.Course) {
        args.element.style.backgroundColor = course.color;
      }
    }
  }
  //formattazione delle date negli appuntamenti
  public getTimeString(value: Date): string {
    return this.instance.formatDate(value, { skeleton: 'hm' });
  }

  //BREAK TIME
  public onRenderCell(args: RenderCellEventArgs) {
    if (args.elementType === 'workCells' && args.date.getHours() === 13) {
      args.element.classList.add('e-lunch-hours');
    }
  }

  public isBreak(date: Date) {
    if (date.getHours() === 13) {
      return '<div class="e-break">Break Time</div>';
    }
  }



  //pop up open
  onPopupOpen(args: PopupOpenEventArgs): void {
    if (args.type === 'Editor') {

      
      if (!args.element.querySelector('.custom-field-row1')) {
        let row: HTMLElement = createElement('div', { className: 'custom-field-row1' });
        let formElement: HTMLElement = <HTMLElement>args.element.querySelector('.e-schedule-form');
        formElement.firstChild.insertBefore(row, args.element.querySelector('.e-title-location-row'));
        let container: HTMLElement = createElement('div', { className: 'custom-field-container1' });
        let inputEle: HTMLInputElement = createElement('input', {
          id: 'Subject',
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
          value: (args.data as { [key: string]: Object }).Subject as string,
          floatLabelType: 'Auto',
          placeholder: 'Subject',
          allowFiltering: true,
          filterBarPlaceholder: 'Search',

        });
        this.drowDownListSubjects.appendTo(inputEle);
      }

      if (!args.element.querySelector('.custom-field-row2')) {
        let row: HTMLElement = createElement('div', { className: 'custom-field-row2' });
        let formElement: HTMLElement = <HTMLElement>args.element.querySelector('.e-schedule-form');
        formElement.firstChild.insertBefore(row, args.element.querySelector('.e-title-location-row'));
        let container: HTMLElement = createElement('div', { className: 'custom-field-container2' });
        let inputEle: HTMLInputElement = createElement('input', {
          id: 'Teacher',
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
          value: (args.data as { [key: string]: Object }).Teacher as string,
          floatLabelType: 'Auto',
          placeholder: 'Teacher',
          allowFiltering: true,
          filterBarPlaceholder: 'Search',

        });

        this.drowDownListTeachers.appendTo(inputEle);
      }
      

      if (!args.element.querySelector('.custom-field-row3')) {
        let row: HTMLElement = createElement('div', { className: 'custom-field-row3' });
        let formElement: HTMLElement = <HTMLElement>args.element.querySelector('.e-schedule-form');
        formElement.firstChild.insertBefore(row, args.element.querySelector('.e-title-location-row'));
        let container: HTMLElement = createElement('div', { className: 'custom-field-container3' });
        let inputEle: HTMLInputElement = createElement('input', {
          id: 'Course',
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
          value: (args.data as { [key: string]: Object }).Course as string,
          floatLabelType: 'Auto',
          placeholder: 'Course',
          allowFiltering: true,
          filterBarPlaceholder: 'Search',

        });

        this.drowDownListCourses.appendTo(inputEle);
      }
      (args.element.querySelector(".e-start") as any).ej2_instances[0].step = "60";
      (args.element.querySelector(".e-end") as any).ej2_instances[0].step = "60";
    }
  }
  //pop up close
  onPopupClose(args: PopupCloseEventArgs): void {

    if (args.type === 'Editor' && !isNullOrUndefined(args.data)) {
      //Subject

      let subjectElement: HTMLInputElement = args.element.querySelector('#Subject') as HTMLInputElement;
      if (subjectElement) {
        console.log("subject entra: " + subjectElement.value);
        (<{ [key: string]: Object }>(args.data)).Subject = subjectElement.value;
      }
      //Teacher
      let teacherElement: HTMLInputElement = args.element.querySelector('#Teacher') as HTMLInputElement;
      if (teacherElement) {
        console.log("teacher entra: " + teacherElement.value);
        ((<{ [key: string]: Object }>(args.data)).Teacher as string) = teacherElement.value;
      }
      //Course
      let courseElement: HTMLInputElement = args.element.querySelector('#Course') as HTMLInputElement;
      if (courseElement) {
        console.log("course entra: " + courseElement.value);
        ((<{ [key: string]: Object }>(args.data)).Course as string) = courseElement.value;
      }
      //StartTime
      let startElement: HTMLInputElement = args.element.querySelector('#StartTime') as HTMLInputElement;
      if (startElement) {
        console.log("start entra: " + startElement.value);
        (<{ [key: string]: Object }>(args.data)).StartTime = startElement.value;
      }
      //EndTime
      let endElement: HTMLInputElement = args.element.querySelector('#EndTime') as HTMLInputElement;
      if (endElement) {
        console.log("end entra: " + endElement.value);
        (<{ [key: string]: Object }>(args.data)).EndTime = endElement.value;
      }
      console.log(this.eventSettings);
    }
  }
  
  //POST PUT DELETE FUNZIONANTI
  onActionBegin(args: ActionEventArgs): void {

    //ADD
    if (args.requestType === "eventCreate") {
      console.log("EVENT CREATE");
      let subjectId, teacherId, classroomId, courseId;

      //SUBJECT
      let subjectElement = document.querySelector('#Subject') as HTMLInputElement;
      console.log("subject name: " + subjectElement.value);
      subjectId = this.dropDownSubject.find(subject => subject.Name === subjectElement.value).Id;
      console.log("subject id: " + subjectId);


      //TEACHER
      let teacherElement = document.querySelector('#Teacher') as HTMLInputElement;
      console.log("teacher name: " + teacherElement.value);
      teacherId = this.dropDownTeacher.find(teacher => teacher.Name === teacherElement.value).Id;
      console.log("teacher id: " + teacherId);


      //CLASSROOM
      let classroomElement = document.querySelector('#Classroom') as HTMLInputElement;
      console.log("classroom name: " + classroomElement.value);
      classroomId = this.classroomDataSource.find(classroom => classroom.text === classroomElement.value).id - 1;
      console.log("classroom id: " + classroomId);


      //COURSE
      let courseElement = document.querySelector('#Course') as HTMLInputElement;
      console.log("course name: " + courseElement.value);
      courseId = this.dropDownCourse.find(course => course.Name === courseElement.value).Id;
      console.log("course id: " + courseId);


      let startElement: HTMLInputElement = document.querySelector('#StartTime') as HTMLInputElement;
      let endElement: HTMLInputElement = document.querySelector('#EndTime') as HTMLInputElement;



      console.log("start time: " + startElement.value);
      console.log("end time: " + endElement.value);


      let timezone: Timezone = new Timezone();

      let newStartDate = new Date(startElement.value);
      let startDate = timezone.removeLocalOffset(newStartDate);

      let newEndDate = new Date(endElement.value);
      let EndDate = timezone.removeLocalOffset(newEndDate);

      let lesson = new Lesson();

      lesson.idSubject = subjectId;
      lesson.idTeacher = teacherId;
      lesson.idClassroom = classroomId;
      lesson.idCourse = courseId;

      lesson.startTime = new Date(startDate);
      lesson.endTime = new Date(EndDate);


      this.lessonService.save(lesson).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      )

    }

    //EDIT

    if (args.requestType === "eventChange") {



      let lesson = new Lesson();

      for (let data of args.changedRecords) {
        lesson.idLesson = data.Id;
      }

      let subjectId, teacherId, classroomId, courseId;

      //SUBJECT

      let subjectElement = document.querySelector('#Subject') as HTMLInputElement;
      console.log("subject name: " + subjectElement.value);
      subjectId = this.dropDownSubject.find(subject => subject.Name === subjectElement.value).Id
      console.log("subject id: " + subjectId);


      //TEACHER
      let teacherElement = document.querySelector('#Teacher') as HTMLInputElement;
      console.log("teacher name: " + teacherElement.value);
      teacherId = this.dropDownTeacher.find(teacher => teacher.Name === teacherElement.value).Id;
      console.log("teacher id: " + teacherId);


      //CLASSROOM
      let classroomElement = document.querySelector('#Classroom') as HTMLInputElement;
      console.log("classroom name: " + classroomElement.value);
      classroomId = this.classroomDataSource.find(classroom => classroom.text === classroomElement.value).id - 1;
      console.log("classroom id: " + classroomId);


      //COURSE
      let courseElement = document.querySelector('#Course') as HTMLInputElement;
      console.log("course name: " + courseElement.value);
      courseId = this.dropDownCourse.find(course => course.Name === courseElement.value).Id;
      console.log("course id: " + courseId);


      let startElement: HTMLInputElement = document.querySelector('#StartTime') as HTMLInputElement;
      let endElement: HTMLInputElement = document.querySelector('#EndTime') as HTMLInputElement;

      console.log("start time: " + startElement.value);
      console.log("end time: " + endElement.value);


      let timezone: Timezone = new Timezone();

      let newStartDate = new Date(startElement.value);
      let startDate = timezone.removeLocalOffset(newStartDate);

      let newEndDate = new Date(endElement.value);
      let EndDate = timezone.removeLocalOffset(newEndDate);

      lesson.idSubject = subjectId;
      lesson.idTeacher = teacherId;
      lesson.idClassroom = classroomId;
      lesson.idCourse = courseId;

      lesson.startTime = new Date(startDate);
      lesson.endTime = new Date(EndDate);


      this.lessonService.save(lesson).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      )
    }
    if (args.requestType === "eventRemove") {

      let id;

      for (let data of args.deletedRecords) {
        console.log(data);
        id = data.Id;
      }

      this.lessonService.remove(id).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      )
    }
  }

}
interface resourceObject {
  text: string,
  id: number,
  groupId: number;
  color: string;
}
