import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { DataService } from './data.service';
import { tokenData } from './interfaces';

@Injectable()
export class HttperrorInterceptor implements HttpInterceptor {

  constructor(
    private dataService: DataService,
  ) {}


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    request = request.clone({
      //let header = new HttpHeaders({ "Authorization": "Bearer " + this.oauthValue(), "Accept": "application/json"});
      setHeaders: { Authorization: `Bearer ${this.dataService.oauthValue()}`, Accept: `application/json` },
  });

    return next.handle(request).pipe(
      retry(1),
      catchError((error) => {
        if (error.status == 401) {
        //Use the function in data.service rather because (1) it bypasses Intercept requests with HttpBackend, and (2) needs to be available for manual clear (navbar)
          this.dataService.getToken();
        } else  {
          //Stop polling. Components can subscribe to stopPolling to see whether 
          this.dataService.stopPolling.next();
          console.log("Interceptor:Polling stopped for Error: " + error);
          console.log("Interceptor:" + JSON.stringify(request.headers));
        }
        return throwError(() => error);
      }),
    );  
  }
}
