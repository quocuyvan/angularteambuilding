import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoteComponent } from './views/note/note.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { RegisterComponent } from './views/register/register.component';
import { FirstLoginComponent } from './views/first-login/first-login.component';
import { HomeUserComponent } from './views/user/home-user/home-user.component';
import { AppGuard } from './app.guard';
import { RoleGuard } from './role.guard';
import { ManagementAccountComponent } from './views/admin/management-account/management-account.component';
import { CreateEventComponent } from './views/user/create-event/create-event.component';
import { CreatedEventComponent } from './views/user/created-event/created-event.component';
import { CreateEventDetailComponent } from './views/user/create-event-detail/create-event-detail.component';
import { HomeAdminComponent } from './views/admin/home-admin/home-admin.component';
import { EditProfileComponent } from './views/user/edit-profile/edit-profile.component';
import { StationDetailComponent } from './views/user/create-event-detail/station-detail/station-detail.component';
import { TeamDetailComponent } from './views/user/create-event-detail/team-detail/team-detail.component';
import { ParticipatingEventComponent } from './views/user/participating-event/participating-event.component';
import { ParticipatingEventDetailComponent } from './views/user/participating-event-detail/participating-event-detail.component';
import { HomeRunningEventComponent } from './views/user/running-event/home-running-event/home-running-event.component';
import { TeamInfoComponent } from './views/user/running-event/team-info/team-info.component';
import { TeamLogComponent } from './views/user/running-event/team-log/team-log.component';
import { AccessStationComponent } from './views/user/running-event/main-event/access-station/access-station.component';
import { EventEndingComponent } from './views/user/running-event/main-event/event-ending/event-ending.component';
import { ReceiveCryptogramComponent } from './views/user/running-event/main-event/receive-cryptogram/receive-cryptogram.component';
import { StationChallengeComponent } from './views/user/running-event/main-event/station-challenge/station-challenge.component';
import { ScannerComponent } from './views/user/running-event/main-event/scanner/scanner.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'notes', component: NoteComponent},
  { path: 'login', component: LoginComponent},
  { path: 'first-login', component: FirstLoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'home-user', component: HomeUserComponent, canActivate: [AppGuard]},
  { path: 'home-admin', component: HomeAdminComponent, canActivate: [RoleGuard], data: {role: 'Administrator'}},
  { path: 'management-account', component: ManagementAccountComponent, canActivate: [RoleGuard], data: {role: 'Administrator'}},
  { path: 'create-event', component: CreateEventComponent},
  { path: 'created-event', component: CreatedEventComponent},
  { path: 'create-event-detail', component: CreateEventDetailComponent},
  { path: 'station-detail', component: StationDetailComponent},
  { path: 'team-detail', component: TeamDetailComponent},
  { path: 'edit-profile', component: EditProfileComponent},
  { path: 'participating-event', component: ParticipatingEventComponent},
  { path: 'participating-event-detail', component: ParticipatingEventDetailComponent},
  { path: 'home-running-event', component: HomeRunningEventComponent},
  { path: 'team-log', component: TeamLogComponent},
  { path: 'team-info', component: TeamInfoComponent},
  { path: 'receive-cryptogram', component: ReceiveCryptogramComponent},
  { path: 'scanner', component: ScannerComponent},
  { path: 'access-station', component: AccessStationComponent},
  { path: 'station-challenge', component: StationChallengeComponent},
  { path: 'event-ending', component: EventEndingComponent},

  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

