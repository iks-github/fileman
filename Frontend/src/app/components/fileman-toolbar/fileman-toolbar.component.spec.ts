import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilemanToolbarComponent } from './fileman-toolbar.component';

describe('FilemanToolbarComponent', () => {
  let component: FilemanToolbarComponent;
  let fixture: ComponentFixture<FilemanToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilemanToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilemanToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
