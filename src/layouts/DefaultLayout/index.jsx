import { Outlet } from "react-router"
import Sidebar from "./components/Sidebar"

function DefaultLayout() {
    return (
        <div>
            <Sidebar />
            <Outlet />
        </div>
    )
}

export default DefaultLayout
