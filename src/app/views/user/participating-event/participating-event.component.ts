import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { User } from 'src/app/models/user';
import { ProjectService } from 'src/app/services/project.service';
import { CookieService } from 'ngx-cookie-service';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { ApiService } from 'src/app/services/api.service';
import { TeamDetail } from 'src/app/models/teamdetail';
import { TeamdetailService } from 'src/app/services/teamdetail.service';

@Component({
  selector: 'app-participating-event',
  templateUrl: './participating-event.component.html',
  styleUrls: ['./participating-event.component.scss']
})
export class ParticipatingEventComponent implements OnInit {
  baseurl: string;
  projects: [Project];
  user: User = { id: null } as User;
  avatarurl: string;
  userId = this.cookieService.get('userId');
  teamdetails: [TeamDetail];
  project: Project = { id: null } as Project;
  temp;
  participateProjects: Project[] = [];

  constructor(private projectService: ProjectService, private cookieService: CookieService,
              private sanitizer: DomSanitizer, private authService: AuthService,
              private userService: UserService, private apiService: ApiService,
              private teamdetailService: TeamdetailService) { }

  async ngOnInit() {
    this.baseurl = this.apiService.baseUrl;
    // this.loadProject();
    this.userService.get().subscribe( res => {
      this.user = res;
      this.avatarurl = this.baseurl + this.user.avatar.url;
  });
    await this.loadTeamdetail();
    await this.createParticipateProjects(this.teamdetails);
  }
  logout(){
    this.authService.logout();
  }

  async loadTeamdetail() {
    await this.teamdetailService.list().toPromise().then( res => {
      this.teamdetails = res;
    });
  }

  async createParticipateProjects(teamdetails)
  {
    for (let i = 0 ; i < teamdetails.length; i++)
      {
        // tslint:disable-next-line: triple-equals
        if (this.teamdetails[i].user.id == this.cookieService.get('userId'))
        {
          await this.projectService.get(this.teamdetails[i].team.project).toPromise().then(res => {
            console.log(res);
            this.participateProjects.push(res);
          });
        }
      }
    console.log(this.participateProjects);
  }

  private loadProject() {
    this.projectService.list().subscribe( res => {
      this.projects = res;
      this.temp = res.length;
    });
  }

  getProjectId(projectId) {
    this.cookieService.set('projectId', projectId);
  }
}
