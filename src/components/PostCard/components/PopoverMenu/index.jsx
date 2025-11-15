import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Ellipsis,
  ChevronRight,
  Bookmark,
  EyeOff,
  BellOff,
  UserMinus,
  UserX,
  MessageSquareWarning,
  Link2,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function PopoverMenu() {
  const { t } = useTranslation("home");

  const [open, setOpen] = useState(false);

  // Hàm này dùng để đóng menu sau khi chọn một mục
  const handleSelect = (action) => {
    console.log("Đã chọn:", action);
    setOpen(false);
  };

  // Class chung cho các mục
  const itemClasses =
    "w-full flex cursor-pointer items-center justify-between gap-2 py-3.5 px-3 rounded-md hover:bg-accent hover:text-accent-foreground font-medium text-sm transition-colors bg-transparent border-none outline-none text-left";
  const iconClasses = "h-5 w-5";
  const separatorClasses = "my-1 h-px bg-border";

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
      modal={false} // <---Cho phép thao tác với trang bên ngoài
    >
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="cursor-pointer rounded-full transition-transform active:scale-95"
        >
          <Ellipsis className="h-5 w-5" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="w-64 rounded-xl p-2" // Style giống dropdown
        sideOffset={5}
      >
        {/* Nhóm 1 */}
        <button
          onClick={() => handleSelect("add-feed")}
          className={itemClasses}
        >
          <span>{t("content.addToFeed")}</span>
          <ChevronRight className={iconClasses} />
        </button>

        <div className={separatorClasses} />

        {/* Nhóm 2 */}
        <button onClick={() => handleSelect("save")} className={itemClasses}>
          <span>{t("content.save")}</span>
          <Bookmark className={iconClasses} />
        </button>
        <button
          onClick={() => handleSelect("not-interested")}
          className={itemClasses}
        >
          <span>{t("content.notInterested")}</span>
          <EyeOff className={iconClasses} />
        </button>

        <div className={separatorClasses} />

        {/* Nhóm 3 */}
        <button onClick={() => handleSelect("mute")} className={itemClasses}>
          <span>{t("content.mute")}</span>
          <BellOff className={iconClasses} />
        </button>

        <button
          onClick={() => handleSelect("block")}
          className={`${itemClasses} text-red-500 hover:text-red-500`}
        >
          <span>{t("content.block")}</span>
          <UserX className={`${iconClasses}`} />
        </button>

        <button
          onClick={() => handleSelect("report")}
          className={`${itemClasses} text-red-500 hover:text-red-500`}
        >
          <span>{t("content.report")}</span>
          <MessageSquareWarning className={`${iconClasses}`} />
        </button>

        <div className={separatorClasses} />

        {/* Nhóm 4 */}
        <button onClick={() => handleSelect("copy")} className={itemClasses}>
          <span>{t("content.copyLink")}</span>
          <Link2 className={iconClasses} />
        </button>
      </PopoverContent>
    </Popover>
  );
}
