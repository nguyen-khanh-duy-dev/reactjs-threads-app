import { useState, useMemo } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CalendarDays, Loader2 } from "lucide-react";

// Hooks
import { useCurrentUser } from "@/features/auth/hooks";
import { toast } from "sonner";
import { UnfollowDialog } from "../../UnfollowDialog";
// Import hook lấy danh sách following
import {
  useFollowUserMutation,
  useGetUserFollowingsQuery,
} from "@/features/posts";
import { getFallbackInitials } from "../../helper";

export function UserProfileHoverCard({ children, userData }) {
  const user = userData || {};
  const currentUser = useCurrentUser();

  // --- LOGIC MỚI: CHECK TRẠNG THÁI FOLLOW TỪ DANH SÁCH --- //

  // 1. Gọi API lấy danh sách người mình đang theo dõi
  // skip: !currentUser -> Chỉ gọi khi đã đăng nhập
  const { data: myFollowings = [] } = useGetUserFollowingsQuery(
    currentUser?.id,
    {
      skip: !currentUser,
    },
  );

  // 2. Tính toán: Kiểm tra xem user trong card này có nằm trong danh sách myFollowings không
  const isFollowing = useMemo(() => {
    if (!currentUser || !myFollowings) return false;
    // Tìm xem có object nào trong mảng myFollowings có id trùng với user.id không
    return myFollowings.some((followingUser) => followingUser.id === user.id);
  }, [myFollowings, user.id, currentUser]);

  // --- KẾT THÚC LOGIC MỚI --- //

  const [showUnfollowDialog, setShowUnfollowDialog] = useState(false);
  const [isOpenHover, setIsOpenHover] = useState(false);

  const [followUser, { isLoading }] = useFollowUserMutation();

  const handleFollowClick = async () => {
    if (!currentUser) {
      toast.error("Vui lòng đăng nhập!");
      return;
    }

    // Kiểm tra dựa trên biến isFollowing đã được tính toán chính xác ở trên
    if (isFollowing) {
      setShowUnfollowDialog(true);
      return;
    }

    await executeFollowAction("follow");
  };

  const executeFollowAction = async (action) => {
    try {
      await followUser({
        targetUserId: user.id,
        action: action,
        currentUserId: currentUser.id,
      }).unwrap();

      // Lưu ý: Không cần set state thủ công.
      // Vì invalidatesTags: ["Followings"] trong API sẽ kích hoạt fetch lại danh sách
      // -> Biến myFollowings thay đổi -> isFollowing tự động tính toán lại.

      setShowUnfollowDialog(false);
    } catch (error) {
      console.error("Lỗi follow:", error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  return (
    <>
      <HoverCard
        open={isOpenHover}
        onOpenChange={(open) => {
          if (showUnfollowDialog) return;
          setIsOpenHover(open);
        }}
      >
        <HoverCardTrigger asChild>{children}</HoverCardTrigger>

        <HoverCardContent className="z-50 w-80" align="start" side="bottom">
          <div className="flex justify-between space-x-4">
            <Avatar className="h-12 w-12 border">
              <AvatarImage src={user.avatar_url} />
              <AvatarFallback>
                {getFallbackInitials(user.username)}
              </AvatarFallback>
            </Avatar>
            <div className="w-full space-y-1">
              <h4 className="text-sm font-semibold">
                {user.name || user.username}
              </h4>
              <p className="text-muted-foreground text-sm">@{user.username}</p>

              <div className="flex items-center pt-2">
                <span className="text-muted-foreground line-clamp-2 text-xs">
                  {user.bio || "Chưa có giới thiệu."}
                </span>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <CalendarDays className="h-4 w-4 opacity-70" />{" "}
                <span className="text-muted-foreground text-xs">
                  Tham gia{" "}
                  {user.created_at
                    ? new Date(user.created_at).toLocaleDateString("vi-VN")
                    : "N/A"}
                </span>
              </div>

              <div className="text-muted-foreground pt-2 text-sm">
                <span className="text-foreground font-semibold">
                  {(user.followers_count || 0).toLocaleString("vi-VN")}
                </span>{" "}
                người theo dõi
              </div>

              {/* NÚT FOLLOW / UNFOLLOW */}
              <div className="pt-3">
                <Button
                  onClick={handleFollowClick}
                  disabled={isLoading}
                  variant={isFollowing ? "outline" : "default"}
                  className={`h-8 w-full text-xs font-semibold ${isFollowing ? "border-muted-foreground/20 text-foreground" : ""}`}
                >
                  {isLoading ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : isFollowing ? (
                    "Đang theo dõi"
                  ) : (
                    "Theo dõi"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>

      <UnfollowDialog
        open={showUnfollowDialog}
        onOpenChange={(open) => {
          setShowUnfollowDialog(open);
          if (!open) setIsOpenHover(false);
        }}
        targetUser={user}
        onConfirm={() => executeFollowAction("unfollow")}
      />
    </>
  );
}

export default UserProfileHoverCard;
