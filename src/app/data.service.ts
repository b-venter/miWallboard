import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpBackend, HttpHeaders } from '@angular/common/http';

import { Observable, Subject, throwError, timer, from, of, observable } from 'rxjs';
import { share, switchMap, takeUntil, catchError, retryWhen, delay, take, map } from 'rxjs/operators';

import { tokenData } from './interfaces';

/*This is to read the settings from our conf file */
import { AppConfig } from './app.config';


@Injectable({
  providedIn: 'root'
})
export class DataService implements OnDestroy {

  //oauthtkn: Provides wbToken as an observable
  oauthtkn() {
      return of(localStorage.getItem('wbToken'));
    }

  oauthValue() {
    var _oauthtkn1 : string | null = null;
    let _oauthtkn = this.oauthtkn().subscribe(token => _oauthtkn1 = token);
    return _oauthtkn1;
  }

  public stopPolling = new Subject();

  constructor(
    private http: HttpClient,
    private http2: HttpClient, //See GetToken. USed to bypass Interceptor
    private config: AppConfig,
    private handler: HttpBackend,
    ) {}

    micc: string = "http://" + this.config.getConfig().serverUrl + "/";
    uName: string = this.config.getConfig().apiUsername;
    pWord: string = this.config.getConfig().apiPassword;
    pollTimer: number = this.config.getConfig().refreshTime * 1000;

  
  //Auth Token retrieval from server: activated by button (navbar) or automatically (interceptor on 401)
  getToken(){
    console.log("Getting new token...");
    this.http2 = new HttpClient(this.handler); //To bypass interceptor
    let header = new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded", });
          const requestOptions = { headers: header};
          var body = "grant_type=password&username=" + this.uName + "&password=" + this.pWord;
          this.http2.post<tokenData>(this.micc + "AuthorizationServer/Token", body, requestOptions).subscribe(
            oauth => {
              localStorage.setItem('wbToken', oauth.access_token);
              console.log("Expiry time: " + oauth.expires_in);
            }, 
            //On error...
            () => console.error("Failed to get token - static."),
          );
  }

  //Clear token
  delToken(){
    localStorage.removeItem('wbToken');
  }


  //Server poll
  apiPolling(path: string) : Observable<any[]>{
    //Poll MiCCB server
    //https://blog.angulartraining.com/how-to-do-polling-with-rxjs-and-angular-50d635574965
    return timer(1, this.pollTimer).pipe(
      //1000 = 1 second, 60000 = 1 minute
      switchMap(
        () => this.http.get<any[]>(this.micc + path),
      ),
      retryWhen(error => error.pipe(delay(20000), take(5))),
      share(),
      takeUntil(this.stopPolling)
    );

    //Alternate return for once-off (non-polling) test
    //return this.http.get<any[]>(this.micc + "MiccSdk/api/v1/agents/states", requestOptions);

  }

  //GET AGENTS STATE
  getAgentsState(): Observable<any[]> {
    var path = "MiccSdk/api/v1/agents/states";
    return this.apiPolling(path);
  }

  //GET QUEUE STATE
  getQueuesState(): Observable<any[]> {
    var path = "MiccSdk/api/v1/queues/state";
    return this.apiPolling(path);
  }

  ngOnDestroy() {
    this.stopPolling.next();
 }


}
