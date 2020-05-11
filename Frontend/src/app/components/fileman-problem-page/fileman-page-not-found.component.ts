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
