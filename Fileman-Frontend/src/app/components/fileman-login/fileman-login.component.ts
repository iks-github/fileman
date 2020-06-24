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
import { Router, ActivatedRoute } from '@angular/router';

import { FilemanAuthserviceService } from 'src/app/services/fileman-authservice.service';
import { FilemanConstants } from 'src/app/common/fileman-constants';
import { LoginResponse } from 'src/app/common/domainobjects/gen/LoginResponse';
import { LoginRequest } from 'src/app/common/domainobjects/gen/LoginRequest';
import { UserComponentStateService } from 'src/app/services/fileman-user-component-state-service.service';

@Component({
  selector: 'fileman-login',
  templateUrl: './fileman-login.component.html',
  styleUrls: ['./fileman-login.component.css']
})
export class FilemanLoginComponent implements OnInit {

  errorMessage: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private authService: FilemanAuthserviceService,
              private userComponentStateService: UserComponentStateService) { }

  ngOnInit(): void {
  }

  onLogin(formControl) {
    const requestData = new LoginRequest(formControl.value);
    requestData.setFilemanVersion(FilemanConstants.VERSION);
    console.log(requestData);
    const loginOk = this.authService.login(requestData).subscribe(result => {
                      const loginResponse = result as LoginResponse;
                      console.log('Received LoginResponse:');
                      console.log(loginResponse);
                      this.errorMessage = loginResponse.errorMessage;
                      if (loginResponse && loginResponse.ok && loginResponse.authToken) {
                        localStorage.setItem('token', loginResponse.authToken);
                        console.log('Logged in!');
                        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
                        this.userComponentStateService.initializeForUser(this.authService.getCurrentUserId());
                        this.router.navigate([returnUrl || '/fileman/overview']);
                      } else {
                        formControl.form.setErrors({invalidLogin: true});  // wirft runtime fehler, warum ??
                      }
                  });
  }
}
