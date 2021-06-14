import { Injectable, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import Subject from '../models/Subject';


@Injectable()
export default class SubjectService {
  public API = 'https://localhost:44301/api';
  public SUBJECT_API = `${this.API}/Subjects`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Array<Subject>> {
    return this.http.get<Array<Subject>>(this.SUBJECT_API);
  }

  get(id: string) : Observable<Subject>{
    return this.http.get<Subject>(`${this.SUBJECT_API}/${id}`);
  }

  save(subject: Subject): Observable<Subject> {
    let result: Observable<Subject>;
    if (subject.idSubject) {
      result = this.http.put<Subject>(
        `${this.SUBJECT_API}/${subject.idSubject}`,
        subject
      );
    } else {
      result = this.http.post<Subject>(this.SUBJECT_API, subject);
    }
    return result;
  }

  remove(id: number) {
    return this.http.delete(`${this.SUBJECT_API}/${id.toString()}`);
  }
}
