import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import {
  Image as ImageIcon,
  FileText, // Giả lập icon GIF
  AlignLeft, // Giả lập icon Poll/List
  Mic, // Giả lập icon Voice
  Hash, // Giả lập icon Tag
  MapPin, // Icon Location
  MoreHorizontal,
  X,
  Copy, // Icon layer (2 hình vuông chồng nhau góc phải)
} from "lucide-react";

function AddNewPostModal({
  open,
  onOpenChange,
  currentUser,
  cancelLabel = null, // "Hủy" hoặc null => (hiện X)
  className,
  isModal,
  onInteractOutside,
}) {
  const [postContent, setPostContent] = useState("");

  const handlePost = () => {
    console.log("Đăng bài:", postContent);
    setPostContent("");
    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      modal={isModal} //Có thể là modal or không (Không thì có thể tương tác với nền)
    >
      <DialogContent
        aria-describedby={undefined}
        // Ngăn đóng khi bấm ra ngoài
        onInteractOutside={onInteractOutside}
        // Tắt nút đóng mặc định của shadcn (chúng ta tự làm header)
        className={cn(
          "bg-background flex flex-col gap-0 overflow-hidden rounded-2xl border p-0 shadow-xl sm:max-w-[600px]",
          "[&>button[type=button]]:hidden",
          // Loại bỏ hiệu ứng mờ nền mặc định nếu có
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          className, // Class tùy biến vị trí từ bên ngoài
        )}
      >
        {/* --- HEADER --- */}
        <div className="relative flex items-center justify-between px-4 py-4">
          {/* Nút Đóng/Hủy (Trái) */}
          <div className="flex flex-1 justify-start">
            {cancelLabel ? (
              <Button
                variant="ghost"
                className="h-auto p-0 text-base font-normal hover:bg-transparent"
                onClick={() => onOpenChange(false)}
              >
                {cancelLabel}
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => onOpenChange(false)}
              >
                <X className="h-6 w-6" />
              </Button>
            )}
          </div>

          {/* Tiêu đề (Giữa) */}
          <DialogTitle className="text-center text-base font-bold">
            Thread mới
          </DialogTitle>

          {/* Icons (Phải) */}
          <div className="text-foreground flex flex-1 justify-end gap-4">
            {/* Icon Layer (Giả lập icon Copy/Multiple windows) */}
            <Copy className="h-6 w-6 cursor-pointer" />
            <MoreHorizontal className="h-6 w-6 cursor-pointer" />
          </div>
        </div>

        {/* --- BODY --- */}
        <div className="flex gap-3 overflow-y-auto px-4 pb-4">
          {/* CỘT TRÁI: Avatar & Dây nối */}
          <div className="flex flex-col items-center pt-1">
            <Avatar className="h-10 w-10 cursor-pointer">
              <AvatarImage src={currentUser?.avatarUrl} />
              <AvatarFallback>
                {currentUser?.username?.charAt(0)}
              </AvatarFallback>
            </Avatar>

            {/* Đường kẻ dọc kết nối */}
            <div className="bg-border/60 my-2 min-h-[40px] w-[2px] flex-1"></div>

            {/* Avatar nhỏ mờ (Placeholder user phụ) */}
            <Avatar className="h-5 w-5 opacity-40">
              <AvatarImage src={currentUser?.avatarUrl} />
              <AvatarFallback className="text-[10px]">+</AvatarFallback>
            </Avatar>
          </div>

          {/* CỘT PHẢI: Nội dung */}
          <div className="flex flex-1 flex-col gap-1 pt-1">
            {/* Username & Tag chủ đề */}
            <div className="flex items-center gap-1 text-sm font-semibold">
              <span>{currentUser?.username}</span>
              {/* Nút "Thêm chủ đề" giả lập */}
              {/* <span className="font-normal text-muted-foreground">› Thêm chủ đề</span> */}
            </div>

            {/* Input */}
            <textarea
              placeholder="Có gì mới?"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              className="placeholder:text-muted-foreground/60 min-h-[60px] w-full resize-none bg-transparent text-base outline-none"
              style={{ fieldSizing: "content" }}
            />

            {/* Media Toolbar */}
            <div className="text-muted-foreground/80 mt-1 flex gap-4">
              <ImageIcon className="hover:text-foreground h-5 w-5 cursor-pointer transition-colors" />
              <FileText className="hover:text-foreground h-5 w-5 cursor-pointer transition-colors" />{" "}
              {/* GIF */}
              <AlignLeft className="hover:text-foreground h-5 w-5 cursor-pointer transition-colors" />{" "}
              {/* Poll */}
              <Mic className="hover:text-foreground h-5 w-5 cursor-pointer transition-colors" />
              <Hash className="hover:text-foreground h-5 w-5 cursor-pointer transition-colors" />
              <MapPin className="hover:text-foreground h-5 w-5 cursor-pointer transition-colors" />
            </div>

            {/* Placeholder "Thêm vào thread" */}
            <div className="text-muted-foreground/50 mt-3 text-sm">
              Thêm vào thread
            </div>
          </div>
        </div>

        {/* --- FOOTER --- */}
        <div className="mt-2 flex items-center justify-between px-4 py-4">
          <div className="text-muted-foreground/60 hover:text-foreground cursor-pointer text-sm transition-colors">
            Các lựa chọn để kiểm soát câu trả lời
          </div>

          <Button
            onClick={handlePost}
            disabled={!postContent.trim()}
            className="h-9 rounded-3xl px-5 font-semibold"
            variant={postContent.trim() ? "default" : "secondary"} // Đổi màu khi có text
          >
            Đăng
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddNewPostModal;
