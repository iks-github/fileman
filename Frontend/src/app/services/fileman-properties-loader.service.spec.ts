import { TestBed } from '@angular/core/testing';

import { FilemanPropertiesLoaderService } from './fileman-properties-loader.service';

describe('FilemanPropertiesLoaderService', () => {
  let service: FilemanPropertiesLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilemanPropertiesLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
