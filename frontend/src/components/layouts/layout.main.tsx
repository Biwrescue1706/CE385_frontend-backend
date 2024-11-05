import { Outlet } from "react-router-dom";
import NavbarMain from "./navbars/navbar.main";
import SidebarMain from "./sidebars/sidebar.main";

const MainLayout = () => {
  

  return (
    <div className=" h-screen">
      <Outlet />
    </div>
  );
};

export default MainLayout;
