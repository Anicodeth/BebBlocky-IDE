export interface Course {
  courseId: number;
  courseName: string;
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
  // other relevant fields here
}