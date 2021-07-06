import { Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import Building from '../models/Building';


export default class BuildingService {
  public buildingUrl = '';

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.buildingUrl = this.baseUrl + 'api/Buildings';
  }

  getAll(): Observable<Array<Building>> {
    return this.http.get<Array<Building>>(this.buildingUrl);
  }

  get(id: string): Observable<Building> {
    return this.http.get<Building>(`${this.buildingUrl}/${id}`);
  }

  save(building: Building): Observable<Building> {
    let result: Observable<Building>;
    if (building.idBuilding) {
      result = this.http.put<Building>(
        `${this.buildingUrl}/${building.idBuilding}`,
        building
      );
    } else {
      result = this.http.post<Building>(this.buildingUrl, building);
    }
    return result;
  }

  remove(id: number) {
    return this.http.delete(`${this.buildingUrl}/${id.toString()}`);
  }
}
