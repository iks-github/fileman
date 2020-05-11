import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Fileman';

  onLayoutChanged(isListModeActive) {
    console.log("Layout changed: " + isListModeActive);
  }
}
