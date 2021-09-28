import React, { useState } from "react";

const Category = () => {
  const [filter, setFilter] = useState("All Chats");
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };
  //select: #C4C1DE, not select #EFF0F6
  return (
    <div className="align-middle justify-center">
      <div>
        <button
          type="button"
          style={{ background: filter == "All Chats" ? "#C4C1DE" : "#EFF0F6" }}
          value="All Chats"
          onClick={handleFilterChange}
          className="w-54 text-sm sm:text-md justify-center py-3 px-10 border-transparent rounded-md shadow-sm font-medium text-gray hover:bg-opacity-75 mt-6"
        >
          All Chats
        </button>
      </div>
      <div>
        <button
          type="button"
          style={{ background: filter == "Joined" ? "#C4C1DE" : "#EFF0F6" }}
          value="Joined"
          onClick={handleFilterChange}
          className="w-54 text-sm sm:text-md justify-center py-3 px-10 border-transparent rounded-md shadow-sm font-medium text-gray bg-purple hover:bg-opacity-75 mt-6"
        >
          Joined
        </button>
      </div>
      <div>
        <button
          type="button"
          style={{ background: filter == "#chitchat" ? "#C4C1DE" : "#EFF0F6" }}
          value="#chitchat"
          onClick={handleFilterChange}
          className="w-54 text-sm sm:text-md justify-center py-3 px-10 border-transparent rounded-md shadow-sm font-medium text-gray bg-purple hover:bg-opacity-75 mt-6"
        >
          #chitchat
        </button>
      </div>
      <div>
        <button
          type="button"
          style={{ background: filter == "#makan" ? "#C4C1DE" : "#EFF0F6" }}
          value="#makan"
          onClick={handleFilterChange}
          className="w-54 text-sm sm:text-md justify-center py-3 px-10 border-transparent rounded-md shadow-sm font-medium text-gray bg-purple hover:bg-opacity-75 mt-6"
        >
          #makan
        </button>
      </div>
      <div>
        <button
          type="button"
          style={{ background: filter == "#sports" ? "#C4C1DE" : "#EFF0F6" }}
          value="#sports"
          onClick={handleFilterChange}
          className="w-54 text-sm sm:text-md justify-center py-3 px-10 border-transparent rounded-md shadow-sm font-medium text-gray bg-purple hover:bg-opacity-75 mt-6"
        >
          #sports
        </button>
      </div>
      <div>
        <button
          type="button"
          style={{
            background: filter == "Study Groups" ? "#C4C1DE" : "#EFF0F6",
          }}
          value="Study Groups"
          onClick={handleFilterChange}
          className="w-54 text-sm sm:text-md justify-center py-3 px-10 border-transparent rounded-md shadow-sm font-medium text-gray bg-purple hover:bg-opacity-75 mt-6"
        >
          Study Groups
        </button>
      </div>
    </div>
  );
};

export default Category;
