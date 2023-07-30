import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { BridgeService } from 'src/app/shared/services/bridge.service';
import { CourseService } from 'src/app/shared/services/course.service';

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
  @Input() editDataId: number | any;
  @Input() editData: FormGroup | any;
  public error: string = "";
  public success: string = "";
  public showSpinner: boolean = false;
  public courseForm: FormGroup | any;
  public contentExample: string = "CSS Media Queries are a powerful tool in creating responsive websites. They allow us to apply different styles based on the characteristics of the device or screen size. Media Queries use the @media rule in CSS to define different styles for different conditions. Common media query conditions include screen width, device orientation, resolution, and more.";

  public codeExample: string = "";
  public listOfFonts: string[] = [
    "Arial",
    "Verdana",
    "Comic Sans MS",
    "Impact",
    "Tahoma",
    "Trebuchet MS",
    "Courier New",
    "Georgia",
    "Lucida Sans Unicode",
    "Lucida Console",
    "Palatino Linotype",
    "Times New Roman",
    "Lucida Handwriting",
    "Segoe UI",
    "Century Gothic",
    "Century Schoolbook",
    "Franklin Gothic",
    "Book Antiqua",
    "Brush Script MT",
    "Kristen ITC",
    "Jokerman",
    "Papyrus",
    "Curlz MT",
    "Showcard Gothic",
  ];


  constructor(
    private fb: FormBuilder,
    private bridgeService: BridgeService,
    private courseService: CourseService
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
      if (this.editData) {
        this.courseForm = this.editData;
      }
    }, 2000);
  }

  // Drag and drop functions
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
    const courseData = this.courseService.cleanCourse(this.courseForm);
    this.error = "";
    this.showSpinner = true;
    if (!this.editData) {
      this.bridgeService.createCourse(courseData).subscribe((res: any) => {
        this.showSpinner = false;
        this.editDataId = res.courseId;
        this.editData = this.courseForm;
        this.success = "Course created successfully. You can continue to edit it.";
      }, (err: any) => {
        this.showSpinner = false;
        this.error = err.error.message;
      });
    } else {
      this.bridgeService.updateCourse(this.editDataId, courseData).subscribe((res: any) => {
        this.showSpinner = false;
      }, (err: any) => {
        this.showSpinner = false;
        this.error = err.error.message;
      });
    }
  }

  // Lesson Related Methods
  get lessons(): FormArray {
    return this.courseForm.get('lessons') as FormArray;
  }

  addLesson() {
    this.courseService.addLesson(this.courseForm);
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

  // to toggle the lesson between editing and collapsed modes
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
  getLesson(lessonIndex: number): FormGroup {
    return this.lessons.at(lessonIndex) as FormGroup;
  }

  getSlides(lessonIndex: number): FormArray {
    return this.getLesson(lessonIndex).get('slides') as FormArray;
  }

  getSlide(lessonIndex: number, slideIndex: number): FormGroup {
    return this.getSlides(lessonIndex).at(slideIndex) as FormGroup;
  }

  addSlide(lessonIndex: number) {
    this.courseService.addSlide(this.getLesson(lessonIndex));
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

  // Function to capitalize a form when needed
  capitalize(formGroup: FormGroup | any, formControlName: string) {
    if (formGroup != null && formControlName != null) {
      const words = formGroup.get(formControlName).value.split(' ');
      const capitalizedWords = words.map((word: string) => word.charAt(0).toUpperCase() + word.slice(1));
      const capitalizedString = capitalizedWords.join(' ');
      formGroup.get(formControlName).setValue(capitalizedString);
    }
  }
}
