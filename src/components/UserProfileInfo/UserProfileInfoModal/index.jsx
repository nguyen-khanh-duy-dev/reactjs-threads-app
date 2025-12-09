import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { UserProfileInfo } from "..";

export function UserProfileModal({ open, onOpenChange, userData }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="p-6 sm:max-w-[350px] [&>button]:hidden"
        aria-describedby={undefined}
      >
        <DialogTitle className="hidden">Thông tin người dùng</DialogTitle>

        {/* Nội dung chính */}
        <div className="pt-0">
          <UserProfileInfo
            userData={userData}
            onActionComplete={() => {
              onOpenChange(false);
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
