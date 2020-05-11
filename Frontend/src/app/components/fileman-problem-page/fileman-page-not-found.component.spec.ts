import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilemanProblemPageComponent } from './fileman-page-not-found.component';

describe('FilemanPageNotFoundComponent', () => {
  let component: FilemanProblemPageComponent;
  let fixture: ComponentFixture<FilemanProblemPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilemanProblemPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilemanProblemPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
