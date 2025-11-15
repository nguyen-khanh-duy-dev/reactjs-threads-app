import { useState } from "react";
import {
  faHeart as farHeart,
  faUser as farUser,
  faHouse as farHouse,
} from "@fortawesome/free-regular-svg-icons";
import {
  faMagnifyingGlass,
  faPlus,
  faHouse as fasHouse,
  faHeart as fasHeart,
  faUser as fasUser,
} from "@fortawesome/free-solid-svg-icons";
import { faThreads } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SidebarItem from "./SidebarItem";
import Dropdown from "./Dropdown";
import ThemeToggle from "./ThemeToggle";

const SIDEBAR_ITEMS = [
  {
    id: "1",
    to: "/",
    icon_regular: <FontAwesomeIcon icon={farHouse} />,
    icon_solid: <FontAwesomeIcon icon={fasHouse} />,
    tooltip: "Trang chủ",
  },
  {
    id: "2",
    to: "/search",
    icon_regular: <FontAwesomeIcon icon={faMagnifyingGlass} />,
    icon_solid: <FontAwesomeIcon icon={faMagnifyingGlass} />,
    tooltip: "Tìm kiếm",
  },
  {
    id: "3",
    to: "",
    icon_regular: <FontAwesomeIcon icon={faPlus} />,
    icon_solid: <FontAwesomeIcon icon={faPlus} />,
    tooltip: "Tạo",
  },
  {
    id: "4",
    to: "/activity",
    icon_regular: <FontAwesomeIcon icon={farHeart} />,
    icon_solid: <FontAwesomeIcon icon={fasHeart} />,
    tooltip: "Thông báo",
  },
  {
    id: "5",
    to: "/user",
    icon_regular: <FontAwesomeIcon icon={farUser} />,
    icon_solid: <FontAwesomeIcon icon={fasUser} />,
    tooltip: "Trang cá nhân",
  },
];

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex h-full w-20 flex-col items-center justify-between pr-1 pl-1">
      <FontAwesomeIcon
        icon={faThreads}
        className="text-foreground cursor-pointer py-4 text-4xl hover:scale-105"
      />
      <div className="flex flex-col gap-2.5">
        {SIDEBAR_ITEMS.map((item) => (
          <SidebarItem
            key={item.id}
            iconRegular={item.icon_regular}
            iconSolid={item.icon_solid}
            tooltip={item.tooltip}
            path={item.to}
          />
        ))}
      </div>
      <Dropdown
        open={isOpen}
        onOpenChange={setIsOpen}
        children={
          <div className="group mb-5 flex cursor-pointer flex-col gap-1.5 p-4 transition-transform active:scale-95">
            <div
              className={`group-hover:bg-foreground h-[3px] w-5 transition-colors ${
                isOpen ? "bg-foreground" : "bg-muted-foreground"
              }`}
            ></div>
            <div
              className={`group-hover:bg-foreground h-[3px] w-3 transition-colors ${
                isOpen ? "bg-foreground" : "bg-muted-foreground"
              }`}
            ></div>
          </div>
        }
      />
    </div>
  );
}

export default Sidebar;
