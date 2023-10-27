import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private _hclient: HttpClient) { }


  get_Orders( userToken: string): Observable<any> {
    const newToken = localStorage.getItem('userToken')
   
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userToken}`,
    })

    return this._hclient.get<any>('http://localhost:8000/api/v1/order', { headers: headers });
  }
}
