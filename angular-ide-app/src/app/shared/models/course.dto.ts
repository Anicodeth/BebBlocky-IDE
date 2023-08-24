export interface Course {
  courseId: number;
  courseTitle: string;
  courseDescription: string;
  courseLanguage: 'html' | 'css' | 'js';
  lessons: Lesson[];
  done: boolean;
}

export interface Lesson {
  lessonId: number;
  lessonTitle: string;
  lessonDescription: string;
  lessonLanguage: 'html' | 'css' | 'js';
  done: boolean;
  editingSlideIndex: number;
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
  done: boolean;
  // other relevant fields here
}