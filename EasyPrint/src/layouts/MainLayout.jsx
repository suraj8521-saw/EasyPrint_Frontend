import { Outlet, useLocation } from "react-router-dom";

import Navbar from "../ui/navbar/Navbar";
import PageBackground from "../shared/PageBackGround";

const MainLayout = () => {
  const location = useLocation();

  const isAccountPage =
    location.pathname === "/account-selection";

  return (
    <PageBackground>
      <Navbar variant={isAccountPage ? "account" : "main"} />

      <Outlet />
    </PageBackground>
  );
};

export default MainLayout;