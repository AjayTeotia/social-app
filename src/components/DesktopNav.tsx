import { SignInButton, UserButton } from "@clerk/nextjs"
import { currentUser } from "@clerk/nextjs/server"
import { BellIcon, HomeIcon, UserIcon } from "lucide-react"
import Link from "next/link"
import ThemeToggle from "./ThemeToggle"
import { Button } from "./ui/button"
import Search from "./Search"

export default async function DesktopNav() {
    const user = await currentUser()
    return (
        <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />

            <Button
                variant={"ghost"}
                className="flex items-center gap-2"
                asChild
            >
                <Link href={"/"}>
                    <HomeIcon className="size-4" />

                    <span className="hidden md:inline">Home</span>
                </Link>
            </Button>

            {user ? (
                <>
                    <Button
                        variant={"ghost"}
                        className="flex items-center gap-2"
                        asChild
                    >
                        <Link href={"/notifications"}>
                            <BellIcon className="size-4" />

                            <span className="hidden md:inline">Notifications</span>
                        </Link>
                    </Button>

                    <Button
                        variant={"ghost"}
                        className="flex items-center gap-2"
                        asChild
                    >
                        <Link href={`/u/${user.username ?? user.emailAddresses[0].emailAddress.split("@")[0]}`}>
                            <UserIcon className="size-4" />

                            <span className="hidden md:inline">Profile</span>
                        </Link>
                    </Button>

                    <UserButton />
                </>
            ) : (
                <SignInButton mode="modal">
                    <Button variant={"default"}>Sign in</Button>
                </SignInButton>
            )}
        </div >
    )
}