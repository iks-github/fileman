import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilemanDetailsComponent } from './fileman-details.component';

describe('FilemanDetailsComponent', () => {
  let component: FilemanDetailsComponent;
  let fixture: ComponentFixture<FilemanDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilemanDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilemanDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
