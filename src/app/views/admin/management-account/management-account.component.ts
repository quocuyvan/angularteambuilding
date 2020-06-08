import { Component, OnInit, ViewChild } from '@angular/core';
import { ManagementAccountService } from 'src/app/services/management-account.service';
import { User } from 'src/app/models/user';
import { ModalDirective } from 'ngx-bootstrap/modal/ngx-bootstrap-modal';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { Avatar } from 'src/app/models/avatar';


@Component({
  selector: 'app-management-account',
  templateUrl: './management-account.component.html',
  styleUrls: ['./management-account.component.scss']
})
export class ManagementAccountComponent implements OnInit {
  users: [User];
  user: User = { _id: null} as User;
  baseurl: string;
  @ViewChild('editModal', { static: false }) editModal: ModalDirective;
  searchText: any;
  constructor(private managementAccountServices: ManagementAccountService, private authService: AuthService,
              private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadData();
    this.baseurl = this.apiService.baseUrl;
    this.user.avatar = {} as Avatar;
  }

  logout(){
    this.authService.logout();
  }

  private loadData() {
    this.managementAccountServices.list().subscribe( res => {
      this.users = res;
      console.log(res);
    });
  }

  public hideModal() {
    this.editModal.hide();
  }

  // tslint:disable-next-line: variable-name
  openEdit(event, _id) {
    event.preventDefault();
    this.managementAccountServices.get(_id).subscribe(res => {
      this.user = res;
      this.editModal.show();
    });
  }

  // tslint:disable-next-line: variable-name
  get(_id){
    this.managementAccountServices.get(_id).subscribe(res => {
      this.user = res;
      if (this.user.blocked){
        this.user.blocked = false;
        this.managementAccountServices.edit(this.user).subscribe();
      }
      else {
        this.user.blocked = true;
        this.managementAccountServices.edit(this.user).subscribe();
      }
    });
  }

}

