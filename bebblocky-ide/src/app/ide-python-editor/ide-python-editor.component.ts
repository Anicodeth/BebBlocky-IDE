import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as ace from "ace-builds";
import { io , Socket  } from 'socket.io-client';
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
    
    this.child.onData().subscribe((input:any) => {
      

      console.log('input', input);
      if (input === '\r') { // Carriage Return (When Enter is pressed)
        this.child.write(this.prompt);
        this.socket.emit('input', { input: this.temp  });
        this.temp = "";
      } else if (input === '\u007f') { // Delete (When Backspace is pressed)
        if (this.child.underlying.buffer.active.cursorX > 2) {
          this.child.write('\b \b');}
      } else if (input === '\u0003') { // End of Text (When Ctrl and C are pressed)
          this.child.write('^C');
          this.child.write(this.prompt);
      }else
      { this.child.write(input);
       }

       if (this.isEnglishChar(input)) this.temp += input ;
        
      
      }    
    );

  }

 isEnglishChar(char: string): boolean {
  if (char.length !== 1) {
    return false;
  }

  const charCode = char.charCodeAt(0);
  return (
    (charCode >= 65 && charCode <= 90) || // Uppercase letters (A-Z)
    (charCode >= 97 && charCode <= 122) || // Lowercase letters (a-z)
    (charCode >= 48 && charCode <= 57) || // Numbers (0-9)
    (charCode >= 33 && charCode <= 47) || // Punctuation marks (!"#$%&'()*+,-./)
    (charCode >= 58 && charCode <= 64) || // Punctuation marks (:;<=>?@)
    (charCode >= 91 && charCode <= 96) || // Punctuation marks ([\]^_`)
    (charCode >= 123 && charCode <= 126) || // Punctuation marks ({|}~)
    charCode === 32 // Space
  );
}

  ngOnInit(): void {
    this.socket.on('output', (data) => {
      this.child.write(data + '\r\n');
    });
  }

}
