import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HoroscopeRequestDataService } from 'src/app/services/horoscope-request-service';
import { HoroscopeRequestData } from 'src/app/common/domainobjects/gen/HoroscopeRequestData';

@Component({
  selector: 'horoscope-request',
  templateUrl: './horoscope-request-component.html',
  styleUrls: ['./horoscope-request-component.css']
})
export class HoroscopeRequestDataComponent implements OnInit {

  form: FormGroup;

  constructor(private horoscopeRequestDataService: HoroscopeRequestDataService) {
      this.form = this.createFormControl();
  }

  ngOnInit(): void { }

  submit() {
    const horoscopeRequestData = this.form.value;
    console.log(horoscopeRequestData);
    this.horoscopeRequestDataService.sendToServer(horoscopeRequestData);
  }

  // The form control block below is generated - do not modify manually!
  // The form control block above is generated - do not modify manually!

}