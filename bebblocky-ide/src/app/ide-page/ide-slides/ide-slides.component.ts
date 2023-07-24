import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Slide } from 'src/app/shared/models/course.dto';
import { BridgeService } from 'src/app/shared/services/bridge.service';
import { CodeEditorService } from 'src/app/shared/services/code-editor.service';

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

  public slides: Slide[] = [];
  public courseId: any;
  public input: any;
  currentIndex: number = 0;

  constructor(
    private bridgeService: BridgeService,
    private route: ActivatedRoute,
    private codeEditorService: CodeEditorService
  ) { }

  ngOnInit() {
    this.courseId = parseInt(this.route.snapshot.paramMap.get('courseId')!);
    this.bridgeService.getCourse(this.courseId).subscribe((course: any) => {
      this.slides = course.course.slides;
      // this.codeEditorService.startCode.next(this.slides[0].startingCode);

      // const progress = this.bridgeService.getCourseProgress(this.courseId);
      // Progress is in percentage from 100, so we need to find the index by using 100 and the length of the slides
      // this.currentIndex = Math.floor((progress / 100) * this.slides.length);
      // this.goToSlide(this.currentIndex);
    });

    this.codeEditorService.userCode.subscribe((userWrittenCode) => {
      this.input = userWrittenCode;
    });

  }

  goToPrevious(): void {
    if (this.currentIndex != 0) {
      this.currentIndex -= 1;
    }
    this.updateProgress();
  }


  goToNext(): void {
    if (this.calculateSentencePercentage(this.input, this.slides[this.currentIndex].code) < 0) {
      alert('You did not do the task correctly! Go back and check what is missing from your code.');
      return;
    }

    if (this.currentIndex != this.slides.length - 1) {
      this.currentIndex += 1;
    }

    this.updateProgress();

  }

  goToSlide(courseIndex: number): void {
    this.currentIndex = courseIndex;
  }

  getCurrentSlideUrl() {
    return `url('${this.slides[this.currentIndex].image}')`;
  }

  updateProgress() {
    this.setStartingCode();
    let percent: any = ((this.currentIndex + 1) / this.slides.length) * 100;

    this.bridgeService.updateCourseProgress(this.courseId, percent).subscribe((response: any) => {
      let temp: any = sessionStorage.getItem('courseProg');
      temp = JSON.parse(temp);

      temp.forEach((val: any) => {
        if (val.courseId == this.courseId) {
          val.completedPercent = percent;
        }
      });
      sessionStorage.setItem('courseProg', JSON.stringify(temp));
    });;
  }

  setStartingCode() {
    this.codeEditorService.startCode.next(this.slides[this.currentIndex].startingCode);
  }


  calculateSentencePercentage(paragraph: string, sentence: string): number {
    if (!paragraph || !sentence) {
      return 100;
    }

    const paragraphLower = paragraph.toLowerCase();
    const sentenceLower = sentence.toLowerCase();

    // Remove punctuation from the sentence and split it into individual words
    const sentenceWords = sentenceLower.replace(/[.,?!]/g, "").split(" ");

    // Calculate the number of words in the sentence
    const sentenceLength = sentenceWords.length;

    // Count the number of matching words in the paragraph
    const matchingWords = sentenceWords.filter((word) => paragraphLower.includes(word));

    // Calculate the number of matching words
    const matchingWordCount = matchingWords.length;

    // Calculate the percentage of the sentence present in the paragraph
    const percentage = (matchingWordCount / sentenceLength) * 100;

    return percentage;
  }



}
