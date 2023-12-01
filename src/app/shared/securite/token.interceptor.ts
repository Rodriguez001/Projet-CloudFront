import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  entetes:any;

  constructor(private user: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   
    // if I'm connected and I have a token inside my profil
    if(this.user.isloggedIn && this.user.profil.token!.length > 0) {
    // Creation of new headers
    this.entetes = {
      Headers: new HttpHeaders(
        {'Authorization': 'Bearer ' + this.user.profil.token} //token is added to the headers
      )
    };
    const httpToken = request.clone(this.entetes); // Clone of initial request and adding 
    return next.handle(httpToken); // return of the new request
    } else {
      return next.handle(request); // Else return the original request
    }
    
  }
}
