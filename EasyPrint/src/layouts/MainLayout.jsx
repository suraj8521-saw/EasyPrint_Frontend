
import { Outlet } from "react-router-dom";

import Navbar from "../ui/navbar/Navbar";
import PageBackground from "../shared/PageBackGround";

const MainLayout = () => {
  return (
    <PageBackground>
      {/* Dynamic Page Content */}
      <main className="relative min-h-screen">
        <Outlet />
      </main>
    </PageBackground>
  );
};

export default MainLayout;
