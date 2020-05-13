import { Component, OnInit, Input } from '@angular/core';
import { FileContentData } from 'src/app/common/domainobjects/gen/FileContentData';
import { FilemanFileService } from 'src/app/services/fileman-file-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'file-history',
  templateUrl: './fileman-history-view.component.html',
  styleUrls: ['./fileman-history-view.component.css']
})
export class FilemanHistoryViewComponent implements OnInit {

  @Input() selectedFile: string;
  contentVersions : FileContentData[];
  response;

  constructor(private fileService: FilemanFileService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.contentVersions = [] as FileContentData[];
    console.log('selectedFile from overview: ' + this.selectedFile)
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

}
