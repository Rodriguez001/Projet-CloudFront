import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class Auth401Interceptor implements HttpInterceptor {

  constructor(private user: AuthService, private router: Router) {}
  // Interception of the request in the sending process
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Filtering of the request with the pipe
    return next.handle(request).pipe(
      erreur => {
        // if we have an error- on the request with 401 status (sent by the server)
        if(erreur instanceof HttpErrorResponse && erreur.status == 401){
          this.user.isloggedIn = false; // User is logged out
          this.router.navigateByUrl('/connexion'); // We go back to connexion page
        }
        return erreur;
      }
    );
  }
}
