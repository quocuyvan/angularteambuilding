import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Station } from 'src/app/models/station';
import { Team } from 'src/app/models/team';
import { TeamDetail } from 'src/app/models/teamdetail';
import { Project } from 'src/app/models/project';
import { StationService } from 'src/app/services/station.service';
import { TeamService } from 'src/app/services/team.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';
import { ManagementAccountService } from 'src/app/services/management-account.service';
import { TeamdetailService } from 'src/app/services/teamdetail.service';
import { UploadfileService } from 'src/app/services/uploadfile.service';
import { UserService } from 'src/app/services/user.service';
import { ProjectService } from 'src/app/services/project.service';
import { OlmapService } from 'src/app/services/olmap.service';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-participating-event-detail',
  templateUrl: './participating-event-detail.component.html',
  styleUrls: ['./participating-event-detail.component.scss']
})
export class ParticipatingEventDetailComponent implements OnInit {
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
  minDate: Date;
  project: Project = { _id: this.projectId } as Project;
  
  constructor(private teamService: TeamService,
              private cookieService: CookieService, private authService: AuthService,
              private uploadfileService: UploadfileService,
              private userService: UserService,
              private projectService: ProjectService,
              private router: Router,
              private apiService: ApiService) { this.minDate = new Date(); }

  ngOnInit(): void {
    this.baseurl = this.apiService.baseUrl;
    this.userService.get().subscribe( res => {
      this.user = res;
      this.avatarurl = this.baseurl + this.user.avatar.url;
    });
    this.loadProject();
    setInterval(() => {
      this.loadProject();
      this.checkRunningEvent(); }, 4000);
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

  checkRunningEvent() {
  if (this.project.isRunning) {
    this.router.navigate(['/home-running-event']);
  }
}



}
