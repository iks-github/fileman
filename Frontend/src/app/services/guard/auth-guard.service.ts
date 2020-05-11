import { Injectable } from '@angular/core';
import { FilemanAuthserviceService } from '../fileman-authservice.service';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
              private authService: FilemanAuthserviceService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if (this.authService.isLoggedIn()) { return true; }
      this.router.navigate([''], {queryParams: {returnUrl: state.url}});
      console.log('Page not allowed.');
      return false;
    }
  }
