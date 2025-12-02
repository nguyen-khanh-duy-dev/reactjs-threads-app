import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function LoginPromptModal({ open, onOpenChange, icon, title, description }) {
  const navigate = useNavigate();

  const handleLogin = () => {
    onOpenChange(false);
    navigate("/login");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl p-8 pt-10 text-center sm:max-w-[400px]">
        <DialogHeader className="flex flex-col items-center gap-2 space-y-0">
          {/* Icon tùy biến */}
          <div className="text-destructive mb-2 flex items-center justify-center text-5xl">
            {icon}
          </div>

          {/* Tiêu đề tùy biến */}
          <DialogTitle className="text-2xl font-bold tracking-tight">
            {title}
          </DialogTitle>

          {/* Mô tả tùy biến */}
          <DialogDescription className="text-muted-foreground text-center text-base">
            {description}
          </DialogDescription>
        </DialogHeader>

        {/*  Nút Action Cố định */}
        <div className="mt-6 w-full">
          <Button
            className="w-full rounded-xl py-6 text-base font-semibold"
            onClick={handleLogin}
          >
            Đăng nhập ngay
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default LoginPromptModal;
