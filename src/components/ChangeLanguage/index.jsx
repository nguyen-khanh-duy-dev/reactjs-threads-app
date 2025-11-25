import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Check } from "lucide-react"; // Icon tick chọn
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils"; // Hàm tiện ích của shadcn để gộp class

function ChangeLanguage({ onBack }) {
  const { t, i18n } = useTranslation("home");

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  // Class chung cho các item
  const itemClasses =
    "w-full flex items-center justify-between px-3 py-3 rounded-lg " +
    "text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground " +
    "focus:bg-accent focus:text-accent-foreground outline-none";

  return (
    <div className="px-2.5 py-2">
      {/* --- Header (Giống ThemeToggle) --- */}
      <div className="relative mb-2 flex items-center justify-center px-1.5 py-3.5">
        <div
          className="hover:text-foreground absolute left-0 cursor-pointer p-1 transition-colors"
          onClick={onBack}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>

        <span className="w-full text-center font-semibold">
          {t("sidebar.language")}
        </span>
      </div>

      {/* --- Danh sách ngôn ngữ --- */}
      <div className="flex flex-col gap-1">
        {/* Tiếng Việt */}
        <button
          onClick={() => changeLanguage("vi")}
          className={cn(itemClasses, i18n.language === "vi" && "bg-accent")}
        >
          <span>Tiếng Việt</span>
          {i18n.language === "vi" && <Check className="h-4 w-4" />}
        </button>

        {/* English */}
        <button
          onClick={() => changeLanguage("en")}
          className={cn(itemClasses, i18n.language === "en" && "bg-accent")}
        >
          <span>English</span>
          {i18n.language === "en" && <Check className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}

export default ChangeLanguage;
