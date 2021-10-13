import React, { useState, useEffect } from "react";
import GroupBubble from "../bubble/GroupBubble";
import ChatGroupCreationForm from "../forms/ChatGroupCreationForm";

const GroupList = ({ account, setDisplayChat, tag }) => {
  const [search, setSearchValue] = useState("");
  const [open, setOpen] = useState(false);
  const [groups, setGroups] = useState([]); //view of the filtered group list
  const [groupsUserIsIn, setGroupsUserIsIn] = useState([]); //based on the user
  const [load, setLoad] = useState(false);
  const [check, setCheck] = useState(0);

  //loading data from group database TBD not working
  const loadData = async (arr) => {
    const temp = [];
    setCheck(arr.length);

    for (var i = 0; i < arr.length; i++) {
      const group_id = arr[i];
      const res = await fetch(`http://localhost:9000/api/groups/${group_id}`);
      const data = await res.json();
      temp.concat(data.info);
    }

    setGroupsUserIsIn(temp);
    //setGroups(temp);
  };
  const getGroupsUserIsIn = async () => {
    const res = await fetch(`
            http://localhost:8080/api/user/account/groups/${account.email}`);
    const data = await res.json(); //return an arr of chat group id
    loadData(data.groups);
    console.log(groupsUserIsIn);
  };

  const getAllGroups = async () => {
    const res = await fetch("http://localhost:9000/api/groups");
    const data = await res.json();
    setGroups(data.groups);
  };

  useEffect(() => {
    getGroupsUserIsIn();

    if (tag == "All Chats") {
      getAllGroups();
    } else {
      //tbd retrieve groups chats with given hashtag
      if (tag == "#chitchat") {
        setGroups([]);
      } else if (tag == "#makan") {
        setGroups([]);
      } else if (tag == "#sports") {
        setGroups([]);
      } else if (tag == "Study Groups") {
        setGroups([]);
      }
    }
  }, [tag, load]);

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };
  return (
    <div>
      <text>Testing purpose {check}</text>
      <div className="pt-2 flex justify-center">
        <form action="#" method="GET">
          <div>
            <label
              htmlFor="search"
              className="block flex text-sm font-medium text-gray-700"
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

        <div className="pl-4 pt-2">
          <button
            className="text-3xl rounded-full bg-purple-dark h-10 w-10 flex items-center justify-center"
            onClick={() => {
              setOpen(true);
            }}
          >
            +
          </button>
          <ChatGroupCreationForm
            setOpen={setOpen}
            setLoad={setLoad}
            open={open}
            load={load}
            userEmail={account.email}
          />
        </div>
      </div>

      <div className="w-full pl-4">
        {groups.map((group, index) => (
          <GroupBubble
            key={index}
            group={group}
            setDisplayChat={setDisplayChat}
            userEmail={account.email}
            groupsUserIsIn={groupsUserIsIn}
          />
        ))}
      </div>
    </div>
  );
};

export default GroupList;
