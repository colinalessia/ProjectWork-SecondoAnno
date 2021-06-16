import { Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import Course from '../models/Course';


export default class CourseService {
  public courseUrl = '';

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.courseUrl = this.baseUrl + 'api/Courses';
  }

  getAll(): Observable<Array<Course>> {
    return this.http.get<Array<Course>>(this.courseUrl);
  }

  get(id: string): Observable<Course> {
    return this.http.get<Course>(`${this.courseUrl}/${id}`);
  }

  save(course: Course): Observable<Course> {
    let result: Observable<Course>;
    if (course.idCourse) {
      result = this.http.put<Course>(
        `${this.courseUrl}/${course.idCourse}`,
        course
      );
    } else {
      result = this.http.post<Course>(this.courseUrl, course);
    }
    return result;
  }

  remove(id: number) {
    return this.http.delete(`${this.courseUrl}/${id.toString()}`);
  }
}
