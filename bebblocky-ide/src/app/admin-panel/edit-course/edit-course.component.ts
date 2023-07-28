import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BridgeService } from 'src/app/shared/services/bridge.service';
import { CourseService } from 'src/app/shared/services/course.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {
  public courseId: number | any;
  public courseData: any;
  public courseForm: FormGroup;
  public error: string = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private bridgeService: BridgeService,
    private fb: FormBuilder
  ) {
    this.courseForm = this.fb.group({
      course: this.fb.group({
        courseTitle: [null, Validators.required],
        courseDescription: [null, Validators.required],
        courseLanguage: ['html', Validators.required],
        done: [false],
        editingLessonIndex: [null],
      }),
      lessons: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.courseId = parseInt(this.route.snapshot.paramMap.get('courseId')!);
    this.bridgeService.getCourse(this.courseId).subscribe((course: any) => {
      this.courseData = course.course;
      this.courseService.fillCourseFromForUpdate(this.courseForm, this.courseData);
    },
    (error) => {
      this.error = error;
    });
  }

}
