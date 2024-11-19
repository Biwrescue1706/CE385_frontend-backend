import { Outlet } from "react-router-dom";
import NavbarMain from "./navbars/navbar.main";
import SidebarMain from "./sidebars/sidebar.main";
import { useEffect } from "react";
import { getAuthStatus } from "@/services/auth.service";
import { useNavigate } from "react-router-dom";

const MainLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    getAuthStatus()
      .then((response) => {
        if (response.statusCode === 401) {
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error("Error checking authentication status : ", error.message);
      });
  }, [navigate]);

  return (
    <div className=" h-screen">
      <Outlet />
    </div>
  );
};

export default MainLayout;
