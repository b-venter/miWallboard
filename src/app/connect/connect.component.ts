import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';

import { DataService } from '../data.service';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss']
})
export class ConnectComponent implements OnInit {

  constructor(private dataService: DataService,) {}

  ngOnInit(): void {
  }

  checkToken() {
    if (this.dataService.oauthtkn){
      return this.dataService.oauthtkn();
    }
    return of(null);
  }

}
