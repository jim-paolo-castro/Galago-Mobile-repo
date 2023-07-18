// import { ToastController, App, AlertController } from 'ionic-angular';
import { Injectable, NgModule, ViewChild } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HTTP_INTERCEPTORS, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
// import { SocketProvider } from '../providers/socket';


@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {
  constructor(
    // public toastContrl: ToastController,
    // public alertCtrl: AlertController,
    // public app: App
    ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }, async (err: any) => {
      if (err instanceof HttpErrorResponse) {
        console.log("I got the error",err)
        // if(err.status === 401 || err.status === 403){
        if(err.status === 403){
          console.log("error 403!!!!")
          localStorage.clear()
          // this.app.getActiveNav().setRoot('LoginPage')
          // this.toastContrl.create({message: 'Your session timed out', duration: 4000}).present()
          // this.alertCtrl.create({message: })
        }
        // } else if (err.status === 403) {
        //   this.toastr.info(`Admin removed your access.`, 'Access Denied')
        //   // this.authService.changeAuthState(false)
        //   this.authService.clearStorage()
        //   if(err.error.code === 'E_UN_AUTHORIZED') this.router.navigateByUrl('/')
        // }
        return;
      }
    })
    )
  }
}

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpsRequestInterceptor, multi: true },
  ]
})
export class ResponseInterceptorModule { }
