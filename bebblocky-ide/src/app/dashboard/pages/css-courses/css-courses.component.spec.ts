import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CssCoursesComponent } from './css-courses.component';

describe('CssCoursesComponent', () => {
  let component: CssCoursesComponent;
  let fixture: ComponentFixture<CssCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CssCoursesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CssCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
