import React, { useState, useEffect } from "react";
import GroupBubble from "../bubble/GroupBubble";
import ChatGroupCreationForm from "../forms/ChatGroupCreationForm";
import ClipLoader from "react-spinners/ClipLoader";
import { api } from "../../utils/api";

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

  const getAllGroups = async () => {
    const res = await fetch("http://localhost:9000/api/groups");
    const data = await res.json();
    setGroups(
      data.groups.sort((a, b) => {
        return a.lastModified - b.lastModified;
      })
    );
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
    getGroupsUserIsIn();

    if (tag == "All Chats") {
      setDisplay(groups);
    } else {
      if (tag == "Joined") {
        setDisplay(groupsUserIsIn);
      }
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
    <div className="h-screen overflow-y-auto">
      <div className="pt-2 flex justify-center">
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
        {tag == "All Chats" ? (
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
        ) : (
          ""
        )}
      </div>
      {isLoading ? (
        <ClipLoader loading={isLoading} size={10} />
      ) : (
        <div className="w-full pl-4">
          {display.map((group, index) => (
            <GroupBubble
              key={index}
              group={group}
              setDisplayChat={setDisplayChat}
              setEnable={setEnable}
              userEmail={account.email}
              profilePic={account.profilePic}
              joined={
                tag == "All Chats" ? groupsUserIsIn.includes(group) : true
              }
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
