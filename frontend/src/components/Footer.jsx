import React from "react";

const Footer = () => {
  return (
    <div className="bg-gradient-to-r from-[#1B57E9] via-[#3B82F6] to-[#60A5FA]">
      <footer className="bg-gradient-to-r from-[#1B57E9] via-[#3B82F6] to-[#60A5FA] text-white shadow-inner backdrop-blur-sm border-b">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <a
              className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
            >
              <img
                src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%234f46e5' rx='20'/><text x='50%25' y='50%25' dominant-baseline='central' text-anchor='middle' font-size='50' font-weight='bold' fill='white'>CR</text></svg>"
                className="h-8"
                alt="CR Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap ">
                ConnectRTC
              </span>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0 ">
              <li>
                <a href="#" className="hover:underline me-4 md:me-6 hover:text-[#1B57E9]">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6 hover:text-[#1B57E9]">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6 hover:text-[#1B57E9]">
                  Licensing
                </a>
              </li>
              <li>
                <a href="#" 
                className="hover:underline
                 hover:text-[#F3F4F6]"
                 >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <hr className="my-6  sm:mx-auto border-white lg:my-8" />
          <span className="block text-sm  sm:text-center text-white">
            © 2025{" "}
            <a className="hover:underline hover:text-pink-600 ">
              ConnectRTC 1.3.1{" "}
            </a>
              All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;