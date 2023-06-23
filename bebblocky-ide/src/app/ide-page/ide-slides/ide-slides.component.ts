import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BridgeService } from 'src/app/services/bridge.service';
import { CodeEditorService } from 'src/app/services/code-editor.service';

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
  public input:any;
  currentIndex: number = 0;

  constructor(
    private bridgeService: BridgeService,
    private route: ActivatedRoute,
    private codeEditorService: CodeEditorService
  ) {}

  ngOnInit() {
    this.slideId = parseInt(this.route.snapshot.paramMap.get('slideId')!);
    this.bridgeService.getSlide(this.slideId).subscribe((slide: any) => {
      this.slides = slide.slide.slides;
      console.log(this.slides);
    });




    this.codeEditorService.userCode.subscribe((output) => {
      this.input = output;
    });
  }

  goToPrevious(): void {
    if (this.currentIndex != 0) {
      this.currentIndex -= 1;
    }
    this.updateProgress();
  }


  goToNext(): void {
        // if related patterns are found
        console.log(this.calculateSentencePercentage(this.input,this.slides[this.currentIndex].code))
         if (this.calculateSentencePercentage(this.input,this.slides[this.currentIndex].code) < 0){
              alert('You did not do the task correctly! Go back and check what is missing from your code.')
          }
          else{
            //if strings are related
            if (this.currentIndex != this.slides.length - 1) {
              this.currentIndex += 1;}

            this.updateProgress();
          }
      
  }

  goToSlide(slideIndex: number): void {
    this.currentIndex = slideIndex;
  }

  getCurrentSlideUrl() {
    return `url('${this.slides[this.currentIndex].backgroundUrl}')`;
  }

  updateProgress() {
    let percent: any = ((this.currentIndex + 1) / this.slides.length) * 100;

    this.bridgeService.updateSlideProgress(this.slideId, percent).subscribe((response) => {
      let temp:any=sessionStorage.getItem('courseProg');
      temp = JSON.parse(temp);
      
      temp.forEach((val:any)=>{
        if(val.slideId == this.slideId){
          val.completedPercent = percent;}
      });
      sessionStorage.setItem('courseProg', JSON.stringify(temp));
    });;
  }


   calculateSentencePercentage(paragraph: string, sentence: string): number {
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
