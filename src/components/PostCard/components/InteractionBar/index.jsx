import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Repeat, Send } from "lucide-react";
import { formatCompactNumber } from "../../helpers"; 
import { cn } from "@/lib/utils"; // Dùng cn của shadcn để gộp class

function InteractionBar({ postData, handleLike }) {
  // Lấy dữ liệu trực tiếp từ postData (đã được Redux cập nhật realtime)
  const isLiked = postData.is_liked_by_auth;
  const likeCount = postData.likes_count;
  const commentCount = postData.replies_count; 
  const rePostCount = postData.reposts_count;

  // Class cơ bản
  const baseClassesBtn =
    "rounded-full cursor-pointer active:scale-95 transition-all";
  const baseClassesText = "text-sm font-normal ml-1";

  return (
    <div className="mt-3 -ml-2.5 flex items-center gap-1">
      {/* --- LIKE BUTTON --- */}
      <Button
        variant="ghost"
        size="icon"
        onClick={handleLike}
        className={cn(baseClassesBtn, likeCount > 0 && "w-auto px-3")}
      >
        <Heart
          className={cn(
            "h-5 w-5 transition-colors duration-300",
            isLiked ? "scale-110 fill-red-600 text-red-600" : "text-foreground",
          )}
        />
        {likeCount > 0 && (
          <span className={cn(baseClassesText, isLiked && "text-red-600")}>
            {formatCompactNumber(likeCount)}
          </span>
        )}
      </Button>

      {/* --- COMMENT BUTTON --- */}
      <Button
        variant="ghost"
        size="icon"
        className={cn(baseClassesBtn, commentCount > 0 && "w-auto px-3")}
      >
        <MessageCircle className="h-5 w-5" />
        {commentCount > 0 && (
          <span className={baseClassesText}>
            {formatCompactNumber(commentCount)}
          </span>
        )}
      </Button>

      {/* --- REPOST BUTTON --- */}
      <Button
        variant="ghost"
        size="icon"
        className={cn(baseClassesBtn, rePostCount > 0 && "w-auto px-3")}
      >
        <Repeat className="h-5 w-5" />
        {rePostCount > 0 && (
          <span className={baseClassesText}>
            {formatCompactNumber(rePostCount)}
          </span>
        )}
      </Button>

      {/* --- SHARE BUTTON --- */}
      <Button variant="ghost" size="icon" className={baseClassesBtn}>
        <Send strokeWidth={1.5} className="h-5 w-5" />
      </Button>
    </div>
  );
}

export default InteractionBar;
