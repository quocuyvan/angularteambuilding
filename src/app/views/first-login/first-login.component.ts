import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { PnotifyService } from 'src/app/utils/pnotify.service';
import { CookieService } from 'ngx-cookie-service';
import { FirstLoginService } from 'src/app/services/first-login.service';

@Component({
  selector: 'app-first-login',
  templateUrl: './first-login.component.html',
  styleUrls: ['./first-login.component.scss']
})
export class FirstLoginComponent implements OnInit {
  user: User = { _id: this.cookieService.get('userId')} as User;
  minDate: Date;
  constructor(private router: Router, private cookieService: CookieService,
              private firstloginService: FirstLoginService,
              private pNotifyService: PnotifyService) { }

  ngOnInit(): void {
    if (this.cookieService.get('firstLogin') === 'false') {
    this.router.navigate(['/home-user']);
    }
  }

  onSubmit() {

    console.log(this.user);

    if(typeof this.user.fullName === 'undefined'  || this.user.fullName.length === 0 || !this.user.fullName.trim()) {
      this.pNotifyService.error('Lỗi', 'Vui lòng nhập tên');
      return;
    }

    if(typeof this.user.gender === 'undefined'){
      this.pNotifyService.error('Lỗi', 'Vui lòng chọn giới tính');
      return;
    }

    if(typeof this.user.dob === 'undefined'){
      this.pNotifyService.error('Lỗi', 'Vui lòng chọn ngày sinh');
      return;
    }

    let regrex = new RegExp('\^0\d');

    console.log(regrex.test(this.user.phoneNumber));

    if(typeof this.user.phoneNumber === 'undefined'){
      this.pNotifyService.error('Lỗi', 'Vui lòng nhập số điện thoại');
      return;
    }else if(!regrex.test(this.user.phoneNumber)){
      this.pNotifyService.error('Lỗi', 'Định dạng điện thoại là: 0xxxxxxxxx');
      return;
    }

    this.user.firstLogin = 'false';
    this.firstloginService.put(this.user).subscribe( res => {
      this.cookieService.set('firstLogin', 'false');
      this.router.navigate(['/home-user']);
    });
  }
}
