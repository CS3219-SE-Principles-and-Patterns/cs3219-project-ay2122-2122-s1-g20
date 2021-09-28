import React, { useState } from "react";
import { Link } from "react-router-dom";

const SetProfilePicPage = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState("");
  const fileTypes = ["image/png", "image/jpeg"];

  console.log("converted", profilePic);

  const handleUpload = () => {
    document.getElementById("selectedFile").click();
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      if (fileTypes.every((type) => img.type !== type)) {
        setProfilePic(null);
        setError(
          `'${img.type
            .split("/")[1]
            .toUpperCase()}' is not a supported format. Only 'PNG' and 'JPEG' are supported.`
        );
      } else {
        setError("");
        setProfilePic(URL.createObjectURL(img));
      }
    }
  };

  return (
    <div className="max-w-7xl mt-10 mb-10 flex flex-col h-full justify-center items-center w-full mx-auto">
      <div className="text-3xl sm:text-4xl font-bold pt-7">
        Upload your profile picture
      </div>
      <img
        className={
          !profilePic
            ? "hidden"
            : "rounded-full h-80 w-80 flex items-center justify-center mt-6"
        }
        src={profilePic}
      />

      {error ? (
        <p className="text-base text-sm md:text-xl text-red-warning pt-7">
          {error}
        </p>
      ) : null}
      <div>
        <span className="space-y-6 mr-5">
          <input
            className="hidden"
            type="file"
            id="selectedFile"
            onChange={handleImageChange}
          />
          <button
            className="text-base font-medium w-28 rounded-md py-2 bg-yellow-dark shadow-sm hover:bg-opacity-75"
            onClick={handleUpload}
          >
            Upload
          </button>
        </span>

        {profilePic ? (
          <Link to="/addModules">
            <button
              // onClick => upload to cloudinary, button loads
              type="submit"
              className="text-base w-28 font-medium rounded-md py-2 bg-yellow-dark shadow-sm hover:bg-opacity-75"
            >
              Next
            </button>
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default SetProfilePicPage;
