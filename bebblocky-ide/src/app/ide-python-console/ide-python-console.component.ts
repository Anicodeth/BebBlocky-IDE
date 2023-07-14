import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { FunctionsUsingCSI, NgTerminal } from 'ng-terminal';
import { PythonService } from '../python.service';

@Component({
  selector: 'app-ide-python-console',
  templateUrl: './ide-python-console.component.html',
  styleUrls: ['./ide-python-console.component.css']
})
export class IdePythonConsoleComponent  implements AfterViewInit, OnInit {

@ViewChild('term', {static: false}) child: NgTerminal | any;

readonly prompt = '\n' + FunctionsUsingCSI.cursorColumn(1) + '$ ';

constructor( private pythonservice:PythonService) {}

public temp:string = "";
  ngAfterViewInit() {
    
    this.child.onData().subscribe((input:any) => {
      if (input === '\r') { // Carriage Return (When Enter is pressed)
        this.child.write(this.prompt);
        this.pythonservice.socket.emit('input', { input: this.temp  });
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
    this.pythonservice.socket.on('output', (data:any) => {
      this.child.write(data + '\r\n');
    });
  }

}


