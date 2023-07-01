import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ide-slide',
  templateUrl: './ide-slide.component.html',
  styleUrls: ['./ide-slide.component.css']
})
export class IdeSlideComponent {
  @Input() title: string = "";
  @Input() titleFont: string = "";
  @Input() content: string = "";
  @Input() contentFont: string = "";
  @Input() code: string = "";
  @Input() backgroundColor: string = "";
  @Input() color: string = "";
  @Input() image: string = "";
}
