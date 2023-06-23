export interface User {
  userId: number;
  username: string;
  email: string;
  password: string;
  progress: Progress[];
  token: string;
}

export interface Progress {
  slideId: number;
  completedPercent: number;
}