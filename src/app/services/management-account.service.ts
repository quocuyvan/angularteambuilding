import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagementAccountService {

  constructor(private apiService: ApiService) { }
  list(): Observable<[User]> {
    return this.apiService.get<[User]>(this.apiService.apiUrl.users);
  }
  // tslint:disable-next-line: variable-name
  get(_id): Observable<User> {
    return this.apiService.get<User>(`${this.apiService.apiUrl.users}/${_id}`);
  }
  edit(data: User): Observable<User> {
      return this.apiService.put<User>(`${this.apiService.apiUrl.users}/${data._id}`, data);
  }

}
