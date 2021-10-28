import React, { useState, useEffect } from "react";
import GroupBubble from "../bubble/GroupBubble";
import ChatGroupCreationForm from "../forms/ChatGroupCreationForm";
import ClipLoader from "react-spinners/ClipLoader";
import { api, chatApi } from "../../utils/api";
import { SearchIcon } from "@heroicons/react/solid";

const GroupList = ({
  account,
  setDisplayChat,
  tag,
  setEnable,
  isLoading,
  setIsLoading,
}) => {
  const [search, setSearchValue] = useState("");
  const [open, setOpen] = useState(false);
  const [load, setLoad] = useState(false);
  const [groups, setGroups] = useState([]);
  const [display, setDisplay] = useState([]);
  const [groupsUserIsIn, setGroupsUserIsIn] = useState([]);
  const [groupsUserCreated, setGroupsUserCreated] = useState([]);

  const getAllGroups = async () => {
    const res = await fetch("http://localhost:9000/api/groups");
    const data = await res.json();
    setGroups(
      data.groups.sort((a, b) => {
        return a.lastModified - b.lastModified;
      })
    );
  };

  const getGroupsUserCreated = async () => {
    await chatApi
      .get(`/groups/users/${account.email}`)
      .then((res) => {
        setGroupsUserCreated(res.data.groups);
      })
      .catch((err) => console.log(err));
  };

  const getGroupsUserIsIn = async () => {
    setIsLoading(true);
    getAllGroups();
    await api
      .get(`/user/account/groups/${account.email}`)
      .then((res) => {
        setGroupsUserIsIn(
          groups.filter((x) => res.data.groups.includes(x._id))
        );
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getGroupsUserCreated();
    getGroupsUserIsIn();

    if (tag == "All Chats") {
      setDisplay(groups);
    } else {
      if (tag == "Joined") {
        setDisplay(groupsUserIsIn);
      }
      if (tag != "Joined") {
        const temp = groups.filter((x) => x.hashtag == tag);
        setDisplay(temp);
      }
    }
    console.log(groupsUserCreated);
  }, [tag, load]);

  const handleSearch = (event) => {
    const input = event.target.value;
    setSearchValue(input);

    var temp;
    if (tag == "All Chats") {
      if (!input) {
        temp = groups;
      } else {
        temp = groups.filter((x) => x.name.includes(search));
      }
    } else {
      if (tag != "Joined") {
        if (!input) {
          temp = groups.filter((x) => x.hashtag == tag);
        } else {
          temp = groups.filter(
            (x) => x.hashtag == tag && x.name.includes(search)
          );
        }
      } else {
        if (!input) {
          temp = groupsUserIsIn;
        } else {
          temp = groupsUserIsIn.filter((x) => x.name.includes(search));
        }
      }
    }
    setDisplay(temp);
  };

  return (
    <div className="overflow-y-auto">
      <div className="pt-4 grid gap-0 grid-cols-9 flex justify-center">
        <div className="pl-8 col-span-8 pr-8 pt-4 flex">
          <label
            htmlFor="search"
            className="block flex text-sm font-medium text-gray-700 "
          ></label>
          <div className="relative w-full text-gray-400 focus-within:text-gray-600">
            <div className="absolute p-3 inset-y-0 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            <input
              id="search-field"
              className="block w-full bg-purple bg-opacity-50 h-full pl-10 pr-3 py-4 text-black placeholder-gray-500 rounded-xl focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
              placeholder="Search for study sessions"
              type="search"
              name="search"
              onChange={handleSearch}
              value={search}
            />
          </div>
        </div>
        {tag == "All Chats" ? (
          <div className="pt-3 pr-3">
            <button
              className="text-3xl text-white mt-3 rounded-full bg-purple-dark h-10 w-10 flex items-center justify-center"
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
        ) : (
          ""
        )}
      </div>
      {isLoading ? (
        <ClipLoader loading={isLoading} size={10} />
      ) : (
        <div className="pt-4 grid relative mr-6 gap-0 justify-center">
          {display.map((group, index) => (
            <GroupBubble
              key={index}
              group={group}
              setDisplayChat={setDisplayChat}
              setEnable={setEnable}
              userEmail={account.email}
              profilePic={account.profilePic}
              joined={tag == "Joined" ? true : groupsUserIsIn.includes(group)}
              setLoad={setLoad}
              load={load}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default GroupList;
