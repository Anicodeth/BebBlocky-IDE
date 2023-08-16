import type { ReactNode } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

import { SiteHeader } from "@/components/site-header";
import { Sidebar } from "./sidebar";

const DynamicSideBar = dynamic(() => import("@/components/ui/sideBar"), {
    ssr: false,
});


interface LayoutProps {
    children: ReactNode;
    className?: React.HTMLAttributes<HTMLDivElement>["className"];
}

export default function Layout({ children, className }: LayoutProps) {
    const router = useRouter();
    return (
        <>
            <div className={cn("flex flex-auto flex-shrink-0 flex-col antialiased", className)}>
                {router.asPath !== "/register" ? (
                    <>
                        <div className="xs:block sm:block md:block lg:hidden mb-4">
                            <DynamicSideBar />
                            <SiteHeader />
                        </div>
                        <div className="xs:hidden sm:hidden md:hidden lg:block xl:block">
                            <Sidebar />
                        </div>
                        <main id="content">{children}</main>
                    </>
                )
                    :
                    (
                        <main>{children}</main>
                    )
                }
            </div>
        </>
    )

}