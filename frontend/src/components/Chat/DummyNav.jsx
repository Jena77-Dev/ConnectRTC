import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { LogOut } from 'lucide-react';
import { MessageSquareText } from 'lucide-react';
import { UserRound } from 'lucide-react';
import { Tooltip } from "@mui/material";
import { LayoutDashboard } from 'lucide-react';
import { useProfile } from "../../context/profileContext";
const DummyNav = () => {
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
          <Link
            to="/"
            className="flex gap-2 items-center justify-center pb-2 mb-4 border-gray-600"
          >
            <LayoutDashboard className="w-14 h-14 rounded-full object-cover p-2 border-2 border-white/20
             hover:border-white/40 transition-colors" />
            {/* <img
              src="src/assets/facebook-messenger-3.svg"
              className="h-8"
              alt="Swift Logo"
            /> */}
            {/* <img
              src="src/assets/google-messages-1-.svg"
              className="h-8"
              alt="google messages"
            /> */}
            {/* <span className="font-semibold text-xl mr-2">CA3</span> */}
          </Link>
          <nav className="h-full flex flex-col my-4 justify-between font-medium pl-0 ml-0">
            <div className="flex flex-col gap-5 ">
              <Link to="/profile" className="flex items-center justify-center">
                {userDetails?.avatarLink ? (
                  <img
                    src={userDetails.avatarLink}
                    alt="Profile Avatar"
                    // className="w-6 h-6 rounded-full object-cover"
                    // className="w-6 h-6 rounded-full object-cover ring-2 ring-gray-500"
                    className="w-14 h-14 rounded-full object-cover border-2 border-white/20 hover:border-white/40 transition-colors"
                  />
                ) : (

                  <UserRound
                    className="w-14 h-14 p-2 rounded-full object-cover border-2 border-white/20 hover:border-white/40 transition-colors"
                  />
                  // <svg
                  //   xmlns="http://www.w3.org/2000/svg"
                  //   fill="none"
                  //   viewBox="0 0 24 24"
                  //   strokeWidth={1.5}
                  //   stroke="currentColor"
                  //   className="w-6 h-6"
                  // >
                  //   <path
                  //     strokeLinecap="round"
                  //     strokeLinejoin="round"
                  //     d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  //   />
                  // </svg>
                )}
                {/* <span>Profile</span> */}
              </Link>
              <Link to="/chathome" className="flex items-center justify-center">
                {/* <img
                  src="src/assets/google-messages-1-.svg"
                  alt="Messages Icon"
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-500 hover:ring-white/40 transition-colors"
                /> */}
                <MessageSquareText className="w-14 h-14 rounded-full object-cover p-2 border-2 border-white/20 hover:border-white/40 transition-colors" />
                {/* <svg
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
                    d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                  />
                </svg> */}
                {/* <span>Chats</span> */}
              </Link>
            </div>
            <Tooltip title="Logout" placement="bottom" arrow>
              <Link className="flex items-center justify-center mb-10 lg:mb-12 md:mb-10 sm:mb-12">
                {/* <svg
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
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                />
              </svg> */}

                <LogOut className="w-14 h-14 rounded-full object-cover p-2 border-2 border-white/20 hover:border-white/40 transition-colors"
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

export default DummyNav;