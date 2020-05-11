import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FilemanAuthserviceService } from './fileman-authservice.service';

describe('FilemanAuthserviceService', () => {
  let service: FilemanAuthserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FilemanAuthserviceService]
    });
    service = TestBed.inject(FilemanAuthserviceService);
  });

  it('should be created', () => {
     inject(
      [HttpTestingController, FilemanAuthserviceService],
      (
        httpMock: HttpTestingController,
        dataService: FilemanAuthserviceService
      ) => {
        // ...our test logic here
        expect(service).toBeTruthy();
      }
    )
  });
});
