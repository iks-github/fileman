import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilemanLoginComponent } from './fileman-login.component';

describe('FilemanLoginComponent', () => {
  let component: FilemanLoginComponent;
  let fixture: ComponentFixture<FilemanLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilemanLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilemanLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
