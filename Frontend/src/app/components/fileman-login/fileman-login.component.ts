import { Component, OnInit } from '@angular/core';
import { FilemanAuthserviceService } from 'src/app/services/fileman-authservice.service';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserAuthData } from 'src/app/common/domainobjects/fileman-user-authdata';

@Component({
  selector: 'fileman-login',
  templateUrl: './fileman-login.component.html',
  styleUrls: ['./fileman-login.component.css']
})
export class FilemanLoginComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private authService : FilemanAuthserviceService) { }

  ngOnInit(): void {
  }

  onLogin(formControl) {
    const loginOk = this.authService.login(formControl.value).subscribe(result => {
                      const authData = result as UserAuthData;
                      console.log('Received login response with Authdata:');
                      console.log(authData);
                      if (authData && authData.ok && authData.authToken) {
                        localStorage.setItem('token', authData.authToken);
                        console.log('Logged in!');
                        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
                        this.router.navigate([returnUrl || '/overview']);
                      } else {
                        formControl.form.setErrors({invalidLogin: true});  // wirft runtime fehler, warum ??
                      }
                  });
  }
}
