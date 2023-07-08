import { Component } from '@angular/core';

@Component({
  selector: 'app-ide-page-body',
  templateUrl: './ide-page-body.component.html',
  styleUrls: ['./ide-page-body.component.css']
})
export class IdePageBodyComponent {
  public activeWindow: 'slide' | 'editor' | 'preview' = 'slide';



  public addSlideClass: boolean = true;
  public addEditorClass: boolean = false;
  public addPreviewClass: boolean = false;


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
}
