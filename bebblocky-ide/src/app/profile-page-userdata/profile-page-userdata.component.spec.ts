import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePageUserdataComponent } from './profile-page-userdata.component';

describe('ProfilePageUserdataComponent', () => {
  let component: ProfilePageUserdataComponent;
  let fixture: ComponentFixture<ProfilePageUserdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilePageUserdataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilePageUserdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
