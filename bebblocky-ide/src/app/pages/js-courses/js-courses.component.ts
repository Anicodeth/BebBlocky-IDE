import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/shared/models/course.dto';
import { BridgeService } from 'src/app/shared/services/bridge.service';

@Component({
  selector: 'app-js-courses',
  templateUrl: './js-courses.component.html',
  styleUrls: ['./js-courses.component.scss']
})
export class JsCoursesComponent implements OnInit {
  public courses: Course[] = [];
  public showSpinner: boolean = true;

  constructor(
    private bridgeService: BridgeService
  ) { }

  ngOnInit() {
    this.showSpinner = true;
    this.bridgeService.getCourses('js').subscribe((courses: any) => {
      this.courses = courses.courses;
      this.showSpinner = false;
    });
  }
}
