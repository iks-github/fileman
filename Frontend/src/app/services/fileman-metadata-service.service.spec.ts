import { TestBed } from '@angular/core/testing';

import { FilemanMetadataService } from './fileman-metadata-service.service';

describe('FilemanMetadataServiceService', () => {
  let service: FilemanMetadataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilemanMetadataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
