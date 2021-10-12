import GroupList from "../components/chat/GroupList";
import Category from "../components/chat/Category";
import Messenger from "../components/chat/Messenger";
import { AccountContext } from "../context/AccountContext";
import { useState } from "react";

const ChatPage = () => {
  const [displayChat, setDisplayChat] = useState([]);
  return (
    <AccountContext.Consumer>
      {(context) => (
        <div className="grid grid-cols-7 h-screen">
          <div className="col-span-1">
            <Category />
          </div>
          <div className="bg-yellow-light col-span-3">
            <GroupList account={context} setDisplayChat={setDisplayChat} />
          </div>
          <div className="col-span-3">
            <Messenger account={context} displayChat={displayChat} />
          </div>
        </div>
      )}
    </AccountContext.Consumer>
  );
};

export default ChatPage;
