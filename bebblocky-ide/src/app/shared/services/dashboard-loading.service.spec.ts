import { TestBed } from '@angular/core/testing';

import { DashboardLoadingService } from './dashboard-loading.service';

describe('DashboardLoadingService', () => {
  let service: DashboardLoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardLoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
