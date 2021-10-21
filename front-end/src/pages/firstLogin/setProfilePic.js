import React from "react";
import ProfilePic from "../../components/profile/ProfilePic";

const SetProfilePicPage = () => {
  return (
    <div className="max-w-7xl mt-10 mb-10 flex flex-col h-full justify-center items-center w-full mx-auto">
      <div className="text-3xl sm:text-4xl font-bold pt-7">
        Upload your profile picture
      </div>
      <ProfilePic
        size="80"
        uploadButton="Upload"
        doneButton="Next"
        nextPage="/addModules"
      />
    </div>
  );
};

export default SetProfilePicPage;
