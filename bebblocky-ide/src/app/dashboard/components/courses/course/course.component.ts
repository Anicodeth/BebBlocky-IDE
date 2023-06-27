import { Component, Input, OnInit } from '@angular/core';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Course } from 'src/app/shared/models/course.dto';
import { BridgeService } from 'src/app/shared/services/bridge.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent {
  @Input() courseName: String = "";
  @Input() courseDescription: String = "";
  @Input() courseId: number = 0;
  @Input() progress: number = 0;

  public gotoIcon = faArrowRight;

  constructor(
    private bridgeService: BridgeService
  ) {}

  get courseProgress() {
    const progress = this.bridgeService.getCourseProgress(this.courseId);
    if (!progress) {
      return 0;
    }
    return progress;
  }
}