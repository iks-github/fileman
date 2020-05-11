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
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fileman-page-not-found',
  templateUrl: './fileman-page-not-found.component.html',
  styleUrls: ['./fileman-page-not-found.component.css']
})
export class FilemanProblemPageComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  private message0 = 'Unexpected Error!';
  private message1 = 'The requested page is not known!';
  private message2 = 'The requested page is not permitted for the current user!';

  ngOnInit(): void {
  }

  getMessage() {
    const type = this.route.snapshot.queryParamMap.get('type');
    if (!type) { return this.message1; }
    if (type === '2') { return this.message2; }

    return this.message0;
  }

}