import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideCreatorComponent } from './slide-creator.component';

describe('SlideCreatorComponent', () => {
  let component: SlideCreatorComponent;
  let fixture: ComponentFixture<SlideCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlideCreatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlideCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
