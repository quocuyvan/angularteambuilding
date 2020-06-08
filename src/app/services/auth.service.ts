import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Login } from '../models/login';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInStatus = JSON.parse(localStorage.getItem('LoggedIn') || 'false');

  constructor(private apiService: ApiService, private router: Router, private cookieService: CookieService) { }
  clear(): void {
    localStorage.clear();
    this.cookieService.deleteAll();
  }

  logout(): void {
    this.clear();
    window.location.reload();
  }

  login(identifier: string, password: string): Observable<Login> {
    const data = {
      // tslint:disable-next-line: object-literal-shorthand
      identifier: identifier,
      // tslint:disable-next-line: object-literal-shorthand
      password: password
    };
    return this.apiService.postnoheader<Login>(this.apiService.apiUrl.login, data);
  }


  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
    localStorage.setItem('loggedIn', value.toString());
  }
  get isLoggedIn() {
    return JSON.parse(localStorage.getItem('loggedIn') || this.loggedInStatus.toString());
  }

  role() {
    return (this.cookieService.get('role'));
  }
}
