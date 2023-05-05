import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CodeService } from '../services/code.service';

@Component({
  selector: 'app-ide-preview-window',
  templateUrl: './ide-preview-window.component.html',
  styleUrls: ['./ide-preview-window.component.css']
})
export class IdePreviewWindowComponent implements OnInit {

  @ViewChild('formattedHtml') formattedHtml!: ElementRef;
  
  constructor(
    private codeService: CodeService
    ) {}
    
  ngOnInit() {
    this.codeService.outputSubject.subscribe((output) => {
      this.formattedHtml.nativeElement.innerHTML = output;
    });
  }
}
