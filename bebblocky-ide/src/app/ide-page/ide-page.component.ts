import { Component } from '@angular/core';
import { BridgeService } from '../shared/services/bridge.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ide-page',
  templateUrl: './ide-page.component.html',
  styleUrls: ['./ide-page.component.css']
})
export class IdePageComponent {
  public showSpinner: boolean = false;
  public slide: any;

  constructor(
    private bridgeService: BridgeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.showSpinner = true;
    const slideId = this.route.snapshot.paramMap.get('slideId')!;
    this.bridgeService.getSlide(parseInt(slideId)).subscribe((slide: any) => {
      console.log('here');
      this.slide = slide;
      this.bridgeService.updateLastAccessedSlideId(this.slide.id).subscribe(() => {});
      this.showSpinner = false;
    });
  }
}
