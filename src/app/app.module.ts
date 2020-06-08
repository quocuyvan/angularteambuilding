import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoteComponent } from './views/note/note.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { RegisterComponent } from './views/register/register.component';
import { FirstLoginComponent } from './views/first-login/first-login.component';
import { HomeUserComponent } from './views/user/home-user/home-user.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { AppGuard } from './app.guard';
import { RoleGuard } from './role.guard';
import { ManagementAccountComponent } from './views/admin/management-account/management-account.component';
// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CreateEventComponent } from './views/user/create-event/create-event.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CreatedEventComponent } from './views/user/created-event/created-event.component';
import { CreateEventDetailComponent } from './views/user/create-event-detail/create-event-detail.component';
import { SafePipe } from './safe.pipe';
import { NgxAutocompleteModule } from 'ngx-angular-autocomplete';
import { HomeAdminComponent } from './views/admin/home-admin/home-admin.component';
import { ValidatorsModule } from "ngx-validators";
import { EditProfileComponent } from './views/user/edit-profile/edit-profile.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { StationDetailComponent } from './views/user/create-event-detail/station-detail/station-detail.component';
import { TeamDetailComponent } from './views/user/create-event-detail/team-detail/team-detail.component';
import { ParticipatingEventComponent } from './views/user/participating-event/participating-event.component';
import { ParticipatingEventDetailComponent } from './views/user/participating-event-detail/participating-event-detail.component';
import { HomeRunningEventComponent } from './views/user/running-event/home-running-event/home-running-event.component';
import { TeamInfoComponent } from './views/user/running-event/team-info/team-info.component';
import { TeamLogComponent } from './views/user/running-event/team-log/team-log.component';
import { ReceiveCryptogramComponent } from './views/user/running-event/main-event/receive-cryptogram/receive-cryptogram.component';
import { AccessStationComponent } from './views/user/running-event/main-event/access-station/access-station.component';
import { StationChallengeComponent } from './views/user/running-event/main-event/station-challenge/station-challenge.component';
import { EventEndingComponent } from './views/user/running-event/main-event/event-ending/event-ending.component';
import { ScannerComponent } from './views/user/running-event/main-event/scanner/scanner.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@NgModule({
  declarations: [
    AppComponent,
    NoteComponent,
    LoginComponent,
    HomeComponent,
    PageNotFoundComponent,
    RegisterComponent,
    FirstLoginComponent,
    HomeUserComponent,
    ManagementAccountComponent,
    CreateEventComponent,
    CreatedEventComponent,
    CreateEventDetailComponent,
    SafePipe,
    HomeAdminComponent,
    EditProfileComponent,
    StationDetailComponent,
    TeamDetailComponent,
    ParticipatingEventComponent,
    ParticipatingEventDetailComponent,
    HomeRunningEventComponent,
    TeamInfoComponent,
    TeamLogComponent,
    ReceiveCryptogramComponent,
    AccessStationComponent,
    StationChallengeComponent,
    EventEndingComponent,
    ScannerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ValidatorsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    Ng2SearchPipeModule,
    BsDatepickerModule.forRoot(),
    NgxAutocompleteModule,
    DragDropModule,
    ZXingScannerModule,

  ],
  providers: [
    CookieService,
    AppGuard,
    RoleGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
