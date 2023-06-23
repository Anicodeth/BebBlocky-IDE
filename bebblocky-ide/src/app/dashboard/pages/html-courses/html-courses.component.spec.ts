import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlCoursesComponent } from './html-courses.component';

describe('HtmlCoursesComponent', () => {
  let component: HtmlCoursesComponent;
  let fixture: ComponentFixture<HtmlCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HtmlCoursesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HtmlCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
