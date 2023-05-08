import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePageSidebarComponent } from './profile-page-sidebar.component';

describe('ProfilePageSidebarComponent', () => {
  let component: ProfilePageSidebarComponent;
  let fixture: ComponentFixture<ProfilePageSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilePageSidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilePageSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
