import { Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import Subject from '../models/Subject';


export default class SubjectService {
  public subjectUrl = '';

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.subjectUrl = this.baseUrl + 'api/Subjects';
  }

  getAll(): Observable<Array<Subject>> {
    return this.http.get<Array<Subject>>(this.subjectUrl);
  }

  get(id: string): Observable<Subject> {
    return this.http.get<Subject>(`${this.subjectUrl}/${id}`);
  }

  save(subject: Subject): Observable<Subject> {
    let result: Observable<Subject>;
    if (subject.idSubject) {
      result = this.http.put<Subject>(
        `${this.subjectUrl}/${subject.idSubject}`,
        subject
      );
    } else {
      result = this.http.post<Subject>(this.subjectUrl, subject);
    }
    return result;
  }

  remove(id: number) {
    return this.http.delete(`${this.subjectUrl}/${id.toString()}`);
  }
}
