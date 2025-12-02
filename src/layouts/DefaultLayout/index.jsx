import { useState } from "react";
import { Outlet } from "react-router";

import Sidebar from "./components/Sidebar";
import AddButton from "./components/AddButton";
import { useCurrentUser } from "@/features/auth";
import AddNewPostModal from "@/components/AddNewPostModal";

function DefaultLayout() {
  const currentUser = useCurrentUser();

  // Chỉ cần 1 state duy nhất để biết Modal đang mở hay đóng
  const [isShowPostModal, setIsShowPostModal] = useState(false);

  const handleOpenModal = () => {
    setIsShowPostModal(true);
  };

  return (
    <div className="relative">
      <div className="fixed top-0 left-0 h-screen w-20">
        <Sidebar />
      </div>

      <main className="ml-20 flex justify-center">
        <Outlet />
      </main>

      {/* LOGIC HIỂN THỊ: Chỉ chạy khi có currentUser */}
      {currentUser && (
        <>
          {/* Chỉ hiện khi Modal ĐANG ĐÓNG (!isShowPostModal) */}
          {!isShowPostModal && (
            <div
              className="fixed right-6 bottom-6 z-50 cursor-pointer"
              onClick={handleOpenModal}
            >
              <AddButton />
            </div>
          )}

          {/* 2. MODAL */}
          <AddNewPostModal
            open={isShowPostModal}
            onOpenChange={setIsShowPostModal} // Khi đóng modal, nó sẽ set lại false -> Nút Add tự hiện lại
            currentUser={currentUser}
            // modal={false}: Để vẫn thao tác được với nền bên dưới
            // override vị trí để nó hiện ngay góc phải dưới (chỗ nút Add)
            className="fixed top-auto right-6 bottom-6 left-auto translate-x-0 translate-y-0"
          />
        </>
      )}
    </div>
  );
}

export default DefaultLayout;
