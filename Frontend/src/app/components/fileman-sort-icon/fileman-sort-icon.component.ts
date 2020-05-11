import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FilemanConstants, SortType } from 'src/app/common/fileman-constants';

@Component({
  selector: 'fileman-sorticon',
  templateUrl: './fileman-sort-icon.component.html',
  styleUrls: ['./fileman-sort-icon.component.css']
})
export class FilemanSortIconComponent implements OnInit {

  @Input() sortField: string;
  @Output() sortEventHandler = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  sort(ascending: boolean) {
    const event = {sortField: this.sortField, sortType: SortType.ASC};
    if (! ascending) {
      event.sortType = SortType.DESC;
    }
    this.sortEventHandler.emit(event);
  }

}
