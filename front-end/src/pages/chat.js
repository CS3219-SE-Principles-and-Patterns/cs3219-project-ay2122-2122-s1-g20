import GroupList from "../components/chat/GroupList";
import Category from "../components/chat/Category";
import Messenger from "../components/chat/Messenger";
import { AccountContext } from "../context/AccountContext";

const ChatPage = () => {
  return (
    <AccountContext.Consumer>
      {(context) => (
        <div className="grid grid-cols-7 h-screen">
          <div className="col-span-1">
            <Category />
          </div>
          <div className="bg-yellow-light col-span-3">
            <GroupList account={context} />
          </div>
          <div className="col-span-3">
            <Messenger />
          </div>
        </div>
      )}
    </AccountContext.Consumer>
  );
};

export default ChatPage;
