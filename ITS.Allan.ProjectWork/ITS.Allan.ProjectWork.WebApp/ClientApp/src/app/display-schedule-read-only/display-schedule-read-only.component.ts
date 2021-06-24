//modules
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  EventSettingsModel, ScheduleComponent, DayService, WeekService,
  WorkWeekService, MonthService, AgendaService, ResizeService, DragAndDropService, RenderCellEventArgs, View
} from '@syncfusion/ej2-angular-schedule';
import { Internationalization } from '@syncfusion/ej2-base';

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


@Component({
  selector: 'control-content',
  templateUrl: './display-schedule-read-only.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, ResizeService, DragAndDropService]
})

export class DisplayScheduleReadOnly implements OnInit{
  public lessons: Array<Lesson>;
  public teachers: Array<Teacher>;
  public subjects: Array<Subject>;
  public classrooms: Array<Classroom>;
  public courses: Array<Course>;

  public currentDate = new Date();
  public selectedDate: Date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDay());
  public views: Array<string> = ['Day', 'Week', 'WorkWeek', 'Month'];
  public eventSettings: EventSettingsModel;
  public currentView: View = 'WorkWeek';
  public showQuickInfo: Boolean = false;

  // Flag variable to set up the delay to the schedule tooltip
  public isTootipDelayApplied: boolean = false;

  @ViewChild('scheduleObj', { static: true })
  public scheduleObj: ScheduleComponent;
  public instance: Internationalization = new Internationalization();



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
                  enableTooltip: false 
                };
              });
            });
          });
        }); 
      }
    });
    this.teacherService.getAll().subscribe(data => {
      this.teachers = data;
    });


    this.subjectService.getAll().subscribe(data => {
      this.subjects = data;

    });

    this.classroomService.getAll().subscribe(data => {
      this.classrooms = data;


    });

    this.courseService.getAll().subscribe(data => {
      this.courses = data;


    });
        
}
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

}
