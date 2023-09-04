import { useEffect, useState } from "react"

export interface Slide {
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

export interface Course {
  _id: number
  courseId: number
  courseTitle: string
  courseDescription: string
  courseLanguage: string
  slides: Slide[]
  subType: string
}

function useCourses() {

  const [courses, setCourses] = useState<Course[]>([]);
  const [ isLoading, setLoading ] = useState(false);
  const [ error, setError ] = useState<string>("");

  useEffect(() => {
    setLoading(true);

    fetch("https://beb-blocky-ide.vercel.app/api/v1/courses")
      .then(response => response.json())
      .then(data => {
        setLoading(false)
        setCourses(data.courses)
        sessionStorage.setItem('auth_token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGU3NDcwMzI3ZWFkNDhkODFmYTI2ZTciLCJpYXQiOjE2OTI4Nzg3ODl9.JhKUoZLk9U65iIuG_nosAaFnxm56dS_K3jZv00uQUvk" );

      })
      .catch(_ => {
        setLoading(false)
        setError("Sorry, we couldn't load our courses due to errors. Try again later.")
      })
    }, []);

    return { courses, isLoading, error };
}

export default useCourses
