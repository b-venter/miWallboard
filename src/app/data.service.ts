import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, Subject, timer } from 'rxjs';
import { retry, share, switchMap, takeUntil } from 'rxjs/operators';

import { tokenData } from './interfaces';

/*This is to read the settings from our conf file */
import { AppConfig } from './app.config';

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnDestroy {

  //oauthtkn:
  get oauthtkn() {return localStorage.getItem('wbToken');}

  private stopPolling = new Subject();

  constructor(
    private http: HttpClient,
    private config: AppConfig,
    ) {}

    //micc: string = "http://10.49.0.13/";
    micc: string = "http://" + this.config.getConfig().serverUrl + "/";
    uName: string = this.config.getConfig().apiUsername;
    pWord: string = this.config.getConfig().apiPassword;
    pollTimer: number = this.config.getConfig().refreshTime * 1000;

  
  //GET Token
  getToken() {
    let header = new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded", });
    const requestOptions = { headers: header};
    //var body = "grant_type=password&username=user&password=password";
    var body = "grant_type=password&username=" + this.uName + "&password=" + this.pWord;

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
    return timer(1, this.pollTimer).pipe(
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
    return timer(1, this.pollTimer).pipe(
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
