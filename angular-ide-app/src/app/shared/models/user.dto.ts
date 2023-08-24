export interface User {
  userId: number;
  username: string;
  email: string;
  password: string;
  progress: Progress[];
  token: string;
  lastAccessedCourseId: number;
  role: string;
}

export interface Progress {
  courseId: number;
  completedPercent: number;
}