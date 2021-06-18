//modules
import { Component, OnInit } from '@angular/core';

//models
import Lesson from '../shared/models/Lesson';

//services
import LessonService from '../shared/services/lesson.service';
import TeacherService from '../shared/services/teacher.service';
import SubjectService from '../shared/services/subject.service';
import ClassroomService from '../shared/services/classroom.service';
import CourseService from '../shared/services/course.service';


@Component({
  selector: 'app-display-class-data',
  templateUrl: './display-class-data.component.html'
})
export class DisplayClassDataComponent implements OnInit{
  lessons: Array<Lesson>;

  constructor(
    private lessonService: LessonService,
    private teacherService: TeacherService,
    private subjectService: SubjectService,
    private classroomService: ClassroomService,
    private courseService: CourseService) {
    
  }


  ngOnInit(): void {
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
    });
  }
}
