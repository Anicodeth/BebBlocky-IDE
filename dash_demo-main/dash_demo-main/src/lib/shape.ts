export interface User {
    name: string;
    role: "parent" | "school";
    email: string;
    uid: string;
    credit: string;
}

export interface Student {
    name: string;
}