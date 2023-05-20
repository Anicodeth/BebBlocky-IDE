import { Component } from '@angular/core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { CodeEditorService } from '../services/code-editor.service';

@Component({
  selector: 'app-ide-page-header',
  templateUrl: './ide-page-header.component.html',
  styleUrls: ['./ide-page-header.component.css']
})
export class IdePageHeaderComponent {

  public showSetting: boolean;
  public fontSize: any;
  public theme:string | undefined;
  public themes:string[] = ["chrome", "chaos","cobalt", "clouds", "dawn", "eclipse", "crimson_editor", "dreamweaver", "gob", "github", "gruvbox", "xcode"];

  constructor(
    private library: FaIconLibrary,
    private codeEditorService: CodeEditorService
  ) {
    this.showSetting = false;
    library.addIconPacks(fas, far);
    this.codeEditorService.fontSize;
  }

  toggleSetting() {
    this.showSetting = !this.showSetting;
  }

  setFontSize(fontSize: number): void {
    this.codeEditorService.fontSize.next(fontSize);
  }

  setTheme(theme:string){
    this.codeEditorService.editorTheme.next(theme);
  }


}