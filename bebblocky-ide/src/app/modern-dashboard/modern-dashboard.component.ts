import { Component, OnInit } from '@angular/core';
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
  public courses:Course[] = [
    {
      title: 'Python Course',
      description: 'Welcome to the Python Course! This course provides you with valuable knowledge and skills in Python programming. Enroll now and start your coding journey.',
      image: '../../assets/svg/python.svg',
      active: true,
    },
    {
      title: 'C++ Course',
      description: 'C++ Course is designed for those who want to excel in C++ programming. Explore our expert-taught modules and advance your coding skills today.',
      image: '../../assets/svg/cpp.svg',
      active: false,
    },
    {
      title: 'Java Course',
      description: 'In the Java Course, you will gain hands-on experience in Java programming and software development. Join us and be a part of this exciting learning experience.',
      image: '../../assets/svg/java.svg',
      active: false,
    },
    {
      title: 'C# Course',
      description: 'The C# Course offers you the opportunity to master C# programming language and build powerful applications. Enroll now to unleash your potential.',
      image: '../../assets/svg/csharp.svg',
      active: false,
    },
    // Add more courses as needed
  ];


  constructor(
    private bridgeService: BridgeService,
    private codeService: CodeEditorService
  ) {}

  ngOnChanges() {
    this.bridgeService.setUser();
  }
  ngOnInit(): void {
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
