import React from 'react'
import Image from "next/image";
import { ArrowRight, Star, StarHalf } from "lucide-react";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge";

import htmlLogo from '../../public/icons/html5/html5-original.svg'
import cssLogo from '../../public/icons/css3/css3-original.svg'
import jsLogo from '../../public/icons/javascript/javascript-original.svg'
import python from '../../public/icons/python/python-original.svg'
import { Course } from '@/services/useCourses';

interface LogoDict {
    [key: string]: string; // Assuming the imported SVG paths are strings
}

const logoDict: LogoDict = {
    "html": htmlLogo,
    "css": cssLogo,
    "js": jsLogo,
    "python": python,
    "py": python
}

interface Props {
  course: Course
}

const CourseCard = ({ course }: Props) => {
  return <Card className="text-dark-ebony bg-gray-100">
                        <CardHeader>
                            <Image src={logoDict[course.courseLanguage]!} alt="Course image" width={180} height={110} className="mx-auto rounded-xl mb-3" />
                            <div className="flex flex-row justify-center gap-2">
                                <Badge variant="secondary" className="rounded-xl text-dark-ebony bg-gray-200">{course.courseLanguage.toUpperCase()}</Badge>                            </div>
                        </CardHeader>
                        <CardContent className="-mt-5">
                            <CardTitle>{course.courseTitle}</CardTitle>
                            <div className="flex flex-row justify-between items-center mt-2">
                                <div className="flex gap-1">
                                    <Star size={16} className="text-apple" /><Star size={16} className="text-apple" /><Star size={16} className="text-apple" /><Star size={16} className="text-apple" /><StarHalf className="text-apple" size={16} />
                                </div>
                                <p className="mt-2">4.7 Rating</p>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-row justify-between items-center">
                            <p className="text-xl font-bold">$25</p>
                            <div className="rounded-full p-1 bg-gray-100">
                               <a href= {`https://bebblocky.vercel.app/ide/${course.courseId}`}> <ArrowRight size={24} className="text-ecstasy" /> </a>
                            </div>
                        </CardFooter>
                    </Card>
}

export default CourseCard
