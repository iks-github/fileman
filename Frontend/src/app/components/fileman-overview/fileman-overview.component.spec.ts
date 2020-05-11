import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilemanOverviewComponent } from './fileman-overview.component';

describe('FilemanOverviewComponent', () => {
  let component: FilemanOverviewComponent;
  let fixture: ComponentFixture<FilemanOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilemanOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilemanOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
