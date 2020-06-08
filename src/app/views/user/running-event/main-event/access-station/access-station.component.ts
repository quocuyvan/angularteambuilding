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
import { Router } from '@angular/router';
import { StationService } from 'src/app/services/station.service';
import { Station } from 'src/app/models/station';
import { PnotifyService } from 'src/app/utils/pnotify.service';

@Component({
  selector: 'app-access-station',
  templateUrl: './access-station.component.html',
  styleUrls: ['./access-station.component.scss']
})
export class AccessStationComponent implements OnInit {
  user: User = { _id: null} as User;
  baseurl: string;
  avatarurl: string;
  inputPassword: string;

  team: Team = { _id: null} as Team;
  teamlogs: [TeamLog];
  teamlog: TeamLog = { _id: null} as TeamLog;
  station: Station = { _id: null} as Station;


  searchText: any;
  constructor(private userService: UserService, private authService: AuthService,
              private apiService: ApiService, private cookieService: CookieService,
              private teamlogService: TeamlogService, private teamService: TeamService,
              private router: Router, private stationService: StationService,
              private pNotifyService: PnotifyService) { }

              
  ngOnInit(): void {
    this.baseurl = this.apiService.baseUrl;
    this.userService.get().subscribe( res => {
      this.user = res;
      this.avatarurl = this.baseurl + this.user.avatar.url;
    });

    this.getTeamlog();
    this.getStation();
  }

  logout(){
    this.authService.logout();
  }
  // ========================================= code nháp =========================================


  async getTeamlog()
  {
    await this.teamService.get(this.cookieService.get('teamId')).toPromise().then( res => {
      this.team = res;
    });

    await this.teamlogService.list().toPromise().then( res => {
      this.teamlogs = res;
      for (let i = 0; i< this.teamlogs.length; i++)
      {
        if (this.teamlogs[i].team._id == this.team._id && this.teamlogs[i].order == this.team.currentTeamlog)
        {
          this.teamlog = this.teamlogs[i];
        }
      }
    });
  }

  getStation() {
    this.stationService.get(this.cookieService.get('scanStationId')).toPromise().then( res => {
      this.station = res;
    })
  }

  onSubmit()
  {
    if ((this.inputPassword == this.station.password) && (this.cookieService.get('scanStationId') == this.teamlog.station._id))
    {
      this.router.navigate(['/station-challenge']);
    }
    else
    {
      this.pNotifyService.error('Không thành công', 'Không đúng trạm hoặc sai mật khẩu!');
    }
    // ========================================= code nháp =========================================
  }
}

