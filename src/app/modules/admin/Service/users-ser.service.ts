import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UsersSerService {

  constructor(private _hclient: HttpClient) { }

  get_(userToken: string):Observable<any>{
    const newToken = localStorage.getItem('userToken')

    

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userToken}`,
    })

    return this._hclient.get<any>('http://localhost:8000/api/v1/users', { headers: headers });
  }



  get_oneUser(iid:string ,userToken: string):Observable<any>{
    const newToken = localStorage.getItem('userToken')

    

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userToken}`,
    })

    return this._hclient.get<any>('http://localhost:8000/api/v1/users/'+iid ,{ headers: headers } );
  }



  delete_(iid:string , userToken:string):Observable<any>{
    const newToken = localStorage.getItem('userToken')

    

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userToken}`,
    })

    return this._hclient.delete('http://localhost:8000/api/v1/users/'+iid ,{ headers: headers } )
    
  }



}

