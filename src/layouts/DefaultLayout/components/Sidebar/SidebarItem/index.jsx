import { NavLink } from "react-router-dom"; // Sửa lại import đúng thư viện
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTranslation } from "react-i18next"; // Sửa lại import đúng hook

// 1. Thêm prop 'onClick' vào đây
function SidebarItem({ iconRegular, iconSolid, tooltip, path, onClick }) {
  const { t } = useTranslation("home"); // Sửa lại cách gọi t

  // Các class giữ nguyên
  const navLinkBaseClasses =
    "flex items-center justify-center cursor-pointer rounded-xl p-3 text-2xl text-muted-foreground transition-colors duration-200 active:scale-95 transition-transform";
  const navLinkHoverClasses = "hover:bg-sidebar-accent";
  const navLinkActiveClasses = "text-sidebar-foreground font-bold";

  const buttonClasses =
    "flex items-center justify-center cursor-pointer rounded-xl p-3 text-2xl hover:text-sidebar-foreground text-muted-foreground transition-colors duration-200 bg-sidebar-accent active:scale-95 transition-transform";

  return (
    <Tooltip delayDuration={1000}>
      <TooltipTrigger asChild>
        {/* Giữ thẻ span để tránh lỗi ref của TooltipTrigger khi render có điều kiện */}
        <span className="flex w-[90%] items-center justify-center">
          {path ? (
            <NavLink
              to={path}
              // 2. QUAN TRỌNG: Gắn onClick vào NavLink
              // Để Sidebar.jsx có thể gọi e.preventDefault() chặn chuyển trang
              onClick={onClick}
              className={({ isActive }) =>
                `w-full ${navLinkBaseClasses} ${navLinkHoverClasses} ${
                  isActive ? navLinkActiveClasses : ""
                }`
              }
            >
              {({ isActive }) => (isActive ? iconSolid : iconRegular)}
            </NavLink>
          ) : (
            <button
              // 3. Gắn onClick vào button (cho nút Tạo/Create)
              onClick={onClick}
              className={`w-full ${buttonClasses}`}
            >
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
        <p>{t(`sidebar.${tooltip}`) || tooltip}</p>{" "}
        {/* Gợi ý: Dùng key translation */}
      </TooltipContent>
    </Tooltip>
  );
}

export default SidebarItem;
