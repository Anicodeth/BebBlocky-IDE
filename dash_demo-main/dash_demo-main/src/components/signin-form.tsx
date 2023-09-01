import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import Link from "next/link"
import { useState } from "react"

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(32),
})

export default function SignInForm() {
  const [ error, setError ] = useState("")
  const router = useRouter()
  const auth = getAuth()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { email, password } = data
    try {
      await signInWithEmailAndPassword(auth, email, password)
      return await router.push("/")
    } catch (error) {
      setError("Something happened with your signin. Try again.")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" className="shadow-sm rounded-xl" {...field} />
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
              <FormControl>
                <Input
                  type="password"
                  placeholder="Password"
                  className="shadow-sm rounded-xl"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant={"mainButton"} type="submit" className="text-white bg-ecstasy w-full">Login</Button>
        <Link href="/" className="flex justify-center items-center text-dark-ebony text-xs">Forgot Password?</Link>
      </form>
    </Form>
  )
}
