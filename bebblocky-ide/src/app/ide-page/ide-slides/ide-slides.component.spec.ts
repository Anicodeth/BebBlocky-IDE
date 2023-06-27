import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeSlidesComponent } from './ide-courses.component';

describe('IdeSlidesComponent', () => {
  let component: IdeSlidesComponent;
  let fixture: ComponentFixture<IdeSlidesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdeSlidesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdeSlidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
