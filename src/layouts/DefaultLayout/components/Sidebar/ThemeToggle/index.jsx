import { useTheme } from "@/components/ThemeProvider/hook.js";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";

function ThemeToggle() {
  const { t } = useTranslation("home");
  const { theme, setTheme } = useTheme();

  const handleChangeTheme = (value) => {
    if (value) {
      setTheme(value);
    }
  };

  // --- STYLING ---
  const itemClasses =
    "flex-1 rounded-md py-2 text-sm font-medium " +
    "text-muted-foreground " +
    "data-[state=on]:bg-background " +
    "data-[state=on]:text-foreground " +
    "data-[state=on]:shadow-sm " +
    "focus-visible:ring-0 focus-visible:ring-offset-0"; // Tắt viền focus

  return (
    <div className="px-2.5 py-2">
      <div className="px-1.5 py-3.5 flex justify-center">
        <FontAwesomeIcon icon={faArrowLeft} className="p-1 cursor-pointer"/>
        <span className="text-center font-semibold w-full">
          {t("sidebar.appearance")}
        </span>
      </div>
      <ToggleGroup
        type="single"
        defaultValue={theme || "system"}
        className="bg-muted grid grid-cols-3 rounded-lg p-1"
        onValueChange={handleChangeTheme}
      >
        <ToggleGroupItem
          value="light"
          aria-label="Light mode"
          className={itemClasses} // Dùng class chung
        >
          <Sun className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="dark"
          aria-label="Dark mode"
          className={itemClasses} // Dùng class chung
        >
          <Moon className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="system"
          aria-label="System mode"
          className={itemClasses} // Dùng class chung
        >
          {t("sidebar.auto")}
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}

export default ThemeToggle;
