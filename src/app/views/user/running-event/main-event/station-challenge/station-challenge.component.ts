import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { CookieService } from 'ngx-cookie-service';
import { Station } from 'src/app/models/station';
import { StationService } from 'src/app/services/station.service';
import { UploadfileService } from 'src/app/services/uploadfile.service';
import { Avatar } from 'src/app/models/avatar';
import { VuforiaService } from 'src/app/services/vuforia.service';
import { VuforiaTarget } from 'src/app/models/vuforiatarget';

@Component({
  selector: 'app-station-challenge',
  templateUrl: './station-challenge.component.html',
  styleUrls: ['./station-challenge.component.scss']
})
export class StationChallengeComponent implements OnInit {
  user: User = { _id: null} as User;
  baseurl: string;
  avatarurl: string;

  station: Station = { _id: null} as Station;
  descriptionurl;
  fileToUpload: File = null;
  vuforiaTarget: VuforiaTarget = { id: null} as VuforiaTarget;

  searchText: any;
  constructor(private userService: UserService, private authService: AuthService,
              private apiService: ApiService, private cookieService: CookieService,
              private stationService: StationService, private uploadfileService: UploadfileService,
              private vuforiaService: VuforiaService) { }

              
  ngOnInit(): void {
    this.baseurl = this.apiService.baseUrl;
    this.userService.get().subscribe( res => {
      this.user = res;
      this.avatarurl = this.baseurl + this.user.avatar.url;
    });

    this.loadData();

  }

  logout(){
    this.authService.logout();
  }

  loadData()
  {
    this.stationService.get(this.cookieService.get('scanStationId')).toPromise().then( res => {
      this.station = res;
      this.descriptionurl = this.station.descriptionz.url;
    });
  }

  // tslint:disable-next-line: member-ordering
  handleFileTaken(files: FileList) {
    this.fileToUpload = files.item(0);
    this.uploadfileService.postFile(this.fileToUpload).subscribe(res => {
      this.vuforiaTarget.url =  this.baseurl + res[0].url;
      this.vuforiaService.cloudReco(this.vuforiaTarget).toPromise().then( res2 => {
        for (let i = 0; i < res2.results.length; i++)
        {
          if (res2.results[i].target_id == this.station.vuforiaID)
          {
            console.log('yes');
          }
        }
      });
      // do something, if upload success
      }, error => {
        console.log(error);
      });
  }


}

