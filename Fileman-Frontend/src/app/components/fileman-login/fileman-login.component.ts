/*
 * Copyright 2020 IKS Gesellschaft fuer Informations- und Kommunikationssysteme mbH
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
                        this.router.navigate([returnUrl || '/fileman/overview']);
                      } else {
                        formControl.form.setErrors({invalidLogin: true});  // wirft runtime fehler, warum ??
                      }
                  });
  }
}