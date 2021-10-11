import React, { useState, useContext, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { AccountContext } from "../../context/AccountContext";
import { api } from "../../utils/api";
import YellowButton from "../YellowButton";

const ProfilePic = ({ uploadButton, doneButton, nextPage, size }) => {
  const { profilePic, setProfilePic } = useContext(AccountContext);
  const [error, setError] = useState("");
  const [isEditable, setIsEditable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const fileTypes = ["image/png", "image/jpeg"];

  const history = useHistory();
  const handleOnClick = useCallback(
    () => history.push(nextPage && !isLoading ? nextPage : "#"),
    [history]
  );

  const handleUpload = () => {
    document.getElementById("selectedFile").click();
  };

  const handleDone = async () => {
    // => upload to cloudinary, button loads
    setIsLoading(true);
    await api
      .post("/profile/profilePic", { profilePic })
      .then((res) => setProfilePic(res.data.profilePic))
      .catch((err) => console.log(err));
    handleUploadDone();
  };

  const handleUploadDone = () => {
    setIsEditable(false);
    setIsLoading(false);
    handleOnClick();
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
        var FR = new FileReader();
        FR.addEventListener("load", function (e) {
          setProfilePic(e.target.result);
        });
        FR.readAsDataURL(img);
        setIsEditable(true);
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
      <div className="flex flex-row flex-wrap space-x-4 mb-3">
        <span>
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
          <YellowButton
            text={doneButton}
            onClick={handleDone}
            textSize="text-sm"
            px="px-4"
            isLoading={isLoading}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ProfilePic;
