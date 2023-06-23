export interface Slide {
  slideId: number;
  courseName: string;
  courseDescription: string;
  courseCategory: 'html' | 'css' | 'js';
  slides: SlideDetails[];
}

export interface SlideDetails {
  backgroundColor: string;
  font: string;
  title: string;
  content: string;
  code: string;
  image: string;
  // other relevant fields here
}