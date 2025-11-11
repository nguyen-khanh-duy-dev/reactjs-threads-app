import { Outlet } from "react-router";
import Sidebar from "./components/Sidebar";

function DefaultLayout() {
  return (
    <div className="h-screen">
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default DefaultLayout;
