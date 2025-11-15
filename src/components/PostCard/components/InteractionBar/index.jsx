import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Repeat, Send } from "lucide-react";

function InteractionBar({
  likeCount = null,
  commentCount = null,
  rePostCount = null,
  shareCount = null,
}) {
  const baseClassesBtn = `rounded-full cursor-pointer active:scale-95`;
  const baseClassesText = "text-sm font-normal";

  return (
    <div className="mt-3 -ml-2.5 flex items-center gap-1">
      {/* Like  Button*/}
      <Button
        variant="ghost"
        size="icon"
        className={`${baseClassesBtn} ${likeCount ? "px-8" : ""}`}
      >
        <Heart className="h-5! w-5!" />
        {likeCount && <span className={`${baseClassesText}`}>{likeCount}</span>}
      </Button>

      {/* Comment Button */}
      <Button
        variant="ghost"
        size="icon"
        className={`${baseClassesBtn} ${commentCount ? "px-8" : ""}`}
      >
        <MessageCircle className="h-5! w-5!" />
        {commentCount && (
          <span className={`${baseClassesText}`}>{commentCount}</span>
        )}
      </Button>

      {/* RePost Button */}
      <Button
        variant="ghost"
        size="icon"
        className={`${baseClassesBtn} ${rePostCount ? "px-8" : ""}`}
      >
        <Repeat className="h-5! w-5!" />
        {rePostCount && (
          <span className={`${baseClassesText}`}>{rePostCount}</span>
        )}
      </Button>

      {/* Share Button */}
      <Button
        variant="ghost"
        size="icon"
        className={`${baseClassesBtn} ${shareCount ? "px-8" : ""}`}
      >
        <Send strokeWidth={1.5} className="h-5! w-5!" />
        {shareCount && (
          <span className={`${baseClassesText}`}>{shareCount}</span>
        )}
      </Button>
    </div>
  );
}

export default InteractionBar;
