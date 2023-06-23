import { Component, OnInit } from '@angular/core';
import { Slide } from 'src/app/shared/models/slide.dto';
import { BridgeService } from 'src/app/shared/services/bridge.service';

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
    private bridgeService: BridgeService
  ) { }

  ngOnInit() {
    this.bridgeService.getUserSlides('html').subscribe((courses: any) => {
      this.htmlCourses = courses.slides;
    });
    this.bridgeService.getUserSlides('css').subscribe((courses: any) => {
      this.cssCourses = courses.slides;
    });
    this.bridgeService.getUserSlides('js').subscribe((courses: any) => {
      this.jsCourses = courses.slides;
    });
  }
}
