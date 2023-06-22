import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { BridgeService } from '../bridge.service';
import { ActivatedRoute } from '@angular/router';
import { CodeEditorService } from '../services/code-editor.service';

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

    if (!this.isStringMatch(this.slides[this.currentIndex].code, this.input, 0.7)){
      console.log("Not related");
          }
          else{
            console.log("Related");
          }
      
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



   isStringMatch(input: string, searchString: string, similarityThreshold: number): boolean {
    const normalizedInput = input.toLowerCase();
    const normalizedSearchString = searchString.toLowerCase();
  
    if (normalizedInput.includes(normalizedSearchString)) {
      return true;
    }
  
    const inputWords = normalizedInput.split(' ');
    const searchWords = normalizedSearchString.split(' ');
  
    for (const searchWord of searchWords) {
      let foundMatch = false;
  
      for (const inputWord of inputWords) {
        const similarity = this.calculateSimilarity(inputWord, searchWord);
  
        if (similarity >= similarityThreshold) {
          foundMatch = true;
          break;
        }
      }
  
      if (!foundMatch) {
        return false;
      }
    }
  
    return true;
  }
  
   calculateSimilarity(str1: string, str2: string): number {
    const maxLength = Math.max(str1.length, str2.length);
    const distance = this.levenshteinDistance(str1, str2);
    return 1 - distance / maxLength;
  }
  
   levenshteinDistance(str1: string, str2: string): number {
    const dp: number[][] = [];
  
    for (let i = 0; i <= str1.length; i++) {
      dp[i] = [i];
    }
  
    for (let j = 0; j <= str2.length; j++) {
      dp[0][j] = j;
    }
  
    for (let i = 1; i <= str1.length; i++) {
      for (let j = 1; j <= str2.length; j++) {
        if (str1[i - 1] === str2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1];
        } else {
          dp[i][j] = Math.min(
            dp[i - 1][j] + 1, // deletion
            dp[i][j - 1] + 1, // insertion
            dp[i - 1][j - 1] + 1 // substitution
          );
        }
      }
    }
  
    return dp[str1.length][str2.length];
  }
  
}
