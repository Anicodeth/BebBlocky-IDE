import { Component, Input, OnInit } from '@angular/core';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Slide } from 'src/app/shared/models/slide.dto';
import { BridgeService } from 'src/app/shared/services/bridge.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent {
  @Input() slideName: String = "";
  @Input() slideDescription: String = "";
  @Input() slideId: number = 0;
  @Input() progress: number = 0;

  public gotoIcon = faArrowRight;
}