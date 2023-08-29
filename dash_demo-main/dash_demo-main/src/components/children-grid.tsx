import { ChevronRight, Clock, PlusIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import type { Student } from "@/lib/shape";
import { Button } from "@/components/ui/button";
import ChildCard from "./child-card";

interface Props {
    students: Student[];
    children: React.ReactNode;
}

export default function ChildrenGrid({ students, children }: Props) {
  return <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
    {students && students.map((student, index) => (<ChildCard student={student} key={index} addCourseRoute={"/courses"}/>))}
  </div >
}
