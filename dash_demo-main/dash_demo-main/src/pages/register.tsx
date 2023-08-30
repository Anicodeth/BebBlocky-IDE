import SignInForm from "@/components/signin-form"
import SignUpForm from "@/components/signup-form"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import Image from "next/image"
import logo from '../../public/BeBlocky-Logo.png';
import image from '../../public/default-register.png';

export default function SignUpPage() {
    return (
        <div className="grid lg:grid-cols-2 gap-4 lg:gap-x-12 lg:mb-0 place-items-center w-full h-full">
          <div className="flex flex-col items-center justfiy-center">
            <div className="container mb-12 lg:mb-0">
                <Image
                    src={logo}
                    alt="Beblocky logo"
                    className="xs:mt-10 sm:mt-10"
                    width={100}
                    height={100}
                />
                <div className="flex flex-col justify-center items-center mt-10">
                    <h2 className="lg:text-5xl text-2xl font-bold tracking-tight mb-4 text-ecstasy">Hi, there!</h2>
                    <p className="text-sm mb-6 text-dark-ebony">
                        Welcome to BeBlocky Dashboard
                    </p>
                </div>
                <Tabs defaultValue="login" className="w-[400px]">
                    <TabsList className="grid w-full grid-cols-2 text-white mb-4 bg-apple rounded-2xl">
                        <TabsTrigger className="rounded-xl font-bold data-[state=active]:text-apple" value="login">Signin</TabsTrigger>
                        <TabsTrigger className="rounded-xl font-bold data-[state=active]:text-apple" value="register">Signup</TabsTrigger>
                    </TabsList>
                    <TabsContent value="login">
                        <SignInForm />
                    </TabsContent>
                    <TabsContent value="register">
                        <SignUpForm />
                    </TabsContent>
                </Tabs>
            </div>
        </div>

            <Image
                src={image}
                alt=""
                style={{ height: "100vh", aspectRatio: "1/1" }}
                className="w-full hidden md:block lg:block"
            />
      </div>
    )
}
