import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

// Icons
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

// Components & Hooks
import SidebarItem from "./SidebarItem";
import Dropdown from "./Dropdown";
import LoginPromptModal from "@/components/LoginPromptModal";
import { useCurrentUser } from "@/features/auth"; // Hook lấy user hiện tại
import * as authService from "@/services/auth";
import { setCurrentUser } from "@/features/auth";

// --- DỮ LIỆU SIDEBAR KÈM THÔNG TIN MODAL ---
const SIDEBAR_ITEMS = [
  {
    id: "1",
    to: "/",
    icon_regular: <FontAwesomeIcon icon={farHouse} />,
    icon_solid: <FontAwesomeIcon icon={fasHouse} />,
    tooltip: "Trang chủ",
    requiresAuth: false, // Trang chủ không cần login vẫn xem được
  },
  {
    id: "2",
    to: "/search",
    icon_regular: <FontAwesomeIcon icon={faMagnifyingGlass} />,
    icon_solid: <FontAwesomeIcon icon={faMagnifyingGlass} />,
    tooltip: "Tìm kiếm",
    requiresAuth: false, // Tìm kiếm cũng public
  },
  {
    id: "3",
    to: "", // Nút tạo không có link cụ thể nếu chưa login
    icon_regular: <FontAwesomeIcon icon={faPlus} />,
    icon_solid: <FontAwesomeIcon icon={faPlus} />,
    tooltip: "Tạo",
    requiresAuth: true, // Bắt buộc login
    // Thông tin hiển thị trên Modal
    modalInfo: {
      title: "Đăng ký để đăng",
      description:
        "Tham gia Threads để chia sẻ ý tưởng, đặt câu hỏi, đăng những suy nghĩ bất chợt và hơn thế nữa.",
      icon: (
        <FontAwesomeIcon icon={faPlus} className="text-destructive h-12 w-12" />
      ),
    },
  },
  {
    id: "4",
    to: "/activity",
    icon_regular: <FontAwesomeIcon icon={farHeart} />,
    icon_solid: <FontAwesomeIcon icon={fasHeart} />,
    tooltip: "Thông báo",
    requiresAuth: true,
    modalInfo: {
      title: "Đăng ký để xem hoạt động",
      description:
        "Tham gia Threads để xem ai đã thích, đăng lại và trả lời bài viết của bạn.",
      icon: (
        <FontAwesomeIcon
          icon={fasHeart}
          className="text-destructive h-12 w-12"
        />
      ),
    },
  },
  {
    id: "5",
    to: "/user",
    icon_regular: <FontAwesomeIcon icon={farUser} />,
    icon_solid: <FontAwesomeIcon icon={fasUser} />,
    tooltip: "Trang cá nhân",
    requiresAuth: true,
    modalInfo: {
      title: "Đăng ký để xem hồ sơ",
      description:
        "Tham gia Threads để tạo trang cá nhân, theo dõi người khác và chia sẻ bài viết.",
      icon: (
        <FontAwesomeIcon
          icon={fasUser}
          className="text-destructive h-12 w-12"
        />
      ),
    },
  },
];

function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useCurrentUser(); // Lấy user từ Redux store

  // --- STATE CHO MODAL ---
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    description: "",
    icon: null,
  });

  // State cho Dropdown menu
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // --- HÀM XỬ LÝ CLICK MỞ MODAL KHI CHƯA LOGIN---
  const handleItemClick = (e, item) => {
    // Nếu mục này cần đăng nhập VÀ user chưa đăng nhập
    if (item.requiresAuth && !currentUser) {
      // Chặn chuyển trang (quan trọng!)
      // Mặc định SidebarItem sử dụng to trong thẻ NavLink để chuyển trang
      // Cần dùng preventDefault để chặn hành động mặc định đó
      e.preventDefault();

      // Set nội dung modal theo item
      setModalContent(item.modalInfo);
      // Mở modal
      setShowLoginModal(true);
    } else {
      // Nếu đã login hoặc trang public thì SidebarItem (Link) tự chạy
      if (item.id === "3" && currentUser) {
        e.preventDefault();

        // Xử lý trường hợp bấm tạo bài viết khi đã đăng nhập ở đây
        console.log("Open create post dialog");
      }
    }
  };

  // Xử lý logout
  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.log(error);
    } finally {
      localStorage.clear();
      dispatch(setCurrentUser(null));
      navigate("/login");
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 flex h-full w-20 flex-col items-center justify-between pr-1 pl-1">
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
              // Truyền hàm xử lý click vào component con
              onClick={(e) => handleItemClick(e, item)}
            />
          ))}
        </div>

        <Dropdown
          onLogout={handleLogout}
          open={isDropdownOpen}
          onOpenChange={setIsDropdownOpen}
          children={
            <div className="group mb-5 flex cursor-pointer flex-col gap-1.5 p-4 transition-transform active:scale-95">
              <div
                className={`group-hover:bg-foreground h-[3px] w-5 transition-colors ${
                  isDropdownOpen ? "bg-foreground" : "bg-muted-foreground"
                }`}
              ></div>
              <div
                className={`group-hover:bg-foreground h-[3px] w-3 transition-colors ${
                  isDropdownOpen ? "bg-foreground" : "bg-muted-foreground"
                }`}
              ></div>
            </div>
          }
        />
      </div>

      {/* --- MODAL LOGIN --- */}
      <LoginPromptModal
        open={showLoginModal}
        onOpenChange={setShowLoginModal}
        icon={modalContent.icon}
        title={modalContent.title}
        description={modalContent.description}
      />
    </>
  );
}

export default Sidebar;
