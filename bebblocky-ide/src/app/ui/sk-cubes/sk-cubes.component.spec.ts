import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkCubesComponent } from './sk-cubes.component';

describe('SkCubesComponent', () => {
  let component: SkCubesComponent;
  let fixture: ComponentFixture<SkCubesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkCubesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkCubesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
