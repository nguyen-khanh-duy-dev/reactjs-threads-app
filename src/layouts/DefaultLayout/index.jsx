import { useState } from "react";
import { Outlet } from "react-router";

import Sidebar from "./components/Sidebar";
import AddButton from "./components/AddButton";
import { useCurrentUser } from "@/features/auth";
import AddNewPostModal from "@/components/AddNewPostModal";

function DefaultLayout() {
  const currentUser = useCurrentUser();

  const [showPostModal, setShowPostModal] = useState(false);

  const handleOpenModal = () => {
    setShowPostModal(true);
  };

  return (
    <div className="relative">
      <div className="fixed top-0 left-0 h-screen w-20">
        <Sidebar />
      </div>

      <main className="ml-20 flex justify-center">
        <Outlet />
      </main>

      {/* Nút AddButton vẫn fixed */}
      {currentUser ? (
        <>
          <div className="fixed right-6 bottom-6" onClick={handleOpenModal}>
            <AddButton />
          </div>

          <AddNewPostModal
            open={showPostModal}
            onOpenChange={setShowPostModal}
            isModal={false}
            onInteractOutside={(e) => {
              e.preventDefault();
            }}
          />
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default DefaultLayout;
