export interface Course {
  courseId: number;
  courseTitle: string;
  courseDescription: string;
  courseLanguage: 'html' | 'css' | 'js';
  courses: Slide[];
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