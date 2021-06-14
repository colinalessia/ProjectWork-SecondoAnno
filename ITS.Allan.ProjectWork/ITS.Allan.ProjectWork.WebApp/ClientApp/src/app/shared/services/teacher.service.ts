import { Injectable, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import Teacher from '../models/Teacher';


@Injectable()
export default class TeacherService {
  public API = 'https://localhost:44301/api';
  public TEACHER_API = `${this.API}/Teachers`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Array<Teacher>> {
    return this.http.get<Array<Teacher>>(this.TEACHER_API);
  }

  get(id: string): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.TEACHER_API}/${id}`);
  }

  save(teacher: Teacher): Observable<Teacher> {
    let result: Observable<Teacher>;
    if (teacher.idTeacher) {
      result = this.http.put<Teacher>(
        `${this.TEACHER_API}/${teacher.idTeacher}`,
        teacher
      );
    } else {
      result = this.http.post<Teacher>(this.TEACHER_API, teacher);
    }
    return result;
  }

  remove(id: number) {
    return this.http.delete(`${this.TEACHER_API}/${id.toString()}`);
  }
}
