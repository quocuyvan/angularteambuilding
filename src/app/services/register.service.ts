import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private apiService: ApiService) { }

  register(data: User): Observable<User> {
    const dataz = {
      username: data.username,
      email: data.email,
      password: data.password,
      avatar: data.avatar
    };
    return this.apiService.postnoheader<User>(this.apiService.apiUrl.register, dataz);
  }
}
