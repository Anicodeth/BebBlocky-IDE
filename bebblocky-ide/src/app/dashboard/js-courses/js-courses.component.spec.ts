import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsCoursesComponent } from './js-courses.component';

describe('JsCoursesComponent', () => {
  let component: JsCoursesComponent;
  let fixture: ComponentFixture<JsCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JsCoursesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JsCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
