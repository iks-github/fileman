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
import { Directive, HostListener, Host, ElementRef, Output, Input } from '@angular/core';

@Directive({
  selector: '[appFormatDate]'
})
export class FormatDateDirective {
@Input('appFormatDate') prefix: String = "";

  constructor(private el: ElementRef) { }

  @HostListener('focus') onFocusGained() {
    console.log('Focus gained');
  }

  @HostListener('blur') onBlur() {
    console.log('Focus lost ');
    let value: string = this.el.nativeElement.value;
    this.el.nativeElement.value = this.prefix + "Date: " + value;

  }



}