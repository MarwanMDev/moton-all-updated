import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userdata = new BehaviorSubject<any>(null);

  constructor(private _hclient :HttpClient ,private _Router:Router) {
    if(localStorage.getItem('userToken') !== null){
      this.decodeUserData();
    }
   }

  decodeUserData(){
    // let enCodedToken = JSON.stringify( localStorage.getItem('userToken')!);
    // let deCodedToken:any = jwtDecode(enCodedToken);
    // console.log(deCodedToken);
    // this.userdata.next( deCodedToken)    
    const enCodedToken = localStorage.getItem('userToken'); // No need to stringify here.
  if (enCodedToken) {
    const deCodedToken: any = jwtDecode(enCodedToken);
    // console.log(deCodedToken);
    this.userdata.next(deCodedToken);
  }
    
  }

  login(user_data:object):Observable<any>
  {
    return this._hclient.post('http://localhost:8000/api/v1/auth/login' , user_data )
  }

  logOut(){
    localStorage.removeItem('userToken');
    this.userdata.next(null);
    this._Router.navigate(['/login']);
  }

  forget_pass(user_data:object):Observable<any>
  {
    return this._hclient.post('http://localhost:8000/api/v1/auth/forgotPassword' , user_data )
  }
}
