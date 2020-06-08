import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirstLoginService {

  constructor(private apiService: ApiService) { }

  put(data: User): Observable<User> {
      return this.apiService.put<User>(`${this.apiService.apiUrl.users}/${data._id}`, data);
  }
}
