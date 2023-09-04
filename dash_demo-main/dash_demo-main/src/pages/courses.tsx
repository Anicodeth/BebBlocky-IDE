import React, { useState } from "react";
import Head from "next/head";
import SearchInput from "@/components/search-input";
import useCourses, { Course } from "@/services/useCourses";
import CourseCard from "@/components/course-card";
import useUserSubscription from "@/services/useUserSubscription";
import useGetUser from "@/services/useGetUser";

export default function CoursesRoute() {
  const { courses, isLoading, error } = useCourses();
  const [ searchTerm, setSearchTerm ] = useState<string>("");
  const [ filteredCourses, setFilteredCourses ] = useState<Course[]>(courses);
  const { userData, isLoading: userDataLoading } = useUserSubscription();
  const { isLoading: userAccountDataLoading } = useGetUser();

  console.log(courses, userData);
  function isDayPassed(expiryDate: Date): boolean {
    const currentDate = new Date();
    return expiryDate < currentDate;
  }
  
  const userHasCourse = (course: Course) => {
    if (!userData || !userData.verified || isDayPassed(userData.expiry_date)) {
      return course.subType == "F";
    }

    if (userData.subscription.includes("Premium"))
    {
      return true
    }

    if (userData.subscription.includes("Gold"))
  {
      return course.subType != "P"
    }

  if (userData.subscription.includes("Standard"))
  {
      return course.subType != "P" && course.subType != "G"
    } 

    return course.subType == "F";
  };

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
        { (userDataLoading || isLoading || userAccountDataLoading ) && <p>Loading...</p> }
        { error.length > 0 && <p>{ error }</p>}
        { courses.length > 0 && <h2 className="text-2xl font-bold tracking-tight">{ (searchTerm || "Most Popular") + " Courses" }</h2> }
                <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-3 grid-cols-1 items-center gap-4 pb-4 pt-2">
                { searchTerm.length > 0 && userData && filteredCourses.map(course => (<CourseCard key={course.courseId} course={course} userHasCourse={userHasCourse(course)} userHasCourseVerified={userData!.verified} />))}
                { searchTerm.length == 0 && userData && courses.map(course => (<CourseCard key={course.courseId} course={course} userHasCourse={userHasCourse(course)} userHasCourseVerified={course.subType == "F" || course.subType == null || userData!.verified} />))}

                </div>
                            </div >
        </>
    )
}
