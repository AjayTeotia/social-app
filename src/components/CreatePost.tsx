"use client"

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { ImageIcon, Loader2Icon, SendIcon } from "lucide-react";
import toast from "react-hot-toast";
import { createPost } from "@/action/post.action";
import ImageUpload from "./ImageUpload";

export default function CreatePost() {
    const { user } = useUser();
    const [content, setContent] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [isPosting, setIsPosting] = useState(false);
    const [showImageUpload, setShowImageUpload] = useState(false);

    const handleSubmit = async () => {
        if (!content.trim() && !imageURL) return;

        setIsPosting(true);

        try {
            const res = await createPost(content, imageURL);
            if (res?.success) {
                setContent("");
                setImageURL("");
                setShowImageUpload(false);

                toast.success("Post created successfully");
            }
        } catch (error) {
            console.error("Failed to create post", error);
            toast.error("Failed to create post");
        } finally {
            setIsPosting(false);
        }
    }

    return (
        <Card className="mb-6">
            <CardContent className="pt-6">
                <div className="space-y-4">
                    <div className="flex space-x-4">
                        <Avatar className="size-10">
                            <AvatarImage src={user?.imageUrl || "/avatar.png"} alt={user?.username || ""} />
                        </Avatar>

                        <Textarea
                            placeholder="What's on your mind?"
                            className="min-h-[100px] resize-none border-none focus-visible:ring-0 p-0 text-base"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            disabled={isPosting}
                        />
                    </div>

                    {(showImageUpload || imageURL) && (
                        <div className="border rounded-lg p-4">
                        <ImageUpload
                          endpoint="postImage"
                          value={imageURL}
                          onChange={(url) => {
                            setImageURL(url);
                            if (!url) setShowImageUpload(false);
                          }}
                        />
                      </div>
                    )}

                    <div className="flex items-center justify-between border-t pt-4">
                        <div className="flex space-x-2">
                            <Button
                                type={"button"}
                                variant={"ghost"}
                                size={"sm"}
                                className="text-muted-foreground hover:text-primary"
                                onClick={() => setShowImageUpload(!showImageUpload)}
                                disabled={isPosting}
                            >
                                <ImageIcon className="size-4 mr-2" />
                                Photo
                            </Button>
                        </div>

                        <Button
                            className="flex items-center"
                            onClick={handleSubmit}
                            disabled={(!content.trim() && !imageURL) || isPosting}
                        >
                            {isPosting ? (
                                <>
                                    <Loader2Icon className="size-4 mr-2 animate-spin" />
                                    Posting...
                                </>
                            ) : (
                                <>
                                    <SendIcon className="size-4 mr-2" />
                                    Post
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}