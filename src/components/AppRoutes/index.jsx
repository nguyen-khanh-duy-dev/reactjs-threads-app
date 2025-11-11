import { HashRouter, Route, Routes } from "react-router";

// Layouts
import DefaultLayout from "@/layouts/DefaultLayout";
import AuthLayout from "@/layouts/AuthLayout";

// Pages
import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import Activity from "@/pages/Activity";
import User from "@/pages/User";

function AppRoutes() {
  return (
    <HashRouter>
      <Routes>
        {/* Default layout */}
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/user" element={<User />} />
        </Route>

        {/* Auth layout */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default AppRoutes;
