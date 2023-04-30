import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdePageFooterComponent } from './ide-page-footer.component';

describe('IdePageFooterComponent', () => {
  let component: IdePageFooterComponent;
  let fixture: ComponentFixture<IdePageFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdePageFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdePageFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
