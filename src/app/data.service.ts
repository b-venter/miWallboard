import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  micc: string = "http://10.49.0.13/";
  oauthtkn: string = "geECwmVQ7ShDkYp3T97MKhuW7NbEIGaWvHZqUvotAE2ev_OAX55EMDh_7rrGa3CqfRU99hjtkkuWo1LxyzvWEDeSNBd7pPyC-2YABqN2twaiC_CIdc3-S28BA-Uhb8acUR9DGmefSteTZuikVYklaIvmri5W-O7Dg-Ag_2aO5swaTN11PGbA7buAdbSvvkNnZDwyok0xiPXS050DKq7jxI0GXQ8NzCZ1xO1IuQUNaO7yDqvINR_RzBCe7G4d4yRIymVyjmxTjWAoYWNGyjlQVa5N7XzJRh-8LIhmhSMrjumvIvj0woFLc_GtafgmTuUPJT0uQo2bVI78t42ns-4qELVyVv67Aty4B2dBa63yWAxY6E6LaJFHZ0tmAQnPCH1OY38SdqDmCujl8iqe9gNyCILCSbU2OQXlbjCT02LzkdS25Ye2GK_jD2n9GaWL1T1PgkBksv1tBgAZrWkfU7jFB-glQiMxsC4Q8PHJQc2e-WjlmddnIRU_qwHR71XQyvhv7_K6jQgz-VwJOQ4nOFTpy5EjIOUZCxpmVdGBzARJ_7yv_C-ubMP3WAvYFYccYJdWk0gmB-PQalM_7oqZ7jhiuFMQGmb7yBWrjmL97vPfGmN--icO8EwfUXwIr2aiAHSRkzRpF4sqxcdj9F-LoL46MLI8mPo";

  constructor(private http: HttpClient) { }

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
      )
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
      )
    );
  }

}
