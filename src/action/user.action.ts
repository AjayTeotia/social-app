import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function SyncUser() {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
      return;
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (existingUser) {
      return existingUser;
    }

    // Create new user in the database
    const newUser = await prisma.user.create({
      data: {
        clerkId: userId,
        name: `${user.firstName || ""} ${user.lastName || ""}`,
        username:
          user.username ?? user.emailAddresses[0].emailAddress.split("@")[0],
        email: user.emailAddresses[0].emailAddress,
        image: user.imageUrl,
      },
    });

    // Send user information to PingPanda API
    const response = await fetch(
      "https://pingpanda-aj.vercel.app/api/v1/events",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.PINGPANDA_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: "socal-app-new-user",
          fields: {
            username: newUser.username,
            name: newUser.name,
            email: newUser.email,
          },
        }),
      }
    );

    if (!response.ok) {
      console.log("Failed to sync user with PingPanda");
    }

    return newUser;
  } catch (error) {
    console.log("ERROR In SyncUser: ", error);
  }
}

export async function getUserByClerkId(clerkId: string) {
  return prisma.user.findUnique({
    where: {
      clerkId,
    },
    include: {
      _count: {
        select: {
          followers: true,
          following: true,
          posts: true,
        },
      },
    },
  });
}
