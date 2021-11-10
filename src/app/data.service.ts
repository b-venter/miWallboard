import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, Subject, timer } from 'rxjs';
import { retry, share, switchMap, takeUntil } from 'rxjs/operators';

import { tokenData } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnDestroy {
  micc: string = "http://10.49.0.13/";

  //oauthtkn:
  get oauthtkn() {return localStorage.getItem('wbToken');}

  private stopPolling = new Subject();

  constructor(private http: HttpClient) {}

  //GET Token
  getToken() {
    let header = new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded", });
    const requestOptions = { headers: header};
    //var body = "grant_type=password&username=_admin&password=_password";
    var body = "grant_type=password&username=wallboard&password=abTyefAdarchesh0";

    this.http.post<tokenData>(this.micc + "AuthorizationServer/Token", body, requestOptions).subscribe(
      oauth => localStorage.setItem('wbToken', oauth.access_token),
      () => console.error("Failed to get token."),
    );
  }

  //Clear token
  delToken(){
    localStorage.removeItem('wbToken');
  }

  //GET AGENTS STATE
  getAgentsState(): Observable<any[]> {
    //Set headers
    let header = new HttpHeaders({ "Authorization": "Bearer " + this.oauthtkn, "Accept": "application/json"});
    const requestOptions = { headers: header};
    
    //Poll MiCCB server
    //https://blog.angulartraining.com/how-to-do-polling-with-rxjs-and-angular-50d635574965
    return timer(1, 30000).pipe(
      //1000 = 1 second, 60000 = 1 minute
      switchMap(
        () => this.http.get<any[]>(this.micc + "MiccSdk/api/v1/agents/states", requestOptions)
      ),
      retry(),
      share(),
      takeUntil(this.stopPolling)
    );

    //Alternate return for once-off (non-polling) test
    //return this.http.get<any[]>(this.micc + "MiccSdk/api/v1/agents/states", requestOptions);
  }

  //GET QUEUE STATE
  getQueuesState(): Observable<any[]> {
    //Set headers
    let header = new HttpHeaders({ "Authorization": "Bearer " + this.oauthtkn, "Accept": "application/json"});
    const requestOptions = { headers: header};
    
    //Poll MiCCB server
    return timer(1, 30000).pipe(
      //1000 = 1 second, 60000 = 1 minute
      switchMap(
        () => this.http.get<any[]>(this.micc + "MiccSdk/api/v1/queues/state", requestOptions)
      ),
      retry(),
      share(),
      takeUntil(this.stopPolling)
    );
  }

  ngOnDestroy() {
    this.stopPolling.next();
 }

}
