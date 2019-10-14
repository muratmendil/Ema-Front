import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectifsSidebarComponent } from './objectifs-sidebar.component';

describe('ObjectifsSidebarComponent', () => {
  let component: ObjectifsSidebarComponent;
  let fixture: ComponentFixture<ObjectifsSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectifsSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectifsSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
