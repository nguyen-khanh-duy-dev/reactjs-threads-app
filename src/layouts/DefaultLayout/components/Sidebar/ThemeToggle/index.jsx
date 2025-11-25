import { useTheme } from "@/components/ThemeProvider/hook.js";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Moon, Sun, Laptop } from "lucide-react"; // Import Laptop icon for system
import { useTranslation } from "react-i18next";

// 1. Nhận prop onBack từ cha
function ThemeToggle({ onBack }) {
  const { t } = useTranslation("home");
  const { theme, setTheme } = useTheme();

  const handleChangeTheme = (value) => {
    if (value) {
      setTheme(value);
    }
  };

  const itemClasses =
    "flex-1 rounded-md py-2 text-sm font-medium " +
    "text-muted-foreground " +
    "data-[state=on]:bg-background " +
    "data-[state=on]:text-foreground " +
    "data-[state=on]:shadow-sm " +
    "focus-visible:ring-0 focus-visible:ring-offset-0";

  return (
    <div className="px-2.5 py-2">
      <div className="relative flex items-center justify-center px-1.5 py-3.5">
        {/* 2. Gắn sự kiện onClick={onBack} cho nút Back */}
        <div
          className="hover:text-foreground absolute left-0 cursor-pointer p-1 transition-colors"
          onClick={onBack}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>

        <span className="w-full text-center font-semibold">
          {t("sidebar.appearance")}
        </span>
      </div>

      <ToggleGroup
        type="single"
        defaultValue={theme || "system"}
        className="bg-muted grid w-full grid-cols-3 rounded-lg p-1"
        onValueChange={handleChangeTheme}
      >
        <ToggleGroupItem
          value="light"
          aria-label="Light mode"
          className={itemClasses}
        >
          <Sun className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="dark"
          aria-label="Dark mode"
          className={itemClasses}
        >
          <Moon className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="system"
          aria-label="System mode"
          className={itemClasses}
        >
          <Laptop className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}

export default ThemeToggle;
