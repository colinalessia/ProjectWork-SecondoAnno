import { Injectable, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import Class from '../models/Class';


@Injectable()
export default class ClassService {
  public API = 'https://localhost:44301/api';
  public CLASS_API = `${this.API}/Classes`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Array<Class>> {
    return this.http.get<Array<Class>>(this.CLASS_API);
  }

  get(id: string): Observable<Class> {
    return this.http.get<Class>(`${this.CLASS_API}/${id}`);
  }

  save(_class: Class): Observable<Class> {
    let result: Observable<Class>;
    if (_class.idClass) {
      result = this.http.put<Class>(
        `${this.CLASS_API}/${_class.idClass}`,
        _class
      );
    } else {
      result = this.http.post<Class>(this.CLASS_API, _class);
    }
    return result;
  }

  remove(id: number) {
    return this.http.delete(`${this.CLASS_API}/${id.toString()}`);
  }
}
