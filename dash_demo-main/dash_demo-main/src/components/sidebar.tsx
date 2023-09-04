import {
    BookOpen,
    HelpCircle,
    Home,
    LogOut,
    Settings,
    ShoppingCart,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/router"
import { useAuthContext } from "./AuthContext"
import signOutUser from "@/lib/signout"
import { Milestone } from "lucide-react"
import Image from "next/image"
import logo from '../../public/BeBlocky-Logo.png'
import defaultAvatar from '../../public/default-avatar.png'

const sidebarItems = [
    {
        title: "Dashboard",
        href: "/",
        icon: <Home className="mr-1 h-6 w-6" />,
    },
   // {
   //     title: "Progress",
   //     href: "/progress",
   //      icon: <Milestone className="mr-1 h-6 w-6" />,
   //  },
    {
        title: "Courses",
        href: "/courses",
        icon: <BookOpen className="mr-1 h-6 w-6" />,
    },
    {
        title: "Upgrade Packages",
        href: "/upgrade",
        icon: <ShoppingCart className="mr-1 h-6 w-6" />,
    },
    // {
    //     title: "Support",
    //     href: "/support",
    //     icon: <HelpCircle className="mr-1 h-6 w-6" />,
    // },
    // {
    //     title: "Setting",
    //     href: "/setting",
    //     icon: <Settings className="mr-1 h-6 w-6" />,
    // },
]

export function Sidebar() {
    const router = useRouter()
    const { user } = useAuthContext()
    return (
        <nav
            id="sidenav-2"
            className="fixed left-0 top-0 z-[1035] h-screen w-60 -translate-x-full overflow-hidden bg-gray-200 data-[te-sidenav-hidden='false']:translate-x-0"
            data-te-sidenav-hidden="false"
            data-te-sidenav-content="#content"
        >
            <div className="h-[100px] text-center text-dark-ebony">
                <ul className="flex flex-col py-2">
                    <li className="px-3 my-6">
                        <div className="flex h-8 flex-row items-center">
                            <div className="text-3xl font-bold tracking-wide">
                                <Link href="/">
                                    <Image
                                        src={logo}
                                        alt="Beblocky logo"
                                        width={140}
                                        height={140}
                                    />
                                </Link>
                            </div>
                        </div>
                    </li>
                    {sidebarItems.map((item) => (
                        <li key={item.title}>
                            <Link
                                href={item.href}
                                className={cn("relative flex h-8 flex-row items-center border-r-4 border-transparent hover:border-gray-300 mb-3", `${router.asPath === item.href ? 'border-ecstasy hover:border-ecstasy' : ''}`)}>
                                <span className="ml-4 inline-flex items-center justify-center">{item.icon}</span>
                                <span className={cn("ml-2 truncate tracking-wide", `${router.asPath === item.href ? 'font-semibold' : ''}`)}>{item.title}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="py-3 absolute bottom-20">
                    <hr className="mb-5" />
                    <div className="flex justify-center items-center pl-5">
                        <Image src={defaultAvatar} alt="Avatar" width="50" height="50" className="rounded-full mr-2" />
                        <div>
                            <p className="font-semibold">{user?.displayName}</p>
                            <Button variant="default" size="sm" className="w-full bg-ecstasy rounded-lg text-white" onClick={signOutUser}>Logout <LogOut className="ml-2 h-4 w-4" /></Button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
