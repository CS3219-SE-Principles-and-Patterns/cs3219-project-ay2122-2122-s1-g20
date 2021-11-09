import React, { useState, useEffect } from "react";
import GroupBubble from "../bubble/GroupBubble";
import ChatGroupCreationForm from "../forms/ChatGroupCreationForm";
import ClipLoader from "react-spinners/ClipLoader";
import { api } from "../../utils/api";
import { SearchIcon } from "@heroicons/react/solid";

const GroupList = ({
  account,
  setDisplayChat,
  tag,
  setEnable,
  isLoading,
  setIsLoading,
  setDisabled,
}) => {
  const [search, setSearchValue] = useState("");
  const [open, setOpen] = useState(false);
  const [load, setLoad] = useState(false);
  const [groups, setGroups] = useState([]);
  const [display, setDisplay] = useState([]);
  const [groupsUserIsIn, setGroupsUserIsIn] = useState([]);
  const [leave, setLeave] = useState(false);
  const [newGroup, setNewGroup] = useState([]);
  const [status, setStatus] = useState(false);

  console.log(newGroup);
  console.log(groups);

  const isStudy = (tag) => {
    return !["chitchat", "makan", "sports"].includes(tag);
  };
  const getAllGroups = async () => {
    const res = await api.get(`/groups`);
    var temp = res.data.groups.sort((a, b) => {
      return b.lastModified - a.lastModified;
    });
    setGroups(temp);
  };

  const getGroupsUserIsIn = async () => {
    await api
      .get(`/user/account/${account.email}`)
      .then((res) => {
        console.log(res);
        const temp = groups
          .filter((x) => res.data.groups.includes(x._id))
          .sort((a, b) => {
            return b.lastModified - a.lastModified;
          });
        setGroupsUserIsIn(temp);
        if (tag == "Joined") {
          setDisplay(temp);
        }
      })
      .catch((err) => console.log(err));
  };
  const check = async () => {
    setIsLoading(true);
    await getAllGroups();
    await getGroupsUserIsIn();
    if (tag == "All Chats") {
      const temp = groups.filter((x) => !isStudy(x.hashtag));
      setDisplay(temp);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    check();
    if (tag == "Joined") {
      setDisplay(groupsUserIsIn);
    }
    if (tag != "Joined" && tag != "All Chats") {
      console.log(groups);

      if (!isStudy(tag)) {
        const temp = groups.filter((x) => x.hashtag == tag);
        setDisplay(temp);
      }
      //study groups tag
      else {
        const temp = groups.filter(
          (x) => isStudy(x.hashtag) && x.uid.includes(account.email)
        );
        setDisplay(temp);
      }
    }
  }, [tag, leave]);

  useEffect(() => {
    getAllGroups();
  }, [status]);

  useEffect(() => {
    setIsLoading(true);
    setGroupsUserIsIn((prevState) => prevState.concat(newGroup));
    setDisplay(display.concat(newGroup));
    setIsLoading(false);
    setGroups(groups.concat(newGroup));
  }, [newGroup]);

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
    <div className="overflow-y-auto h-screen">
      <div className="pt-4 grid gap-0 grid-cols-9 flex justify-center">
        <div className="pl-10 col-span-7 md:pr-8 pr-2 pt-4 flex">
          <label
            htmlFor="search"
            className="flex text-sm font-medium text-gray-700 "
          ></label>
          <div className="relative w-full text-gray-400 focus-within:text-gray-600">
            <div className="absolute p-3 inset-y-0 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            <input
              id="search-field"
              className="block w-full bg-purple bg-opacity-50 h-full pl-10 pr-3 py-4 text-black placeholder-gray-500 rounded-xl focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent text-xs sm:text-sm"
              placeholder="Search for group chats"
              type="search"
              name="search"
              onChange={handleSearch}
              value={search}
            />
          </div>
        </div>
        {tag == "All Chats" ? (
          <div className="pt-3">
            <button
              className="text-white mt-3 rounded-full bg-purple-dark h-10 w-10 text-3xl flex items-center justify-center"
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
              setNewGroup={setNewGroup}
            />
          </div>
        ) : (
          ""
        )}
      </div>
      {isLoading ? (
        <ClipLoader loading={isLoading} size={10} />
      ) : (
        <div className="overflow-x-hidden pt-4 w-full relative mr-6 gap-0 justify-center">
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
              setDisabled={setDisabled}
              leave={leave}
              setLeave={setLeave}
              status={status}
              setStatus={setStatus}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default GroupList;
