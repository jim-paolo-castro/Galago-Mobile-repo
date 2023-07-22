import { Injectable, NgModule, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {


    constructor() {}
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
      const TOKEN_KEY = localStorage.getItem('TOKEN_KEY')
      const headers = new HttpHeaders({
        'Accept': '*/*',
        'Authorization': TOKEN_KEY ? TOKEN_KEY : '',
        'Content-Type': 'application/json',
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