import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowRight, faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Course } from 'src/app/shared/models/course.dto';
import { User } from 'src/app/shared/models/user.dto';
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
  public user: User | any;

  public gotoIcon = faArrowRight;
  public editIcon = faEdit;
  public deleteIcon = faTrashCan;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private bridgeService: BridgeService
  ) {}

  ngOnInit() {
    this.user = this.bridgeService.getUser();
  }

  get courseProgress() {
    const progress = this.bridgeService.getCourseProgress(this.courseId);
    if (!progress) {
      return 0;
    }
    return progress;
  }

  deleteCourse() {
    this.router.navigate([`/admin/delete-course/${this.courseId}`]);
  }
}