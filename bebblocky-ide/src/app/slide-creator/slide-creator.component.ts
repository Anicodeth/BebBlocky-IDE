import { Component, OnInit } from '@angular/core';
import { Slide, SlideDetails } from '../shared/models/slide.dto';
import { BridgeService } from '../shared/services/bridge.service';

@Component({
  selector: 'app-slide-creator',
  templateUrl: './slide-creator.component.html',
  styleUrls: ['./slide-creator.component.scss']
})
export class SlideCreatorComponent {

  public slide: Slide = {
    slideId: 1,
    courseName: '',
    courseDescription: '',
    courseCategory: 'html',
    slides: []
  };

  public newSlide: SlideDetails = {
    backgroundColor: '',
    font: '',
    title: '',
    content: '',
    code: '',
    image: ''
  };

  constructor(
    private bridgeService: BridgeService
  ) {}

  public createSlide() {
    this.bridgeService.createSlide(this.slide).subscribe((response: any) => {
      console.log(response);
    });
  }

  public addSlide(): void {
    this.slide.slides.push({ ...this.newSlide });
    this.resetNewSlide();
  }

  public resetNewSlide(): void {
    this.newSlide = {
      backgroundColor: '',
      font: '',
      title: '',
      content: '',
      code: '',
      image: ''
    };
  }
}
