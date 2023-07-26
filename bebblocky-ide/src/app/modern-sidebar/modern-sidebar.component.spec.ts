import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModernSidebarComponent } from './modern-sidebar.component';

describe('ModernSidebarComponent', () => {
  let component: ModernSidebarComponent;
  let fixture: ComponentFixture<ModernSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModernSidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModernSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
