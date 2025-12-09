import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Heart } from "lucide-react";

// Components & Helpers
import InteractionBar from "./components/InteractionBar";
import PopoverMenu from "./components/PopoverMenu";
import PostMedia from "./components/PostMedia";
import { formatPostTime, getFallbackInitials } from "./helpers";

// Hooks Redux
import { useCurrentUser } from "@/features/auth/hooks";
import { useLikePostMutation } from "@/features/posts";
import { toast } from "sonner";
import LoginPromptModal from "../LoginPromptModal";
import UserProfileHoverCard from "../UserProfileInfo/ProfileHoverCard";
import { UserProfileModal } from "../UserProfileInfo/UserProfileInfoModal";

function PostCard({ postData }) {
  const currentUser = useCurrentUser();

  //State điều khiển Modal Login
  const [showLoginModal, setShowLoginModal] = useState(false);

  // State điều khiển modal userInfoModal
  const [showUserInfoModal, setShowUserInfoModal] = useState(false);

  // Gọi hook mutation từ API
  const [likePost] = useLikePostMutation();

  // Hàm xử lý like
  const handleLike = async () => {
    // Set trạng thái mở modal khi chưa login
    if (!currentUser) {
      setShowLoginModal(true);
      return;
    }

    try {
      await likePost({
        postId: postData.id,
        userId: currentUser.id,
      }).unwrap();
    } catch (error) {
      console.error("Lỗi like:", error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  // Xử lý follow user ở avatar
  const handleOpenUserInfoModal = (e) => {
    e.stopPropagation();
    e.preventDefault();

    setShowUserInfoModal(true);
  };

  return (
    <>
      <Card className="w-full self-start rounded-none border-0 border-b p-4 shadow-none last:border-b-0">
        <div className="flex flex-row gap-3">
          {/* Avatar Section */}
          <div className="group relative shrink-0 self-start">
            <Avatar
              className="h-9 w-9 cursor-pointer"
              onClick={handleOpenUserInfoModal}
            >
              <AvatarImage src={postData.user.avatar_url} />
              <AvatarFallback>
                {getFallbackInitials(postData.user.username)}
              </AvatarFallback>
            </Avatar>
            <div className="bg-primary text-primary-foreground border-primary-foreground absolute top-5.5 right-0 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full border transition-transform group-hover:scale-105 group-active:scale-100">
              <Plus className="h-2.5 w-2.5" />
            </div>
          </div>

          {/* Content Section */}
          <div className="flex flex-1 flex-col">
            <div className="flex items-center justify-between">
              <div className="flex items-end gap-1.5 text-start">
                <UserProfileHoverCard userData={postData.user}>
                  <span className="cursor-pointer font-medium hover:underline active:opacity-75">
                    {postData.user.username}
                  </span>
                </UserProfileHoverCard>
                <span className="text-muted-foreground text-sm">
                  {formatPostTime(postData.created_at)}
                </span>
              </div>
              <PopoverMenu />
            </div>

            <div className="mt-1 text-start">
              <p className="whitespace-pre-line">{postData.content}</p>
              {postData.media && postData.media.length > 0 && (
                <div className="mt-2">
                  <PostMedia media={postData.media} />
                </div>
              )}
            </div>

            <div className="mt-2">
              <InteractionBar
                postData={postData}
                handleLike={handleLike}
                likeCount={postData.likes_count}
                commentCount={postData.replies_count}
              />
            </div>
          </div>
        </div>
      </Card>

      <UserProfileModal
        open={showUserInfoModal}
        onOpenChange={setShowUserInfoModal}
        userData={postData.user}
      />

      <LoginPromptModal
        open={showLoginModal}
        onOpenChange={setShowLoginModal}
        icon={<Heart className="h-16 w-16 fill-red-500 text-red-600" />}
        title="Yêu thích bài viết này?"
        description="Đăng nhập để thả tim, bình luận và chia sẻ bài viết này đến mọi người."
      />
    </>
  );
}

export default PostCard;
