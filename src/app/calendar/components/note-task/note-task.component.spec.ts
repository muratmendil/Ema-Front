import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteTaskComponent } from './note-task.component';

describe('NoteTaskComponent', () => {
  let component: NoteTaskComponent;
  let fixture: ComponentFixture<NoteTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
