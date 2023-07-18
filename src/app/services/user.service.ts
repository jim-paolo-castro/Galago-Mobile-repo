import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  verifyEmail(email: string): Observable<any>{
    return this.http.post(`${environment.baseUrl}/auth/verify-email`, {email})
  }

  signIn(data: Object): Observable<any>{
    return this.http.post(`${environment.baseUrl}/auth/sign-in`, data)
  }

  // handleError(error:htt)
}
