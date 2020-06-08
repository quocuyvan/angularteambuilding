import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private headers;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    const token = this.cookieService.get('token');
    this.headers = new HttpHeaders ({
      'Content-Type' : 'application/json; charset=utf-8',
      // tslint:disable-next-line: object-literal-key-quotes
      'Accept'       : 'application/json',
      // tslint:disable-next-line: object-literal-key-quotes
      'Authorization': `Bearer ` + token,
    });
  }
  baseUrl = 'http://192.168.0.102:1337';
  // baseUrl = 'http://localhost:1337';
  apiUrl = {
    notes: `${this.baseUrl}/notes`,
    register: `${this.baseUrl}/auth/local/register`,
    login: `${this.baseUrl}/auth/local/`,
    users: `${this.baseUrl}/users`,
    projects: `${this.baseUrl}/projects`,
    upload: `${this.baseUrl}/upload`,
    stations: `${this.baseUrl}/stations`,
    teams: `${this.baseUrl}/teams`,
    teamdetails: `${this.baseUrl}/teamdetails`,
    teamlogs: `${this.baseUrl}/teamlogs`,
    vuforiaAddCloud: 'http://localhost:8081/vuforia/addToCloudDB',
    vuforiaCloudReco: 'http://localhost:8081/vuforia/cloudReco'

  };

  // tslint:disable-next-line: ban-types
  postnoheader<T>(url: string, data: Object): Observable<T> {
    return this.http.post<T>(url, data);
  }
  getnoheader<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }
  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url, {headers: this.headers});
  }
  // tslint:disable-next-line: ban-types
  post<T>(url: string, data: Object): Observable<T> {
    return this.http.post<T>(url, data, {headers: this.headers});
  }
  // tslint:disable-next-line: ban-types
  put<T>(url: string, data: Object): Observable<T> {
    return this.http.put<T>(url, data, {headers: this.headers});
  }
  delete<T>(url: string) {
    return this.http.delete<T>(url, {headers: this.headers});
  }

}
