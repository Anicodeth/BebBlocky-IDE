import { AfterViewChecked, Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-ide-slide',
  templateUrl: './ide-slide.component.html',
  styleUrls: ['./ide-slide.component.css']
})
export class IdeSlideComponent implements AfterViewChecked {
  @ViewChild('formattedHtml', { static: false }) formattedHtml!: ElementRef<HTMLIFrameElement>;
  @Input() title: string = "";
  @Input() titleFont: string = "";
  @Input() content: string = "";
  @Input() contentFont: string = "";
  @Input() code: string = "";
  @Input() backgroundColor: string = "";
  @Input() color: string = "";
  @Input() image: string = "";
  
  ngAfterViewChecked() {
    this.formattedHtml.nativeElement.innerHTML = this.content;
  }
}
