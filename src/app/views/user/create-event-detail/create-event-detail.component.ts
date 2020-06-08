import { Component, OnInit, ViewChild } from '@angular/core';
import { Station } from 'src/app/models/station';
import { Team } from 'src/app/models/team';
import { StationService } from 'src/app/services/station.service';
import { CookieService } from 'ngx-cookie-service';
import { TeamService } from 'src/app/services/team.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/services/auth.service';
import { ManagementAccountService } from 'src/app/services/management-account.service';
import { User } from 'src/app/models/user';
import { TeamdetailService } from 'src/app/services/teamdetail.service';
import { TeamDetail } from 'src/app/models/teamdetail';
import { UploadfileService } from 'src/app/services/uploadfile.service';
import { UserService } from 'src/app/services/user.service';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { OlmapService } from 'src/app/services/olmap.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { element } from 'protractor';
import { ApiService } from 'src/app/services/api.service';
import { TeamLog } from 'src/app/models/teamlog';
import { TeamlogService } from 'src/app/services/teamlog.service';

@Component({
  selector: 'app-create-event-detail',
  templateUrl: './create-event-detail.component.html',
  styleUrls: ['./create-event-detail.component.scss']
})
export class CreateEventDetailComponent implements OnInit {
  baseurl: string;
  user: User = { id: null } as User;
  avatarurl: string;
  stations: [Station];
  teams: [Team];
  projectId = this.cookieService.get('projectId');
  // @ViewChild('teamModal', { static: false }) teamModal: ModalDirective;
  // @ViewChild('stationModal', { static: false }) stationModal: ModalDirective;
  // @ViewChild('mapView', { static: false }) mapView: ModalDirective;
  team: Team = { id: null } as Team;
  station: Station = { id: null } as Station;
  users: [User];
  selected: any;
  teamdetails: [TeamDetail];
  fileToUpload: File = null;
  map: Map;
  minDate: Date;
  project: Project = { _id: this.projectId } as Project;
  teamlog: TeamLog = { _id: null} as TeamLog;
  teamlogs: [TeamLog];

  constructor(private stationService: StationService, private teamService: TeamService,
              private cookieService: CookieService, private authService: AuthService,
              private managementAccountServices: ManagementAccountService,
              private teamdetailService: TeamdetailService,
              private uploadfileService: UploadfileService,
              private userService: UserService,
              private projectService: ProjectService,
              private olMapService: OlmapService,
              private apiService: ApiService,
              private teamlogService: TeamlogService) { this.minDate = new Date(); }
  ngOnInit(): void {
    this.baseurl = this.apiService.baseUrl;
    this.loadStation();
    this.loadUser();
    this.loadTeamDeTail();
    this.userService.get().subscribe( res => {
      this.user = res;
      this.avatarurl = this.baseurl + this.user.avatar.url;
    });
    this.loadProject();
    this.map = this.olMapService.show();

  }
  logout(){
    this.authService.logout();
  }

  private loadProject() {
    this.projectService.get(this.projectId).subscribe( res => {
      this.project = res;
    });
  }

  avatarProjectimgid;

  handleFileAvatarProject(files: FileList) {
    this.fileToUpload = files.item(0);
    this.uploadfileService.postFile(this.fileToUpload).subscribe(res => {
      for (const val of Object.values(res)) {
        // use val
        this.avatarProjectimgid =  val._id;
      }
      }, error => {
        console.log(error);
      });
  }

  saveProjectInfo() {
    // tslint:disable-next-line: deprecation
    event.preventDefault();
    this.uploadfileService.deleteFile(this.project.avatar._id);
    this.project.avatar._id = this.avatarProjectimgid;
    this.projectService.edit(this.project).subscribe( res => {
      console.log('Update success!');

  }, err => {
    console.log('Update failed!');
  });
    this.loadProject();

  }

  private loadTeamDeTail() {
    // tslint:disable-next-line: deprecation
    this.teamdetailService.list().subscribe( res => {
      this.teamdetails = res;

    });
  }

  private loadUser() {
    this.managementAccountServices.list().subscribe( res => {
      this.users = res;
    });
  }

  private loadStation() {
    this.stationService.list().subscribe( res => {
      this.stations = res;
    });
    this.teamService.list().subscribe( res => {
      this.teams = res;
    });
  }

  // public hideModal() {
  //   this.teamModal.hide();
  //   this.stationModal.hide();
  // }

  async addTeam() {
    // tslint:disable-next-line: deprecation
    event.preventDefault();
    await this.stationService.list().toPromise().then( res => {
      this.stations = res;
      this.team = {id: null} as Team;
      this.team.name = 'Team';
      this.team.stationOrder = '';
      for (let i = 0; i < res.length ; i++)
      {
        if (res[i].project._id == this.cookieService.get('projectId'))
        {
          this.team.stationOrder += (res[i].id + ',');
        }
      }
    })
    this.team.stationOrder = this.team.stationOrder.slice(0, this.team.stationOrder.length - 1);
    console.log(this.team.stationOrder);
    console.log(this.team);
    await this.teamService.save(this.team, this.projectId).toPromise().then( res => {
      this.loadStation();
  }, err => {
    console.log('Update failed!');
  });
  }

