import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Team } from '../models/team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private apiService: ApiService) { }

  list(): Observable<[Team]> {
    return this.apiService.get<[Team]>(this.apiService.apiUrl.teams);
  }
  get(id): Observable<Team> {
    return this.apiService.get<Team>(`${this.apiService.apiUrl.teams}/${id}`);
  }
  // tslint:disable-next-line: ban-types
  save(data: Team, projectId: String): Observable<Team> {
    if (data.id === null) {
      const dataz = {
        name: data.name,
        stationOrder: data.stationOrder,
        project: projectId
      };
      return this.apiService.post<Team>(this.apiService.apiUrl.teams, dataz);
    } else {
      const dataz = {
        name: data.name,
        stationOrder: data.stationOrder
      };
      return this.apiService.put<Team>(`${this.apiService.apiUrl.teams}/${data.id}`, dataz);
    }
  }

  put(data: Team): Observable<Team> {
    return this.apiService.put<Team>(`${this.apiService.apiUrl.teams}/${data._id}`, data);
}

  delete(id: string): Observable<Team> {
    return this.apiService.delete<Team>(`${this.apiService.apiUrl.teams}/${id}`);
  }
}
