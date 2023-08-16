import { AlignJustify } from "lucide-react";
import Link from "next/link";
import Image from 'next/image';
import logo from '../../public/BeBlocky-Logo.png';


export function SiteHeader() {
    return (
        <header className="fixed top-0 z-40 w-full border-b bg-background">
            <div className="ml-2 flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
                <div className="flex gap-1 text-dark-ebony">
                    <button
                        id="toggler"
                        className="inline-block rounded px-2 py-2.5 text-xs font-medium uppercase leading-tight shadow-sm transition duration-150 ease-in-out"
                        data-te-sidenav-toggle-ref
                        data-te-target="#full-screen-example"
                        data-te-ripple-init
                    >
                        <AlignJustify />
                    </button>
                    <Link href="/" className="flex items-center space-x-2">
                        <Image
                            src={logo}
                            alt="Beblocky logo"
                            width={100}
                            height={100}
                        />
                    </Link>
                </div>
            </div>
        </header>
    );
}
