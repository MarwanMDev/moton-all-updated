import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

const BASE_URL = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class AddNewEventService {
  patchValue(arg0: {
    _id: any;
    name: any;
    language: any;
    type: any;
    image: any;
  }) {
    throw new Error('Method not implemented.');
  }

  constructor(private httpClient: HttpClient) {}

  Upload_image(image_data: any, userToken: string): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + userToken
    );

    return this.httpClient.post<any>(
      BASE_URL + 'eventimageupload/eventimage',
      image_data,
      { headers }
    );
  }

  Add_event(event_data: object, userToken: string): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + userToken
    );

    return this.httpClient.post(BASE_URL + 'events', event_data, {
      headers,
    });
  }

  delete_event(iid: string, userToken: string): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + userToken
    );

    return this.httpClient.delete(BASE_URL + 'events/' + iid, {
      headers,
    });
  }

  get_event(): Observable<any> {
    return this.httpClient.get(BASE_URL + 'events');
  }
}
