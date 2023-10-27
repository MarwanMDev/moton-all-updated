import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdminMessageService {

  constructor(private _hclient: HttpClient) { }

  get_Message(userToken: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + userToken);

    return this._hclient.get('http://localhost:8000/api/v1/contact', { headers });
  }

 
  delete_Message(iid:string  ,userToken:string ):Observable<any>{
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + userToken);
    return this._hclient.delete('http://localhost:8000/api/v1/contact/'+iid , { headers })
  }
}
