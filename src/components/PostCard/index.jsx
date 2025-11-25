import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatPostTime, getFallbackInitials } from "./helpers";
import { Plus } from "lucide-react";
import InteractionBar from "./components/InteractionBar";
import DropDown from "./components/PopoverMenu";
import PopoverMenu from "./components/PopoverMenu";
import PostMedia from "./components/PostMedia";

function PostCard({ postData }) {
  return (
    <Card className="w-full self-start rounded-none border-0 border-b p-4 last:border-b-0">
      <div className="flex flex-row gap-3">
        {/* --- avatar --- */}
        <div className="group relative shrink-0 self-start">
          <Avatar className="h-9 w-9 cursor-pointer">
            <AvatarImage src={postData.user.avatar_url} />
            <AvatarFallback>
              {getFallbackInitials(postData.user.username)}
            </AvatarFallback>
          </Avatar>
          <div className="bg-primary text-primary-foreground border-primary-foreground absolute top-5.5 right-0 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full border group-hover:scale-105 group-active:scale-100">
            <Plus className="h-2.5 w-2.5" />
          </div>
        </div>

        <div className="flex flex-1 flex-col">
          <div className="flex items-center justify-between">
            <div className="flex items-end gap-1.5 text-start">
              <span className="cursor-pointer font-medium hover:underline active:opacity-75">
                {postData.user.username}
              </span>
              <span className="text-muted-foreground text-sm">
                {formatPostTime(postData.created_at)}
              </span>
            </div>
            <PopoverMenu />
          </div>

          <div className="mt-1 text-start">
            {/* {post.content && <p>{post.content}</p>} */}
            <p>{postData.content}</p>
            {/*  component render media */}
            <div className="mt-2">
              <PostMedia media={postData.media} />
            </div>
          </div>

          <div className="mt-3"></div>
          <InteractionBar
            likeCount={postData.likes_count}
            commentCount={postData.replies_count}
          />
        </div>
      </div>
    </Card>
  );
}

export default PostCard;
