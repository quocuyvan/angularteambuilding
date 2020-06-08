import { Component, OnInit, ViewChild } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { Note } from '../../models/note';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { TeamService } from 'src/app/services/team.service';


@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  @ViewChild('editModal', { static: false }) editModal: ModalDirective;
  notes: [Note];
  note: Note = { id: null} as Note;
  user: User = { id: null } as User;


  constructor(private http: HttpClient, private router: Router, private noteService: NoteService,
              private userService: UserService, private teamService: TeamService) { }


  ngOnInit() {
    this.loadData();


    // setInterval(() => {
    // this.checkRunningEvent(); }, 4000);
  }

  checkRunningEvent() {
    this.userService.get().subscribe( res => {
      this.user = res;
      for (const val of Object.values((this.user.teamdetails))) {
      console.log(val.team);
      this.teamService.get(val.team).subscribe( res => {
        console.log(res.project.isRunning);
        if (res.project.isRunning) {
          this.router.navigate(['/notes']);
        }
        else {
          this.router.navigate(['/home-user']);
        }
      });

    }
  });
  }

  private loadData() {
    this.noteService.list().subscribe( res => {
      this.notes = res;
      console.log(res);
    });
  }
  openAdd() {
    this.note = {id: null} as Note;
    this.editModal.show();
  }

  openEdit(event, id) {
    event.preventDefault();
    this.noteService.get(id).subscribe(res => {
      this.note = res;
      this.editModal.show();
    });
  }

  delete(event, id) {
    event.preventDefault();
    this.noteService.delete(id).subscribe( res => {
        this.loadData();
    });
  }

  public hideModal() {
    this.editModal.hide();
  }

  save() {
    this.noteService.save(this.note).subscribe( res => {
        this.editModal.hide();
        this.loadData();
    }, err => {
      console.log('Update failed!');
    });
  }
}
