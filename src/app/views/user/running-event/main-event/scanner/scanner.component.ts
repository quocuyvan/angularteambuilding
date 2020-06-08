import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss']
})
export class ScannerComponent implements OnInit {
  qrResultString: string;
  user: User = { _id: null} as User;
  baseurl: string;
  avatarurl: string;



  searchText: any;
  constructor(private userService: UserService, private authService: AuthService,
              private apiService: ApiService, private cookieService: CookieService,
              private router: Router) { }

              
  ngOnInit(): void {
    this.baseurl = this.apiService.baseUrl;
    this.userService.get().subscribe( res => {
      this.user = res;
      this.avatarurl = this.baseurl + this.user.avatar.url;
    });

    
  }

  logout(){
    this.authService.logout();
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
    this.cookieService.set('scanStationId',this.qrResultString);
    this.router.navigate(['/access-station']);
  }
}
