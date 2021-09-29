import React from "react";
import PropTypes from "prop-types";

const StudyHeader = (props) => {
  return (
    <div className="h-16 bg-purple-misc relative">
      <div className="pt-4 pl-2 absolute left-0 text-white text-xl">
        {props.name}StudyGRP 1
      </div>
      <div className="pt-4 pr-2 absolute right-0 text-white text-xl">
        {props.tag}#CS3219
      </div>
    </div>
  );
};

StudyHeader.propTypes = {
  name: PropTypes.string,
  tag: PropTypes.string,
};

export default StudyHeader;
