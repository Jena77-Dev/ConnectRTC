import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./Chat/Nav";
import { useProfile } from "../context/profileContext";
import SelectAvatar from "./SelectAvatar";
import { toast } from  "react-hot-toast";


const Profile = () => {
  const { userDetails, refreshUserDetails } = useProfile();
  // console.log(userDetails);

  const [formData, setFormData] = useState({
  firstName: "",
  lastName: "",
  email: "",
  bio: "",
  });
  const [selectedLink, setSelectedLink] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    // setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // const response = await axios.put("http://192.168.100.201:5000/api/user/profile/update", {
      const response = await axios.put("/api/user/profile/update", {
        ...formData,
        avatarLink: selectedLink,
      });

      // Handle successful response (you may want to update state or show a success message)
      console.log(response.data);
      if (response.status == 200) {
        toast.success(response.data.message);
        // ✅ Refresh the context immediately
        refreshUserDetails();  // 🔥 This re-fetches user data for the context
      }
    } catch (error) {
      // Handle error (you may want to show an error message)
      console.error(error);
    }
  };
  useEffect(() => {
    setFormData(userDetails);
  },[userDetails]);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Nav />
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          <div className="min-h-full flex items-center justify-center p-4">
            <div className="max-w-xl w-full my-8">
              <h2 className="mb-4 text-2xl font-bold text-white">Update Profile</h2>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                  <div className="w-full">
                    <label
                      htmlFor="firstName"
                      className="block mb-2 text-sm font-medium text-white"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      className="border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                      value={formData?.firstName}
                      placeholder="First Name"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="lastName"
                      className="block mb-2 text-sm font-medium text-white"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      className="border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                      value={formData?.lastName}
                      placeholder="Last Name"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-white"
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      disabled
                      className="border text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-400 ring-primary-500"
                      value={userDetails?.email}
                      placeholder="Email"
                      required
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="bio"
                      className="block mb-2 text-sm font-medium text-white"
                    >
                      Bio
                    </label>
                    <input
                      type="text"
                      name="bio"
                      id="bio"
                      className="border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                      value={formData?.bio}
                      placeholder="e.g., I am a software developer..."
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <SelectAvatar
                  setSelectedLink={setSelectedLink}
                  selectedLink={selectedLink}
                />
                <div className="flex items-center space-x-4 mt-6">
                  <button
                    type="submit"
                    className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-primary-800"
                  >
                    Update Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};

export default Profile;