import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faHtml5, faCss3, faSquareJs } from '@fortawesome/free-brands-svg-icons';
import { faCode, faUser, faLayerGroup, faFileCode } from '@fortawesome/free-solid-svg-icons';
import { BridgeService } from 'src/app/shared/services/bridge.service';
import { CodeEditorService } from '../shared/services/code-editor.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isExpanded: boolean = false;
  currentMenuItemName: String = '';

  generalMenuItems: any[] = []
  userMenuItems: any[] = []
  courseMenuItems: any[] = [];
  public isNight: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bridgeService: BridgeService,
    private codeService: CodeEditorService
  ) { }

  ngOnInit() {



      this.codeService.mainTheme.subscribe(() => {
        this.isNight = !this.isNight; 
      });

    // Night mode

    let mode = JSON.parse(sessionStorage.getItem('nightMode')!);
    if ( mode == true) {
      this.isNight = true;
    }
 
  
    this.generalMenuItems = [
      { name: 'Code', link: `/ide/${this.bridgeService.getLastAccessedCourseId()}`, icon: faCode, class: 'special' },
    ]
    this.userMenuItems = [
      { name: 'My Profile', link: '/dashboard/profile', icon: faUser, class: 'regular' },
      { name: 'My Courses', link: '/dashboard/my-courses', icon: faFileCode, class: 'regular' },
    ]
    this.courseMenuItems = [
      { name: 'All Courses', link: '/dashboard/courses', icon: faLayerGroup, class: 'regular' },
      { name: 'HTML Courses', link: '/dashboard/html-courses', icon: faHtml5, class: 'regular' },
      { name: 'CSS Courses', link: '/dashboard/css-courses', icon: faCss3, class: 'regular' },
      { name: 'JS Courses', link: '/dashboard/js-courses', icon: faSquareJs, class: 'regular' },
      // Add more menu items here
    ];
  }

  setCurrentMenuItemName(name: String): void {
    this.currentMenuItemName = name;
  }

  expandSidebar(): void {
    setTimeout(() => {
    }, 1000);
    this.isExpanded = true;
  }

  shrinkSidebar(): void {
    setTimeout(() => {
    }, 1000);
    this.isExpanded = false;
  }

  toggleSidebar() {
    setTimeout(() => {
    }, 1000);
    this.isExpanded = !this.isExpanded;
    if (this.isExpanded) {
      document.addEventListener('click', this.onDocumentClick);
    } else {
      document.removeEventListener('click', this.onDocumentClick);
    }
  }

  onDocumentClick = (event: any) => {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar && !sidebar.contains(event.target)) {
      this.isExpanded = false;
      document.removeEventListener('click', this.onDocumentClick);
    }
  }

  navigateTo(route: string): void {
    this.router.navigateByUrl(route);
  }

  
}