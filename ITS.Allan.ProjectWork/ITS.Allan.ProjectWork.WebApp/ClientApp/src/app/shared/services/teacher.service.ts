import { Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import Teacher from '../models/Teacher';


export default class TeacherService {
  public teacherUrl = '';

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.teacherUrl = this.baseUrl + 'api/Teachers';
  }

  getAll(): Observable<Array<Teacher>> {
    return this.http.get<Array<Teacher>>(this.teacherUrl);
  }

  get(id: string): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.teacherUrl}/${id}`);
  }

  save(teacher: Teacher): Observable<Teacher> {
    let result: Observable<Teacher>;
    if (teacher.idTeacher) {
      result = this.http.put<Teacher>(
        `${this.teacherUrl}/${teacher.idTeacher}`,
        teacher
      );
    } else {
      result = this.http.post<Teacher>(this.teacherUrl, teacher);
    }
    return result;
  }

  remove(id: number) {
    return this.http.delete(`${this.teacherUrl}/${id.toString()}`);
  }
}
