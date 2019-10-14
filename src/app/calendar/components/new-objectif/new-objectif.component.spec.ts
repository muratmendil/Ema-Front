import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewObjectifComponent } from './new-objectif.component';

describe('NewObjectifComponent', () => {
  let component: NewObjectifComponent;
  let fixture: ComponentFixture<NewObjectifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewObjectifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewObjectifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
