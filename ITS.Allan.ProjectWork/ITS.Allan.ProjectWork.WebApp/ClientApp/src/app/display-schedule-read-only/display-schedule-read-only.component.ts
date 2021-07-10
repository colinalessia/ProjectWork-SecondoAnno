import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  TimelineViewsService, AgendaService, GroupModel, EventSettingsModel, ResizeService, DragAndDropService,
  ScheduleComponent, TimeScaleModel, EventRenderedArgs, RenderCellEventArgs
} from '@syncfusion/ej2-angular-schedule';

import { FormGroup } from '@angular/forms';
import { Internationalization } from '@syncfusion/ej2-base';

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


@Component({
  selector: 'app-root',
  templateUrl: 'display-schedule-read-only.component.html',
  styleUrls: ['./display-schedule-read-only.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [TimelineViewsService, AgendaService, ResizeService, DragAndDropService]
})

export class DisplayScheduleReadOnly implements OnInit {
  public lessons: Array<Lesson>;
  public teachers: Array<Teacher>;
  public subjects: Array<Subject>;
  public classrooms: Array<Classroom>;
  public courses: Array<Course>;
  public buildings: Array<Building>;
  public floors: Array<Floor>;


  // Flag variable to set up the delay to the schedule tooltip
  public isTootipDelayApplied: boolean = false;

  @ViewChild('scheduleObj', { static: true })
  public scheduleObj: ScheduleComponent;
  public instance: Internationalization = new Internationalization();

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
              this.courseDataSource.push({
                text: data.courseName, id: data.idCourse, color: this.getRandomColor(), groupId: 0
              });
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
      return '<div class="e-break">Break Time</div>';
    }
  }

  public isBreak(date: Date) {
    if (date.getHours() === 13) {
      return '<div class="e-break">Break Time</div>';
    }
  }
}
interface resourceObject {
  text: string,
  id: number,
  groupId: number;
  color: string;
}
