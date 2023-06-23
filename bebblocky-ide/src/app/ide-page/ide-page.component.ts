import { Component } from '@angular/core';
import { BridgeService } from '../shared/services/bridge.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ide-page',
  templateUrl: './ide-page.component.html',
  styleUrls: ['./ide-page.component.css']
})
export class IdePageComponent {
  public slide: any;

  constructor(
    private bridgeService: BridgeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const slideId = this.route.snapshot.paramMap.get('slideId')!;
    this.bridgeService.getSlide(parseInt(slideId)).subscribe((slide: any) => this.slide = slide);
  }
}
