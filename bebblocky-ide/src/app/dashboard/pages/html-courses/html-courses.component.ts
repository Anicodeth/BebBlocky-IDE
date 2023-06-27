import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/shared/models/course.dto';
import { BridgeService } from 'src/app/shared/services/bridge.service';

@Component({
  selector: 'app-html-courses',
  templateUrl: './html-courses.component.html',
  styleUrls: ['./html-courses.component.scss']
})
export class HtmlCoursesComponent implements OnInit {
  public courses: Course[] = [];
  public showSpinner: boolean = true;

  constructor(
    private bridgeService: BridgeService,
  ) { }

  ngOnInit() {
    this.showSpinner = true;
    this.bridgeService.getCourses('html').subscribe((courses: any) => {
      this.courses = courses.courses;
      this.showSpinner = false;
    });
  }
}
