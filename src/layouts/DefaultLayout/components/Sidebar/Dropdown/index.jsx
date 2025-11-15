import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"; // <-- ĐÃ THAY ĐỔI
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

function Dropdown({ children, open, onOpenChange }) {
  const { t } = useTranslation("home");
  const baseClassesItem =
    "px-3.5 py-3.5 font-semibold cursor-pointer rounded-2xl";

  // Class chung cho các nút, mô phỏng DropdownMenuItem
  const itemButtonClasses = `w-full text-left relative flex select-none 
    items-center outline-none transition-colors 
    hover:bg-accent hover:text-accent-foreground 
    focus:bg-accent focus:text-accent-foreground
    active:scale-95 transition-transform
    ${baseClassesItem}`;

  // Phân cách
  const separatorClasses = "my-1 h-px bg-border";

  return (
    <Popover open={open} onOpenChange={onOpenChange} modal={false}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>

      <PopoverContent
        className="w-61 rounded-2xl p-2"
        side="top"
        align="start"
        sideOffset={5}
      >
        {/* Block 1 */}
        <button className={`flex justify-between ${itemButtonClasses}`}>
          {t("sidebar.appearance")}
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
        <button className={`flex justify-between ${itemButtonClasses}`}>
          {t("sidebar.language")}
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
        <button className={`${itemButtonClasses}`}>{t("sidebar.about")}</button>
        <button className={`${itemButtonClasses}`}>
          {t("sidebar.settings")}
        </button>

        <div className={separatorClasses} />

        {/* Block 2 */}
        <button className={`flex justify-between ${itemButtonClasses}`}>
          {t("sidebar.feed")}
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
        <button className={`${itemButtonClasses}`}>{t("sidebar.saved")}</button>
        <button className={`${itemButtonClasses}`}>{t("sidebar.likes")}</button>

        <div className={separatorClasses} />

        {/* Block 3 */}
        <button className={`${itemButtonClasses}`}>
          {t("sidebar.reportProblem")}
        </button>
        <button
          className={`text-destructive focus:text-destructive ${itemButtonClasses}`}
        >
          {t("sidebar.logout")}
        </button>
      </PopoverContent>
    </Popover>
  );
}

export default Dropdown;
