import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as ace from "ace-builds";
import { PythonService } from '../python.service';
import { io , Socket  } from 'socket.io-client';
import { FitAddon } from 'xterm-addon-fit';
import { Terminal } from 'xterm';
import { FunctionsUsingCSI, NgTerminal } from 'ng-terminal';





@Component({
  selector: 'app-ide-python-editor',
  templateUrl: './ide-python-editor.component.html',
  styleUrls: ['./ide-python-editor.component.css']
})
export class IdePythonEditorComponent implements AfterViewInit, OnInit {

@ViewChild('pythonEditor') public pythonEditor: ElementRef<HTMLElement> | any;
@ViewChild('term', {static: false}) child: NgTerminal | any;
  

readonly prompt = '\n' + FunctionsUsingCSI.cursorColumn(1) + '$ ';
pythonCode = '';


private socket: Socket;

constructor() {
  this.socket = io('http://localhost:3001');

}

executePython() {
  console.log(this.pythonEditor.getValue());
  this.socket.emit('execute', { code: this.pythonEditor.getValue() });
}



public temp:string = "";
  ngAfterViewInit() {
    
    ace.config.set('basePath', 'https://unpkg.com/ace-builds@1.4.12/src-noconflict');
    this.pythonEditor = ace.edit(this.pythonEditor.nativeElement);
    this.pythonEditor.setTheme('ace/theme/dracula');
    this.pythonEditor.session.setMode('ace/mode/python');
    this.pythonEditor.setFontSize(18);
    
    this.child.write('\r\n');
    this.child.onData().subscribe((input:any) => {
      

      console.log('input', input);
      if (input === '\r') { // Carriage Return (When Enter is pressed)
        this.child.write(this.prompt);
        this.socket.emit('input', { input: this.temp });
        this.temp = "";
      } else if (input === '\u007f') { // Delete (When Backspace is pressed)
        if (this.child.underlying.buffer.active.cursorX > 2) {
          this.child.write('\b \b');
        }
      } else if (input === '\u0003') { // End of Text (When Ctrl and C are pressed)
          this.child.write('^C');
          this.child.write(this.prompt);
      }else this.child.write(input);
        
      this.temp += input;
      }    
    );

  }
 
  
  ngOnInit(): void {
    this.socket.on('output', (data) => {
      this.child.write(data + '\r\n');
    });

  

  

    
  }

}
