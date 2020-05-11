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
