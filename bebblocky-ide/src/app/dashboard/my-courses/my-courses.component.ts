import { Component, OnInit } from '@angular/core';
import { Slide } from 'src/app/shared/models/slide.dto';
import { BridgeService } from 'src/app/shared/services/bridge.service';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.scss']
})
export class MyCoursesComponent implements OnInit {
  public courses: Slide[] = [];

  constructor(
    private bridgeService: BridgeService
  ) { }

  ngOnInit() {
    this.bridgeService.getUserSlides().subscribe((courses: any) => {
      this.courses = courses.slides;
    });
  }
}
