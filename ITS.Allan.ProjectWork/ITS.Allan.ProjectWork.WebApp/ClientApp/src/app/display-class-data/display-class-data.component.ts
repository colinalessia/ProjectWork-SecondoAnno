//modules
import { Component, OnInit } from '@angular/core';

//models
import Class from '../shared/models/Class';

//services
import ClassService from '../shared/services/class.service';
import TeacherService from '../shared/services/teacher.service';
import SubjectService from '../shared/services/subject.service';
import ClassroomService from '../shared/services/classroom.service';
import CourseService from '../shared/services/course.service';


@Component({
  selector: 'app-display-class-data',
  templateUrl: './display-class-data.component.html'
})
export class DisplayClassDataComponent implements OnInit{
  classes: Array<Class>;

  constructor(
    private classService: ClassService,
    private teacherService: TeacherService,
    private subjectService: SubjectService,
    private classroomService: ClassroomService,
    private courseService: CourseService) {
    
  }


  ngOnInit(): void {
    this.classService.getAll().subscribe(data => {
      this.classes = data;
      for (let _class of this.classes) {
        //GET teacher by id
        this.teacherService.get(_class.idTeacher.toString()).subscribe(data => {
          _class.teacherName = data.firstName + " " + data.lastName;
        });
        //GET subject by id
        this.subjectService.get(_class.idSubject.toString()).subscribe(data => {
          _class.subjectName = data.subjectName;
        });
        //GET classroom by id
        this.classroomService.get(_class.idClassroom.toString()).subscribe(data => {
          _class.classroomName = data.classroomName;
        });
        //GET course by id
        this.courseService.get(_class.idCourse.toString()).subscribe(data => {
          _class.courseName = data.courseName;
        });
      }
    });
  }
}
