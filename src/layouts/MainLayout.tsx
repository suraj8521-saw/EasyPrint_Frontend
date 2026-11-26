import { Outlet } from "react-router-dom";

import PageBackground from "../shared/pageBackground/PageBackground";
import Navbar from "../shared/navbar/Navbar";
import Footer from "../ui/footer/Footer";

const MainLayout = () => {
  return (
    <PageBackground className="text-slate-900 selection:bg-blue-600 selection:text-white dark:text-slate-100">
      {/* Common Top Navbar */}
      <Navbar />

      {/* Dynamic Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Common Bottom Footer */}
      <Footer />
    </PageBackground>
  );
};

export default MainLayout;