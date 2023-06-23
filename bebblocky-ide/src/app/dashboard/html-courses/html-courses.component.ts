import { Component, OnInit } from '@angular/core';
import { Slide } from 'src/app/shared/models/slide.dto';
import { BridgeService } from 'src/app/shared/services/bridge.service';

@Component({
  selector: 'app-html-courses',
  templateUrl: './html-courses.component.html',
  styleUrls: ['./html-courses.component.scss']
})
export class HtmlCoursesComponent implements OnInit {
  public courses: Slide[] = [];

  constructor(
    private bridgeService: BridgeService
  ) { }

  ngOnInit() {
    this.bridgeService.getSlidesByType('html').subscribe((courses: any) => {
      this.courses = courses.slides;
    });
  }
}
