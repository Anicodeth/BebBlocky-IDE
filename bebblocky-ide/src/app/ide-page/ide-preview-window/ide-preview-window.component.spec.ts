import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdePreviewWindowComponent } from './ide-preview-window.component';

describe('IdePreviewWindowComponent', () => {
  let component: IdePreviewWindowComponent;
  let fixture: ComponentFixture<IdePreviewWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdePreviewWindowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdePreviewWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
