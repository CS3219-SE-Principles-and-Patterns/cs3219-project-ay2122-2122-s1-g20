import React from "react";
import PropTypes from "prop-types";

const GroupBubble = (group) => {
  const handleJoinChat = () => {
    //TBD user to join chat groups
  };
  const name = group.group.name;
  const hashtag = group.group.hashtag;

  return (
    <div className=" flex flex-row">
      <div className="text-xl flex flex-row mt-5 h-20 text-left appearance-none w-80 py-3 sm:w-96 border-none block pl-3 py-2 sm:py-4 rounded-md bg-purple-light focus:outline-none focus:ring-purple-dark focus:border-purple-dark">
        {name}
        <div className="pl-8">
          <div className="bg-purple-200 rounded-md">#{hashtag} </div>
        </div>
      </div>
      <button
        className="rounded bg-gray-100 h-20 w-20 mt-5 text-xl"
        onClick={handleJoinChat}
      >
        Join
      </button>
    </div>
  );
};

GroupBubble.propTypes = {
  groupName: PropTypes.string,
  tag: PropTypes.string,
};

export default GroupBubble;
