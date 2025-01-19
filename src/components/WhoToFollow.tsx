import { getRandomUsers } from "@/action/user.action";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { FollowButton } from "./FollowButton";

export default async function WhoToFollow() {
    const user = await getRandomUsers();
    if (user.length === 0) return null;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Who to follow</CardTitle>
            </CardHeader>

            <CardContent>
                <div className="space-y-4">
                    {user.map((user) => (
                        <div
                            key={user.id}
                            className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-1">
                                <Link href={`/u/${user.username}`}>
                                    <Avatar>
                                        <AvatarImage src={user.image || "/avatar.png"} alt={user.name || ""} />
                                    </Avatar>
                                </Link>

                                <div className="text-xs">
                                    <Link
                                        href={`/u/${user.username}`}
                                        className="font-medium cursor-pointer"
                                    >
                                        {user.name}
                                    </Link>

                                    <p className="text-muted-foreground">@{user.username}</p>
                                    <p className="text-muted-foreground">{user._count.followers} followers</p>
                                </div>
                            </div>

                            <FollowButton userId={user.id} />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}