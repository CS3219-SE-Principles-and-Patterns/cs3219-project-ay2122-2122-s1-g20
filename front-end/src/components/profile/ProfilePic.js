import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AccountContext } from "../../context/AccountContext";
import YellowButton from "../YellowButton";

const ProfilePic = ({ uploadButton, doneButton, nextPage, size }) => {
  const { profilePic, setProfilePic } = useContext(AccountContext);
  const [error, setError] = useState("");
  const [isEditable, setIsEditable] = useState(true);
  const fileTypes = ["image/png", "image/jpeg"];

  const handleUpload = () => {
    document.getElementById("selectedFile").click();
  };

  const handleDone = () => {
    // => upload to cloudinary, button loads
    // after await, call this
    setIsEditable(false);
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
    <div className="max-w-7xl flex flex-col justify-center items-center w-full mx-auto space-y-10">
      <img
        className={
          !profilePic
            ? "hidden"
            : `rounded-full h-${size} w-${size} flex items-center justify-center mt-10`
        }
        src={profilePic}
      />

      {error ? (
        <p className="text-sm md:text-xl text-red-warning pt-10">{error}</p>
      ) : null}
      <div className="flex flex-row flex-wrap space-x-4">
        <span className="mb-3">
          <input
            className="hidden"
            type="file"
            id="selectedFile"
            onChange={handleImageChange}
          />
          <YellowButton
            text={uploadButton}
            onClick={handleUpload}
            textSize="text-sm"
            px="px-4"
          />
        </span>

        {profilePic && isEditable ? (
          <Link to={nextPage ? nextPage : "#"}>
            <YellowButton
              text={doneButton}
              onClick={handleDone}
              textSize="text-sm"
              px="px-4"
            />
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default ProfilePic;
