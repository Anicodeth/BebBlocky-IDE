import { Component } from '@angular/core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-ide-page-header',
  templateUrl: './ide-page-header.component.html',
  styleUrls: ['./ide-page-header.component.css']
})
export class IdePageHeaderComponent {

  public showSetting:boolean;

  constructor(library: FaIconLibrary) {
    this.showSetting = false;
    library.addIconPacks(fas, far);
  }

  toggleSetting(){
      this.showSetting = !this.showSetting;
   }
}