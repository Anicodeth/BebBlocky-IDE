import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdePythonConsoleComponent } from './ide-python-console.component';

describe('IdePythonConsoleComponent', () => {
  let component: IdePythonConsoleComponent;
  let fixture: ComponentFixture<IdePythonConsoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdePythonConsoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdePythonConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
