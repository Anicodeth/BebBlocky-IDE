import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/shared/models/course.dto';
import { BridgeService } from 'src/app/shared/services/bridge.service';
import { CodeEditorService } from 'src/app/shared/services/code-editor.service';

@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.scss']
})
export class AllCoursesComponent implements OnInit {
  public courses: Course[] = [];
  public showSpinner: boolean = true;
  public isNight: boolean = false;

  constructor(
    private bridgeService: BridgeService,
    private codeService: CodeEditorService
  ) { }

  ngOnInit() {
    this.codeService.mainTheme.subscribe(() => {
      this.isNight = !this.isNight; 
    });

    let isNight = JSON.parse(sessionStorage.getItem('nightMode')!);
    if (isNight == true) {
      this.isNight = true;
    }
    
    this.showSpinner = true;
    this.bridgeService.getCourses('').subscribe((courses: any) => {
      this.courses = courses.courses;
      console.log(this.courses);
      sessionStorage.setItem('courses', JSON.stringify(this.courses));
      this.showSpinner = false;
    });
  }
}