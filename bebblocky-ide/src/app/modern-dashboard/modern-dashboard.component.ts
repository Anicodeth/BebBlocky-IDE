import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BridgeService } from '../shared/services/bridge.service';
import { CodeEditorService } from '../shared/services/code-editor.service';
interface Course {
  title: string;
  description: string;
  image: string;
  active: boolean;
}

@Component({
  selector: 'app-modern-dashboard',
  templateUrl: './modern-dashboard.component.html',
  styleUrls: ['./modern-dashboard.component.css']
})
export class ModernDashboardComponent implements OnInit{
  public isNight: boolean = false;
  public user: any;
  public topSlide:any;
  imageUrl: string = '../../assets/slide_header_pc.jpg';
  breakpointWidth = 768;
  defaultImageUrl = '../../assets/slide_header_pc.jpg';
  alternativeImageUrl = '../../assets/Phone-BeBlocky.png';
  public courses:Course[] = [
    {
      title: 'Python Course',
      description: 'Welcome to the Python Course! This course provides you with valuable knowledge and skills in Python programming. Enroll now and start your coding journey.',
      image: '../../assets/svg/python.svg',
      active: true,
    },

  ];


  constructor(
    private bridgeService: BridgeService,
    private codeService: CodeEditorService,
    private router: Router  ) {}

  ngOnChanges() {
    this.bridgeService.setUser();
  }
  ngOnInit(): void {
    this.updateImageUrl(window.innerWidth);

    //change navigation 
    this.router.navigate(['/devdashboard/courses']);
    

    let mode = JSON.parse(sessionStorage.getItem('nightMode')!);
    if ( mode == true) {
      this.isNight = true;
    }
    else{
      this.isNight = false;
    }
    this.codeService.mainTheme.subscribe(() => {
      this.isNight = !this.isNight; 
    });

    let user = JSON.parse(sessionStorage.getItem('user')!);
    if (user) {
      this.user = user;
    }

    this.startCarousel();

  }

  

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: any): void {
    const windowWidth = event.target.innerWidth;
    this.updateImageUrl(windowWidth);
  }

  private updateImageUrl(windowWidth: number): void {
    if (windowWidth <= this.breakpointWidth) {
      this.imageUrl = this.alternativeImageUrl;
    } else {
      this.imageUrl = this.defaultImageUrl;
    }
  }





  startCarousel(): void {
    let currentIndex = 0;
    const intervalDuration = 3000; // Adjust the interval duration (in milliseconds)

    setInterval(() => {
      this.courses[currentIndex].active = false;
      currentIndex = (currentIndex + 1) % this.courses.length;
      this.courses[currentIndex].active = true;
    }, intervalDuration);
  }
}
