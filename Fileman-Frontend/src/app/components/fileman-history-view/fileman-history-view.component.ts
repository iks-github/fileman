import { Component, OnInit } from '@angular/core';
import { FileContentData } from 'src/app/common/domainobjects/gen/FileContentData';
import { FilemanFileService } from 'src/app/services/fileman-file-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FilemanMetadataService } from 'src/app/services/fileman-metadata-service.service';
import { FilemanAuthserviceService } from 'src/app/services/fileman-authservice.service';

@Component({
  selector: 'file-history',
  templateUrl: './fileman-history-view.component.html',
  styleUrls: ['./fileman-history-view.component.css']
})
export class FilemanHistoryViewComponent implements OnInit {

  selectedFile: string;
  selectedUUID: number;
  contentVersions: FileContentData[];
  response;
  readOnly = false;
  viewTouched = false;

  constructor(private fileService: FilemanFileService,
              private filesMetaDataService: FilemanMetadataService,
              private authService: FilemanAuthserviceService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.readOnly = this.authService.getCurrentUserRole() === 'Reader';
    this.contentVersions = [] as FileContentData[];
    this.route.params.subscribe((params) => {
      this.selectedFile = params.filename;
    });
    this.fileService.getHistory(this.selectedFile).subscribe(response => {
                                    this.response = response;
                                    this.response.forEach(setting => {
                                      const contentVersion = new FileContentData(setting);
                                      this.contentVersions.push(contentVersion);
                                    })
                                });

  }

  isActive(filename: string, uuid: number) {
    const metadata = this.filesMetaDataService.getFileFromCache(filename);
    if (metadata != null  && metadata.activeUUID === uuid) {
      if (this.selectedUUID == null) {this.selectedUUID = uuid};
      return 'checked';
    }
    return '';
  }

  save() {
    this.filesMetaDataService.setActive(this.selectedFile, this.selectedUUID);
    this.backToOverview();
  }

  setSelected(uuid: number) {
    if (this.selectedUUID !== uuid) {
      this.viewTouched = true;
      console.log(this.viewTouched)
      this.selectedUUID = uuid;
    }
  }

  backToOverview() {
    this.router.navigate(['/fileman/overview']);
  }

  cancel() {
    this.backToOverview();
  }
}
