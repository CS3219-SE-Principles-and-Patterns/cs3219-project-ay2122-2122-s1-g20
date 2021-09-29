import StudyHeader from "../header/StudyHeader";
import ChatBubble from "../bubble/ChatBubble";

const Messenger = () => {
  const handleSendMessage = () => {
    //to be done, sending message
  };

  return (
    <div className="flex flex-col h-screen relative md:w-auto">
      <StudyHeader />
      <div className="pr-10 pl-2">
        <ChatBubble />
        <ChatBubble />
      </div>

      <div className="absolute bottom-0 left-0 border-black border-2 ">
        <input
          onChange={handleSendMessage}
          placeholder="Write a message"
          className="placeholder-white bg-purple w-full"
        ></input>
      </div>
    </div>
  );
};

export default Messenger;
