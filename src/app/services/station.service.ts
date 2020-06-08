import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Station } from '../models/station';

@Injectable({
  providedIn: 'root'
})
export class StationService {

  constructor(private apiService: ApiService) { }

  list(): Observable<[Station]> {
    return this.apiService.get<[Station]>(this.apiService.apiUrl.stations);
  }
  get(id): Observable<Station> {
    return this.apiService.get<Station>(`${this.apiService.apiUrl.stations}/${id}`);
  }
  // tslint:disable-next-line: ban-types
  save(data: Station, projectId: String): Observable<Station> {
      const dataz = {
        name: data.name,
        project: projectId
      };
      return this.apiService.post<Station>(this.apiService.apiUrl.stations, dataz);

  }
  edit(data: Station): Observable<Station> {
    const dataz = {
      name: data.name,
      location: data.location,
      time: data.time,
      score: data.score,
      password: data.password,
      descriptionz: data.descriptionzId,
      input: data.inputId,
      output: data.outputId,
      vuforiaID: data.vuforiaID
    };
    return this.apiService.put<Station>(`${this.apiService.apiUrl.stations}/${data.id}`, dataz);
  }
  delete(id: string): Observable<Station> {
    return this.apiService.delete<Station>(`${this.apiService.apiUrl.stations}/${id}`);
  }
}
