import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdePageHeaderComponent } from './ide-page-header.component';

describe('IdePageHeaderComponent', () => {
  let component: IdePageHeaderComponent;
  let fixture: ComponentFixture<IdePageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdePageHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdePageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
