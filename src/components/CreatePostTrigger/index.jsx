import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/features/auth";
import AddNewPostModal from "@/components/AddNewPostModal"; // Import modal đã làm
import { useTranslation } from "react-i18next";
import { getFallbackInitials } from "../helper";

function CreatePostTrigger() {
  const { t } = useTranslation("home");

  const currentUser = useCurrentUser();
  const [openModal, setOpenModal] = useState(false);

  if (!currentUser) return null;

  return (
    <>
      {/* Khu vực kích hoạt (Giao diện giống hình) */}
      <div
        className="bg-background hover:bg-muted/50 flex w-full cursor-text items-center justify-between gap-4 border-b px-4 py-4 transition-colors"
        onClick={() => setOpenModal(true)}
      >
        {/* Bên trái: Avatar + Text */}
        <div className="flex flex-1 items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={currentUser?.avatarUrl}
              alt={currentUser?.username}
            />
            <AvatarFallback>
              {getFallbackInitials(currentUser?.username)}
            </AvatarFallback>
          </Avatar>
          <span className="text-muted-foreground/60">
            {t("content.whatsNew?")}
          </span>
        </div>

        {/* Bên phải: Nút Đăng (giả lập disable) */}
        <Button
          size="sm"
          variant="outline"
          className="pointer-events-none rounded-3xl px-4 font-semibold opacity-50" // Làm mờ để giống trạng thái chưa nhập
        >
          {t("content.post")}
        </Button>
      </div>

      {/* Modal thực sự sẽ mở ra khi click */}
      <AddNewPostModal
        open={openModal}
        onOpenChange={setOpenModal}
        currentUser={currentUser}
      />
    </>
  );
}

export default CreatePostTrigger;
