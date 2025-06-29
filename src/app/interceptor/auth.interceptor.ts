import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {}

  intercept(httpRequest: HttpRequest<any>, HttpHandler: HttpHandler): Observable<HttpEvent<any>> {
    if(httpRequest.url.includes(`${this.authenticationService.host}/user/login`) 
      || httpRequest.url.includes(`${this.authenticationService.host}/user/register`)
      || httpRequest.url.includes(`${this.authenticationService.host}/user/resetPassword`)){
        return HttpHandler.handle(httpRequest);
    }

    // modify the request when it's not any of those requests
    this.authenticationService.loadToken();
    const token = this.authenticationService.getToken();
    const request = httpRequest.clone({
      setHeaders:{
        Authorization: `Bearer ${token}` // add the token to the request headers
      }
    });
    return HttpHandler.handle(request);
  }
}
 