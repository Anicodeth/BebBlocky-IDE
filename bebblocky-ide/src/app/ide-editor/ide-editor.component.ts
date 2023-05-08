import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnChanges, OnInit, ViewChild } from '@angular/core';
import * as ace from "ace-builds";
import { CodeEditorService } from '../services/code-editor.service';

@Component({
  selector: 'app-ide-editor',
  templateUrl: 'ide-editor.component.html',
  styleUrls: [
    'ide-editor.component.css',
  ]
})
export class IdeEditorComponent implements AfterViewInit {

  @ViewChild("editor") private editor: ElementRef<HTMLElement> | any;

  constructor(
    private codeEditorService: CodeEditorService,
  ) { }

  ngAfterViewInit(): void {
    ace.config.set("fontSize", `${this.codeEditorService.fontSize}px`);
    ace.config.set("fontFamily", "JetBrains Mono");
    ace.config.set('basePath', 'https://unpkg.com/ace-builds@1.4.12/src-noconflict');

    const aceEditor = ace.edit(this.editor.nativeElement);
    
    aceEditor.session.on('change', () => {
      this.codeEditorService.userCode.next(aceEditor.getValue());
    });
    
    aceEditor.session.setValue(`<h1>Title</h1>`); // To add starting code, already from the start
    aceEditor.session.setMode('ace/mode/html');
    aceEditor.setTheme('ace/theme/dracula');
    aceEditor.setOptions({wrapBehavioursEnabled: false
    });
  }
}

