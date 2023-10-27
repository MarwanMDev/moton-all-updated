import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PublisherIF } from '../interface/publisher-if';

@Injectable({
  providedIn: 'root'
})
export class AddPublisherService {

  constructor(private _hclient: HttpClient) { }

  Upload_image(image_data: any, userToken: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + userToken);

    return this._hclient.post<any>('http://localhost:8000/api/v1/userimageupload/userimage', image_data, { headers });
  }


  Add_Publisher(Publisher_data: object, userToken: string): Observable<any> {
    const newToken = localStorage.getItem('userToken')
    

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userToken}`,
    })

    return this._hclient.post<any>('http://localhost:8000/api/v1/users', Publisher_data, { headers });
  }


}
