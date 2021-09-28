import GroupList from "../components/chat/GroupList";
import Category from "../components/chat/Category";
import Messenger from "../components/chat/Messenger";

const chat = () => {
  return (
    <div className="flex flex-row">
      <Category />
      <GroupList />
      <Messenger />
    </div>
  );
};

export default chat;
