import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { PnotifyService } from 'src/app/utils/pnotify.service';
import { ManagementAccountService } from 'src/app/services/management-account.service';
import { CookieService } from 'ngx-cookie-service';
import { UploadfileService } from 'src/app/services/uploadfile.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {
  user: User = { id: null } as User;
  avatarurl: string;
  project: Project = { id: null} as Project;
  minDate: Date;
  fileToUpload: File = null;
  img;
  baseurl: string;
  // tslint:disable-next-line: max-line-length
  constructor(private router: Router, private projectService: ProjectService, private pNotifyService: PnotifyService,
              private cookieService: CookieService,
              private uploadfileService: UploadfileService,
              private authService: AuthService,
              private userService: UserService,
              private apiService: ApiService) { this.minDate = new Date(); }

  ngOnInit(): void {
    this.baseurl = this.apiService.baseUrl;
    this.userService.get().subscribe( res => {
      this.user = res;
      this.avatarurl = this.baseurl + this.user.avatar.url;
  });
  }

  logout(){
    this.authService.logout();
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.uploadfileService.postFile(this.fileToUpload).subscribe(res => {
      this.img =  res;
      }, error => {
        console.log(error);
      });
  }

  onSubmit() {
    const date = new Date(this.project.time).toLocaleDateString('zh-Hans-CN');
    console.log(date);
    this.project.time = date;
    this.project.avatar = this.img;
    this.project.userId = this.user._id;
    console.log(this.project);
    this.projectService.post(this.project).subscribe( res => {
      this.pNotifyService.success('Thành công', 'Tạo thành công!');
      this.router.navigate(['/created-event']);
  }, err => {
    this.pNotifyService.error('Lỗi', 'Tạo thất bại!');
  });
  }
}
