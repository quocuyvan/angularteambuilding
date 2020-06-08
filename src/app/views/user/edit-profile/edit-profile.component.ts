import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { PnotifyService } from 'src/app/utils/pnotify.service';
import { UploadfileService } from 'src/app/services/uploadfile.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  baseurl: string;
  user: User = { id: null } as User;
  avatarurl: string;
  minDate: Date;
  oldpass: string;
  newpass: string;
  repass: string;
  fileToUpload: File = null;

  constructor(  private userService: UserService,
                private authService: AuthService, private apiService: ApiService,
                private pNotifyService: PnotifyService, private uploadfileService: UploadfileService) {
    this.minDate = new Date();
  }

  ngOnInit(): void {
    this.baseurl = this.apiService.baseUrl;
    this.userService.get().subscribe( res => {
      this.user = res;
      this.avatarurl = this.baseurl + this.user.avatar.url;
      console.log(this.user);
    });
  }

  logout()
  {
    this.authService.logout();
  }

  // tslint:disable-next-line: member-ordering
  avatarUserimgid;
  handleFileAvatarUser(files: FileList)
  {
    this.fileToUpload = files.item(0);
    this.uploadfileService.postFile(this.fileToUpload).subscribe(res => {
      for (const val of Object.values(res)) {
        // use val
        this.avatarUserimgid =  val._id;
      }
      this.user.avatar = this.avatarUserimgid;
      this.userService.put(this.user).subscribe();
      window.location.reload();
      }, error => {
        console.log(error);
      });
  }

  updateProfile()
  {
    this.userService.put(this.user).subscribe( res => {
      this.pNotifyService.success('Thành công', 'Cập nhật thành công!');
    }, err => {
      this.pNotifyService.error('Lỗi', 'Cập nhật thất bại!!');
    });
  }

  changePassword()
  {
    this.authService.login(this.user.username, this.oldpass).subscribe( res => {
      if (this.newpass == this.repass)
      {
        this.user.password = this.repass;
        this.userService.put(this.user).subscribe();
        this.oldpass = '';
        this.newpass = '';
        this.repass = '';
        this.pNotifyService.success('Thành công', 'Cập nhật thành công!');
      }
      else
      {
        this.pNotifyService.error('Lỗi', 'Mật khẩu nhập lại không đúng!');
      }
    }, err => {
      this.oldpass = '';
      this.newpass = '';
      this.repass = '';
      this.pNotifyService.error('Lỗi', 'Nhập sai mật khẩu cũ!');
    });
  }

}
