import GroupList from "../components/chat/GroupList";
import Category from "../components/chat/Category";
import Messenger from "../components/chat/Messenger";
import { AccountContext } from "../context/AccountContext";
import { useEffect, useState } from "react";

const ChatPage = () => {
  const [displayChat, setDisplayChat] = useState([]);
  const [enable, setEnable] = useState(false);
  const [tag, setTag] = useState("");
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setDisplayChat("");
  }, [tag]);

  return (
    <AccountContext.Consumer>
      {(context) => (
        <div className="grid grid-cols-7 h-screen">
          <div className="col-span-1">
            <Category
              setTag={setTag}
              tag={tag}
              setReload={setReload}
              reload={reload}
            />
          </div>
          <div className="bg-yellow-light col-span-3">
            <GroupList
              account={context}
              setDisplayChat={setDisplayChat}
              setEnable={setEnable}
              tag={tag}
              reload={reload}
            />
          </div>
          <div className="col-span-3">
            <Messenger
              account={context}
              displayChat={displayChat}
              enable={enable}
            />
          </div>
        </div>
      )}
    </AccountContext.Consumer>
  );
};

export default ChatPage;
