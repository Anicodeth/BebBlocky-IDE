export interface Course {
  courseId: number;
  courseTitle: string;
  courseDescription: string;
  courseLanguage: 'html' | 'css' | 'js';
  lessons: Lesson[];
}

export interface Lesson {
  lessonId: number;
  lessonTitle: string;
  lessonDescription: string;
  lessonLanguage: 'html' | 'css' | 'js';
  slides: Slide[];
}

export interface Slide {
  backgroundColor: string;
  color: string;
  title: string;
  titleFont: string;
  content: string;
  contentFont: string;
  startingCode: string;
  code: string;
  image: string;
  requiresPastProgress: string;
  shouldBeSaved: string;
  // other relevant fields here
}