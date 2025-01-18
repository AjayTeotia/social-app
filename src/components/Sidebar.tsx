import { currentUser } from "@clerk/nextjs/server";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";
import { getUserByClerkId } from "@/action/user.action";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { LinkIcon, MapPinIcon } from "lucide-react";

export default async function Sidebar() {
    const authUser = await currentUser();
    if (!authUser) return <UnAuthenticatedSidebar />;

    const user = await getUserByClerkId(authUser.id);
    if (!user) return null;

    return (
        <div className="sticky top-20">
            <Card>
                <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                        <Link
                            href={`/u/${user.username}`}
                            className="flex flex-col items-center justify-center"
                        >
                            <Avatar className="size-20 border-2">
                                <AvatarImage src={user.image || "/avatar.png"} alt={user.name || ""} />
                            </Avatar>

                            <div className="mt-4 space-y-1">
                                <h3 className="font-semibold">
                                    {user.name}
                                </h3>

                                <p className="text-sm text-muted-foreground">
                                    {user.username}
                                </p>
                            </div>
                        </Link>

                        {user.bio &&
                            <p className="mt-3 text-sm to-muted-foreground">
                                {user.bio}
                            </p>
                        }

                        <div className="w-full">
                            <Separator className="my-4" />

                            <div className="flex justify-between">
                                <div>
                                    <p className="font-medium">
                                        {user._count.following}
                                    </p>

                                    <p className="text-xs text-muted-foreground">
                                        Following
                                    </p>
                                </div>

                                <Separator orientation="vertical" />

                                <div>
                                    <p className="font-medium">
                                        {user._count.followers}
                                    </p>

                                    <p className="text-xs text-muted-foreground">
                                        Followers
                                    </p>
                                </div>
                            </div>

                            <Separator className="my-4" />
                        </div>

                        <div className="w-full space-y-2 text-sm">
                            <div className="flex items-center text-muted-foreground">
                                <MapPinIcon className="size-4 mr-2" />
                                {user.location || "No location"}
                            </div>

                            <div className="flex items-center text-muted-foreground">
                                <LinkIcon className="size-4 mr-2 shrink-0" />

                                {user.website ? (
                                    <a href={`${user.website}`} className="hover:underline truncate" target="_blank">
                                        {user.website}
                                    </a>
                                ) : (
                                    "No website"
                                )}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

const UnAuthenticatedSidebar = () => {
    return (
        <div className="sticky top-20">
            <Card>
                <CardHeader>
                    <CardTitle className="text-center text-xl font-semibold">
                        Welcome Back!
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <p className="text-center text-muted-foreground mb-4">
                        Login to access your account and connect with friends.
                    </p>

                    <SignInButton mode="modal">
                        <Button
                            variant={"outline"}
                            className="w-full"
                        >
                            Login
                        </Button>
                    </SignInButton>

                    <SignUpButton>
                        <Button
                            variant={"default"}
                            className="w-full mt-2"
                        >
                            Sign Up
                        </Button>
                    </SignUpButton>
                </CardContent>
            </Card>
        </div>
    )
}