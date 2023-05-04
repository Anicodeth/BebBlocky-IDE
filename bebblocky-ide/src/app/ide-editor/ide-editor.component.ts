import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as ace from "ace-builds";

@Component({
  selector: 'app-ide-editor',
  templateUrl: 'ide-editor.component.html',
  styleUrls: [
    'ide-editor.component.css',
  ]
})
export class IdeEditorComponent implements AfterViewInit {

  @ViewChild("editor") private editor: ElementRef<HTMLElement> | any;

  ngAfterViewInit(): void {
    ace.config.set("fontSize", "22px");
    ace.config.set("fontFamily", "JetBrains Mono");
    ace.config.set('basePath', 'https://unpkg.com/ace-builds@1.4.12/src-noconflict');

    const aceEditor = ace.edit(this.editor.nativeElement);
    aceEditor.session.setValue("<h1>Title</h1>"); // To add starting code, already from the start
    console.log(aceEditor.getValue());
    aceEditor.session.setMode('ace/mode/html');
    aceEditor.setTheme('ace/theme/twilight');
  }
}
