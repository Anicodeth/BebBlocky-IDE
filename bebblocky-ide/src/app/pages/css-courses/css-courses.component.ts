import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/shared/models/course.dto';
import { BridgeService } from 'src/app/shared/services/bridge.service';

@Component({
  selector: 'app-css-courses',
  templateUrl: './css-courses.component.html',
  styleUrls: ['./css-courses.component.scss']
})
export class CssCoursesComponent implements OnInit {
  public courses: Course[] = [];
  public showSpinner: boolean = true;

  constructor(
    private bridgeService: BridgeService,
  ) { }

  ngOnInit() {
    this.showSpinner = true;
    this.bridgeService.getCourses('css').subscribe((courses: any) => {
      this.courses = courses.courses;
      this.showSpinner = false;
    });
  }
}
