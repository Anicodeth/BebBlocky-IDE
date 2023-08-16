import { ChevronRight, Clock, PlusIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import type { Student } from "@/lib/shape";
import { Button } from "@/components/ui/button";

interface Props {
    students?: Student[];
    children?: React.ReactNode;
}

export default function ChildrenList({ students, children }: Props) {
    return (
        <>
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
                {students && students.map((child, index) => (
                    <Card className="w-full border-apple rounded-3xl bg-gradient-to-br from-apple to-atlantis" key={`${child.name} ${index}`}>
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
                        <CardContent className="bg-white pt-3 px-5 flex justify-between items-center text-dark-ebony">
                            <p className="font-bold text-lg">Course</p>
                            <Button variant="secondary" className="rounded-lg -mr-2 text-xs text-dark-ebony bg-gray-100">
                                <PlusIcon className="w-3 h-3 -ml-2 mr-1" />
                                Add
                            </Button>
                        </CardContent>
                        <div className="bg-white">
                            <hr className="border-apple mx-5" />
                        </div>
                        <CardFooter className="bg-white rounded-b-3xl">
                            <Button variant="secondary" className="mt-4 -mx-2 rounded-2xl bg-ecstasy text-white text-xs hover:bg-sky-900">VIEW PROGRESS <ChevronRight className="ml-1 h-4 w-4" /></Button>
                        </CardFooter>
                    </Card>
                ))}
                {children && children}
            </div >
        </>
    )
}