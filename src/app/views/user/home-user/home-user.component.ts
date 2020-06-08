import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { TeamService } from 'src/app/services/team.service';
import { Router } from '@angular/router';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.scss']
})
export class HomeUserComponent implements OnInit {
  user: User = { id: null } as User;
  avatarurl: string;
  baseurl: string;
  constructor(private authService: AuthService, private userService: UserService, private teamService: TeamService,
              private router: Router, private apiService: ApiService) { }

  ngOnInit(): void {
    // tslint:disable-next-line: prefer-const
    this.baseurl = this.apiService.baseUrl;
    this.userService.get().subscribe( res => {
      this.user = res;
      this.avatarurl = this.baseurl + this.user.avatar.url;
    });
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
