import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./authContext";
import axios from "axios";
const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [userDetails, setUserDetails] = useState(null);
  // const host = process.env.REACT_APP_API_HOST || "localhost";
  // const port = process.env.REACT_APP_API_PORT || "4000";

  const fetchUserDetails = async () => {
    try {
      // const url = "http://192.168.100.201:5000/api/user/profile";
      // const url = `http://${host}:${port}/api/user/profile`;
      const url = "/api/user/profile";
      const response = await axios.get(
        url, {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      );
      console.log(response.data);
      setUserDetails(response.data);
    } catch (error) {
      console.log("Error fetching user details in profile", error);
    }
  };


  useEffect(() => {
    if (isAuthenticated) {
      fetchUserDetails();
    }
  }, [isAuthenticated]);

  return (
    <ProfileContext.Provider value={{ isAuthenticated, userDetails, refreshUserDetails: fetchUserDetails }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  return useContext(ProfileContext);
};