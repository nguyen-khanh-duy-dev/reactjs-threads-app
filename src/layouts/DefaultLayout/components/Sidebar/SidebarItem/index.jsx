// Import của bạn
import { NavLink } from "react-router";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { t } from "i18next";

function SidebarItem({ iconRegular, iconSolid, tooltip, path }) {
  // Các class này vẫn giữ nguyên
  const navLinkBaseClasses =
    "flex items-center justify-center cursor-pointer rounded-xl p-3 text-2xl text-muted-foreground transition-colors duration-200 active:scale-95 transition-transform";
  const navLinkHoverClasses = "hover:bg-sidebar-accent";
  const navLinkActiveClasses = "text-sidebar-foreground font-bold";

  const buttonClasses =
    "flex items-center justify-center cursor-pointer rounded-xl p-3 text-2xl hover:text-sidebar-foreground text-muted-foreground transition-colors duration-200 bg-sidebar-accent active:scale-95 transition-transform";

  return (
    <Tooltip delayDuration={1000}>
      <TooltipTrigger asChild>
        {/* Nếu dùng thẻ div ở dòng 23 sẽ bị xung đột với ToolTipTrigger=> không thể dụng isActive bên trong NavLink */}
        <span className="flex w-[90%] items-center justify-center">
          {path ? (
            <NavLink
              to={path}
              className={({ isActive }) =>
                `w-full ${navLinkBaseClasses} ${navLinkHoverClasses} ${isActive ? navLinkActiveClasses : ""}`
              }
            >
              {({ isActive }) => (isActive ? iconSolid : iconRegular)}
            </NavLink>
          ) : (
            <button onClick={() => {}} className={`w-full ${buttonClasses}`}>
              {iconRegular}
            </button>
          )}
        </span>
      </TooltipTrigger>

      <TooltipContent
        sideOffset={5}
        side="right"
        className="rounded-md border-none bg-black text-white"
      >
        <p>{t(tooltip)}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export default SidebarItem;
