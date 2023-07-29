import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BridgeService } from 'src/app/shared/services/bridge.service';

@Component({
  selector: 'app-delete-course',
  templateUrl: './delete-course.component.html',
  styleUrls: ['./delete-course.component.scss']
})
export class DeleteCourseComponent implements OnInit {
  public error: string = "";
  public courseId: number | any;
  public courseTitle: string | any;
  public showSpinner = false;
  public course: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bridgeService: BridgeService,
  ) { }

  ngOnInit(): void {
    this.showSpinner = true;
    const id = this.route.snapshot.paramMap.get('courseId')!;
    this.courseId = Number(id);
    this.bridgeService.getCourse(this.courseId).subscribe((course) => {
      this.showSpinner = false;
      console.log(course);
      this.course = course;
      this.courseTitle = this.course.course.courseTitle;
    });
  }

  delete(): void {
    this.bridgeService.deleteCourse(this.courseId).subscribe(() => {
      this.router.navigate(['/admin/courses']);
    },
      (error) => {
        this.error = error;
      }
    );
  }

  cancel() {
    // find from where the user came from and navigate back to that page
    this.router.navigate(['/admin/courses']);
  }
}
