import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { TeamLog } from '../models/teamlog';

@Injectable({
  providedIn: 'root'
})
export class TeamlogService {

  constructor(private apiService: ApiService) { }

  list(): Observable<[TeamLog]> {
    return this.apiService.get<[TeamLog]>(this.apiService.apiUrl.teamlogs);
  }
  get(id): Observable<TeamLog> {
    return this.apiService.get<TeamLog>(`${this.apiService.apiUrl.teamlogs}/${id}`);
  }

  save(data: TeamLog): Observable<TeamLog> {
    const dataz = {
      // tslint:disable-next-line: object-literal-shorthand
      name: data.name,
      // tslint:disable-next-line: object-literal-shorthand
      order: data.order,
      team: data.team,
      station: data.station,
      time: data.time
    };
    return this.apiService.post<TeamLog>(this.apiService.apiUrl.teamlogs, dataz);
}

  put(data: TeamLog): Observable<TeamLog> {
    return this.apiService.put<TeamLog>(`${this.apiService.apiUrl.teamlogs}/${data._id}`, data);
}

  delete(id: string): Observable<TeamLog> {
    return this.apiService.delete<TeamLog>(`${this.apiService.apiUrl.teamlogs}/${id}`);
  }
}
