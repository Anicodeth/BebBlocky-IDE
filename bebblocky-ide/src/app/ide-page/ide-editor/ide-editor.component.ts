import {  AfterViewInit, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import * as ace from "ace-builds";
import { CodeEditorService } from '../../shared/services/code-editor.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';


@Component({
  selector: 'app-ide-editor',
  templateUrl: 'ide-editor.component.html',
  styleUrls: [
    'ide-editor.component.css',
  ]
})
export class IdeEditorComponent implements AfterViewInit, OnChanges {

  @ViewChild("htmlEditor") private htmlEditor: ElementRef<HTMLElement> | any;
  @ViewChild("cssEditor") private cssEditor: ElementRef<HTMLElement> | any;
  @ViewChild("jsEditor") private jsEditor: ElementRef<HTMLElement> | any;
  public activeEditor: 'html' | 'css' | 'js' = 'html';

  public htmlCode: string = '';
  public cssCode: string = '';
  public jsCode: string = ''; 


  public addHtmlClass: boolean = true;
  public addCssClass: boolean = false;
  public addJsClass: boolean = false;

  public verticalEditor:boolean = false;

  public compiledCode = `
      <html>
      <head>
        <style>${this.cssCode}</style>
      </head>
      <body>
        ${this.htmlCode}
        <script>${this.jsCode}</script>
      </body>
      </html>
    `;


  constructor(
    private codeEditorService: CodeEditorService,
    private sanitizer: DomSanitizer,
    private library: FaIconLibrary
  ) { 
    library.addIconPacks(fas, far);
  }

    toggleEditor(editor: 'html' | 'css' | 'js'): void {
    this.activeEditor = editor;
    if (editor === 'html') {
      this.addHtmlClass = true;
      this.addCssClass = false;
      this.addJsClass = false;
    } else if (editor === 'css') {
      this.addHtmlClass = false;
      this.addCssClass = true;
      this.addJsClass = false;
    }
    else if (editor === 'js') {
      this.addHtmlClass = false;
      this.addCssClass = false;
      this.addJsClass = true;
    }
    
  }
  compileCode(code:string): void {
    this.codeEditorService.userCode.next(code);
  }

  changeEditor():void{
    this.verticalEditor = !this.verticalEditor;
  }

  public sanitizeScript(script: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(script);
  }

  get structuredCode(): any {
    return {
      code: `
        <html>
        <head>
          <style>${this.cssCode}</style>
        </head>
        <body>
          ${this.htmlCode}
          <script>${this.jsCode}</script>
        </body>
        </html>
      `,
      // Add other properties as needed
    };
  }

  ngAfterViewInit(): void {
    this.codeEditorService.fontSize.subscribe((fontSize) => {
      aceHtmlEditor.setFontSize(fontSize);
      aceCssEditor.setFontSize(fontSize);
      aceJsEditor.setFontSize(fontSize);
    });
    const aceHtmlEditor = ace.edit(this.htmlEditor.nativeElement);
    const aceCssEditor = ace.edit(this.cssEditor.nativeElement);
    const aceJsEditor = ace.edit(this.jsEditor.nativeElement);

    this.codeEditorService.editorTheme.subscribe((theme) => {

      aceHtmlEditor.setTheme(`ace/theme/${theme}`);
      aceCssEditor.setTheme(`ace/theme/${theme}`);
      aceJsEditor.setTheme(`ace/theme/${theme}`);
    });

    ace.config.set('basePath', 'https://unpkg.com/ace-builds@1.4.12/src-noconflict');


    aceHtmlEditor.session.on('change', () => {
      this.htmlCode = aceHtmlEditor.getValue();
      this.compileCode(this.structuredCode.code);
    });

    aceCssEditor.session.on('change', () => {
      this.cssCode = aceCssEditor.getValue();
      this.compileCode(this.structuredCode.code);
    });
    
    aceJsEditor.session.on('change', () => {
      this.jsCode = aceJsEditor.getValue();
      this.sanitizeScript(this.jsCode);
      this.compileCode(this.structuredCode.code);
    });

    this.codeEditorService.startCode.subscribe((startCode) => {
      aceHtmlEditor.session.setValue(startCode);
    });

      aceHtmlEditor.session.setMode(`ace/mode/html`);
      aceCssEditor.session.setMode(`ace/mode/css`);
      aceJsEditor.session.setMode(`ace/mode/javascript`);


      aceHtmlEditor.setFontSize(18);
      aceHtmlEditor.setTheme("ace/theme/cobalt");
      aceHtmlEditor.setOptions({wrapBehavioursEnabled: false});

      aceCssEditor.setFontSize(18);
      aceCssEditor.setTheme("ace/theme/cobalt");
      aceCssEditor.setOptions({wrapBehavioursEnabled: false});

      aceJsEditor.setFontSize(18);
      aceJsEditor.setTheme("ace/theme/cobalt");
      aceJsEditor.setOptions({wrapBehavioursEnabled: false});
  }

  ngOnChanges(changes: SimpleChanges): void {
    ace.config.set("fontSize", `${this.codeEditorService.fontSize}px`);
  }

}

