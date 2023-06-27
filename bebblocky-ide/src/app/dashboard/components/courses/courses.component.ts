import { Component, Input } from '@angular/core';
import { Course } from 'src/app/shared/models/course.dto';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  @Input() courses: Course[] = [];

  getcourseProgress(id: number) {
    return 0;
  }
}
