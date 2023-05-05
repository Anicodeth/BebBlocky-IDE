import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnChanges, OnInit, ViewChild } from '@angular/core';
import * as ace from "ace-builds";
import { CodeService } from '../services/code.service';

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
    private codeService: CodeService,
  ) { }

  ngAfterViewInit(): void {
    ace.config.set("fontSize", "22px");
    ace.config.set('basePath', 'https://unpkg.com/ace-builds@1.4.12/src-noconflict');

    const aceEditor = ace.edit(this.editor.nativeElement);
    
    aceEditor.session.on('change', () => {
      this.codeService.outputSubject.next(aceEditor.getValue());
    });
    
    aceEditor.session.setValue(`<h1 style="color: red;">Title</h1>`); // To add starting code, already from the start
    aceEditor.session.setMode('ace/mode/html');
    aceEditor.setTheme('ace/theme/dracula');
  }
}

