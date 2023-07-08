import { Renderer2, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CodeEditorService } from 'src/app/shared/services/code-editor.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


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
    private sanitizer: DomSanitizer
  ) { }

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
  const newWindow = window.open();
  const document = newWindow?.document;
  const fragment = document?.createDocumentFragment();

  const sanitizedHtml: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(this.formattedHtml.nativeElement.innerHTML);
  const htmlElement = this.renderer.createElement('html');
  const headElement = this.renderer.createElement('head');
  const bodyElement = this.renderer.createElement('body');

  this.renderer.setProperty(bodyElement, 'innerHTML', sanitizedHtml);

  this.renderer.appendChild(htmlElement, headElement);
  this.renderer.appendChild(htmlElement, bodyElement);

  this.renderer.appendChild(fragment, htmlElement);
  document?.appendChild(fragment?.firstChild as Node);
}

}
