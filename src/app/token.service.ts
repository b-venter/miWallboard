import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenService  {

  constructor(private router:Router,) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean|UrlTree {
      if (!localStorage.getItem('wbToken')) {
        console.log("No token. Use 'Connect' button");
        this.router.navigate(["connect"]);
        return false;
      } 
      return true;
    }
}
