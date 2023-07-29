import {  Component, ElementRef, OnInit } from '@angular/core';
import { BridgeService } from '../shared/services/bridge.service';
import { ActivatedRoute } from '@angular/router';
import { CodeEditorService } from '../shared/services/code-editor.service';

@Component({
  selector: 'app-ide-page',
  templateUrl: './ide-page.component.html',
  styleUrls: ['./ide-page.component.css']
})
export class IdePageComponent implements OnInit {
  public showSpinner: boolean = false;
  public course: any;
  public isNight: boolean = false;
  public onlyCode: boolean = false;
  private contentDiv: HTMLElement;

  constructor(
    private bridgeService: BridgeService,
    private route: ActivatedRoute,
    private codeService: CodeEditorService,
    private elementRef: ElementRef

  ) {    this.contentDiv = this.elementRef.nativeElement.querySelector('#ide-page-container');
}


  goFullScreen() {
    this.contentDiv = this.elementRef.nativeElement.querySelector('#ide-page-container');
    if (this.contentDiv.requestFullscreen) {
      this.contentDiv.requestFullscreen();}
  }

  ngOnInit() {
    this.showSpinner = true;
    
    let mode = JSON.parse(sessionStorage.getItem('nightMode')!);
    if ( mode == true) {
      this.isNight = true;
    }
    this.codeService.mainTheme.subscribe(() => {
      this.isNight = !this.isNight; 
    });

    this.codeService.fullScreen.subscribe(() => {
this.goFullScreen();    });
    const courseId = this.route.snapshot.paramMap.get('courseId')!;
    if (courseId == '0'){
      this.codeService.onlyCode = true;
      this.showSpinner = false;

    }
    else{
      this.codeService.onlyCode = false;
      this.bridgeService.getCourse(parseInt(courseId)).subscribe((course: any) => {
      this.course = course.course;
      // this.bridgeService.updateLastAccessedCourseId(this.course.courseId).subscribe(() => {});
      this.showSpinner = false;
    });}
  }
}
