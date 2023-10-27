import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class InterfaceServiceService {

  constructor(private _hclient: HttpClient) { }

  Add_photo(photo_data: object, userToken: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + userToken);

    return this._hclient.post('http://localhost:8000/api/v1/categories', photo_data , { headers });
  }

  
}
