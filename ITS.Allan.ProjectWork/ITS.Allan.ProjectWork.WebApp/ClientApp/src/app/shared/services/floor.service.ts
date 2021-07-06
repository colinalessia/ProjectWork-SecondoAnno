import { Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import Floor from '../models/Floor';


export default class FloorService {
  public floorUrl = '';

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.floorUrl = this.baseUrl + 'api/Floors';
  }

  getAll(): Observable<Array<Floor>> {
    return this.http.get<Array<Floor>>(this.floorUrl);
  }

  get(id: string): Observable<Floor> {
    return this.http.get<Floor>(`${this.floorUrl}/${id}`);
  }

  save(floor: Floor): Observable<Floor> {
    let result: Observable<Floor>;
    if (floor.idFloor) {
      result = this.http.put<Floor>(
        `${this.floorUrl}/${floor.idFloor}`,
        floor
      );
    } else {
      result = this.http.post<Floor>(this.floorUrl, floor);
    }
    return result;
  }

  remove(id: number) {
    return this.http.delete(`${this.floorUrl}/${id.toString()}`);
  }
}
