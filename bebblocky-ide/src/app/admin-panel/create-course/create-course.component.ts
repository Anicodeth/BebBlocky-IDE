import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { BridgeService } from 'src/app/shared/services/bridge.service';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss'],
  animations: [
    trigger('listAnimation', [
      state('open', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      state('closed', style({
        opacity: 0,
        transform: 'translateX(-100%)'
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ])
  ]
})
export class CreateCourseComponent {
  public showSpinner: boolean = false;
  public courseForm: FormGroup | any;
  public contentExample: string = "CSS Media Queries are a powerful tool in creating responsive websites. They allow us to apply different styles based on the characteristics of the device or screen size. Media Queries use the @media rule in CSS to define different styles for different conditions. Common media query conditions include screen width, device orientation, resolution, and more.";

  public codeExample: string = "";

  public listOfFonts: string[] = [
    "Arial",
    "Verdana",
    "Jetbrains Mono"
  ];

  constructor(
    private fb: FormBuilder,
    private bridgeService: BridgeService
  ) {
    this.courseForm = this.fb.group({
      course: this.fb.group({
        courseTitle: [null, Validators.required],
        courseDescription: [null, Validators.required],
        courseLanguage: ['html', Validators.required],
        done: [false],
        editingLessonIndex: [null],
      }),
      lessons: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.showSpinner = true;

    // timeout to show the spinner
    setTimeout(() => {
      this.showSpinner = false;
    }, 2000);
  }

  dropLessons(event: CdkDragDrop<string[]>) {
    let temp = this.lessons.at(event.previousIndex).value;
    this.lessons.at(event.previousIndex).setValue(this.lessons.at(event.currentIndex).value);
    this.lessons.at(event.currentIndex).setValue(temp);
  }

  dropSlides(lessonIndex: number, event: CdkDragDrop<string[]>) {
    let temp = this.getSlides(lessonIndex).at(event.previousIndex).value;
    this.getSlides(lessonIndex).at(event.previousIndex).setValue(this.getSlides(lessonIndex).at(event.currentIndex).value);
    this.getSlides(lessonIndex).at(event.currentIndex).setValue(temp);
  }

  // Course Related Functions
  get course(): FormGroup {
    return this.courseForm.get('course') as FormGroup;
  }

  toggleCourse() {
    this.course.get('done')?.setValue(!this.course.get('done')?.value);
  }

  isCourseDone(): boolean {
    return this.course.get('done')?.value;
  }

  saveCourse(): void {
      const courseData = {
        courseTitle: this.courseForm.value.course.courseTitle,
        courseDescription: this.courseForm.value.course.courseDescription,
        courseLanguage: this.courseForm.value.course.courseLanguage,
        lessons: this.cleanLessons(this.courseForm.value.lessons)
      }
      this.showSpinner = true;
      this.bridgeService.createCourse(courseData).subscribe((res: any) => {
        this.showSpinner = false;
      });
  }

  cleanLessons(lessonsData: any) {
    let lessons = [];
    for (let lesson of lessonsData) {
      lessons.push(this.cleanLesson(lesson));
    }
    return lessons;
  }

  cleanLesson(lessonData: any) {
    return {
      lessonId: lessonData.lessonId,
      lessonTitle: lessonData.lessonTitle,
      lessonDescription: lessonData.lessonDescription,
      lessonLanguage: lessonData.lessonLanguage,
      slides: this.cleanSlides(lessonData.slides)
    }
  }

  cleanSlides(slidesData: any) {
    let slides = [];
    for (let slide of slidesData) {
      slides.push(this.cleanSlide(slide));
    }
    return slides;
  }

  cleanSlide(slideData: any) {
    return {
      backgroundColor: slideData.backgroundColor,
      color: slideData.color,
      title: slideData.title,
      titleFont: slideData.titleFont,
      content: slideData.content,
      code: slideData.code,
      contentFont: slideData.contentFont,
      startingCode: slideData.startingCode,
      image: slideData.image
    }
  }


  // Lesson Related Methods
  get lessons(): FormArray {
    return this.courseForm.get('lessons') as FormArray;
  }

  addLesson() {
    let lessonId = this.lessons.length + 1;
    this.lessons.push(
      this.fb.group({
        lessonId: [lessonId, Validators.required],
        lessonTitle: ["", Validators.required],
        lessonDescription: ["", Validators.required],
        lessonLanguage: ['html', Validators.required],
        slides: this.fb.array([]),
        editingSlideIndex: [""],
        done: [false],
      })
    );
    this.course.get('editingLessonIndex')?.setValue(this.lessons.length - 1);
  }

  get editingLessonIndex(): number | null {
    return this.course.get('editingLessonIndex')?.value;
  }

  set editingLessonIndex(index: number | null) {
    this.course.get('editingLessonIndex')?.setValue(index);
  }

  removeLesson(index: number) {
    this.lessons.removeAt(index);
  }

  toggleLesson(index: number) {
    if (index != this.editingLessonIndex) {
      this.editingLessonIndex = index;
      this.setLessonStatus(index, false);
      return;
    } else {
      this.editingLessonIndex = null;
    }
  }
  
  setLessonStatus(index: number, status: boolean) {
    this.editingLessonIndex = index;
    this.lessons.at(index).get('done')?.setValue(status);
  }

  isLessonDone(index: number): boolean {
    return this.lessons.at(index).get('done')?.value;
  }

  // Slide Related Methods
  getSlides(lessonIndex: number): FormArray {
    return this.lessons.at(lessonIndex).get('slides') as FormArray;
  }

  getSlide(lessonIndex: number, slideIndex: number): FormGroup {
    return this.getSlides(lessonIndex).at(slideIndex) as FormGroup;
  }

  addSlide(lessonIndex: number) {
    this.getSlides(lessonIndex).push(
      this.fb.group({
        backgroundColor: ["", Validators.required],
        color: ["", Validators.required],
        title: ["", Validators.required],
        titleFont: ["", Validators.required],
        content: ["", Validators.required],
        contentFont: ["", Validators.required],
        startingCode: ["", Validators.required],
        code: ["", Validators.required],
        image: ["", Validators.required],
        done: [false]
      })
    );
    this.lessons.at(lessonIndex).get('editingSlideIndex')?.setValue(this.getSlides(lessonIndex).length - 1);
  }

  getEditingSlideIndex(lessonIndex: number): number {
    return this.lessons.at(lessonIndex).get('editingSlideIndex')?.value;
  }

  removeSlide(lessonIndex: number, slideIndx: number) {
    this.getSlides(lessonIndex).removeAt(slideIndx);
  }

  setSlideStatus(lessonIndex: number, slideIndex: number, status: boolean) {
    if (status) {
      this.lessons.at(lessonIndex).get('editingSlideIndex')?.setValue(slideIndex);
    }
  }
  
  toggleSlide(lessonIndex: number, slideIndex: number) {
    if (slideIndex != this.getEditingSlideIndex(lessonIndex)) {
      this.lessons.at(lessonIndex).get('editingSlideIndex')?.setValue(slideIndex);
      this.setSlideStatus(lessonIndex, slideIndex, true);
      return;
    }
  }

  isSlideDone(lessonIndex: number, slideIndex: number): boolean {
    return this.getSlide(lessonIndex, slideIndex).get('done')?.value;
  }


  // Utility Methods
  capitalizeFormControl(slides: FormArray, formControlName: string, index: number) {
    this.capitalize(slides.at(index), formControlName);
  }

  capitalize(formGroup: FormGroup | any, formControlName: string) {
    if (formGroup != null && formControlName != null) {
      const words = formGroup.get(formControlName).value.split(' ');
      const capitalizedWords = words.map((word: string) => word.charAt(0).toUpperCase() + word.slice(1));
      const capitalizedString = capitalizedWords.join(' ');
      formGroup.get(formControlName).setValue(capitalizedString);
    }
  }
}
