import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { CodeEditorService } from 'src/app/shared/services/code-editor.service';

@Component({
  selector: 'app-ide-page-body',
  templateUrl: './ide-page-body.component.html',
  styleUrls: ['./ide-page-body.component.css']
})
export class IdePageBodyComponent implements OnInit {

  public activeWindow: 'slide' | 'editor' | 'preview' = 'slide';
  public type: string = 'html'

  public addSlideClass: boolean = true;
  public addEditorClass: boolean = false;
  public addPreviewClass: boolean = false;
  public addWebClass: boolean = true;
  public onlyCode: boolean = false;


  constructor(
    private library: FaIconLibrary,
    private codeEditorService: CodeEditorService
  ) {
    library.addIconPacks(fas, far);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth < 1000) {
      this.addWebClass = false;
    } else {
      this.addWebClass = true;
    }
  }

  toggleWindows(window: 'slide' | 'editor' | 'preview'): void {
    this.activeWindow = window;
    if (window === 'slide') {
      this.addSlideClass = true;
      this.addEditorClass = false;
      this.addPreviewClass = false;
    } else if (window === 'editor') {
      this.addSlideClass = false;
      this.addEditorClass = true;
      this.addPreviewClass = false;
    }
    else if (window === 'preview') {
      this.addSlideClass = false;
      this.addEditorClass = false;
      this.addPreviewClass = true;
    }

  }

  ngOnInit(): void {
    if (window.innerWidth < 1000) {
      this.addWebClass = false;
    }

    this.onlyCode = this.codeEditorService.onlyCode;




  }
}
