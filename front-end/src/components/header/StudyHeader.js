import React from "react";
import PropTypes from "prop-types";

const StudyHeader = ({ group }) => {
  return (
    <div className="h-max bg-purple-misc">
      <div className="float-left text-white md:text-xl text-l ml-3 p-2">
        {group.name}
      </div>
      <div className="float-right text-white md:text-xl text-l mr-3 p-2">
        {group.length == 0 ? "" : `#${group.hashtag}`}
      </div>
    </div>
  );
};

StudyHeader.propTypes = {
  group: PropTypes.object,
};

export default StudyHeader;
