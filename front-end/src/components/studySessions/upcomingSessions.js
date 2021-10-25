import { SearchIcon } from "@heroicons/react/solid";
import CreateNewStudySession from "../forms/CreateNewStudySession";
import React, { useState } from "react";
import { useEffect } from "react";
import BlueSessionCard from "./blueSessionCard";
import { useContext } from "react";
import { SessionContext } from "../../context/SessionContext";

const UpcomingSessions = () => {
  const [loadNewForm, setLoadNewForm] = useState(false);
  const [openNewForm, setOpenNewForm] = useState(false);
  const { upcomingSessions, getUpcomingSessions, setUpcomingSessions } =
    useContext(SessionContext);

  // mock data
  const studySession = [
    {
      title: "upcoming session",
      capacity: 5,
      // members usernames stored in array
      participants: ["sylviaokt", "andrea", "mabel", "haishan"],
      isOnline: "online",
      module: "CS3235",
      date: "2021-12-25",
      time: {
        start: "11:00",
        end: "17:30",
      },
      timeLimit: 2,
    },
    {
      title: "second one",
      capacity: 6,
      // members usernames stored in array
      participants: ["sylviaokt"],
      isOnline: "offline",
      module: "CS3235",
      date: "2021-11-25",
      time: {
        start: "14:00",
        end: "17:30",
      },
      timeLimit: 2,
    },
  ];

  useEffect(() => {
    getUpcomingSessions();
    setUpcomingSessions(studySession);
    console.log(upcomingSessions);
  }, []);

  const renderCards = (sessions) => {
    return sessions.map((session) => (
      <div key={session.title}>
        <BlueSessionCard studySession={session} />
      </div>
    ));
  };

  return (
    <div className="bg-yellow-light h-screen">
      <p className="text-2xl text-purple-dark pt-10 font-medium">
        Upcoming study sessions you <br />
        might be interested in
      </p>
      <div className="grid gap-0 grid-cols-9 mb-4">
        <form
          className="pl-8 col-span-8 pr-8 pt-4 flex"
          action="#"
          method="GET"
        >
          <label htmlFor="search-field" className="sr-only">
            Search for study sessions
          </label>
          <div className="relative w-full text-gray-400 focus-within:text-gray-600">
            <div className="absolute p-3 inset-y-0 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            <input
              id="search-field"
              className="block w-full bg-white h-full pl-10 pr-3 py-4 text-gray-900 placeholder-gray-500 rounded-xl focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
              placeholder="Search for study sessions"
              type="search"
              name="search"
            />
          </div>
        </form>
        <div className="pt-3">
          <button
            onClick={() => {
              setOpenNewForm(true);
            }}
            className="text-3xl text-white mt-3 rounded-full bg-purple-dark h-10 w-10 flex items-center justify-center"
          >
            +
          </button>
          <CreateNewStudySession
            setOpen={setOpenNewForm}
            setLoad={setLoadNewForm}
            open={openNewForm}
            load={loadNewForm}
          />
        </div>
      </div>
      <div className="flex flex-col gap-y-3">
        {renderCards(upcomingSessions)}
      </div>
    </div>
  );
};

export default UpcomingSessions;
