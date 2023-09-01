export interface User {
    name: string;
    role: "parent" | "school";
    email: string;
    uid: string;
    credit: string;
}

export interface Course {
  courseId: number
  courseTitle: string
}

export interface Student {
  name: string; 
}

export interface Child {
  name: string
  lastSeen: string
  courses: string[]
}
