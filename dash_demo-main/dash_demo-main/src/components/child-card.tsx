import React from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { ChevronRight, Clock, PlusIcon } from 'lucide-react'
import { Student } from '@/lib/shape'
import Link from 'next/link'

interface Props {
  student: Student
  addCourseRoute: string
}

const ChildCard = ({ student: child, addCourseRoute }: Props) => {
  return <>
    <Card className="w-full border-apple rounded-3xl bg-gradient-to-br flex flex-col from-apple to-atlantis overflow-hidden">
                        <div className="p-5 text-white">
                            <p className="font-thin">Child</p>
                            <hr className="mt-5" />
                        </div>
                        <CardHeader className="text-white px-5 -mt-5 -mb-2">
                            <CardTitle>{child.name}</CardTitle>
                            <CardDescription>
                                <Clock className="inline w-3 h-3 mr-1" color="white" />
                                <span className="text-gray-50 align-middle text-xs font-thin">Last Seen 9:30 PM</span>
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="bg-white pt-3 px-5 grow flex flex-col text-dark-ebony">
        <div className="flex flex-row justify-between items-center">
                  <p className="font-bold text-md">Course</p>
          <Link href={addCourseRoute}>
                            <Button variant="secondary" className="rounded-lg -mr-2 text-xs text-dark-ebony bg-gray-100">
                                <PlusIcon className="w-3 h-3 -ml-2 mr-1" />
                                Add
                            </Button>
          </Link>
        </div>
      <div className="bg-white">
                            <hr className="border-apple mt-2 mb-5" />
                        </div>
                                  </CardContent> 
                        { false && <CardFooter className="bg-white rounded-b-3xl">
                            <Button variant="secondary" className="mt-4 -mx-2 rounded-2xl bg-ecstasy text-white text-xs hover:bg-sky-900">VIEW PROGRESS <ChevronRight className="ml-1 h-4 w-4" /></Button>
                        </CardFooter> }
                    </Card>
  </>
}

export default ChildCard
