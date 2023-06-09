import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss']
})
export class CreateCourseComponent {
  public showSpinner: boolean = false;
  public courseForm: FormGroup | any;

  constructor(
    private fb: FormBuilder,
  ) {
    this.courseForm = this.fb.group({
      course: this.fb.group({
        courseTitle: [null, Validators.required],
        courseDescription: [null, Validators.required],
        courseLanguage: [null, Validators.required],
        done: [false]
      }),
      lessons: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.showSpinner = true;

    // timeout to show the spinner
    setTimeout(() => {
      this.showSpinner = false;
    }, 1000);
  }

  dropLessons(event: CdkDragDrop<string[]>) {
    console.log('here');
    let temp = this.lessons.at(event.previousIndex).value;
    this.lessons.at(event.previousIndex).setValue(this.lessons.at(event.currentIndex).value);
    this.lessons.at(event.currentIndex).setValue(temp);
  }

  dropSlides(lessonIndex: number, event: CdkDragDrop<string[]>) {
    console.log('here');
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


  // Lesson Related Methods
  get lessons(): FormArray {
    return this.courseForm.get('lessons') as FormArray;
  }

  addLesson() {
    let lessonId = this.lessons.length + 1;
    this.lessons.push(
      this.fb.group({
        lessonId: [lessonId, Validators.required],
        lessonTitle: [null, Validators.required],
        lessonDescription: [null, Validators.required],
        lessonLanguage: [null, Validators.required],
        done: [false],
        slides: this.fb.array([]),
        editingSlideIndex: [null]
      })
    );
  }

  removeLesson(index: number) {
    this.lessons.removeAt(index);
  }

  toggleLesson(index: number) {
    this.lessons.at(index).get('done')?.setValue(!this.lessons.at(index).get('done')?.value);
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
        backgroundColor: [null, Validators.required],
        color: [null, Validators.required],
        title: [null, Validators.required],
        titleFont: [null, Validators.required],
        content: [null, Validators.required],
        contentFont: [null, Validators.required],
        startingCode: [null, Validators.required],
        code: [null, Validators.required],
        image: [null, Validators.required],
        done: [false]
      })
    );
    this.lessons.at(lessonIndex).get('editingSlideIndex')?.setValue(this.getSlides(lessonIndex).length - 1);
  }

  removeSlide(lessonIndex: number, slideIndx: number) {
    this.getSlides(lessonIndex).removeAt(slideIndx);
  }
  
  toggleSlide(lessonIndex: number, slideIndex: number) {
    this.getSlide(lessonIndex, slideIndex).get('done')?.setValue(!this.getSlide(lessonIndex, slideIndex).get('done')?.value);
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
