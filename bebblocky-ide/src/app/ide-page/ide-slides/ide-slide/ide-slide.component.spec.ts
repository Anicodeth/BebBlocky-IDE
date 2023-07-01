import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeSlideComponent } from './ide-slide.component';

describe('IdeSlideComponent', () => {
  let component: IdeSlideComponent;
  let fixture: ComponentFixture<IdeSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdeSlideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdeSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
