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

  // public slides: SlideInterface[] | any[] = [
  //   {
  //     backgroundColor: '#FFDE01',
  //     font: 'Lucida Console',
  //     title: 'WRITE YOUR NAME!',
  //     content:
  //       'Let us write our first HTML code. First, write the opening tag `<h1>`. Second, write your name. Now, write the closing tag `</h1>`. Finally, enjoy your first HTML code!',
  //     code: '<h1>Your Name</h1>',
  //   },
  //   {
  //     backgroundColor: '#3366ff',
  //     font: 'Verdana',
  //     title: 'CREATE A LINK',
  //     content:
  //       'In this lesson, you will learn how to create a link in HTML. Follow the steps below:\n\nStep 1: Use the `<a>` tag to create a link.\nStep 2: Set the `href` attribute to the URL you want to link to.\nStep 3: Add the link text between the opening and closing tags.',
  //     code: '<a href="https://www.google.com">Visit Google</a>',
  //   },
  //   {
  //     backgroundColor: '#ff45aa',
  //     font: 'Georgia',
  //     title: 'INSERT A LINE BREAK',
  //     content:
  //       "To insert a line break in HTML, use the `<br>` tag. It doesn't require a closing tag.",
  //     code: 'This is the first line<br>This is the second line',
  //   },
  //   {
  //     backgroundColor: '#ffa500',
  //     font: 'Courier New',
  //     title: 'CREATE A LIST',
  //     content:
  //       'In this lesson, you will learn how to create an ordered list and an unordered list in HTML.\n\nStep 1: Use the `<ol>` tag for an ordered list or the `<ul>` tag for an unordered list.\nStep 2: Within the list tag, use the `<li>` tags to define list items.',
  //     code: '<ol>\n  <li>First item</li>\n  <li>Second item</li>\n  <li>Third item</li>\n</ol>',
  //   },
  // ];
  public slides: any;
  public slideId: any;
  currentIndex: number = 0;

  constructor(
    private bridgeService: BridgeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.slideId = parseInt(this.route.snapshot.paramMap.get('slideId')!);
    this.bridgeService.getSlide(this.slideId).subscribe((slides: any) => this.slides = slides);
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
