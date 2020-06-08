import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { CookieService } from 'ngx-cookie-service';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-created-event',
  templateUrl: './created-event.component.html',
  styleUrls: ['./created-event.component.scss']
})
export class CreatedEventComponent implements OnInit {
  baseurl: string;
  projects: [Project];
  user: User = { id: null } as User;
  avatarurl: string;
  userId = this.cookieService.get('userId');


  constructor(private projectService: ProjectService, private cookieService: CookieService,
              private sanitizer: DomSanitizer, private authService: AuthService,
              private userService: UserService, private apiService: ApiService) { }
  ngOnInit(): void {
    this.baseurl = this.apiService.baseUrl;
    this.loadProject();
    this.userService.get().subscribe( res => {
      this.user = res;
      this.avatarurl = this.baseurl + this.user.avatar.url;

  });
  }
  logout(){
    this.authService.logout();
  }
  private loadProject() {
    this.projectService.list().subscribe( res => {
      this.projects = res;
    });
  }

  getProjectId(projectId) {
    this.cookieService.set('projectId', projectId);
  }
}
