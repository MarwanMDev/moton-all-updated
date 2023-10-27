import { BookIF } from './../interface/book-if';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

const BASE_URL = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class AddNewBookService {
  constructor(private _hclient: HttpClient) {}

  Upload_image(image_data: any, userToken: string): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + userToken
    );

    return this._hclient.post<any>(
      BASE_URL + 'bookimageupload/bookImage',
      image_data,
      { headers }
    );
  }

  Upload_pfd(pdf_data: any, userToken: string): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + userToken
    );

    return this._hclient.post<any>(
      BASE_URL + 'upload/pdf',
      pdf_data,
      { headers }
    );
  }

  Add_book(book_data: object, userToken: string): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + userToken
    );

    return this._hclient.post(BASE_URL + 'books', book_data, {
      headers,
    });
  }

  get_book(): Observable<any> {
    return this._hclient.get(BASE_URL + 'books');
  }

  delete_book(iid: string, userToken: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userToken}`,
    });

    return this._hclient.delete(BASE_URL + 'books/' + iid, {
      headers: headers,
    });
  }

  Update_book(book: BookIF): Observable<any> {
    return this._hclient.put(BASE_URL + 'books/' + book._id, book);
  }
}
