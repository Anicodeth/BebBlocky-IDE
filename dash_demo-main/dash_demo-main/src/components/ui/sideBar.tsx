import "tw-elements/dist/css/tw-elements.min.css";
// Initialization for ES Users
import { Sidenav, initTE } from "tw-elements";
import { useEffect } from "react";
import {
    BookOpen,
    HelpCircle,
    Home,
    LogOut,
    Settings,
    ShoppingCart,
    Milestone
} from "lucide-react"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router"
import { useAuthContext } from "@/components/AuthContext"
import Link from "next/link";
import { cn } from "@/lib/utils";
import signOutUser from "@/lib/signout"

const sidebarItems = [
    {
        title: "Dashboard",
        href: "/",
        icon: <Home className="mr-1 h-6 w-6" />,
    },
    // {
    //     title: "Progress",
    //     href: "/progress",
    //     icon: <Milestone className="mr-1 h-6 w-6" />,
    // },
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

const SideBar = () => {
    const router = useRouter()
    const { user } = useAuthContext()
    useEffect(() => {
        initTE({ Sidenav });
    }, []);
    return (
        <nav
            id="full-screen-example"
            className="fixed bg-white left-0 top-16 z-[1000] h-screen w-60 -translate-x-full overflow-hidden shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] data-[te-sidenav-hidden='false']:translate-x-0"
            data-te-sidenav-init
            data-te-sidenav-hidden="false"
            data-te-sidenav-mode="side"
            data-te-sidenav-content="#content"
        >
            <div className="h-[100px] text-center text-dark-ebony">
                <ul className="flex flex-col py-2">
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
                        <Image src="https://via.placeholder.com/80" alt="Avatar" width="50" height="50" className="rounded-full mr-2" />
                        <div>
                            <p className="font-semibold">{user?.displayName}</p>
                            <Button variant="default" size="sm" className="w-full bg-ecstasy rounded-lg text-white" onClick={signOutUser}>Logout <LogOut className="ml-2 h-4 w-4" /></Button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default SideBar;
