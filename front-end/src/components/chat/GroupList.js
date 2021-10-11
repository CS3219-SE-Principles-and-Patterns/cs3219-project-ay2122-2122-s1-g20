import React, { useState } from "react";
import GroupBubble from "../bubble/GroupBubble";
import ChatGroupCreationForm from "../forms/ChatGroupCreationForm";

const GroupList = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  return (
    <div className="flex flex-col">
      <div className="justify-center w-full flex flex-row">
        <div>
          <form action="#" method="GET">
            <div>
              <label
                htmlFor="search"
                className="text-sm font-medium text-gray-700"
              ></label>
              <input
                onChange={handleSearch}
                type="text"
                name="search"
                id="search"
                value={search}
                placeholder="Search for chat groups"
                className="mt-1 placeholder-white appearance-none py-3 sm:w-96 border-none  pl-3 py-2 sm:py-4 rounded-md bg-purple-misc focus:outline-none focus:ring-purple-dark text-xs focus:border-purple-dark sm:text-sm"
              />
            </div>
          </form>
        </div>

        <div className="pl-4 pt-2">
          <button
            className="text-3xl rounded-full bg-purple-dark h-10 w-10 flex items-center justify-center"
            onClick={() => {
              setOpen(true);
            }}
          >
            +
          </button>
          <ChatGroupCreationForm setOpen={setOpen} open={open} />
        </div>
      </div>

      <div className="justify-center w-full pl-4 flex flex-col">
        <GroupBubble />

        <GroupBubble />
      </div>
    </div>
  );
};

export default GroupList;
