import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryIf } from '../interface/category-if';
import { environment } from 'src/app/environments/environment';

const BASE_URL = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class AddCatService {
  constructor(private _hclient: HttpClient) {}

  Upload_image(image_data: any, userToken: string): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + userToken
    );

    return this._hclient.post<any>(
      BASE_URL + 'categoryimageupload/categoryImage',
      image_data,
      { headers }
    );
  }

  Add_Cat(cat_data: any, userToken: string): Observable<any> {
    const newToken = localStorage.getItem('userToken');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userToken}`,
    });

    return this._hclient.post<any>(
      BASE_URL + 'categories',
      cat_data,
      { headers: headers }
    );
  }

  delete_cat(iid: string, userToken: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userToken}`,
    });

    return this._hclient.delete(BASE_URL + 'categories/' + iid, {
      headers: headers,
    });
  }

  get_cat(): Observable<any> {
    return this._hclient.get(BASE_URL + 'categories');
  }
}
