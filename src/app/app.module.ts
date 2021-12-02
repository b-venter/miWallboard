import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon'; 
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { ConnectComponent } from './connect/connect.component'; 

import { APP_INITIALIZER } from '@angular/core';
import { AppConfig }       from './app.config';
import { Observable } from 'rxjs';
import { FooterComponent } from './footer/footer.component';

function initConfig(config: AppConfig): () => Observable<any>{
  return () => config.load();
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    NavbarComponent,
    ConnectComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatGridListModule,
    MatToolbarModule,
    MatTooltipModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule
  ],
  providers: [
    AppConfig,
        { provide: APP_INITIALIZER, useFactory: initConfig, deps: [AppConfig], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
