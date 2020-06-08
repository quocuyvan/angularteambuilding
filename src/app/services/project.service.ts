import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private apiService: ApiService) { }
  post(data: Project): Observable<Project> {
    const dataz = {
      name: data.name,
      location: data.location,
      time: data.time,
      avatar: data.avatar,
      user: data.userId
    };
    return this.apiService.post<Project>(this.apiService.apiUrl.projects, dataz);
  }

  edit(data: Project): Observable<Project> {
    const dataz = {
      name: data.name,
      location: data.location,
      time: data.time,
      avatar: data.avatar._id,
      isRunning: data.isRunning
    }
    return this.apiService.put<Project>(`${this.apiService.apiUrl.projects}/${data._id}`, dataz);
}

  list(): Observable<[Project]> {
    return this.apiService.get<[Project]>(this.apiService.apiUrl.projects);
  }

  get(id): Observable<Project> {
    return this.apiService.get<Project>(`${this.apiService.apiUrl.projects}/${id}`);
  }
}
