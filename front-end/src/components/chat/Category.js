import React from "react";

const Category = ({ tag, setTag }) => {
  const handleFilterChange = (event) => {
    setTag(event.target.value);
  };
  return (
    <div className="align-middle justify-center">
      <div>
        <button
          type="button"
          style={{ background: tag == "All Chats" ? "#C4C1DE" : "#EFF0F6" }}
          value="All Chats"
          onClick={handleFilterChange}
          className="w-5/6 h-10 text-sm sm:text-md justify-center border-transparent rounded-md shadow-sm font-medium text-gray mt-6"
        >
          All Chats
        </button>
      </div>
      <div>
        <button
          type="button"
          style={{ background: tag == "Joined" ? "#C4C1DE" : "#EFF0F6" }}
          value="Joined"
          onClick={handleFilterChange}
          className="w-5/6 h-10 text-sm sm:text-md justify-center border-transparent rounded-md shadow-sm font-medium text-gray bg-purple hover:bg-opacity-75 mt-6"
        >
          Joined
        </button>
      </div>
      <div>
        <button
          type="button"
          style={{ background: tag == "#chitchat" ? "#C4C1DE" : "#EFF0F6" }}
          value="#chitchat"
          onClick={handleFilterChange}
          className="w-5/6 h-10 text-sm sm:text-md justify-center border-transparent rounded-md shadow-sm font-medium text-gray bg-purple hover:bg-opacity-75 mt-6"
        >
          #chitchat
        </button>
      </div>
      <div>
        <button
          type="button"
          style={{ background: tag == "#makan" ? "#C4C1DE" : "#EFF0F6" }}
          value="#makan"
          onClick={handleFilterChange}
          className="w-5/6 h-10 text-sm sm:text-md justify-center border-transparent rounded-md shadow-sm font-medium text-gray bg-purple hover:bg-opacity-75 mt-6"
        >
          #makan
        </button>
      </div>
      <div>
        <button
          type="button"
          style={{ background: tag == "#sports" ? "#C4C1DE" : "#EFF0F6" }}
          value="#sports"
          onClick={handleFilterChange}
          className="w-5/6 h-10 text-sm sm:text-md justify-cente border-transparent rounded-md shadow-sm font-medium text-gray bg-purple hover:bg-opacity-75 mt-6"
        >
          #sports
        </button>
      </div>
      <div>
        <button
          type="button"
          style={{
            background: tag == "Study Groups" ? "#C4C1DE" : "#EFF0F6",
          }}
          value="Study Groups"
          onClick={handleFilterChange}
          className="w-5/6 h-10 text-sm sm:text-md justify-center border-transparent rounded-md shadow-sm font-medium text-gray bg-purple hover:bg-opacity-75 mt-6"
        >
          Study Groups
        </button>
      </div>
    </div>
  );
};

export default Category;
