import { getProfileByUsername, getUserLikedPosts, getUserPosts, isFollowing } from "@/action/profile.action"
import NotFound from "./notFound";
import prisma from "@/lib/prisma";
import ProfilePageClient from "./ProfilePageClient";

export async function generateMetadata({ params }: { params: { username: string } }) {
    const user = await getProfileByUsername(params.username);
    if (!user) return;
  
    return {
      title: `${user.name ?? user.username}`,
      description: user.bio || `Check out ${user.username}'s profile.`,
    };
  }

export default async function userProfilePage({ params }: { params: { username: string } }) {
    const user = await getProfileByUsername(params.username);
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