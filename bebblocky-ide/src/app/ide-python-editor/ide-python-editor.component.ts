import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as ace from "ace-builds";
import { FunctionsUsingCSI, NgTerminal } from 'ng-terminal';
import { PythonService } from '../python.service';


@Component({
  selector: 'app-ide-python-editor',
  templateUrl: './ide-python-editor.component.html',
  styleUrls: ['./ide-python-editor.component.css']
})
export class IdePythonEditorComponent implements AfterViewInit, OnInit {

@ViewChild('pythonEditor') public pythonEditor: ElementRef<HTMLElement> | any;

constructor(private pythonService:PythonService) {}

executePython() {
  this.pythonService.socket.emit('execute', { code: this.pythonEditor.getValue() });
}

  ngAfterViewInit() {
    
    ace.config.set('basePath', 'https://unpkg.com/ace-builds@1.4.12/src-noconflict');
    this.pythonEditor = ace.edit(this.pythonEditor.nativeElement);
    this.pythonEditor.setTheme('ace/theme/dracula');
    this.pythonEditor.session.setMode('ace/mode/python');
    this.pythonEditor.setFontSize(18);
    }    

  ngOnInit(): void {

  }

}
