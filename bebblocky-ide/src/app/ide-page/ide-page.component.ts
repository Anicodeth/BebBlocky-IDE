import { Component } from '@angular/core';
import { BridgeService } from '../shared/services/bridge.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ide-page',
  templateUrl: './ide-page.component.html',
  styleUrls: ['./ide-page.component.css']
})
export class IdePageComponent {
  public showSpinner: boolean = false;
  public course: any;

  constructor(
    private bridgeService: BridgeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.showSpinner = true;
    const courseId = this.route.snapshot.paramMap.get('courseId')!;
    this.bridgeService.getCourse(parseInt(courseId)).subscribe((course: any) => {
      this.course = course.course;

      // this.bridgeService.updateLastAccessedCourseId(this.course.courseId).subscribe(() => {});
      this.showSpinner = false;
    });
  }
}
