import { useState, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCurrentUser } from "@/features/auth";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import ThemeToggle from "../ThemeToggle";
import ChangeLanguage from "@/components/ChangeLanguage";

function Dropdown({ children, open, onOpenChange, onLogout }) {
  const { t } = useTranslation("home");
  const currentUser = useCurrentUser();

  // State quản lý view: 'main', 'appearance', 'language'
  const [view, setView] = useState("main");

  // Reset về main khi đóng menu
  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => {
        setView("main");
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // --- STYLING ---
  const baseClassesItem =
    "px-3.5 py-3.5 font-semibold cursor-pointer rounded-2xl";
  const itemButtonClasses = `w-full text-left relative flex select-none 
    items-center outline-none transition-colors 
    hover:bg-accent hover:text-accent-foreground 
    focus:bg-accent focus:text-accent-foreground
    active:scale-95 transition-transform
    ${baseClassesItem}`;
  const separatorClasses = "my-1 h-px bg-border";

  return (
    <Popover open={open} onOpenChange={onOpenChange} modal={false}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>

      <PopoverContent
        className="w-64 rounded-2xl p-2"
        side="top"
        align="start"
        sideOffset={5}
      >
        {/* --- LOGIC ĐIỀU HƯỚNG VIEW --- */}

        {view === "appearance" ? (
          // 1. View chỉnh Theme
          <ThemeToggle onBack={() => setView("main")} />
        ) : view === "language" ? (
          // 2. View chỉnh Ngôn ngữ
          <ChangeLanguage onBack={() => setView("main")} />
        ) : (
          // 3. View Menu Chính (Main)
          <>
            {!currentUser ? (
              /* --- KHÁCH (CHƯA ĐĂNG NHẬP) --- */
              <>
                <button
                  className={`flex justify-between ${itemButtonClasses}`}
                  onClick={() => setView("appearance")}
                >
                  {t("sidebar.appearance")}
                  <FontAwesomeIcon icon={faAngleRight} />
                </button>

                {/* Bạn có thể thêm nút Ngôn ngữ cho khách ở đây nếu muốn */}
                <button
                  className={`flex justify-between ${itemButtonClasses}`}
                  onClick={() => setView("language")}
                >
                  {t("sidebar.language")}
                  <FontAwesomeIcon icon={faAngleRight} />
                </button>

                <div className={separatorClasses} />

                <button className={`${itemButtonClasses}`}>
                  {t("sidebar.reportProblem")}
                </button>
              </>
            ) : (
              /* --- TRƯỜNG HỢP: USER (ĐÃ ĐĂNG NHẬP) --- */
              <>
                {/* Block 1 */}
                <button
                  className={`flex justify-between ${itemButtonClasses}`}
                  onClick={() => setView("appearance")}
                >
                  {t("sidebar.appearance")}
                  <FontAwesomeIcon icon={faAngleRight} />
                </button>

                <button
                  className={`flex justify-between ${itemButtonClasses}`}
                  onClick={() => setView("language")}
                >
                  {t("sidebar.language")}
                  <FontAwesomeIcon icon={faAngleRight} />
                </button>

                <button className={`${itemButtonClasses}`}>
                  {t("sidebar.about")}
                </button>
                <button className={`${itemButtonClasses}`}>
                  {t("sidebar.settings")}
                </button>

                <div className={separatorClasses} />

                {/* Block 2 */}
                <button className={`flex justify-between ${itemButtonClasses}`}>
                  {t("sidebar.feed")}
                  <FontAwesomeIcon icon={faAngleRight} />
                </button>
                <button className={`${itemButtonClasses}`}>
                  {t("sidebar.saved")}
                </button>
                <button className={`${itemButtonClasses}`}>
                  {t("sidebar.likes")}
                </button>

                <div className={separatorClasses} />

                {/* Block 3 */}
                <button className={`${itemButtonClasses}`}>
                  {t("sidebar.reportProblem")}
                </button>
                <button
                  className={`text-destructive focus:text-destructive ${itemButtonClasses}`}
                  onClick={onLogout}
                >
                  {t("sidebar.logout")}
                </button>
              </>
            )}
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}

export default Dropdown;
