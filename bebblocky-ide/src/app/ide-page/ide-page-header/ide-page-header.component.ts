import { Component, Input, OnInit } from '@angular/core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { CodeEditorService } from '../../shared/services/code-editor.service';

@Component({
  selector: 'app-ide-page-header',
  templateUrl: './ide-page-header.component.html',
  styleUrls: ['./ide-page-header.component.css']
})
export class IdePageHeaderComponent implements OnInit {

  public showSetting: boolean;
  public night: boolean = false;
  public fontSize: any;
  public theme:string | undefined;
  public themes:string[] = ["chrome", "chaos","cobalt", "clouds", "dawn", "eclipse", "crimson_editor", "dreamweaver", "gob", "github", "gruvbox", "xcode"];
  public user: any;
  @Input() beblockyImage: any = true;
  @Input() userName: any = true;


  constructor(
    private library: FaIconLibrary,
    private codeEditorService: CodeEditorService
  ) {
    this.showSetting = false;
    library.addIconPacks(fas, far);
    this.codeEditorService.fontSize;
  }
  ngOnInit(): void {
    let user = JSON.parse(sessionStorage.getItem('user')!);
    if (user) {
      this.user = user;
    }
    else{
      this.user = {
        username: "Guest",
      }
    }

    

    // Night mode

    let mode = JSON.parse(sessionStorage.getItem('nightMode')!);
    if ( mode == true) {
      this.night = true;
    }
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
  nightAndDay(){
    this.night = !this.night;
    this.codeEditorService.mainTheme.next(true);
    sessionStorage.setItem('nightMode', JSON.stringify(this.night));
  }
  fullScreen(){
    this.codeEditorService.fullScreen.next(true);
   }




}