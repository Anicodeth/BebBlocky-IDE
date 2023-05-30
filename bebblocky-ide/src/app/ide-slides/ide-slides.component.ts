import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { BridgeService } from '../bridge.service';
import { ActivatedRoute } from '@angular/router';

export interface SlideInterface {
  backgroundColor: string;
  font: string;
  title: string;
  content: string;
  code: string;
}

@Component({
  selector: 'app-ide-slides',
  templateUrl: './ide-slides.component.html',
  styleUrls: ['./ide-slides.component.css'],
})
export class IdeSlidesComponent implements OnInit {
  @ViewChild('code') private codeExample: ElementRef<HTMLElement> | any;

  public slides: any;
  public slideId: any;
  currentIndex: number = 0;

  constructor(
    private bridgeService: BridgeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.slideId = parseInt(this.route.snapshot.paramMap.get('slideId')!);
    this.bridgeService.getSlide(this.slideId).subscribe((slides: any) => {
      console.log(slides);
      this.slides = slides.slides;
    });
  }

  goToPrevious(): void {
    if (this.currentIndex != 0) {
      this.currentIndex -= 1;
    }
    this.updateProgress();
  }

  goToNext(): void {
    if (this.currentIndex != this.slides.length - 1) {
      this.currentIndex += 1;
    }
    this.updateProgress();
  }

  goToSlide(slideIndex: number): void {
    this.currentIndex = slideIndex;
  }

  getCurrentSlideUrl() {
    return `url('${this.slides[this.currentIndex].backgroundUrl}')`;
  }

  updateProgress() {
    this.bridgeService.updateProgress(this.slideId, this.currentIndex / this.slides.length * 100);
  }
}
