import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePageProgressComponent } from './profile-page-progress.component';

describe('ProfilePageProgressComponent', () => {
  let component: ProfilePageProgressComponent;
  let fixture: ComponentFixture<ProfilePageProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilePageProgressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilePageProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
