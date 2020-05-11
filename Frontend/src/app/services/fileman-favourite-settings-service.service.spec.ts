import { TestBed } from '@angular/core/testing';

import { FilemanFavouriteSettingsService } from './fileman-favourite-settings-service.service';

describe('FilemanFavouriteSettingsServiceService', () => {
  let service: FilemanFavouriteSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilemanFavouriteSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