  // openEditTeam(event, id) {
  //   this.loadTeamDeTail();
  //   event.preventDefault();
  //   this.teamService.get(id).subscribe(res => {
  //     this.team = res;
  //     this.teamModal.show();
  //   });
  // }


  // saveTeam() {
  //   this.teamService.save(this.team, this.projectId).subscribe( res => {
  //       this.teamModal.hide();
  //       this.loadStation();
  //   }, err => {
  //     console.log('Update failed!');
  //   });
  // }

  deleteTeam(event, id) {
    event.preventDefault();
    for (const val of Object.values(this.teamdetails)) {
      // use val
      if (val.team._id === id) {
        this.deleteTeamDetail(val.id);
      }
    }
    this.teamService.delete(id).subscribe( res => {
        this.loadStation();
    });
  }


  selectEvent(event) {
    this.selected = JSON.parse(JSON.stringify(event));
  }

  saveTeamDetail(teamId, selected){
    // tslint:disable-next-line: prefer-const
    let a = document.querySelectorAll('.search-user .form-control') as any as HTMLElement[];
    // tslint:disable-next-line: no-angle-bracket-type-assertion
    (<HTMLInputElement> a[0]).value = '';
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

  async addStation() {
    // tslint:disable-next-line: deprecation
    event.preventDefault();
    this.station = {id: null} as Station;
    this.station.name = 'Station';
    await this.stationService.save(this.station, this.projectId).toPromise().then( res => {
      this.loadStation();
      this.teamService.list().toPromise().then( res2 => {
        this.teams = res2;
        for (let i = 0; i < this.teams.length; i++)
        {
          if (this.teams[i].project._id == this.cookieService.get('projectId'))
          {
            if (this.teams[i].stationOrder == undefined)
            {
              // console.log('undefine')
              this.team.id = this.teams[i]._id;
              this.team.stationOrder = res._id;
              this.teamService.save(this.team, this.cookieService.get('projectId')).subscribe();
            }
            else if (this.teams[i].stationOrder == '')
            {
              // console.log('null')
              this.team.id = this.teams[i]._id;
              this.team.stationOrder = res._id;
              this.teamService.save(this.team, this.cookieService.get('projectId')).subscribe();
            }
            else
            {
              // console.log('not null')
              this.team.id = this.teams[i]._id;
              this.team.stationOrder = this.teams[i].stationOrder +  ',' + res._id;
              this.teamService.save(this.team, this.cookieService.get('projectId')).subscribe();
            }
          }
          
        }
      });
    }, err => {
      console.log('Update failed!');
    });
  }

  // openEditStation(event, id) {
  //   event.preventDefault();
  //   this.stationService.get(id).subscribe(res => {
  //     this.station = res;
  //     this.stationModal.show();
  //   });
  // }

  getStationId(stationId) {
    this.cookieService.set('stationId', stationId);
  }
  getTeamId(teamId) {
    this.cookieService.set('teamId', teamId);
  }
  // tslint:disable-next-line: member-ordering
  inputimgid;
  // tslint:disable-next-line: member-ordering
  outputimgid;
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.uploadfileService.postFile(this.fileToUpload).subscribe(res => {
      this.inputimgid =  JSON.parse(JSON.stringify(res));
      // do something, if upload success
      }, error => {
        console.log(error);
      });
  }

