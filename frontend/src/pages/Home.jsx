import Hero from "../components/Hero";
import { useAuth } from "../context/authContext";
import LandingNav from "../components/LandingNav";
import Footer from "../components/Footer";
import Features from "../components/Features";
import Payments from "../components/Payments";
import CustomerLogos from "../components/CustomerLogos";
import Dashboard from "../components/Dashboard";
import LetterGlitch from "../components/LetterGlitch";
import HeroSection from "../components/HeroSection";

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="bg-dark">
      {/* <Dashboard/> */}
      <LandingNav />
      {/* <LetterGlitch /> */}
      <HeroSection/>
      
      {/* <Hero /> */}
      {/* <Features /> */}
      {/* <Payments /> */}
      {/* <CustomerLogos /> */}
      <Footer />
    </div>
  );
};

export default Home;