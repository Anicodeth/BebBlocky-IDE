import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdePageBodyComponent } from './ide-page-body.component';

describe('IdePageBodyComponent', () => {
  let component: IdePageBodyComponent;
  let fixture: ComponentFixture<IdePageBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdePageBodyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdePageBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
