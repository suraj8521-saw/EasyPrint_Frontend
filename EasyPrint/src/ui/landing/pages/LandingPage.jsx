import PageBackground from "../../../shared/PageBackGround";
import Navbar from "../../../ui/navbar/Navbar";

import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import HowItWorksSection from "../components/HowItWorksSection";
import FeedbackSection from "../components/FeedbackSection";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <PageBackground>
      {/* <Navbar /> */}
      <main className="min-h-screen overflow-x-clip text-slate-900 dark:text-white">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <FeedbackSection />
        <Footer />
      </main>
    </PageBackground>
  );
};

export default LandingPage;
