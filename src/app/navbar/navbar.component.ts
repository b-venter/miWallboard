import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';

import { DataService } from '../data.service';

/*This is to read the settings from our conf file */
import { AppConfig } from '../app.config';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private config: AppConfig
    ) { }

  boardBanner = this.config.getConfig().wallBanner || "MiContact Center Business Wallboard";

    //Quick access to token
  shToken: string | null = this.dataService.oauthtkn;

  ngOnInit(): void {}

  initConnect() {
    this.dataService.getToken();
    this. shToken = this.dataService.oauthtkn;
  }

  clearConn(){
    this.dataService.delToken();
    this. shToken = this.dataService.oauthtkn;
  }

  checkToken() {
    if (this.dataService.oauthtkn){
      return of<string>(this.dataService.oauthtkn);
    }
    return of(null);
  }
  

}
