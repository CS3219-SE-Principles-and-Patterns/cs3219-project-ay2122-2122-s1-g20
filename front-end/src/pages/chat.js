import GroupList from "../components/chat/GroupList";
import Category from "../components/chat/Category";
import Messenger from "../components/chat/Messenger";

const chat = () => {
  return (
    <div className="flex flex-row">
      <div>
        <Category />
      </div>
      <div className="flex flex-row h-screen">
        <div className="bg-yellow-light ">
          <GroupList />
        </div>
        <Messenger />
      </div>
    </div>
  );
};

export default chat;
