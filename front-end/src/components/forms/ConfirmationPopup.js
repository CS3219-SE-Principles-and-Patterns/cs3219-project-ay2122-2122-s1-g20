import { VscChromeClose } from "react-icons/vsc";
import Popup from "reactjs-popup";
import React from "react";
import PropTypes from "prop-types";
import YellowButton from "../YellowButton";

const ConfirmationPopup = ({ title, onClick, text, open, setOpen }) => {
  return (
    <div className="w-10">
      <Popup open={open} modal closeOnDocumentClick={false} lockScroll={false}>
        <div className="bg-blue-dark p-10 rounded-2xl">
          <button
            className="bg-purple-dark text-white mr-2 mt-2 absolute top-1 right-1 p-2 rounded-full"
            onClick={() => {
              setOpen(false);
            }}
          >
            <VscChromeClose />
          </button>
          <p className="text-3xl font-semibold text-grey-whitetinge">{title}</p>

          <p className="text-xl font-medium text-grey-whitetinge">{text}</p>

          <div className="flex justify-center gap-x-3 mt-6">
            <YellowButton
              text="Yes"
              onClick={onClick}
              textSize="text-lg"
              px="px-8"
            />
            <YellowButton
              text="No"
              onClick={() => setOpen(false)}
              textSize="text-lg"
              px="px-8"
              color="bg-grey-light"
            />
          </div>
        </div>
      </Popup>
    </div>
  );
};

ConfirmationPopup.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  onClick: PropTypes.func,
};

export default ConfirmationPopup;
