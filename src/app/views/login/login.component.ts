import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { PnotifyService } from 'src/app/utils/pnotify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  identifier: string;
  password: string;

  // tslint:disable-next-line: max-line-length
  constructor(private authService: AuthService, private cookieService: CookieService, private router: Router, private pNotifyService: PnotifyService) { }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit(): void {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/home-user']);
    }

  }

  login() {
    this.authService.login(this.identifier, this.password).subscribe( res => {
      console.log(res);
      console.log(res.user.role.name);
      this.cookieService.set('userInfo', JSON.stringify(res));
      this.cookieService.set('token', res.jwt);
      this.cookieService.set('role', res.user.role.name);
      this.cookieService.set('userId', res.user._id);
      this.cookieService.set('fullName', res.user.fullName);
      this.cookieService.set('avatarurl', res.user.avatar.url);
      this.authService.setLoggedIn(true);
      this.cookieService.set('firstLogin', res.user.firstLogin);
      if (this.cookieService.get('role') === 'Administrator') {
        location.href = '/home-admin';
      }
      else {
        if (this.cookieService.get('firstLogin') === 'true')
        {
          // this.router.navigate(['/first-login']);
          location.href = '/first-login';
        }
        else {
          location.href = '/home-user';
        }
      }
    }, err => {
      this.pNotifyService.error('Lỗi', 'Đăng nhập thất bại!');
    });
    }
  }
