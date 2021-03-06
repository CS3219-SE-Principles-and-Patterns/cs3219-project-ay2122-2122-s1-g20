import { SearchIcon } from "@heroicons/react/solid";
import CreateNewStudySession from "../forms/CreateNewStudySession";
import React, { useState } from "react";
import BlueSessionCard from "./blueSessionCard";
import { useContext } from "react";
import { SessionContext } from "../../context/SessionContext";

const UpcomingSessions = () => {
  const [openNewForm, setOpenNewForm] = useState(false);
  const [searchSession, setSearchSession] = useState("");
  const { upcomingSessions } = useContext(SessionContext);

  const renderCards = () => {
    const searchTerm = searchSession.toLowerCase();
    const filteredSessions = upcomingSessions.filter(
      (s) =>
        s.title.toLowerCase().includes(searchTerm) ||
        s.module.toLowerCase().includes(searchTerm)
    );
    return filteredSessions.map((session) => (
      <div key={session.title}>
        <BlueSessionCard studySession={session} />
      </div>
    ));
  };

  return (
    <div className="bg-yellow-light pb-10">
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
              onChange={(event) => setSearchSession(event.target.value)}
              value={searchSession}
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
          <CreateNewStudySession setOpen={setOpenNewForm} open={openNewForm} />
        </div>
      </div>
      <div className="flex flex-col gap-y-3">{renderCards()}</div>
    </div>
  );
};

export default UpcomingSessions;
