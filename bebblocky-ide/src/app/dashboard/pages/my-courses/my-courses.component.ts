import { Component, OnInit } from '@angular/core';
import { Slide } from 'src/app/shared/models/slide.dto';
import { BridgeService } from 'src/app/shared/services/bridge.service';
import { DashboardLoadingService } from 'src/app/shared/services/dashboard-loading.service';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.scss']
})
export class MyCoursesComponent implements OnInit {
  public htmlCourses: Slide[] = [];
  public cssCourses: Slide[] = [];
  public jsCourses: Slide[] = [];

  constructor(
    private bridgeService: BridgeService,
    private loadingService: DashboardLoadingService
  ) { }

  ngOnInit() {
    this.loadingService.isLoading = true;
    this.bridgeService.getUserSlides('html').subscribe((courses: any) => {
      this.htmlCourses = courses.slides;
      this.loadingService.isLoading = false;
    });
    this.bridgeService.getUserSlides('css').subscribe((courses: any) => {
      this.cssCourses = courses.slides;
      this.loadingService.isLoading = false;
    });
    this.bridgeService.getUserSlides('js').subscribe((courses: any) => {
      this.jsCourses = courses.slides;
      this.loadingService.isLoading = false;
    });
  }
}
