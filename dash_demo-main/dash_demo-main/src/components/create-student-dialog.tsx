import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { addDoc, collection, doc, getFirestore, setDoc } from "firebase/firestore"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import firebase_app from "@/lib/firebaseClient"
import { useRouter } from "next/router"
import type { FirebaseApp } from "firebase/app"
import { PlusIcon } from "lucide-react"
import { Card, CardHeader, CardFooter } from "@/components/ui/card"
import Link from "next/link"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { DialogDescription } from "@radix-ui/react-dialog"
import { useAuthContext } from "./AuthContext"
import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth"
import { create } from "domain"

const db = getFirestore(firebase_app as FirebaseApp)

const FormSchema = z.object({
    name: z.string(),
  email: z.string(),
    password: z.string(), // TODO: Add password validation
})

// Close after asynchronous form submission
const wait = () => new Promise((resolve) => setTimeout(resolve, 1000))

interface Props {
    id: string,
    is_parent: boolean
}

export function CreateStudentDialog({ id, is_parent }: Props) {
  const  auth  = getAuth();
  const { user } = useAuthContext()
    const router = useRouter()
    const [open, setOpen] = React.useState(false)
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const className = is_parent ? "Class A" : "Students" // TODO: Change this to the class name of the school
        try {
            await createUserWithEmailAndPassword(auth, data.email, data.password).then(async ({ user: createdUser }) => {
              await updateProfile(createdUser, { displayName: data.name });
          await setDoc(doc(db, "users", createdUser.uid), {
            uid: createdUser.uid,
              email: createdUser.email,
              name: data.name,
              role: "Student",
              credit: 0,
              parentId: user?.uid
          }) 
      });
            await addDoc(collection(db, "School", id, "Classes", className, "Students"), {
                name: data.name,
                email: data.email,
                password: data.password,
                parentId: user?.uid
            });
            
        } catch (error) {
            console.log(error)
        }
        wait().then(() => setOpen(false)).catch((err) => console.log(err))
        router.reload()
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Link href="#">
                        <Card className="rounded-3xl flex flex-col items-center w-1/3 border border-1 bg-gray-100 shadow-md">
                            <CardHeader>
                                <div className="rounded-full bg-apple p-2 mr-2">
                                    <PlusIcon size="30" strokeWidth="5" color="white" />
                                </div>
                            </CardHeader>
                            <CardFooter>
                                <p className="text-dark-ebony">Add Child</p>
                            </CardFooter>
                        </Card>
                    </Link>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-apple text-white flex flex-col items-center">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Add Child</AlertDialogTitle>
                        <AlertDialogDescription className="text-white">Does your child already have an account?</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="bg-apple opacity-50 border-none py-2 px-5">Yes</AlertDialogCancel>
                        <DialogTrigger asChild>
                            <AlertDialogAction className="bg-apple opacity-50 hover:bg-gray-50 hover:text-black">No</AlertDialogAction>
                        </DialogTrigger>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <DialogContent className="sm:max-w-[625px] bg-apple text-white flex flex-col">
                <DialogHeader>
                    <DialogTitle>Add Child</DialogTitle>
                    <DialogDescription>Let's crate an account for your child.
                    </DialogDescription>
                    <hr />
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Child&apos;s Full Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter full name" className="text-black" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Child&apos;s Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter their email:" className="text-black" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Child&apos;s Password</FormLabel>
                                    <FormControl>
                                        <Input type={'password'} placeholder="Enter password" className="text-black" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter className="flex items-center justify-between">
                            <Button variant="link" type="submit" className="bg-apple opacity-50 hover:bg-gray-50 hover:text-black">Create Account</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
