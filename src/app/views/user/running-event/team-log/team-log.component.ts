import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { TeamdetailService } from 'src/app/services/teamdetail.service';
import { CookieService } from 'ngx-cookie-service';
import { TeamLog } from 'src/app/models/teamlog';

@Component({
  selector: 'app-team-log',
  templateUrl: './team-log.component.html',
  styleUrls: ['./team-log.component.scss']
})
export class TeamLogComponent implements OnInit {
  user: User = { _id: null} as User;
  baseurl: string;
  avatarurl: string;


  searchText: any;
  constructor(private userService: UserService, private authService: AuthService,
              private apiService: ApiService, private cookieService: CookieService) { }

              
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
}

