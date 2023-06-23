import { Component, OnInit } from '@angular/core';
import { Slide } from 'src/app/shared/models/slide.dto';
import { BridgeService } from 'src/app/shared/services/bridge.service';

@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.scss']
})
export class AllCoursesComponent implements OnInit {
  public courses: Slide[] = [];

  constructor(
    private bridgeService: BridgeService
  ) {}

  ngOnInit() {
    this.bridgeService.getSlides('').subscribe((courses: any) => {
      this.courses = courses.slides;
    });
  }
}
