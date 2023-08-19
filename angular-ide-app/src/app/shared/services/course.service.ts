import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  constructor(
    private fb: FormBuilder
  ) { }

  public cleanCourse(courseForm: FormGroup) {
    return {
      courseTitle: courseForm.value.course.courseTitle,
      courseDescription: courseForm.value.course.courseDescription,
      courseLanguage: courseForm.value.course.courseLanguage,
      lessons: this.cleanLessons(courseForm.value.lessons)
    }
  }


  private cleanLessons(lessonsData: any) {
    let lessons = [];
    for (let lesson of lessonsData) {
      lessons.push(this.cleanLesson(lesson));
    }
    return lessons;
  }

  private cleanLesson(lessonData: any) {
    return {
      lessonId: lessonData.lessonId,
      lessonTitle: lessonData.lessonTitle,
      lessonDescription: lessonData.lessonDescription,
      lessonLanguage: lessonData.lessonLanguage,
      slides: this.cleanSlides(lessonData.slides)
    }
  }

  private cleanSlides(slidesData: any) {
    let slides = [];
    for (let slide of slidesData) {
      slides.push(this.cleanSlide(slide));
    }
    return slides;
  }

  private cleanSlide(slideData: any) {
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

  public fillCourseFromForUpdate(courseForm: FormGroup, courseData: any) {
    courseForm.get('course.courseTitle')?.setValue(courseData.courseTitle);
    courseForm.get('course.courseDescription')?.setValue(courseData.courseDescription);
    courseForm.get('course.courseLanguage')?.setValue(courseData.courseLanguage);
    this.fillLessonsFormForUpdate(courseForm, courseData.lessons);
  }

  private fillLessonsFormForUpdate(courseForm: FormGroup, lessonsData: any) {
    for (let lesson of lessonsData) {
      this.fillLessonFormForUpdate(courseForm, lesson);
    }
  }

  private fillLessonFormForUpdate(courseForm: FormGroup, lessonData: any) {
    let lessonForm = this.addLesson(courseForm);
    lessonForm.get('lessonId')?.setValue(lessonData.lessonId);
    lessonForm.get('lessonTitle')?.setValue(lessonData.lessonTitle);
    lessonForm.get('lessonDescription')?.setValue(lessonData.lessonDescription);
    lessonForm.get('lessonLanguage')?.setValue(lessonData.lessonLanguage);
    this.fillSlidesFormForUpdate(lessonForm, lessonData.slides);
  }

  private fillSlidesFormForUpdate(lessonForm: FormGroup, slidesData: any) {
    for (let slide of slidesData) {
      this.fillSlideFormForUpdate(lessonForm, slide);
    }
  }

  private fillSlideFormForUpdate(lessonForm: FormGroup, slideData: any) {
    let slideForm = this.addSlide(lessonForm);
    slideForm.get('backgroundColor')?.setValue(slideData.backgroundColor);
    slideForm.get('color')?.setValue(slideData.color);
    slideForm.get('title')?.setValue(slideData.title);
    slideForm.get('titleFont')?.setValue(slideData.titleFont);
    slideForm.get('content')?.setValue(slideData.content);
    slideForm.get('contentFont')?.setValue(slideData.contentFont);
    slideForm.get('startingCode')?.setValue(slideData.startingCode);
    slideForm.get('code')?.setValue(slideData.code);
    slideForm.get('image')?.setValue(slideData.image);
  }

  public addLesson(courseForm: FormGroup) {
    let lessons = courseForm.get('lessons') as FormArray;
    let lessonId = lessons.length + 1;
    lessons.push(
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
    return lessons.at(lessons.length - 1) as FormGroup;
  }

  public addSlide(lessonForm: FormGroup) {
    let slides = lessonForm.get('slides') as FormArray;

    slides.push(
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

    return slides.at(slides.length - 1) as FormGroup;
  }
}
