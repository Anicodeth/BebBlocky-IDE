import {  AfterViewInit, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import * as ace from "ace-builds";
import { CodeEditorService } from '../../shared/services/code-editor.service';

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
  ) { }

    toggleEditor(editor: 'html' | 'css' | 'js'): void {
    this.activeEditor = editor;
  }
  compileCode(code:string): void {
    console.log(code);    
    this.codeEditorService.userCode.next(code);
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
      console.log(this.htmlCode);
      this.compileCode(this.structuredCode.code);
    });

    aceCssEditor.session.on('change', () => {
      this.cssCode = aceCssEditor.getValue();
      this.compileCode(this.structuredCode.code);
    });
    
    aceJsEditor.session.on('change', () => {
      this.jsCode = aceJsEditor.getValue();

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

