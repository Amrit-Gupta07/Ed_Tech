import React from "react";
import ChangeProfilePicture from "./ChangeProfilePicture";
import EditProfile from "./EditProfile";
import UpdatePassword from "./UpdatePassword";

const Settings = () => {
  return (
    <>
      <h1 className="text-3xl font-medium text-richblack-50 mb-14">
        Edit Profile
      </h1>
      <ChangeProfilePicture/>
      <EditProfile/>
      <UpdatePassword/>
    </>
  );
};

export default Settings;
