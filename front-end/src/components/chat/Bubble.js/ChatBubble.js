import React from "react";
import PropTypes from "prop-types";

class ChatBubble extends React.Component {
  handleSendMessage = () => {
    //TBD user to join chat groups
  };

  render() {
    return (
      <div className="flex flex-row">
        <div className="rounded-full h-20 w-20 flex items-center justify-center bg-grey">
          profile
        </div>
        <div>
          <div className="mt-8 pl-2 text-s text-left">
            {this.props.name}TempName says:
          </div>
          <div className="mt-2 pl-5 rounded-tr-bl-br text-left bg-purple-light">
            {this.props.message}I wonder if there is a way this can be learned
            quickly
          </div>
        </div>
      </div>
    );
  }
}

ChatBubble.propTypes = {
  name: PropTypes.string,
  message: PropTypes.string,
};

export default ChatBubble;
