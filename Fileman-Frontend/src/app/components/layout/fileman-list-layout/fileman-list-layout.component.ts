import { Component, Input } from '@angular/core';

import { LayoutCommons } from '../layout-commons';

@Component({
  selector: 'fileman-list-layout',
  templateUrl: './fileman-list-layout.component.html',
  styleUrls: ['./fileman-list-layout.component.css']
})
export class FilemanListLayout extends LayoutCommons {
  @Input() allFilesMap;

  getDetailsTooltip(file: HTMLInputElement): string {
    const data = this.allFilesMap.get(file.name);
    return data.getStringRepresentation();
  }
}
