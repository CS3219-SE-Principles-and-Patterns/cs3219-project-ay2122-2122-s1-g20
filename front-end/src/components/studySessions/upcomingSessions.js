import { SearchIcon } from "@heroicons/react/solid";
import BlueSessionCard from "./blueSessionCard";
import CreateNewStudySession from "../forms/CreateNewStudySession";
import React, { useState } from "react";

const UpcomingSessions = () => {
  const [loadNewForm, setLoadNewForm] = useState(false);
  const [openNewForm, setOpenNewForm] = useState(false);

  const sessions = [
    {
      _id: "1",
      title: "Title 1",
      owner: "Andrea",
      module: "CS3219",
      capacity: 5,
      date: "25/10/2021",
      time: {
        start: "5pm",
        end: "7pm",
      },
      timeLimit: "1",
      participants: [
        { name: "andreatanky" },
        { name: "sylviaokt" },
        { name: "mabel" },
        { name: "haishan" },
      ],
      isOnline: "Offline",
    },
    {
      _id: "1",
      title: "Title 2",
      owner: "Sylvia",
      module: "CS3235",
      capacity: 7,
      date: "29/10/2021",
      time: {
        start: "1pm",
        end: "7pm",
      },
      timeLimit: "2",
      participants: [
        { name: "andreatanky" },
        { name: "sylviaokt" },
        { name: "mabel" },
        { name: "haishan" },
      ],
      isOnline: "Online",
    },
  ];

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
      {sessions.map((session) => (
        <BlueSessionCard
          key={session._id}
          title={session.title}
          module={session.module}
          capacity={session.capacity}
          start={session.time.start}
          end={session.time.end}
          date={session.date}
          minimum={session.timeLimit}
          participants_count={session.participants.length}
          owner={session.owner}
        />
      ))}
    </div>
  );
};

export default UpcomingSessions;
