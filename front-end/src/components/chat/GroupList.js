import React, { useState } from "react";
import GroupBubble from "../bubble/GroupBubble";

const GroupList = () => {
  const [filter, setFilterName] = useState("");

  const handleFilter = (event) => {
    setFilterName(event.target.value);
  };
  return (
    <div>
      <div className="mt-5 ml-2 flex flex-row">
        <div>
          <form className="space-y-6" action="#" method="GET">
            <div>
              <label
                htmlFor="filter"
                className="block flex text-sm font-medium text-gray-700"
              ></label>
              <input
                onChange={handleFilter}
                type="text"
                name="filter"
                id="filter"
                value={filter}
                placeholder="Search for chat groups"
                className="mt-1 placeholder-white appearance-none w-64 py-3 sm:w-96 border-none block pl-3 py-2 sm:py-4 rounded-md bg-purple-misc focus:outline-none focus:ring-purple-dark text-xs focus:border-purple-dark sm:text-sm"
              />
            </div>
          </form>
        </div>

        <div className="pl-4 pt-2">
          <button className="text-3xl rounded-full bg-purple-dark h-10 w-10 flex items-center justify-center">
            +
          </button>
        </div>
      </div>

      <div>
        <GroupBubble />
      </div>
      <div>
        <GroupBubble />
      </div>
    </div>
  );
};

export default GroupList;
