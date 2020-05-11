import { Injectable } from '@angular/core';
import { FilemanAuthserviceService } from '../fileman-authservice.service';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private router: Router,
              private authService: FilemanAuthserviceService) { }

    canActivate() {
      const role = this.authService.getCurrentUserRole();
      if (role !== 'Admin') { return true; }
      this.router.navigate(['/problem'], {queryParams: {type: '2'}});
      return true;
    }
  }
