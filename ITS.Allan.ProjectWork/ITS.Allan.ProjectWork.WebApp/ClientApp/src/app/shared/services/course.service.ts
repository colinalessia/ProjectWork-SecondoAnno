import { Injectable, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import Course from '../models/Course';


@Injectable()
export default class CourseService {
  public API = 'https://localhost:44301/api';
  public COURSE_API = `${this.API}/Courses`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Array<Course>> {
    return this.http.get<Array<Course>>(this.COURSE_API);
  }

  get(id: string): Observable<Course> {
    return this.http.get<Course>(`${this.COURSE_API}/${id}`);
  }

  save(course: Course): Observable<Course> {
    let result: Observable<Course>;
    if (course.idCourse) {
      result = this.http.put<Course>(
        `${this.COURSE_API}/${course.idCourse}`,
        course
      );
    } else {
      result = this.http.post<Course>(this.COURSE_API, course);
    }
    return result;
  }

  remove(id: number) {
    return this.http.delete(`${this.COURSE_API}/${id.toString()}`);
  }
}
