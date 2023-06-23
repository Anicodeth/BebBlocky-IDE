import { Component, OnInit } from '@angular/core';
import { Slide } from 'src/app/shared/models/slide.dto';
import { BridgeService } from 'src/app/shared/services/bridge.service';
import { DashboardLoadingService } from 'src/app/shared/services/dashboard-loading.service';

@Component({
  selector: 'app-css-courses',
  templateUrl: './css-courses.component.html',
  styleUrls: ['./css-courses.component.scss']
})
export class CssCoursesComponent implements OnInit {
  public courses: Slide[] = [];
  public showSpinner: boolean = true;

  constructor(
    private bridgeService: BridgeService,
    private loadingService: DashboardLoadingService
  ) { }

  ngOnInit() {
    this.loadingService.isLoading = true;
    this.bridgeService.getSlides('css').subscribe((courses: any) => {
      this.courses = courses.slides;
      this.loadingService.isLoading = false;
    });
  }
}
