import SidebarItem from "./SidebarItem";
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

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  return (
    <div className="flex h-full w-20 flex-col items-center justify-between pr-1 pl-1">
      <img
        src="threads_logo.svg"
        alt="logo"
        className="w-1/2 py-4 hover:scale-105 cursor-pointer"
      />
      <div className="flex flex-col gap-2">
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
      <div className="group mb-5 flex cursor-pointer flex-col gap-1.5 p-4">
        <div className="bg-muted-foreground group-hover:bg-foreground h-[3px] w-6 transition-colors"></div>

        <div className="bg-muted-foreground group-hover:bg-foreground h-[3px] w-4 transition-colors"></div>
      </div>
    </div>
  );
}

export default Sidebar;
