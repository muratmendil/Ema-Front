import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateObjectifComponent } from './update-objectif.component';

describe('UpdateObjectifComponent', () => {
  let component: UpdateObjectifComponent;
  let fixture: ComponentFixture<UpdateObjectifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateObjectifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateObjectifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
