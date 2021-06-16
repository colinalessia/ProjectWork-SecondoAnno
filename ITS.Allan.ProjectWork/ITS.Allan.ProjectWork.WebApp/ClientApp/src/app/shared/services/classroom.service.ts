import { Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import Classroom from '../models/Classroom';


export default class ClassroomService {
  public classroomUrl = '';

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.classroomUrl = this.baseUrl + 'api/Classrooms';
  }

  getAll(): Observable<Array<Classroom>> {
    return this.http.get<Array<Classroom>>(this.classroomUrl);
  }

  get(id: string): Observable<Classroom> {
    return this.http.get<Classroom>(`${this.classroomUrl}/${id}`);
  }

  save(classroom: Classroom): Observable<Classroom> {
    let result: Observable<Classroom>;
    if (classroom.idClassroom) {
      result = this.http.put<Classroom>(
        `${this.classroomUrl}/${classroom.idClassroom}`,
        classroom
      );
    } else {
      result = this.http.post<Classroom>(this.classroomUrl, classroom);
    }
    return result;
  }

  remove(id: number) {
    return this.http.delete(`${this.classroomUrl}/${id.toString()}`);
  }
}
