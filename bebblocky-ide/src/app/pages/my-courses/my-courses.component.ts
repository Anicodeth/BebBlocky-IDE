import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/shared/models/course.dto';
import { BridgeService } from 'src/app/shared/services/bridge.service';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.scss']
})
export class MyCoursesComponent implements OnInit {
  public htmlCourses: Course[] = [];
  public cssCourses: Course[] = [];
  public jsCourses: Course[] = [];

  public showSpinner: boolean = true;

  constructor(
    private bridgeService: BridgeService,
  ) { }

  ngOnInit() {
    this.showSpinner = true;
    this.bridgeService.getUserCourses('html').subscribe((courses: any) => {
      this.htmlCourses = courses.courses;
      this.showSpinner = false;
    });
    this.bridgeService.getUserCourses('css').subscribe((courses: any) => {
      this.cssCourses = courses.courses;
      this.showSpinner = false;
    });
    this.bridgeService.getUserCourses('js').subscribe((courses: any) => {
      this.jsCourses = courses.courses;
      this.showSpinner = false;
    });
  }
}
