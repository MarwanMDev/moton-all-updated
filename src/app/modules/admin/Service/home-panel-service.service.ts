import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

const BASE_URL = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class HomePanelServiceService {
  constructor(private httpClient: HttpClient) {}

  GetTotalPrice(): Observable<any> {
    return this.httpClient.get<any>(BASE_URL + 'order/totalPrices');
  }
}
