import React from "react";
import PropTypes from "prop-types";

const StudyHeader = ({ group }) => {
  return (
    <div className="h-16 bg-purple-misc relative">
      <div className="pt-4 pl-2 absolute left-0 text-white text-xl">
        {group.name}
      </div>
      <div className="pt-4 pr-2 absolute right-0 text-white text-xl">
        {group.length == 0 ? "" : `#${group.hashtag}`}
      </div>
    </div>
  );
};

StudyHeader.propTypes = {
  group: PropTypes.object,
};

export default StudyHeader;
