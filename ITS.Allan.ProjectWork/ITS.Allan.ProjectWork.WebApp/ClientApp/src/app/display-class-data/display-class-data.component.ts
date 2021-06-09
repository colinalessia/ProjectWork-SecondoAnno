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
}
