import { Component, Input } from '@angular/core';
import { Slide } from 'src/app/shared/models/slide.dto';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  @Input() courses: Slide[] = [];

  getSlideProgress(id: number) {
    return 0;
  }
}
