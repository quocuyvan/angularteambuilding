import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { TeamDetail } from '../models/teamdetail';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamdetailService {

  constructor(private apiService: ApiService) { }
  list(): Observable<[TeamDetail]> {
    return this.apiService.get<[TeamDetail]>(this.apiService.apiUrl.teamdetails);
  }

  // tslint:disable-next-line: ban-types
  save(teamId: String, userId: String): Observable<TeamDetail> {
      const dataz = {
        // tslint:disable-next-line: object-literal-shorthand
        team: teamId,
        // tslint:disable-next-line: object-literal-shorthand
        user: userId
      };
      return this.apiService.post<TeamDetail>(this.apiService.apiUrl.teamdetails, dataz);

  }

  delete(id: string): Observable<TeamDetail> {
    return this.apiService.delete<TeamDetail>(`${this.apiService.apiUrl.teamdetails}/${id}`);
  }
}
