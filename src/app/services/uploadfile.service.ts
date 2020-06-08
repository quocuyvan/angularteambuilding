import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadfileService {


  constructor(private apiService: ApiService) { }

  postFile(fileToUpload: File): Observable<boolean> {
    const formData: FormData = new FormData();
    formData.append('files', fileToUpload, fileToUpload.name);
    return this.apiService.postnoheader(this.apiService.apiUrl.upload, formData);
  }

  deleteFile(id: string): Observable<boolean> {
    return this.apiService.delete(`${this.apiService.apiUrl.upload}/${id}`);
  }

  get(id): Observable<File> {
    return this.apiService.getnoheader<File>(`${this.apiService.apiUrl.upload}/files/${id}`);
  }
}
