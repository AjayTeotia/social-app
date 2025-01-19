import { getProfileByUsername, getUserLikedPosts, getUserPosts, isFollowing } from "@/action/profile.action";
import NotFound from "./notFound";
import ProfilePageClient from "./ProfilePageClient";

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }) {
    const resolvedParams = await params;  // Await the promise
    const user = await getProfileByUsername(resolvedParams.username);  // Use resolvedParams.username
    if (!user) return;

    return {
        title: `${user.name ?? user.username}`,
        description: user.bio || `Check out ${user.username}'s profile.`,
    };
}

export default async function userProfilePage({ params }: { params: Promise<{ username: string }> }) {
    const resolvedParams = await params;  // Await the promise
    const user = await getProfileByUsername(resolvedParams.username);  // Use resolvedParams.username

    if (!user) return NotFound();

    const [posts, likedPosts, isCurrentUserFollowing] = await Promise.all([
        getUserPosts(user.id),
        getUserLikedPosts(user.id),
        isFollowing(user.id),
    ])
    return (
        <ProfilePageClient
            user={user}
            posts={posts}
            likedPosts={likedPosts}
            isFollowing={isCurrentUserFollowing}
        />
    )
}