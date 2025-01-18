import Link from "next/link";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

export default function Navbar() {
    return (
        <nav className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo and title */}
                    <div className="flex items-center">
                        <Link href="/" className="text-xl font-bold text-primary font-mono tracking-wider">
                            SocialApp
                        </Link>
                    </div>

                    {/* Desktop navigation */}
                    <DesktopNav />

                    {/* Mobile navigation */}
                    <MobileNav />
                </div>
            </div>
        </nav>
    );
}   