import { VscChromeClose } from "react-icons/vsc";
import Popup from "reactjs-popup";
import React from "react";
import PropTypes from "prop-types";
import YellowButton from "../YellowButton";
import TimeRangeSlider from "react-time-range-slider";

const ConfirmationPopup = ({
  title,
  onClick,
  text,
  open,
  setOpen,
  isLoading,
}) => {
  return (
    <div className="w-10">
      <Popup open={open} modal closeOnDocumentClick={false} lockScroll={true}>
        <div className="bg-blue-dark px-32 py-10rounded-2xl">
          <button
            className="bg-purple-dark text-white mr-2 mt-2 absolute top-1 right-1 p-1 rounded-full"
            onClick={() => {
              setOpen(false);
            }}
          >
            <VscChromeClose />
          </button>
          <p className="text-3xl font-semibold text-grey-whitetinge mb-5">
            {title}
          </p>
          <p className="text-xl font-medium mb-4 text-grey-whitetinge">
            {text}
          </p>
          <div className="col-span-3 flex flex-col pb-4">
            <div className="flex justify-between">
              <span className="text-lg text-white">start</span>
              <span className="text-lg text-white">end</span>
            </div>
            <span>
              <TimeRangeSlider
                disabled={false}
                format={24}
                maxValue={"23:59"}
                minValue={"00:00"}
                name={"time_range"}
                // onChangeStart={this.changeStartHandler}
                // onChangeComplete={this.changeCompleteHandler}
                //onChange={(time) => setTime(time)}
                step={15}
                //value={time}
              />
            </span>
          </div>
          <div className="flex justify-center gap-x-3 mt-10">
            <YellowButton
              text="Yes"
              onClick={onClick}
              textSize="text-lg"
              px="px-8"
              isLoading={isLoading}
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
