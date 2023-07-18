import { Injectable, NgModule, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {

    deviceId = "e364dbcf-435f-38b5-99e5-dceb7debb43f"

    constructor() {
      // this.deviceId = localStorage.getItem("DEVICE_ID_KEY")
    }
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
      const TOKEN_KEY = localStorage.getItem('TOKEN_KEY')
      const headers = new HttpHeaders({
        'Content-Type':'application/x-www-form-urlencoded',
        // 'Accept': 'application/x.laravel-boilerplate.v1+json',
        'Accept': 'application/json',
        'Authorization': TOKEN_KEY ? TOKEN_KEY : '',
        'x-device': this.deviceId
      })

      const dupReq = req.clone({ headers });
      return next.handle(dupReq)

    }
};
@NgModule({
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpsRequestInterceptor, multi: true },
    ]
})
export class HeaderInterceptorModule { }