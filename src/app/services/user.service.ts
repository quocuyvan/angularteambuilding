import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: ApiService, private cookieService: CookieService) { }
  userId = this.cookieService.get('userId');
  get(): Observable<User> {
    return this.apiService.get<User>(`${this.apiService.apiUrl.users}/${this.userId}`);
  }

  put(data: User): Observable<User> {
    return this.apiService.put<User>(`${this.apiService.apiUrl.users}/${data._id}`, data);
  }

  list(): Observable<[User]> {
    return this.apiService.get<[User]>(this.apiService.apiUrl.users);
  }
  // tslint:disable-next-line: variable-name
  getz(_id): Observable<User> {
    return this.apiService.get<User>(`${this.apiService.apiUrl.users}/${_id}`);
  }
}
