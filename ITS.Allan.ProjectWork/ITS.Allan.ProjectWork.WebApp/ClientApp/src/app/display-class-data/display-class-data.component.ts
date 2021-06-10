import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-display-class-data',
  templateUrl: './display-class-data.component.html'
})
export class DisplayClassDataComponent {
  public classes: Class[];


  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Class[]>(baseUrl + 'api/Classes').subscribe(result => {
      this.classes = result;

      this.classes.forEach(function (_class) {
        //GET teacher -> api/Teachers/IdTeacher
        http.get<Teacher>(baseUrl + 'api/Teachers/' + _class.idTeacher).subscribe(result => {
          let teacher = result;
          //problemi visualizzazione causa spazio con bootstrap
          _class.teacherName = teacher.firstName + " " + teacher.lastName;
        }, error => console.error(error));
        console.log(_class);

        //GET subject -> api/Subjects/IdSubject
        http.get<Subject>(baseUrl + 'api/Subjects/' + _class.idSubject).subscribe(result => {
          let subject = result;

          _class.subjectName = subject.subjectName;
        }, error => console.error(error));
        console.log(_class);

        //GET classroom -> api/Classrooms/IdClassroom
        http.get<Classroom>(baseUrl + 'api/Classrooms/' + _class.idClassroom).subscribe(result => {
          let classroom = result;

          _class.classroomName = classroom.classroomName;
        }, error => console.error(error));
        console.log(_class);

        //GET course -> api/Courses/IdCourse
        http.get<Course>(baseUrl + 'api/Courses/' + _class.idCourse).subscribe(result => {
          let course = result;

          _class.courseName = course.courseName;
        }, error => console.error(error));
        console.log(_class);

      });
    }, error => console.error(error));
    
  }
}

interface Class {
  idClass: number;
  idTeacher: number;
  idSubject: number;
  idClassroom: number;
  idCourse: number;
  startTime: Date;
  endTime: Date;
  teacherName: string;
  subjectName: string;
  classroomName: string;
  courseName: string;
}

class Teacher {
  idTeacher: number;
  firstName: string;
  lastName: string;
}

class Subject {
  idSubject: number;
  subjectName: string;
}

class Course {
  idCourse: number;
  idCampus: number;
  courseName: string;
  courseDuration: number;
}

class Classroom {
  idClassroom: number;
  idFloor: number;
  idDevice: number;
  classroomName: string;
}
