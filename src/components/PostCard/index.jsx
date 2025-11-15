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
import { getFallbackInitials } from "./helpers";
import { Plus } from "lucide-react";
import InteractionBar from "./components/InteractionBar";
import DropDown from "./components/PopoverMenu";
import PopoverMenu from "./components/PopoverMenu";
import PostMedia from "./components/PostMedia";

// Ví dụ dữ liệu cho một post
const postData = {
  id: "p1",
  user: {
    username: "nguyenduy__",
    displayName: "duy nguyen",
    avatarUrl: "https://picsum.photos/300/300",
  },
  content: "Cỡ đó không đó, mà thề câu nào nghe cũng muốn lạnh sóng lưng",
  timestamp: "2h",
  stats: {
    likes: 10,
    comments: 5,
    reposts: 2,
  },
  // --- PHẦN QUAN TRỌNG NHẤT ---
  media: [
    // Đây có thể là 1 ảnh
    // { type: "image", url: "https://.../image1.jpg" }
    // Hoặc nhiều ảnh
    { type: "image", url: "https://picsum.photos/300/600" },
    { type: "image", url: "https://picsum.photos/300/600" },
    // Hoặc video
    // { type: "video", url: "https://.../video.mp4", thumbnailUrl: "..." }
    // Hoặc audio (như ví dụ hôm qua)
    // {
    //   type: "audio",
    //   title: "Vì nó khó, nên bạn còn phẩn!",
    //   source: "@Web5Ngay",
    //   thumbnailUrl: "https://picsum.photos/300/300",
    // },
  ],
};

function PostCard() {
  return (
    <Card className="w-full self-start border-r-0 border-l-0 p-4">
      <div className="flex flex-row gap-3">
        {/* --- avatar --- */}
        <div className="group relative shrink-0 self-start">
          <Avatar className="h-9 w-9 cursor-pointer">
            <AvatarImage src="https://picsum.photos/300/300" />
            <AvatarFallback>{getFallbackInitials("duy nguyen")}</AvatarFallback>
          </Avatar>
          <div className="bg-primary text-primary-foreground border-primary-foreground absolute top-5.5 right-0 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full border group-hover:scale-105 group-active:scale-100">
            <Plus className="h-2.5 w-2.5" />
          </div>
        </div>

        <div className="flex flex-1 flex-col">
          <div className="flex items-center justify-between">
            <div className="flex items-end gap-1.5 text-start">
              <span className="cursor-pointer font-medium hover:underline active:opacity-75">
                nguyenduy__
              </span>
              <span className="text-muted-foreground text-sm"> 2h</span>
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
          <InteractionBar likeCount={10} />
        </div>
      </div>
    </Card>
  );
}

export default PostCard;
