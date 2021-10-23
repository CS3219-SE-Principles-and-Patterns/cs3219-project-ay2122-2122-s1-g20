import React from "react";
import PropTypes from "prop-types";

const StudyHeader = ({ group }) => {
  return (
    <div className="h-16 bg-purple-misc">
      <div className="float-left text-white text-xl p-2">{group.name}</div>
      <div className="float-right text-white text-xl p-2">
        {group.length == 0 ? "" : `#${group.hashtag}`}
      </div>
    </div>
  );
};

StudyHeader.propTypes = {
  group: PropTypes.object,
};

export default StudyHeader;
