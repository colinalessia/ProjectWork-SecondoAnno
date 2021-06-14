import { Injectable, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import Classroom from '../models/Classroom';


@Injectable()
export default class ClassroomService {
  public API = 'https://localhost:44301/api';
  public CLASSROOM_API = `${this.API}/Classrooms`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Array<Classroom>> {
    return this.http.get<Array<Classroom>>(this.CLASSROOM_API);
  }

  get(id: string): Observable<Classroom> {
    return this.http.get<Classroom>(`${this.CLASSROOM_API}/${id}`);
  }

  save(classroom: Classroom): Observable<Classroom> {
    let result: Observable<Classroom>;
    if (classroom.idClassroom) {
      result = this.http.put<Classroom>(
        `${this.CLASSROOM_API}/${classroom.idClassroom}`,
        classroom
      );
    } else {
      result = this.http.post<Classroom>(this.CLASSROOM_API, classroom);
    }
    return result;
  }

  remove(id: number) {
    return this.http.delete(`${this.CLASSROOM_API}/${id.toString()}`);
  }
}
