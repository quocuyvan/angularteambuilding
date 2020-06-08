import { Component, OnInit } from '@angular/core';
import { StationService } from 'src/app/services/station.service';
import { Station } from 'src/app/models/station';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from 'src/app/services/api.service';
import { UploadfileService } from 'src/app/services/uploadfile.service';
import { Router } from '@angular/router';
import Map from 'ol/Map';
import { OlmapService } from 'src/app/services/olmap.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { VuforiaTarget } from 'src/app/models/vuforiatarget';
import { VuforiaService } from 'src/app/services/vuforia.service';

@Component({
  selector: 'app-station-detail',
  templateUrl: './station-detail.component.html',
  styleUrls: ['./station-detail.component.scss']
})
export class StationDetailComponent implements OnInit {
  baseurl: string;
  station: Station = { id: null } as Station;
  fileToUpload: File = null;
  map: Map;
  user: User = { id: null } as User;
  avatarurl: string;
  vuforiaTarget: VuforiaTarget = { id: null } as VuforiaTarget;


  constructor(private cookieService: CookieService, private stationService: StationService,
              private apiService: ApiService, private uploadfileService: UploadfileService,
              private router: Router, private olMapService: OlmapService,
              private authService: AuthService, private userService: UserService,
              private vuforiaService: VuforiaService) { }

  ngOnInit(): void {
    this.baseurl = this.apiService.baseUrl;
    this.loadStation();
    this.map = this.olMapService.show();
    this.userService.get().subscribe( res => {
      this.user = res;
      this.avatarurl = this.baseurl + this.user.avatar.url;
    });
  }

  private loadStation() {
    this.stationService.get(this.cookieService.get('stationId')).subscribe( res => {
      this.station = res;
    });
  }

    // tslint:disable-next-line: member-ordering
    inputimgid;

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.uploadfileService.postFile(this.fileToUpload).subscribe(res => {
      this.inputimgid =  JSON.parse(JSON.stringify(res));
      // do something, if upload success
      }, error => {
        console.log(error);
      });
  }

    // tslint:disable-next-line: member-ordering
    outputimgid;
  handleFileOutput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.uploadfileService.postFile(this.fileToUpload).subscribe(res => {
      this.outputimgid =  JSON.parse(JSON.stringify(res));
      // do something, if upload success
      }, error => {
        console.log(error);
      });
  }

      // tslint:disable-next-line: member-ordering
    descriptionzimgid;
  handleFileDescriptionz(files: FileList) {
    this.fileToUpload = files.item(0);
    this.uploadfileService.postFile(this.fileToUpload).subscribe(res => {
      this.descriptionzimgid =  JSON.parse(JSON.stringify(res));
      // do something, if upload success
      }, error => {
        console.log(error);
      });
  }

  openMap($event) {

  }

  saveStation() {
    this.uploadfileService.deleteFile(this.station.inputId);
    this.uploadfileService.deleteFile(this.station.outputId);
    this.uploadfileService.deleteFile(this.station.descriptionzId);

    this.station.inputId = this.inputimgid;
    this.station.outputId = this.outputimgid;
    this.station.descriptionzId = this.descriptionzimgid;
    this.station.location = this.cookieService.get('locationCoor');
    this.stationService.edit(this.station).toPromise().then( res => {
      var randomstring = Math.random().toString(36).slice(-8);
      this.vuforiaTarget.name = res.output.hash + randomstring;
      this.vuforiaTarget.url =  this.baseurl + res.output.url;
      this.vuforiaService.addCloud(this.vuforiaTarget).toPromise().then( res2 => {
        this.station.vuforiaID = res2.target_id;
        this.stationService.edit(this.station).toPromise().then();
      });
      this.router.navigate(['/create-event-detail'])
  }, err => {
    console.log('Update failed!');
  });
  }

  back() {
    this.router.navigate(['/create-event-detail'])
  }

  logout(){
    this.authService.logout();
  }
}
