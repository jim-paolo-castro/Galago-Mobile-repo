import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private globalSrvc: GlobalService) { }

  verifyEmail(email: string): Observable<any>{
    return this.http.post(`${this.globalSrvc.baseUrl}/auth/verify-email`, {email})
  }

  signIn(data: Object): Observable<any>{
    return this.http.post(`${this.globalSrvc.baseUrl}/auth/sign-in`, data)
  }

  createAccount(data: Object): Observable<any>{
    return this.http.post(`${this.globalSrvc.baseUrl}/auth/sign-up`, data)
  }

  // handleError(error:htt)
}
