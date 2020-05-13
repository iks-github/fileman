import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilemanHistoryViewComponent } from './fileman-history-view.component';

describe('FilemanHistoryViewComponent', () => {
  let component: FilemanHistoryViewComponent;
  let fixture: ComponentFixture<FilemanHistoryViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilemanHistoryViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilemanHistoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