  handleFileOutput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.uploadfileService.postFile(this.fileToUpload).subscribe(res => {
      this.outputimgid =  JSON.parse(JSON.stringify(res));
      // do something, if upload success
      }, error => {
        console.log(error);
      });
  }

  // saveStation() {
  //   this.uploadfileService.deleteFile(this.station.inputId);
  //   this.uploadfileService.deleteFile(this.station.outputId);
  //   this.station.inputId = this.inputimgid;
  //   this.station.outputId = this.outputimgid;
  //   this.stationService.edit(this.station).subscribe( res => {
  //     this.stationModal.hide();
  //     this.loadStation();
  // }, err => {
  //   console.log('Update failed!');
  // });
  // }

  // tslint:disable-next-line: ban-types
  standardizeStationOrder(stationOrder)
  {
    if (stationOrder[0] == ',')
    {
      stationOrder = stationOrder.slice(0, 0) + stationOrder.slice(1);
    }

    if (stationOrder[stationOrder.length - 1] == ',')
    {
      stationOrder = stationOrder.slice(0, stationOrder.length - 1);
    }

    for (let i = 0; i < stationOrder.length; i++)
    {
      if (stationOrder[i] == ',' && stationOrder[i+1] == ',')
      {
        stationOrder = stationOrder.slice(0, i) + stationOrder.slice(i + 1);
      }
    }
    return stationOrder;
  }

  deleteStation(event, id) {
    event.preventDefault();
    this.teamService.list().toPromise().then( res2 => {
      this.teams = res2;
      for (let i = 0; i < this.teams.length; i++)
      {
        if (this.teams[i].project._id == this.cookieService.get('projectId'))
        {
          this.team.id = this.teams[i]._id;
          this.team.stationOrder = this.teams[i].stationOrder.replace(id, '');
          this.team.stationOrder = this.standardizeStationOrder(this.team.stationOrder);
          console.log('before sub' + this.team.stationOrder);
          this.teamService.save(this.team, this.cookieService.get('projectId')).subscribe();
        }
        
      }
    });

    this.stationService.delete(id).subscribe( res => {
        this.loadStation();
    });
  }

  teamLog: string[] = [];

  async addTeamLog(name, order, teamId, stationId, time)
  {
    this.teamlog.name = name;
    this.teamlog.order = order;
    this.teamlog.team = teamId;
    this.teamlog.station = stationId;
    this.teamlog.time = time;
    await this.teamlogService.save(this.teamlog).toPromise().then();
  }

  now: Date = new Date();
  temparray= new Array();

  async startEvent() {
    this.project.isRunning = true;
    this.projectService.edit(this.project).subscribe();

    // this.project._id = this.cookieService.get('projectId');

    // this.teamLog.push('Trò chơi bắt đầu');
    await this.teamService.list().toPromise().then( async res => {
      this.teams = res;
      let temp;
      for (let i = 0; i< this.teams.length; i++)
      {
        temp = 0;
        if (this.teams[i].project._id == this.cookieService.get('projectId'))
        {
          this.teams[i].currentTeamlog = 0;
          await this.teamService.put(this.teams[i]).toPromise().then();
          this.temparray = this.teams[i].stationOrder.split(',');
          await this.addTeamLog('Trò chơi bắt đầu', temp, this.teams[i]._id, null, this.now);
          temp++;
              // tslint:disable-next-line: prefer-for-of
          for (let j = 0; j < this.project.stations.length; j++)
            {
              await this.addTeamLog('Nhận mật thư số ' + (j + 1), temp, this.teams[i]._id, this.temparray[j], null);
              temp++;
              await this.addTeamLog('Vào trạm ' + (j + 1), temp, this.teams[i]._id, this.temparray[j], null);
              temp++;
              await this.addTeamLog('Hoàn thành trạm ' + (j + 1), temp, this.teams[i]._id, this.temparray[j], null);
              temp++;
            }
          await this.addTeamLog('Trò chơi kết thúc', temp, this.teams[i]._id, null, null);
        }
      }
    });

    await this.teamService.list().toPromise().then( async res => {
      this.teams = res;
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i< this.teams.length; i++)
      {
        if (this.teams[i].project._id == this.cookieService.get('projectId'))
        {
          this.teams[i].currentTeamlog = 1;
          await this.teamService.put(this.teams[i]).toPromise().then();
          // tslint:disable-next-line: prefer-for-of
          for (let j = 0; j < this.teams[i].teamlogs.length; j++)
          {
            if (this.teams[i].teamlogs[j].order == 1)
            {
              this.teams[i].teamlogs[j].time = this.now.toString();
              this.teamlogService.put(this.teams[i].teamlogs[j]).subscribe();
            }
          }
        }
      }
    });

  }

  stopEvent() {
    // this.project._id = this.cookieService.get('projectId');
    this.project.isRunning = false;
    this.projectService.edit(this.project).subscribe();

    // this.teamService.list().subscribe( res => {
    //   this.teams = res;
    //   for (let i = 0; i< this.teams.length; i++)
    //   {
    //     if (this.teams[i].project._id == this.cookieService.get('projectId'))
    //     {
    //       this.teams[i].teamLog = '';
    //       this.teamService.put(this.teams[i]).subscribe();
    //     }
    //   }
    // });

    this.teamService.list().subscribe( async res => {
      this.teams = res;
      let temp;
      for (let i = 0; i< this.teams.length; i++)
      {
        temp = 0;
        if (this.teams[i].project._id == this.cookieService.get('projectId'))
        {
          this.teams[i].currentTeamlog = -1;
          await this.teamService.put(this.teams[i]).toPromise().then();
          this.teamlogService.list().subscribe( res2 => {
            this.teamlogs = res2;
            for (let j = 0; j < this.teamlogs.length; j++)
            {
              if (this.teamlogs[j].team.id == this.teams[i]._id)
              {
                this.teamlogService.delete(this.teamlogs[j].id).subscribe();
              }
            }
          });
        }
      }
    });
  }

}
