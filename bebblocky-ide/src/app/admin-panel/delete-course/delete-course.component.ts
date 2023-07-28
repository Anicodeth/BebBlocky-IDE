import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BridgeService } from 'src/app/shared/services/bridge.service';

@Component({
  selector: 'app-delete-course',
  templateUrl: './delete-course.component.html',
  styleUrls: ['./delete-course.component.css']
})
export class DeleteCourseComponent implements OnInit {
  public error: string = "";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bridgeService: BridgeService,
  ) { }

  ngOnInit(): void {
    console.log('here deleting course');
    const id = this.route.snapshot.paramMap.get('courseId')!;
    this.bridgeService.deleteCourse(Number(id)).subscribe(() => {
      this.router.navigate(['/admin/courses']);
    },
      (error) => {
        this.error = error;
      }
    );
  }
}
