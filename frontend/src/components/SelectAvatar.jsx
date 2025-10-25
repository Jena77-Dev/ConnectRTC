import React, { useEffect, useState } from "react";
import axios from "axios";
import { useProfile } from "../context/profileContext";

const SelectAvatar = ({ setSelectedLink, selectedLink }) => {
  // console.log(selectedLink)
  const [avatars, setAvatars] = useState([]);
  const { userDetails } = useProfile();
  // const host = process.env.REACT_APP_API_HOST || "localhost";
  // const port = process.env.REACT_APP_API_PORT || "4000";
  // console.log("profile: ", userDetails);
  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        // const url ="http://192.168.100.201:5000/api/avatar/all";
        // const url = `http://${host}:${port}/api/avatar/all`;
        const response = await axios.get("/api/avatar/all");
        
        // const response = await axios.get(url, {
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        // });
        console.log(response.data.avatars);
        setAvatars(response.data.avatars);
      } catch (error) {
        console.error("Error fetching avatars:", error);
      }
    };

    fetchAvatars();
  }, []);

  useEffect(() => {
    if (userDetails && userDetails.avatarLink && avatars.length > 0) {

      // Set the selected link to the user's avatar if it exists in the fetched avatars
      const matchingAvatar = avatars.find(avatar => avatar.link === userDetails.avatarLink);
      if (matchingAvatar) {
        setSelectedLink(userDetails.avatarLink);
      }
    }
  }, [userDetails,avatars , setSelectedLink]);

  return (
    <div className="mt-3">
      <p className="block mb-2 text-lg font-medium  text-white">
        Choose Avatar
      </p>
      <div className="grid grid-cols-4 gap-2 mb-7">
        {avatars?.map((avatar) => (
          <img
            key={avatar._id}
            src={avatar.link}
            onClick={() => setSelectedLink(avatar.link)}
            alt={`Avatar ${avatar._id}`}
            style={{ width: "90px", height: "90px", margin: "5px" }}
            // className={`rounded-full cursor-pointer  p-2 bg-primarySecond hover:outline outline-white ${
            //   selectedLink === avatar.link ? "outline" : ""
            // }`}
             className={`rounded-full cursor-pointer p-2 bg-primarySecond hover:outline outline-green-500 ${
              selectedLink === avatar.link ? "outline" : ""
            }`}

            //  className={`rounded-full cursor-pointer p-2 bg-primarySecond hover:outline hover:outline-green-500 ${
            //     selectedLink === avatar.link ? "outline-2 outline-green-500" : ""
            //   }`}
          />
        ))}
      </div>
    </div>
  );
};

export default SelectAvatar;