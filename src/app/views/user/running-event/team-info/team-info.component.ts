import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user';
import { ModalDirective } from 'ngx-bootstrap/modal/public_api';
import { ManagementAccountService } from 'src/app/services/management-account.service';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { Avatar } from 'src/app/models/avatar';
import { TeamdetailService } from 'src/app/services/teamdetail.service';
import { UserService } from 'src/app/services/user.service';
import { TeamDetail } from 'src/app/models/teamdetail';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-team-info',
  templateUrl: './team-info.component.html',
  styleUrls: ['./team-info.component.scss']
})
export class TeamInfoComponent implements OnInit {
  users: [User];
  user: User = { _id: null} as User;
  userz: User = { _id: null} as User;
  baseurl: string;
  avatarurl: string;
  usersInTeam: User[] = [];
  teamdetails: [TeamDetail];

  @ViewChild('editModal', { static: false }) editModal: ModalDirective;
  searchText: any;
  constructor(private userService: UserService, private authService: AuthService,
              private apiService: ApiService, private teamdetailService: TeamdetailService,
              private cookieService: CookieService) { }

  ngOnInit(): void {
    this.baseurl = this.apiService.baseUrl;
    this.userService.get().subscribe( res => {
      this.user = res;
      this.avatarurl = this.baseurl + this.user.avatar.url;
    });

    this.loadData();
    this.user.avatar = {} as Avatar;
  }

  logout(){
    this.authService.logout();
  }


  async loadData() {
    await this.userService.list().toPromise().then( res => {
      this.users = res;
      console.log(this.users.length);
    });

    this.teamdetailService.list().subscribe( res => {
      this.teamdetails = res;
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.teamdetails.length; i++)
      {
        // tslint:disable-next-line: triple-equals
        if (this.teamdetails[i].team._id == this.cookieService.get('teamId'))
        {
          // tslint:disable-next-line: prefer-for-of
          for (let j = 0; j < this.users.length; j++)
          {
            // tslint:disable-next-line: triple-equals
            if (this.users[j].id == this.teamdetails[i].user._id)
            {
              this.usersInTeam.push(this.users[j]);
            }
          }
        }
      }
    });

  }

  public hideModal() {
    this.editModal.hide();
  }

  // tslint:disable-next-line: variable-name
  openEdit(event, _id) {
    event.preventDefault();
    this.userService.getz(_id).subscribe(res => {
      this.user = res;
      this.editModal.show();
    });
  }

}

