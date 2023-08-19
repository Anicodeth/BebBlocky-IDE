import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressRipplesComponent } from './progress-ripples.component';

describe('ProgressRipplesComponent', () => {
  let component: ProgressRipplesComponent;
  let fixture: ComponentFixture<ProgressRipplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgressRipplesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressRipplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
