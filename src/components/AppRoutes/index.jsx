import AuthLayout from "@/layouts/AuthLayout"
import DefaultLayout from "@/layouts/DefaultLayout"
import Login from "@/pages/Auth/Login"
import Register from "@/pages/Auth/Register"
import Home from "@/pages/Home"
import { HashRouter, Route, Routes } from "react-router"

function AppRoutes() {
    return (
        <HashRouter>
            <Routes>
                {/* Default layout */}
                <Route element={<DefaultLayout />}>
                    <Route path="/" element={<Home />} />
                </Route>

                {/* Auth layout */}
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>
            </Routes>
        </HashRouter>
    )
}

export default AppRoutes
