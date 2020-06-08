import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { VuforiaTarget } from '../models/vuforiatarget';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VuforiaService {

  constructor(private apiService: ApiService) { }
  addCloud(data: VuforiaTarget): Observable<VuforiaTarget> {
    return this.apiService.post<VuforiaTarget>(this.apiService.apiUrl.vuforiaAddCloud, data);
  }

  cloudReco(data: VuforiaTarget): Observable<VuforiaTarget> {
    return this.apiService.post<VuforiaTarget>(this.apiService.apiUrl.vuforiaCloudReco, data);
  }
}
