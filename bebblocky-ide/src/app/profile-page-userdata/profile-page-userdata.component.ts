import { Component, DoCheck, OnInit } from '@angular/core';
import {  faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { BridgeService } from '../shared/services/bridge.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-page-userdata',
  templateUrl: './profile-page-userdata.component.html',
  styleUrls: ['./profile-page-userdata.component.scss']
})
export class ProfilePageUserdataComponent implements OnInit, DoCheck {
  gotoIcon = faArrowRight;
  courses: any[] = [];
  progress = new Map<number, number>();
  temp: any;
  name: string = 'John Doe';
  email: string = 'johndoe@example.com';
  phone: string = '555-555-5555';
  tasks: string[] = ['Task 1', 'Task 2', 'Task 3'];
  previousType: any;

  constructor(
    private bridgeService: BridgeService,
    private route: ActivatedRoute,
  ) { }
  
  get username() {
    return this.bridgeService.userData.username;
  }
  
  ngOnInit() {
    this.previousType = this.route.snapshot.paramMap.get('type')!;
    this.temp = sessionStorage.getItem('courseProg');
    if (this.temp) {
      JSON.parse(this.temp).forEach((val: any) => {
        this.progress.set(val.slideId, val.completedPercent);
      });
    }

    this.getCourses();
  }

  ngDoCheck(): void {
    const currentType = this.route.snapshot.paramMap.get('type')!;;
    if (currentType !== this.previousType) {
      this.previousType = currentType;
      this.getCourses();
    }
  }
  
  getCourses() {
    this.bridgeService.getSlidesByType(this.previousType).subscribe((slides: any) => {
      this.courses = slides.slides;
      sessionStorage.setItem('courses', JSON.stringify(this.courses));
    });
  }

  getProgress(id: any) {
    const val: any = this.progress.get(id);
    if (!val) {
      return 0
    }
    return val;
  }
}
