// src/pages/home/Home.tsx
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import HowItWorksSection from "../components/HowItWorksSection";
import FeedbackSection from "../components/FeedbackSection";


const Home = () => {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <FeedbackSection/>
    </>
  );
};

export default Home;