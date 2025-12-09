// src/components/UserProfileInfo.jsx
import { useState, useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CalendarDays, Loader2 } from "lucide-react";
import { toast } from "sonner";

// Hooks
import { useCurrentUser } from "@/features/auth/hooks";
import {
  useFollowUserMutation,
  useGetUserFollowingsQuery,
} from "@/features/posts";
import { UnfollowDialog } from "../UnfollowDialog";
import { getFallbackInitials } from "../helper";

export function UserProfileInfo({ userData, onActionComplete }) {
  const user = userData || {};
  const currentUser = useCurrentUser();

  // State Dialog Unfollow
  const [showUnfollowDialog, setShowUnfollowDialog] = useState(false);

  // --- LOGIC CHECK FOLLOW ---
  const { data: myFollowings = [] } = useGetUserFollowingsQuery(
    currentUser?.id,
    {
      skip: !currentUser,
    },
  );

  const isFollowing = useMemo(() => {
    if (!currentUser || !myFollowings) return false;
    return myFollowings.some((followingUser) => followingUser.id === user.id);
  }, [myFollowings, user.id, currentUser]);

  // --- LOGIC MUTATION ---
  const [followUser, { isLoading }] = useFollowUserMutation();

  const handleFollowClick = async () => {
    if (!currentUser) {
      toast.error("Vui lòng đăng nhập!");
      return;
    }
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

      setShowUnfollowDialog(false);
      // Gọi callback nếu component cha cần (ví dụ để đóng Modal cha)
      if (onActionComplete) onActionComplete();
    } catch (error) {
      console.error("Lỗi follow:", error);
      toast.error("Có lỗi xảy ra.");
    }
  };

  return (
    <div className="w-full space-y-1">
      {/* Header: Avatar + Tên */}
      <div className="flex justify-between space-x-4">
        <Avatar className="h-12 w-12 border">
          <AvatarImage src={user.avatar_url} />
          <AvatarFallback>{getFallbackInitials(user.username)}</AvatarFallback>
        </Avatar>
        <div className="w-full">
          <h4 className="text-sm font-semibold">
            {user.name || user.username}
          </h4>
          <p className="text-muted-foreground text-sm">@{user.username}</p>
        </div>
      </div>

      {/* Bio */}
      <div className="flex items-center pt-2">
        <span className="text-muted-foreground line-clamp-2 text-xs">
          {user.bio || "Chưa có giới thiệu."}
        </span>
      </div>

      {/* Ngày tham gia */}
      <div className="flex items-center gap-2 pt-2">
        <CalendarDays className="h-4 w-4 opacity-70" />{" "}
        <span className="text-muted-foreground text-xs">
          Tham gia{" "}
          {user.created_at
            ? new Date(user.created_at).toLocaleDateString("vi-VN")
            : "N/A"}
        </span>
      </div>

      {/* Số lượng follow */}
      <div className="text-muted-foreground pt-2 text-sm">
        <span className="text-foreground font-semibold">
          {(user.followers_count || 0).toLocaleString("vi-VN")}
        </span>{" "}
        người theo dõi
      </div>

      {/* Nút Follow */}
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

      {/* Dialog Unfollow (Nằm ngay trong Info để tái sử dụng logic) */}
      <UnfollowDialog
        open={showUnfollowDialog}
        onOpenChange={setShowUnfollowDialog}
        targetUser={user}
        onConfirm={() => executeFollowAction("unfollow")}
      />
    </div>
  );
}
