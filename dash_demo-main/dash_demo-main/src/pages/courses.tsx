import React, { useState } from "react";
import Head from "next/head";
import SearchInput from "@/components/search-input";
import useCourses, { Course } from "@/services/useCourses";
import CourseCard from "@/components/course-card";
import { useAuthContext } from "@/components/AuthContext";

export default function CoursesRoute() {
  const { courses, isLoading, error } = useCourses();
  const [ searchTerm, setSearchTerm ] = useState<string>("");
  const [ filteredCourses, setFilteredCourses ] = useState<Course[]>(courses);

  const { user } = useAuthContext();
  console.log(user);

  const handleSearchInputChange = (term: string) => {
    setSearchTerm(term);
    setFilteredCourses(courses.filter((course) =>
      course.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) || 
      course.courseLanguage.toLowerCase().includes(searchTerm.toLowerCase()) || 
      course.courseDescription.toLowerCase().includes(searchTerm.toLowerCase())
    ));
  }; 
    
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
          Discover and select your preferred course of interest."                                    </p>
                <SearchInput onSearchTermChange={handleSearchInputChange} inputPlaceholder={"Search our courses here..."}/>
                <hr className="w-full border-gray-300 mb-4" />
        { isLoading && <p>Loading...</p> }
        { error.length > 0 && <p>{ error }</p>}
        { courses.length > 0 && <h2 className="text-2xl font-bold tracking-tight">{ (searchTerm || "Most Popular") + " Courses" }</h2> }
                <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-3 grid-cols-1 items-center gap-4 pb-4 pt-2">
                { searchTerm.length > 0 && filteredCourses.map(course => (<CourseCard key={course.courseId} course={course} />))}
                { searchTerm.length == 0 && courses.map(course => (<CourseCard key={course.courseId} course={course} />))}

                </div>
                            </div >
        </>
    )
}
