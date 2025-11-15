import { Outlet } from "react-router";
import Sidebar from "./components/Sidebar";
import AddButton from "./components/AddButton";
import ThemeToggle from "./components/Sidebar/ThemeToggle";

function DefaultLayout() {
  return (
    <div className="relative flex h-screen">
      <Sidebar />
      <Outlet />
      <div className="fixed right-6 bottom-6">
        <AddButton />
      </div>
    </div>
  );
}

export default DefaultLayout;
