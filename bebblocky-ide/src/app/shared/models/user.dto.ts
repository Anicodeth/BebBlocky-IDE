export interface User {
  userId: number;
  username: string;
  email: string;
  password: string;
  progress: Progress[];
  token: string;
  lastAccessedSlideId: number;
}

export interface Progress {
  slideId: number;
  completedPercent: number;
}