import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FilemanAuthserviceService } from 'src/app/services/fileman-authservice.service';
import { Router } from '@angular/router';
import { FilemanConstants } from 'src/app/common/fileman-constants';

@Component({
  selector: 'fileman-logo',
  template: '<b><i><font size="6" color="blue">FileMan  </font></i></b>',
})
export class FilemanLogoComponent implements OnInit {
  constructor() { }
  ngOnInit(): void { }
}
