import { Button } from '@/components/ui/button'
import { User } from 'firebase/auth'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface Props {
  user: User
}

const StudentDashboard = ({ user }: Props) => {
  return <div className="flex flex-col mx-6">
    <h1 className="text-4xl">My Courses</h1>
    <div className="flex flex-row bg-gray-200 my-5 py-5 px-10 rounded-2xl items-center justify-between flex-wrap">
      <div className="flex flex-col mb-3">
        <p className="text-4xl font-bold">Start Learning</p>
        <p>Browse BeBlocky courses to find your next challange!</p>
      </div>
      <div>
        <Link href={"/courses"}>
          <Button variant="default" size="sm" className="w-full bg-ecstasy rounded-2xl text-white text-lg"><PlusIcon /> Add New Course</Button>
        </Link>
      </div>
    </div>
  </div>
}

export default StudentDashboard
