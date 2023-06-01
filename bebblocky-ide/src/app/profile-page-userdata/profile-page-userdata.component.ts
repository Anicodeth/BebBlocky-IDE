import { Component, OnInit } from '@angular/core';
import { faTachometerAlt, faCode, faUser, faCog, faTableCells, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { BridgeService } from '../bridge.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-profile-page-userdata',
  templateUrl: './profile-page-userdata.component.html',
  styleUrls: ['./profile-page-userdata.component.scss']
})
export class ProfilePageUserdataComponent implements OnInit {
  gotoIcon = faArrowRight;
  courses: any[] = [];
  progress = new Map<number, number>();
  temp:any;
  name: string = 'John Doe';
  email: string = 'johndoe@example.com';
  phone: string = '555-555-5555';
  tasks: string[] = ['Task 1', 'Task 2', 'Task 3'];

  constructor(
    private bridgeService: BridgeService,
  ) {}

  ngOnInit() {
    this.temp = sessionStorage.getItem('courseProg')
    this.bridgeService.progress.forEach((val:any)=>{
this.progress.set(val.slideId, val.completedPercent);

    });



    this.bridgeService.getSlides().subscribe((slides: any) => {
      this.courses = slides;
    });
  }

  getProgress(id:any) {
    const val:any = this.progress.get(id);
    if (!val){
      return 0
    }
    return val;
  }
}
