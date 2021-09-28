import ChatBubble from "./Bubble.js/ChatBubble";

const Messenger = () => {
  const handleSendMessage = () => {
    //to be done, sending message
  };

  return (
    <div className="flex flex-col">
      <div>Label</div>
      <ChatBubble />
      <ChatBubble />

      <div>
        <form action="#" method="POST" className="absolute bottom-0 right-10">
          <input
            onChange={handleSendMessage}
            placeholder="Write a message"
          ></input>
        </form>
      </div>
    </div>
  );
};

export default Messenger;
