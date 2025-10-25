import React from 'react'
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { Button, ButtonBase, Card, CardContent, CardHeader, } from "@mui/material";
import wallpaper from "/src/assets/wallpaper.png"
import { Rocket, Users, File, MonitorSmartphone } from "lucide-react";
import TextType from './TextType';
import ShinyText from './ShinyText';


function FeatureCard({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg bg-white/10 p-6 shadow-lg backdrop-blur-md border border-white/20 hover:bg-[#60A5FA]">
      <div>{icon}</div>
      <h2 className="text-white text-lg font-bold">{title}</h2>
      <p className="text-white/80 text-sm text-center">{description}</p>
    </div>
  );
}

const HeroSection = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  return (
    <section
      className="relative flex flex-col items-center justify-center pt-26 min-h-[100vh] w-full mt-10"
      style={{
        backgroundImage: `
          linear-gradient(135deg, rgba(55, 65, 81, 0.85) 0%, rgba(31, 41, 55, 0.85) 100%),
          url(${wallpaper})
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        marginTop:'60px'
      }}
    >
      {/* Hero Content */}
      <div className="flex flex-col items-center text-center gap-6 px-4 py-12 z-10">
        <Rocket size={56} className="text-white mb-4 drop-shadow-lg" />

        <ShinyText text="Connect with friends and family effortlessly!" disabled={false} speed={3} className='custom-class' />
        {/* <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
          Connect with friends and family effortlessly
        </h1> */}
        <TextType
          text={["Experience seamless communication with our user-friendly chat application, designed to keep you connected across all your devices.", " "]}
          // text={["Experience seamless communication with our user-friendly chat application,",
          //    "designed to keep you connected", "across all your devices!"]}
          typingSpeed={75}
          pauseDuration={1500}
          showCursor={true}
          cursorCharacter="|"
        />
        {/* <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto drop-shadow">
          Experience seamless communication with our user-friendly chat application, designed to keep you connected across all your devices.
        </p> */}
        <button className="mt-2 px-5 py-3 bg-white/10  text-white font-semibold rounded-lg shadow-lg transition hover:bg-[#1746b0]"
        onClick={ () =>  navigate(isAuthenticated ? '/chathome' : '/login') }
        >
         
          {isAuthenticated ?  'Get Started' : 'Login' }
        </button>
      </div>

      {/* Cards Section */}
      <div className="w-full flex justify-center mt-8 z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full p-4">
          <FeatureCard
            icon={<Users size={32} className="text-white" />}
            title="Group Chats"
            description="Create and manage group chats with ease, allowing you to stay in touch with multiple people simultaneously."
          />
          <FeatureCard
            icon={<File size={32} className="text-white" />}
            title="File Sharing"
            description="Share documents, photos, and videos effortlessly within your chats, making collaboration and sharing memories simple."
          />
          <FeatureCard
            icon={<MonitorSmartphone size={32} className="text-white" />}
            title="Cross-Device Sync"
            description="Access your chats and messages seamlessly across all your devices, ensuring you never miss a conversation."
          />
        </div>
      </div>

      {/* Optional: Overlay for extra darkness */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-gray-800/80 to-gray-900/80 z-0"></div> */}
    </section>
  );
}

export default HeroSection
