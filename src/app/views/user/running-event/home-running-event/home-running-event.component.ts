import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { TeamService } from 'src/app/services/team.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ProjectService } from 'src/app/services/project.service';
import { CookieService } from 'ngx-cookie-service';
import { ManagementAccountComponent } from 'src/app/views/admin/management-account/management-account.component';
import { TeamDetail } from 'src/app/models/teamdetail';
import { TeamdetailService } from 'src/app/services/teamdetail.service';

@Component({
  selector: 'app-home-running-event',
  templateUrl: './home-running-event.component.html',
  styleUrls: ['./home-running-event.component.scss']
})
export class HomeRunningEventComponent implements OnInit {
  user: User = { id: null } as User;
  avatarurl: string;
  baseurl: string;
  teamdetails: [TeamDetail]

  tempteamdetails: TeamDetail [] = [];
  constructor(private authService: AuthService, private userService: UserService, private teamService: TeamService,
              private router: Router, private apiService: ApiService,
              private projectService: ProjectService, private cookieService: CookieService,
              private teamDetailService: TeamdetailService              ) { }

  ngOnInit(): void {
    // tslint:disable-next-line: prefer-const
    this.baseurl = this.apiService.baseUrl;
    this.userService.get().subscribe( res => {
      this.user = res;
      this.avatarurl = this.baseurl + this.user.avatar.url;
    });
    
    this.teamDetailService.list().subscribe( res => {
      this.teamdetails = res;
      for (let i = 0; i < this.teamdetails.length; i++)
      {
        if(this.teamdetails[i].user.id == this.cookieService.get('userId'))
        {
          this.tempteamdetails.push(this.teamdetails[i]);
        }
      }

      for (let i = 0; i < this.tempteamdetails.length; i++)
      {
        if (String(this.tempteamdetails[i].team.project) == this.cookieService.get('projectId'))
        {
          this.cookieService.set('teamId',this.tempteamdetails[i].team.id)
        }
      }
    })


    // setInterval(() => {
    //   this.checkRunningEvent(); }, 4000);
    }

  // checkRunningEvent() {
  //   this.userService.get().subscribe( res => {
  //     this.user = res;
  //     for (const val of Object.values((this.user.teamdetails))) {
  //     console.log(val.team);
  //     // tslint:disable-next-line: no-shadowed-variable
  //     this.teamService.get(val.team).subscribe( res => {
  //       console.log(res.project.isRunning);
  //       if (res.project.isRunning) {
  //         this.router.navigate(['/notes']);
  //       }
  //       else {
  //         this.router.navigate(['/home-user']);
  //       }
  //     });

  //   }
  // });
  // }

  logout(){
    this.authService.logout();
  }

}
