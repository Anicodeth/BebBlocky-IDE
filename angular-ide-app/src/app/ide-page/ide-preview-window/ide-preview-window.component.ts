import { Renderer2, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CodeEditorService } from 'src/app/shared/services/code-editor.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';


@Component({
  selector: 'app-ide-preview-window',
  templateUrl: './ide-preview-window.component.html',
  styleUrls: ['./ide-preview-window.component.css']
})
export class IdePreviewWindowComponent implements OnInit {


  @ViewChild('formattedHtml', { static: false }) formattedHtml!: ElementRef<HTMLIFrameElement>;


  constructor(
    private codeEditorService: CodeEditorService,
    private renderer: Renderer2,
    private sanitizer: DomSanitizer,
    private library: FaIconLibrary
  ) { 
    library.addIconPacks(fas, far);
  }

  ngOnInit() {
    this.codeEditorService.userCode.subscribe((output) => {
      this.formattedHtml.nativeElement.innerHTML = output;

      const iframeDocument = this.formattedHtml.nativeElement.contentDocument || this.formattedHtml.nativeElement.contentWindow?.document;
      if (iframeDocument) {
        // Modify the iframe's content here
        iframeDocument.open();
        iframeDocument.write(output);
        iframeDocument.close();
      }
    });
  }

  openInNewTab() {
    const newTab:any = window.open('', '_blank');
    newTab.document.write(this.formattedHtml.nativeElement.innerHTML);
    
}

}
