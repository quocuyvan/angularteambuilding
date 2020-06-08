import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from 'src/app/services/api.service';
import { UploadfileService } from 'src/app/services/uploadfile.service';
import { Router } from '@angular/router';
import { Team } from 'src/app/models/team';
import { TeamService } from 'src/app/services/team.service';
import { TeamdetailService } from 'src/app/services/teamdetail.service';
import { TeamDetail } from 'src/app/models/teamdetail';
import { StationService } from 'src/app/services/station.service';
import { Station } from 'src/app/models/station';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { ManagementAccountService } from 'src/app/services/management-account.service';
import { YearPickerComponent } from 'ngx-bootstrap/datepicker/public_api';
import { AuthService } from 'src/app/services/auth.service';
import { Map } from 'ol/Map';
import { PlacemarkolmapService } from 'src/app/services/placemarkolmap.service';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss']
})
export class TeamDetailComponent implements OnInit {
  team: Team = { id: null } as Team;
  projectId = this.cookieService.get('projectId');
  teamdetails: [TeamDetail];
  station: Station = { id: null } as Station;
  selected: any;
  users: [User];
  user: User = { id: null } as User;
  avatarurl: string;
  baseurl: string;
  ordermap: Map;
  constructor(private cookieService: CookieService, private teamService: TeamService,
              private router: Router, private teamdetailService: TeamdetailService,
              private stationService: StationService, private userService: UserService,
              private authService: AuthService,
              private managementAccountServices: ManagementAccountService,
              private apiService: ApiService, private placemarkolmapService: PlacemarkolmapService) { }

  ngOnInit(): void {
    this.baseurl = this.apiService.baseUrl;
    this.loadTeam();
    this.loadTeamDeTail();
    this.loadUser();
    this.loadorder(this.cookieService.get('teamId'));
    this.userService.get().subscribe( res => {
      this.user = res;
      this.avatarurl = this.baseurl + this.user.avatar.url;
    });
    this.teamService.get(this.cookieService.get('teamId')).subscribe(res => {
      this.team = res;
      console.log(this.team);
      this.array = this.team.stationOrder.split(',');
      this.ordermap = this.placemarkolmapService.loadordermap(this.array);
    })
  }

  logout(){
    this.authService.logout();
  }

  private loadTeam() {
    this.teamService.get(this.cookieService.get('teamId')).subscribe( res => {
      this.team = res;
    });
  }

  private loadTeamDeTail() {
    // tslint:disable-next-line: deprecation
    this.teamdetailService.list().subscribe( res => {
      this.teamdetails = res;

    });
  }
  array = new Array();
  array2 = new Array();
  array3 = new Array();
  stationsCoor= new Array();

  private loadorder(id) {
    this.teamService.get(id).subscribe(res => {
      this.team = res;
      this.array = this.team.stationOrder.split(',');
      for (let i = 0; i < this.array.length; i++) {
        this.array2.push({stt: i, id: this.array[i], name: ''});
        this.stationService.get(this.array[i]).subscribe(res => {
          this.station = res;
          this.array2[i].name = this.station.name;
        });

      }
    });
  }


  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.array2, event.previousIndex, event.currentIndex);
    this.array3.length=0;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.array2.length; i++) {
        this.array3.push(this.array2[i].id);
    }
    this.team.stationOrder = this.array3.toString();
  }

  selectEvent(event) {
    this.selected = JSON.parse(JSON.stringify(event));
  }

  private loadUser() {
    this.managementAccountServices.list().subscribe( res => {
      this.users = res;
    });
  }

  tempteamdetails: TeamDetail [] = [];
  saveTeamDetail(teamId, selected){
    // tslint:disable-next-line: prefer-const
    let a = document.querySelectorAll('.search-user .form-control') as any as HTMLElement[];
    // tslint:disable-next-line: no-angle-bracket-type-assertion
    (<HTMLInputElement> a[0]).value = '';

    this.teamdetailService.list().subscribe( res => {
      this.teamdetails = res;
    })
    for (let i = 0; i < this.teamdetails.length; i++)
    {
      if(this.teamdetails[i].user.id == this.user.id)
      {
        this.tempteamdetails.push(this.teamdetails[i]);
      }
    }
    // tslint:disable-next-line: triple-equals
    // if (Number(this.user.teamdetails.length) == 0)
    // {
    //   this.teamdetailService.save(teamId, selected).subscribe (res => {
    //     this.loadTeamDeTail();
    //   });
    // }

    for (let i = 0; i < this.tempteamdetails.length; i++)
    {
      if (String(this.tempteamdetails[i].team.project) == this.cookieService.get('projectId'))
      {
        console.log('đã tồn tại trong team khác')
        return;
      }

    }
    this.teamdetailService.save(teamId, selected).subscribe (res => {
      this.loadTeamDeTail();
    });

  }

  deleteTeamDetail(id) {
    // tslint:disable-next-line: deprecation
    event.preventDefault();
    this.teamdetailService.delete(id).subscribe( res => {
      this.loadTeamDeTail();
    });
  }

  saveTeam() {
    this.teamService.save(this.team, this.projectId).subscribe( res => {
      this.router.navigate(['/create-event-detail'])
    }, err => {
      console.log('Update failed!');
    });
  }

  back() {
    this.array.length=0;
    this.array2.length=0;
    this.array3.length=0;
    this.router.navigate(['/create-event-detail'])
  }
}
