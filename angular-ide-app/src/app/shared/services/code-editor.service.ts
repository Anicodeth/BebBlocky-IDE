import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CodeEditorService {
  startCode = new Subject<string>();
  editorLanguage = new Subject<string>();
  userCode = new Subject<string>();
  fontSize = new Subject<number>();
  editorTheme = new Subject<string>();
  mainTheme = new Subject<boolean>();
  fullScreen = new Subject<boolean>();
  onlyCode = false;
}
