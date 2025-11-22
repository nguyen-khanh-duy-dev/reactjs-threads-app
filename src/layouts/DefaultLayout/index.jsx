import { Outlet } from "react-router";
import Sidebar from "./components/Sidebar"; // Cột 1 (Trái)
// import RightPanel from "./components/RightPanel"; // Cột 3 (Phải)
import AddButton from "./components/AddButton";

function DefaultLayout() {
  return (
    <div className="relative">
      <div className="fixed top-0 left-0 h-screen w-20">
        <Sidebar />
      </div>

      <main className="ml-20 flex justify-center ">
        <Outlet />
      </main>

      {/* Nút AddButton vẫn fixed */}
      <div className="fixed right-6 bottom-6">
        <AddButton />
      </div>
    </div>
  );
}

export default DefaultLayout;
