import { Component, OnInit } from '@angular/core';
import { Slide } from 'src/app/shared/models/slide.dto';
import { BridgeService } from 'src/app/shared/services/bridge.service';

@Component({
  selector: 'app-js-courses',
  templateUrl: './js-courses.component.html',
  styleUrls: ['./js-courses.component.scss']
})
export class JsCoursesComponent implements OnInit {
  public courses: Slide[] = [];
  public showSpinner: boolean = true;

  constructor(
    private bridgeService: BridgeService
  ) { }

  ngOnInit() {
    this.showSpinner = true;
    this.bridgeService.getSlides('js').subscribe((courses: any) => {
      this.courses = courses.slides;
      this.showSpinner = false;
    });
  }
}
