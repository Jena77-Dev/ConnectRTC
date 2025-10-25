import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { LogOut } from 'lucide-react';
import { MessageSquareText } from 'lucide-react';
import { UserRound } from 'lucide-react';
import { Tooltip } from "@mui/material";
import { LayoutDashboard } from 'lucide-react';
import { Settings } from 'lucide-react';
import { useProfile } from "../../context/profileContext";
const Nav = () => {
  const { logout, isAuthenticated } = useAuth();
  const [isMobile, setIsMobile] = useState(true);
  const navigate = useNavigate();
  const { userDetails } = useProfile();

  useEffect(() => {
    if (userDetails && userDetails.avatarLink) {
      // Set the selected link to the user's avatar if it exists in the fetched avatars
      // const matchingAvatar = avatars.find(avatar => avatar.link === userDetails.avatarLink);
      // if (matchingAvatar) {
      //   setSelectedLink(userDetails.avatarLink);
      // }
    }
  }, [userDetails]);


  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);
  return (
    <>
      <button
        onClick={() => setIsMobile(!isMobile)}
        className="flex fixed bottom-5 h-10 w-10 lg:hidden ml-8 justify-center items-center bg-dark transform -translate-x-1/2 z-50 ring-2 ring-gray-500 rounded-lg text-gray-200 lg:h-14"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
      {isMobile && (
        <header className="fixed h-screen w-[150px] z-40 lg:static lg:w-[80px] lg:min-w-[80px] md:w-[70px]
         md:min-w-[70px] sm:w-[60px] sm:min-w-[60px] text-white bg-dark flex flex-col px-2 py-4 
         justify-between border-r border-gray-700">
          <Tooltip title="Dashboard" placement="bottom" arrow>
            <Link
              to="/"
              className="flex gap-2 items-center justify-center mb-4 border-gray-600"
            >
              <LayoutDashboard className="w-14 h-14 rounded-full object-cover p-2 border-2 border-white/20
             hover:border-white/40 transition-colors" />
            </Link>
          </Tooltip>
          <nav className="h-full flex flex-col my-4 justify-between font-medium pl-0 ml-0">
            <div className="flex flex-col gap-5 ">
              <p></p>
              <p></p>
              <Tooltip title="Profile" placement="bottom" arrow>
                <Link to="/user-profile" className="flex items-center justify-center">
                  {userDetails?.avatarLink ? (
                    <img
                      src={userDetails.avatarLink}
                      alt="Profile Avatar"
                      className="w-14 h-14 rounded-full object-cover border-2
                     border-white/20 hover:border-white/40 transition-colors"
                    />
                  ) : (
                    <UserRound
                      className="w-14 h-14 p-2 rounded-full object-cover border-2 border-white/20 hover:border-white/40 transition-colors"
                    />
                  )}
                  {/* <span>Profile</span> */}
                </Link>
              </Tooltip>

              <Tooltip title="Chats" placement="bottom" arrow>
                <Link to="/chathome" className="flex items-center justify-center">
                  <MessageSquareText className="w-14 h-14 rounded-full object-cover 
                p-2 border-2 border-white/20 hover:border-white/40 transition-colors" />
                  {/* <span>Chats</span> */}
                </Link>
              </Tooltip>

              <Tooltip title="Settings" placement="bottom" arrow>
                {/* <Link to="/profile" className="flex items-center justify-center cursor-not-allowed pointer-events-none"> */}
                <Link to="/profile" className="flex items-center justify-center">
                  <Settings className="w-14 h-14 rounded-full object-cover p-2 border-2 border-white/20
                   hover:border-white/40 transition-colors" />
                  {/* <span>Settings</span> */}
                </Link>
              </Tooltip>
            </div>
            <Tooltip title="Logout" placement="bottom" arrow>
              <Link className="flex items-center justify-center mb-10 lg:mb-12 md:mb-10 sm:mb-12">
                <LogOut className="w-14 h-14 rounded-full object-cover p-2 border-2 border-white/20
                 hover:border-white/40 transition-colors"
                  onClick={logout}
                />
                {/* <button onClick={logout}>Logout</button> */}
              </Link>
            </Tooltip>
          </nav>
        </header>
      )}
    </>
  );
};

export default Nav;