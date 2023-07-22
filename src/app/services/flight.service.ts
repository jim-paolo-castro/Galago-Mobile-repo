import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  constructor(
    private globalSrvc: GlobalService,
    private http: HttpClient
    ) { }

  searchAirport(query: string): Observable<any>{
    return this.http.get(`${this.globalSrvc.baseUrlForAutoFill}/api/get/airport-code-autofill?${query}`)
  }

}
