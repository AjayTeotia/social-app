"use client"

import { SignInButton, SignOutButton, useAuth, useUser } from "@clerk/nextjs";
import { BellIcon, HomeIcon, LogOutIcon, MenuIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import Search from "./Search";

export default function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);
    const { isSignedIn } = useAuth();
    const { user } = useUser(); // Get the user object here

    // Check if the user exists and handle cases where it's null or undefined
    const profileLink = user
        ? `/u/${user.username ?? user.emailAddresses[0].emailAddress.split("@")[0]}`
        : undefined; // or provide an alternative behavior when the user is not available

    return (
        <div className="flex md:hidden items-center space-x-2">            
            <ThemeToggle />

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Button variant={"ghost"} size={"icon"}>
                        <MenuIcon className="size-4" />
                    </Button>
                </SheetTrigger>

                <SheetContent side={"right"} className="w-[300px]">
                    <SheetHeader>
                        <SheetTitle>Menu</SheetTitle>
                    </SheetHeader>

                    <nav className="flex flex-col space-y-4 mt-6">
                        <Button
                            variant={"ghost"}
                            className="flex items-center gap-3 justify-start"
                            asChild
                        >
                            <Link href={"/"}>
                                <HomeIcon className="size-4" />
                                Home
                            </Link>
                        </Button>

                        {isSignedIn ? (
                            <>
                                <Button
                                    variant={"ghost"}
                                    className="flex items-center gap-3 justify-start"
                                    asChild
                                >
                                    <Link href={"/notifications"}>
                                        <BellIcon className="size-4" />
                                        Notifications
                                    </Link>
                                </Button>

                                {/* Conditionally render the profile link */}
                                {profileLink && (
                                    <Button
                                        variant={"ghost"}
                                        className="flex items-center gap-3 justify-start"
                                        asChild
                                    >
                                        <Link href={profileLink}>
                                            <UserIcon className="size-4" />
                                            Profile
                                        </Link>
                                    </Button>
                                )}

                                <SignOutButton>
                                    <Button variant="ghost" className="flex items-center gap-3 justify-start w-full">
                                        <LogOutIcon className="w-4 h-4" />
                                        Logout
                                    </Button>
                                </SignOutButton>
                            </>
                        ) : (
                            <SignInButton mode="modal">
                                <Button variant="default" className="w-full">
                                    Sign In
                                </Button>
                            </SignInButton>
                        )}
                    </nav>
                </SheetContent>
            </Sheet>
        </div>
    );
}
