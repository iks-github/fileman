import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilemanSortIconComponent } from './fileman-sort-icon.component';

describe('FilemanSortIconComponent', () => {
  let component: FilemanSortIconComponent;
  let fixture: ComponentFixture<FilemanSortIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilemanSortIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilemanSortIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
