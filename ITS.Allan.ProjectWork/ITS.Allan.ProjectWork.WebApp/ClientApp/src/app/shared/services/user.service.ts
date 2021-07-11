import { Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import User from '../models/User';


export default class UserService {
  public userUrl = '';

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.userUrl = this.baseUrl + 'api/Users';
  }

  getAll(): Observable<Array<User>> {
    return this.http.get<Array<User>>(this.userUrl);
  }

  get(id: string): Observable<User> {
    return this.http.get<User>(`${this.userUrl}/${id}`);
  }

  save(user: User): Observable<User> {
    let result: Observable<User>;
    if (user.idUser) {
      result = this.http.put<User>(
        `${this.userUrl}/${user.idUser}`,
        user
      );
    } else {
      result = this.http.post<User>(this.userUrl, user);
    }
    return result;
  }

  remove(id: number) {
    return this.http.delete(`${this.userUrl}/${id.toString()}`);
  }
}
