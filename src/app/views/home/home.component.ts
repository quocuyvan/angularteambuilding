import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private cookieService: CookieService) { }
  title = 'frontend';

  ngOnInit(): void {
    if (this.authService.isLoggedIn) {
      if (this.cookieService.get('role') === 'Administrator') {
        this.router.navigate(['/home-admin']);
      }
      else {
        this.router.navigate(['/home-user']);
      }
    }
  }
}
