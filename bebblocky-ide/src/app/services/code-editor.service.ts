import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CodeEditorService {

  userCode = new Subject<string>();
  fontSize = new Subject<number>();
}
