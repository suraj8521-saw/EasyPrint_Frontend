import { Outlet } from "react-router-dom";

import Navbar from "../ui/navbar/Navbar";
import PageBackground from "../shared/PageBackGround";

const AuthLayout = () => {
  return (
    <PageBackground>
      <div className="flex min-h-screen flex-col">
        <Navbar variant="account" />
        <Outlet />
      </div>
    </PageBackground>
  );
};

export default AuthLayout;