import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from 'src/app/models/user';
import { RegisterService } from 'src/app/services/register.service';
import { PnotifyService } from 'src/app/utils/pnotify.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UploadfileService } from 'src/app/services/uploadfile.service';
import {CreditCardValidators, UniversalValidators, PasswordValidators} from 'ngx-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  user: User = { _id: null} as User;
  img;

  constructor(private router: Router, private authService: AuthService,
              private registerService: RegisterService, private pNotifyService: PnotifyService,
              private uploadfileService: UploadfileService) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/home-user']);
    }
  }

  refresh(): void {
    window.location.reload();
}


  onSubmit() {
    if (this.user.email === undefined || this.user.username === undefined || this.user.password === undefined)
    {
      this.pNotifyService.error('Lỗi', 'Phải nhập đủ thông tin!');
      return;
    }
    if (this.user.username.length < 6)
    {
      this.pNotifyService.error('Lỗi', 'Username phải có ít nhất 6 ký tự!');
      return;
    }
    if (this.user.password.length < 6)
    {
      this.pNotifyService.error('Lỗi', 'Mật khẩu phải có ít nhất 6 ký tự!');
      return;
    }
    if (this.user.password !== this.user.rePassword){
      this.pNotifyService.error('Lỗi', 'Mật khẩu không giống nhau!');
      return;
    }



    this.uploadfileService.get('5ea86bf314e7ea58ac119a77').subscribe ( res => {
      this.img = res;
      this.user.avatar = this.img;

      this.registerService.register(this.user).subscribe( () => {
        this.pNotifyService.success('Thành công', 'Đăng ký thành công!');
        this.router.navigate(['/login']);
      }, err => {
        this.pNotifyService.error('Lỗi', 'Email hoặc username đã tồn tại!');
      });

    });

  }
}
