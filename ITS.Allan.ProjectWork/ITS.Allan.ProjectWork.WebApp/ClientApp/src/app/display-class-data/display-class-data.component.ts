import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-display-class-data',
  templateUrl: './display-class-data.component.html'
})
export class DisplayClassDataComponent {
  public classes: Class[];


  constructor(@Inject(HttpClient) public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
    this.classes = [];
    this.getClasses();

  }

  getClasses() {
    this.http.get<Class[]>(this.baseUrl + 'api/Classes').subscribe(result => {
      console.log("result" + result);
      this.classes = result;
      for (let _class of this.classes) {
        this.getTeacher(_class);
        this.getSubject(_class);
        this.getClassroom(_class);
        this.getCourse(_class);
      }
      console.log(this.classes);
    });
  }

  getTeacher(_class: Class) {
    //GET teacher -> api/Teachers/IdTeacher

    this.http.get<Teacher>(this.baseUrl + 'api/Teachers/' + _class.idTeacher).subscribe(result => {
      //problemi visualizzazione causa spazio con bootstrap
      _class.teacherName = result.firstName + " " + result.lastName;
    }, error => console.error(error));
    console.log(_class);
  }

  getSubject(_class) {
    //GET subject -> api/Subjects/IdSubject
    this.http.get<Subject>(this.baseUrl + 'api/Subjects/' + _class.idSubject).subscribe(result => {

      _class.subjectName = result.subjectName;
    }, error => console.error(error));
    console.log(_class);
  }

  getClassroom(_class) {
    //GET classroom -> api/Classrooms/IdClassroom
    this.http.get<Classroom>(this.baseUrl + 'api/Classrooms/' + _class.idClassroom).subscribe(result => {

      _class.classroomName = result.classroomName;
    }, error => console.error(error));
    console.log(_class);
  }

  getCourse(_class) {
    //GET course -> api/Courses/IdCourse
    this.http.get<Course>(this.baseUrl + 'api/Courses/' + _class.idCourse).subscribe(result => {

      _class.courseName = result.courseName;
    }, error => console.error(error));
    console.log(_class);
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
