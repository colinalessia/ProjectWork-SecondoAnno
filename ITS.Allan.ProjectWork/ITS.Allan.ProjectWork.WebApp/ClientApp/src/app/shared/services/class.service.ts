import { Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import Class from '../models/Class';


export default class ClassService {
  public classUrl = '';

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.classUrl = this.baseUrl + 'api/Classes';
  }

  getAll(): Observable<Array<Class>> {
    return this.http.get<Array<Class>>(this.classUrl);
  }

  get(id: string): Observable<Class> {
    return this.http.get<Class>(`${this.classUrl}/${id}`);
  }

  save(_class: Class): Observable<Class> {
    let result: Observable<Class>;
    if (_class.idClass) {
      result = this.http.put<Class>(
        `${this.classUrl}/${_class.idClass}`,
        _class
      );
    } else {
      result = this.http.post<Class>(this.classUrl, _class);
    }
    return result;
  }

  remove(id: number) {
    return this.http.delete(`${this.classUrl}/${id.toString()}`);
  }
}
