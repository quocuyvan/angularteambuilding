import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/internal/Observable';
import { Note } from '../models/note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private apiService: ApiService) { }

  list(): Observable<[Note]> {
    return this.apiService.get<[Note]>(this.apiService.apiUrl.notes);
  }
  get(id): Observable<Note> {
    return this.apiService.get<Note>(`${this.apiService.apiUrl.notes}/${id}`);
  }
  save(data: Note): Observable<Note> {
    if (data.id === null) {
      return this.apiService.post<Note>(this.apiService.apiUrl.notes, data);
    } else {
      return this.apiService.put<Note>(`${this.apiService.apiUrl.notes}/${data.id}`, data);
    }
  }
  delete(id: string): Observable<Note> {
    return this.apiService.delete<Note>(`${this.apiService.apiUrl.notes}/${id}`);
  }
}
