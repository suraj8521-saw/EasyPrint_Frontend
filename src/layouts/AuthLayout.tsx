import { Outlet } from "react-router-dom";

import Navbar from "../shared/navbar/Navbar";
import PageBackground from "../shared/pageBackground/PageBackground";

const AuthLayout = () => {
  return (
    <PageBackground>
      <div className="flex min-h-screen flex-col overflow-x-clip">
        <Navbar variant="account" />
        <Outlet />
      </div>
    </PageBackground>
  );
};

export default AuthLayout;