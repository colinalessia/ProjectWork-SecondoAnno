//modules
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { DateTimePicker } from '@syncfusion/ej2-calendars';
import {
  EventSettingsModel, ScheduleComponent, EventRenderedArgs, DayService, WeekService,
  WorkWeekService, MonthService, AgendaService, PopupOpenEventArgs, ResizeService, DragAndDropService, PopupCloseEventArgs, ActionEventArgs, Timezone, RenderCellEventArgs, View
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
import { isNullOrUndefined } from 'util';

L10n.load({
  'en-US': {
    'schedule': {
      'saveButton': 'Add',
      'cancelButton': 'Close',
      'deleteButton': 'Remove',
      'newEvent': 'Add Lesson',
      'editEvent': 'Edit Lesson'
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

export class AddClassDataComponent implements OnInit{
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
  public dropDownSubject2: { [key: string]: Object }[] = [
    { Name: '', Id: '' }
  ];
  public dropDownClassroom: { [key: string]: Object }[] = [
    { Name: '', Id: '' }
  ];
  public dropDownCourse: { [key: string]: Object }[] = [
    { Name: '', Id: '' }
  ];
  public currentDate = new Date();
  public selectedDate: Date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDay());
  public views: Array<string> = ['Day', 'Week', 'WorkWeek', 'Month'];
  public eventSettings: EventSettingsModel;
  public currentView: View = 'WorkWeek';
  public showQuickInfo: Boolean = false

  public drowDownListTeachers: DropDownList;
  public drowDownListSubjects: DropDownList;
  public drowDownListCourses: DropDownList;
  public drowDownListClassrooms: DropDownList;

  // Flag variable to set up the delay to the schedule tooltip
  public isTootipDelayApplied: boolean = false;

  @ViewChild('scheduleObj', { static: true })
  public scheduleObj: ScheduleComponent;

  public data: object[] = [{
    IdLesson: 0,
    IdSubject: 0,
    IdTeacher: 0,
    IdClassroom: 0,
    IdCourse: 0,
    Subject: "",
    Teacher: "",
    Classroom: "",
    Course: "",
    StartTime: "",
    EndTime: "",
  }];


  constructor(
    private lessonService: LessonService,
    private teacherService: TeacherService,
    private subjectService: SubjectService,
    private classroomService: ClassroomService,
    private courseService: CourseService) {


  }
ngOnInit() {

    this.lessonService.getAll().subscribe(res => {
      this.lessons = res;

      for (let lesson of this.lessons) {
        //GET teacher by id
        this.teacherService.get(lesson.idTeacher.toString()).subscribe(data => {
          lesson.teacherName = data.firstName + " " + data.lastName;
          //GET subject by id
          this.subjectService.get(lesson.idSubject.toString()).subscribe(data => {
            lesson.subjectName = data.subjectName;
            //GET classroom by id
            this.classroomService.get(lesson.idClassroom.toString()).subscribe(data => {
              lesson.classroomName = data.classroomName;
              //GET course by id
              this.courseService.get(lesson.idCourse.toString()).subscribe(data => {
                lesson.courseName = data.courseName;

                this.data.push({
                  Id: lesson.idLesson,
                  IdSubject: lesson.idSubject,
                  IdTeacher: lesson.idTeacher,
                  IdClassroom: lesson.idClassroom,
                  IdCourse: lesson.idCourse,
                  Subject: lesson.subjectName,
                  Teacher: lesson.teacherName,
                  Classroom: lesson.classroomName,
                  Course: lesson.courseName,
                  StartTime: lesson.startTime,
                  EndTime: lesson.endTime
                })

                this.eventSettings = {
                  dataSource: this.data.slice(1),
                  enableTooltip: true 
                };
              });
            });
          });
        }); 
      }
    });
    this.teacherService.getAll().subscribe(data => {
      this.teachers = data;
      for (let teacher of this.teachers) {
        this.dropDownTeacher.push({
          Name: teacher.firstName + " " + teacher.lastName, Id: teacher.idTeacher.toString()
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

  //TOOLTIP
  // Set base values for Tooltip at moment of creation
  onDataBound() {
    if (!this.isTootipDelayApplied) {
      let tooltipObj = (this.scheduleObj.element as any).ej2_instances[2];
      // Disable the tooltip to follow the mouse pointer position
      tooltipObj.mouseTrail = false;
      // Setting tooltip open delay
      tooltipObj.openDelay = 1000;
      // Setting the position to the tooltip
      tooltipObj.position = "TopCenter";
      this.isTootipDelayApplied = true;
    }
  }


  onActionBegin(args: ActionEventArgs): void {
    if (args.requestType === "eventCreate") {
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
        classroomId = this.dropDownClassroom.find(classroom => classroom.Name === classroomElement.value).Id;
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



    if (args.requestType === "eventChange") {
      console.log("This will triggered after edit the appointments.");
      console.log("It will triggered when new event is rendered on the scheduler user interface.");

      console.log("This will triggered after edit the appointments.");
      console.log("records:" + args.changedRecords);
      console.log("data:" + args.data);
      console.log("items:" + args.items);
      console.log("name:" + args.name);



      let lesson = new Lesson();

      for (let data of args.changedRecords) {
        lesson.idLesson = data.Id;
      }

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
      classroomId = this.dropDownClassroom.find(classroom => classroom.Name === classroomElement.value).Id;
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
      console.log("This will triggered after delete the appointments");
      console.log("It will triggered when new event is rendered on the scheduler user interface.");

      console.log("This will triggered after edit the appointments.");
      console.log("records:" + args.deletedRecords);
      console.log("data:" + args.data);
      console.log("items:" + args.items);
      console.log("name:" + args.name);

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
      
  onPopupOpen(args: PopupOpenEventArgs): void {
    if (args.type === 'Editor') {
      //Subject
      let subjectElement: HTMLInputElement = args.element.querySelector('#Subject') as HTMLInputElement;
      
      if (!subjectElement.classList.contains('e-dropdownlist')) {
        console.log(this.dropDownSubject.slice(1));
        let dropDownListObject: DropDownList = new DropDownList({
          placeholder: 'Choose subject',
          value: ((<{ [key: string]: Object }>(args.data)).Subject as string),
          dataSource: this.dropDownSubject.slice(1),
          
          fields:
          {

            text: 'Name',
            value: 'Name'
          },
          allowFiltering: true,
          filterBarPlaceholder: 'Search'
        });
        dropDownListObject.appendTo(subjectElement);
      }
      //Teacher
      let teacherElement: HTMLInputElement = args.element.querySelector('#Teacher') as HTMLInputElement;
      if (!teacherElement.classList.contains('e-dropdownlist')) {
        let dropDownListObject: DropDownList = new DropDownList({
          placeholder: 'Choose teacher',
          value: ((<{ [key: string]: Object }>(args.data)).Teacher as string),
          dataSource: this.dropDownTeacher.slice(1),
          fields:
          {
            text: 'Name',
            value: 'Name'
          },
          allowFiltering: true,
          filterBarPlaceholder: 'Search'
        });
        dropDownListObject.appendTo(teacherElement);
      }
      //Classroom
      let classroomElement: HTMLInputElement = args.element.querySelector('#Classroom') as HTMLInputElement;
      if (!classroomElement.classList.contains('e-dropdownlist')) {
        let dropDownListObject: DropDownList = new DropDownList({
          placeholder: 'Choose classroom',
          value: ((<{ [key: string]: Object }>(args.data)).Classroom as string),
          dataSource: this.dropDownClassroom.slice(1),
          fields:
          {
            text: 'Name',
            value: 'Name'
          },
          allowFiltering: true,
          filterBarPlaceholder: 'Search'
        });
        dropDownListObject.appendTo(classroomElement);
      }
      //Teacher
      let courseElement: HTMLInputElement = args.element.querySelector('#Course') as HTMLInputElement;
      if (!courseElement.classList.contains('e-dropdownlist')) {
        let dropDownListObject: DropDownList = new DropDownList({
          
          placeholder: 'Choose course',
          value: ((<{ [key: string]: Object }>(args.data)).Course as string),
          dataSource: this.dropDownCourse.slice(1),
          fields:
          {
            text: 'Name',
            value: 'Name'
          },
          allowFiltering: true,
          filterBarPlaceholder: 'Search'
        });
        dropDownListObject.appendTo(courseElement);
      }
      let startElement: HTMLInputElement = args.element.querySelector('#StartTime') as HTMLInputElement;
      if (!startElement.classList.contains('e-datetimepicker')) {
        startElement.value = (<{ [key: string]: Object }>(args.data)).StartTime as string;
        new DateTimePicker({ value: new Date(startElement.value) || new Date() }, startElement);
      }
      let endElement: HTMLInputElement = args.element.querySelector('#EndTime') as HTMLInputElement;
      if (!endElement.classList.contains('e-datetimepicker')) {
        endElement.value = (<{ [key: string]: Object }>(args.data)).EndTime as string;
        new DateTimePicker({ value: new Date(endElement.value) || new Date() }, endElement);
      }
    }
  }
  onPopupClose(args: PopupCloseEventArgs): void {

    if (args.type === 'Editor' && !isNullOrUndefined(args.data)) {
      //Subject
      let subjectElement: HTMLInputElement = args.element.querySelector('#Subject') as HTMLInputElement;
      if (subjectElement) {
        (<{ [key: string]: Object }>(args.data)).Subject = subjectElement.value;
      }
      //Teacher
      let teacherElement: HTMLInputElement = args.element.querySelector('#Teacher') as HTMLInputElement;
      if (teacherElement) {
        ((<{ [key: string]: Object }>(args.data)).Teacher as string) = teacherElement.value;
      }
      //Classroom
      let classroomElement: HTMLInputElement = args.element.querySelector('#Classroom') as HTMLInputElement;
      if (classroomElement) {
        ((<{ [key: string]: Object }>(args.data)).Classroom as string) = classroomElement.value;
      }
      //Course
      let courseElement: HTMLInputElement = args.element.querySelector('#Course') as HTMLInputElement;
      if (courseElement) {
        ((<{ [key: string]: Object }>(args.data)).Course as string) = courseElement.value;
      }
      let startElement: HTMLInputElement = args.element.querySelector('#StartTime') as HTMLInputElement;
      if (startElement) {
        (<{ [key: string]: Object }>(args.data)).StartTime = startElement.value;
      }
      let endElement: HTMLInputElement = args.element.querySelector('#EndTime') as HTMLInputElement;
      if (endElement) {
        (<{ [key: string]: Object }>(args.data)).EndTime = endElement.value;
      }
    }
  }
}
