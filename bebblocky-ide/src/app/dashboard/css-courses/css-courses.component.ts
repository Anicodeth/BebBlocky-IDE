import { Component, OnInit } from '@angular/core';
import { Slide } from 'src/app/shared/models/slide.dto';
import { BridgeService } from 'src/app/shared/services/bridge.service';

@Component({
  selector: 'app-css-courses',
  templateUrl: './css-courses.component.html',
  styleUrls: ['./css-courses.component.scss']
})
export class CssCoursesComponent implements OnInit {
  public courses: Slide[] = [];

  constructor(
    private bridgeService: BridgeService
  ) { }

  ngOnInit() {
    this.bridgeService.getSlidesByType('css').subscribe((courses: any) => {
      this.courses = courses.slides;
    });
  }
}
