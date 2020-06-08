import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { CookieService } from 'ngx-cookie-service';
import { TeamlogService } from 'src/app/services/teamlog.service';
import { TeamLog } from 'src/app/models/teamlog';
import { TeamService } from 'src/app/services/team.service';
import { Team } from 'src/app/models/team';

@Component({
  selector: 'app-receive-cryptogram',
  templateUrl: './receive-cryptogram.component.html',
  styleUrls: ['./receive-cryptogram.component.scss']
})
export class ReceiveCryptogramComponent implements OnInit {
  user: User = { _id: null} as User;
  baseurl: string;
  avatarurl: string;
  teamlogs: [TeamLog];
  team: Team = { _id: null} as Team;
  cryptogramurl: string;

  searchText: any;
  constructor(private userService: UserService, private authService: AuthService,
              private apiService: ApiService, private cookieService: CookieService,
              private teamlogService: TeamlogService, private teamService: TeamService) { }

              
  ngOnInit(): void {
    this.baseurl = this.apiService.baseUrl;
    this.userService.get().subscribe( res => {
      this.user = res;
      this.avatarurl = this.baseurl + this.user.avatar.url;
    });
    this.loadData();
  }

  async loadData()
  {
    await this.teamService.get(this.cookieService.get('teamId')).toPromise().then( res => {
      this.team = res;
      // this.cryptogramurl = this.baseurl + this.team.teamlogs[this.team.currentTeamlog].station.inputId;
      // console.log(this.team);
    });

    await this.teamlogService.list().toPromise().then( res => {
      this.teamlogs = res;
      for (let i = 0; i< this.teamlogs.length; i++)
      {
        if (this.teamlogs[i].team._id == this.cookieService.get('teamId') && this.teamlogs[i].order == this.team.currentTeamlog)
        {
          this.cryptogramurl = this.baseurl + this.teamlogs[i].station.input.url;
        }
      }
    })
  }

  logout(){
    this.authService.logout();
  }
  
}

