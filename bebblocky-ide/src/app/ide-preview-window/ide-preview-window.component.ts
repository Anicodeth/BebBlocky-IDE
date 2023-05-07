import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CodeEditorService } from '../services/code-editor.service';

@Component({
  selector: 'app-ide-preview-window',
  templateUrl: './ide-preview-window.component.html',
  styleUrls: ['./ide-preview-window.component.css']
})
export class IdePreviewWindowComponent implements OnInit {

  @ViewChild('formattedHtml') formattedHtml!: ElementRef;
  
  constructor(
    private codeEditorService: CodeEditorService
    ) {}
    
  ngOnInit() {
    this.codeEditorService.userCode.subscribe((output) => {
      this.formattedHtml.nativeElement.innerHTML = output;
    });
  }
}
