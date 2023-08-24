import React, { useState, useEffect } from "react";
import Head from "next/head";
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
import SearchInput from "@/components/search-input";

import htmlLogo from '../../public/icons/html5/html5-original.svg'
import cssLogo from '../../public/icons/css3/css3-original.svg'
import jsLogo from '../../public/icons/javascript/javascript-original.svg'
interface LogoDict {
    [key: string]: string; // Assuming the imported SVG paths are strings
}

const logoDict: LogoDict = {
    "html": htmlLogo,
    "css": cssLogo,
    "js": jsLogo,
}

interface Slide {
  _id: string
  backgroundColor: string
  color: string
  title: string
  titleFont: string
  content: string
  contentFont: string
  code: string
  startingCode: string
  image: string
}

interface Course {
  _id: number
  courseId: number
  courseTitle: string
  courseDescription: string
  courseLanguage: string
  slides: Slide[]
}

export default function CoursesRoute() {
    const [courses, setCourses] = useState<Course[]>([]);


    useEffect(() => {
    fetch("https://beb-blocky-ide.vercel.app/api/v1/courses")
      .then(response => response.json())
      .then(data => {
        setCourses(data.courses)
        sessionStorage.setItem('auth_token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGU3NDcwMzI3ZWFkNDhkODFmYTI2ZTciLCJpYXQiOjE2OTI4Nzg3ODl9.JhKUoZLk9U65iIuG_nosAaFnxm56dS_K3jZv00uQUvk" );

      })
      .catch(error => console.error("Error fetching courses:", error));
    }, []);

    return (
        <>
            <Head>
                <title>BeBlocky Dashboard</title>
                <meta name="description" content="Welcome to BeBlocky Dashboard" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="container grid items-center gap-2 pb-4 pt-2 md:py-5 text-dark-ebony">
                <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl text-ecstasy">
                    Courses
                </h1>
                <p className="text-dark-ebony">
                    Discover and select your preferred course of interest.
                </p>
                <SearchInput />
                <hr className="w-full border-gray-300 mb-4" />
        { courses.length == 0 && <p>Sorry, we couldn't load our courses due to errors. Try again later.</p>}
        { courses.length > 0 && <h2 className="text-2xl font-bold tracking-tight">Most Popular Courses</h2> }
                <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-3 grid-cols-1 items-center gap-4 pb-4 pt-2">
                { courses.map(course => (
                    <Card className="text-dark-ebony">
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
                               <a href= {`http://localhost:4200/ide/${course.courseId}`}> <ArrowRight size={24} className="text-ecstasy" /> </a>
                            </div>
                        </CardFooter>
                    </Card>
                    ))}
                </div>
                            </div >
        </>
    )
}
