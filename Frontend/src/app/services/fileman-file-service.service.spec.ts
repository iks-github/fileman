import { TestBed } from '@angular/core/testing';

import { FilemanFileService } from './fileman-file-service.service';

describe('FilemanFileServiceService', () => {
  let service: FilemanFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilemanFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
