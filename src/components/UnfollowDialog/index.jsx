import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getFallbackInitials } from "../helper";

export function UnfollowDialog({ open, onOpenChange, targetUser, onConfirm }) {
  if (!targetUser) return null;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-background max-w-[300px] rounded-xl border-none p-6 shadow-2xl">
        <AlertDialogHeader className="flex flex-col items-center gap-4 text-center">
          {/* Avatar */}
          <Avatar className="border-background h-16 w-16 border-2 shadow-sm">
            <AvatarImage src={targetUser.avatar_url} />
            <AvatarFallback>
              {getFallbackInitials(targetUser.username)}
            </AvatarFallback>
          </Avatar>

          {/* Tiêu đề */}
          <AlertDialogTitle className="text-base font-bold">
            Bỏ theo dõi {targetUser.username}?
          </AlertDialogTitle>

          {/* Mô tả (nếu cần, ở đây để trống cho giống hình) */}
          <AlertDialogDescription className="hidden">
            Hành động này sẽ bỏ theo dõi người dùng.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-4 flex flex-row items-center justify-between gap-2 sm:justify-center">
          {/* Nút Hủy */}
          <AlertDialogCancel className="bg-secondary/50 hover:bg-secondary mt-0 h-10 w-full flex-1 rounded-xl border-none font-semibold">
            Hủy
          </AlertDialogCancel>

          {/* Nút Bỏ theo dõi */}
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault(); // Chặn đóng dialog mặc định để xử lý async
              onConfirm();
            }}
            className="h-10 w-full flex-1 rounded-xl bg-red-600 font-semibold text-white hover:bg-red-700"
          >
            Bỏ theo dõi
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
