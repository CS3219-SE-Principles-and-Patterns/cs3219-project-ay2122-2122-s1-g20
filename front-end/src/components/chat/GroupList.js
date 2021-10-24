import React, { useState, useEffect } from "react";
import GroupBubble from "../bubble/GroupBubble";
import ChatGroupCreationForm from "../forms/ChatGroupCreationForm";

const GroupList = ({ account, setDisplayChat, tag, setEnable }) => {
  const [search, setSearchValue] = useState("");
  const [open, setOpen] = useState(false);
  const [groups, setGroups] = useState([]);
  const [display, setDisplay] = useState([]);
  const [groupsUserIsIn, setGroupsUserIsIn] = useState([]);
  const [load, setLoad] = useState(false);

  //use token to call authservices api
  const getGroupsUserIsIn = async () => {
    const res = await fetch(
      `http://localhost:8080/api/user/account/groups/${account.email}`,
      {
        method: "GET",
        headers: {
          "x-access-token": account.token,
          "jwt-salt": account.jwtSalt,
        },
      }
    );

    const data = await res.json();
    loadData(data.groups);
    console.log(groupsUserIsIn);
  };

  //loading data from group database
  const loadData = async (arr) => {
    var temp = [];
    for (var i = 0; i < arr.length; i++) {
      const group_id = arr[i];
      const res = await fetch(`http://localhost:9000/api/groups/${group_id}`);
      const data = await res.json();
      if (i == 0) {
        temp.push.apply(temp, data.info);
      } else {
        temp = temp.concat(data.info);
      }
    }
    setGroupsUserIsIn(temp);
  };

  const getAllGroups = async () => {
    const res = await fetch("http://localhost:9000/api/groups");
    const data = await res.json();
    setGroups(data.groups);
  };

  useEffect(() => {
    getGroupsUserIsIn();
    getAllGroups();
    setDisplay(groupsUserIsIn);

    if (tag == "All Chats") {
      setDisplay(groups);
    } else {
      if (tag != "Joined") {
        const temp = groupsUserIsIn.filter((x) => x.hashtag == tag);
        setDisplay(temp);
      }
    }
  }, [tag, load]);

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
    var temp;
    const empty = search == "";
    if (tag == "All Chats") {
      if (empty) {
        temp = groups;
      } else {
        temp = groups.filter((x) => x.name.includes(search));
      }
    } else {
      if (tag != "Joined") {
        if (empty) {
          temp = groupsUserIsIn.filter((x) => x.hashtag == tag);
        } else {
          temp = groupsUserIsIn.filter(
            (x) => x.hashtag == tag && x.name.includes(search)
          );
        }
      } else {
        if (empty) {
          temp = groupsUserIsIn;
        } else {
          temp = groupsUserIsIn.filter((x) => x.name.includes(search));
        }
      }
    }
    setDisplay(temp);
  };
  return (
    <div>
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
        {display.map((group, index) => (
          <GroupBubble
            key={index}
            group={group}
            setDisplayChat={setDisplayChat}
            setEnable={setEnable}
            userEmail={account.email}
            token={account.token}
            jwtSalt={account.jwtSalt}
            profilePic={account.profilePic}
            joined={groupsUserIsIn.includes(group)}
          />
        ))}
      </div>
    </div>
  );
};

export default GroupList;
