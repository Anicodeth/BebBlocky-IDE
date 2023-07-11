import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdePythonEditorComponent } from './ide-python-editor.component';

describe('IdePythonEditorComponent', () => {
  let component: IdePythonEditorComponent;
  let fixture: ComponentFixture<IdePythonEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdePythonEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdePythonEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
