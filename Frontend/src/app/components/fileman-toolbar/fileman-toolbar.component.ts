import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FilemanAuthserviceService } from 'src/app/services/fileman-authservice.service';
import { Router } from '@angular/router';
import { FilemanConstants } from 'src/app/common/fileman-constants';

@Component({
  selector: 'fileman-toolbar',
  templateUrl: './fileman-toolbar.component.html',
  styleUrls: ['./fileman-toolbar.component.css']
})
export class FilemanToolbarComponent implements OnInit {

  @Input() layoutMode = 'list';
  @Input() isFavouriteFilterActive = false;

  @Output('output-alias') layoutChangeHandler = new EventEmitter();
  @Output('logoutHandler') logoutHandler = new EventEmitter();
  @Output('searchHandler') searchHandler = new EventEmitter();
  @Output() refreshHandler = new EventEmitter();
  @Output() favouriteFilterHandler = new EventEmitter();

  readOnly: boolean;
  isAdmin: boolean;
  favouriteFilterIcon = FilemanConstants.ICON_FAVOURITE_FILTER_INACTIVE;
  layoutType = 'list';

  constructor(private authService: FilemanAuthserviceService,
              private router: Router) { }

  ngOnInit(): void {
    this.readOnly = this.authService.getCurrentUserRole() === 'Reader';
    this.isAdmin = this.authService.getCurrentUserRole() === 'Admin';
    console.log(this.authService.getCurrentUserName() + ' ' + (this.authService.getCurrentUserRole() === 'Admin'))
  }

  onLayoutClick(layoutType: string) {
    this.layoutType = layoutType;
    this.layoutChangeHandler.emit(layoutType);
  }

  onNewClick() {
    if (! this.readOnly) {
      this.router.navigate(['/new']);
    }
  }

  onLogout() {
    this.logoutHandler.emit();
  }

  onRefreshClick() {
    this.refreshHandler.emit();
  }

  onFavouriteFilterClick() {
    this.isFavouriteFilterActive = ! this.isFavouriteFilterActive;
    if (this.isFavouriteFilterActive) {
      this.favouriteFilterIcon = FilemanConstants.ICON_FAVOURITE_FILTER_ACTIVE;
    } else {
      this.favouriteFilterIcon = FilemanConstants.ICON_FAVOURITE_FILTER_INACTIVE;
    }
    this.favouriteFilterHandler.emit(this.isFavouriteFilterActive);
  }

  startSearch(searchString) {
    this.searchHandler.emit(searchString);
  }

  getAddNewToolTip() {
    if (this.readOnly) return "You have no permission to add new files.";
    return "Add new file";
  }

}
