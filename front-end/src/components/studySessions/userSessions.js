import YellowSessionCard from "./yellowSessionCard";
import React, { useState } from "react";
import { useContext } from "react";
import { SessionContext } from "../../context/SessionContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function UserSessions() {
  const [isTab0, setIsTab0] = useState(true);
  const [isTab1, setIsTab1] = useState(false);
  const isCreatedSessions = true;

  const { mySessions, joinedSessions } = useContext(SessionContext);
  console.log("list of joined", joinedSessions);
  const tabs = [
    { name: "Your created study sessions", current: isTab0 },
    { name: "Your joined sessions", current: isTab1 },
  ];

  const handleTabNavigation = (tab, tabIdx) => {
    if (tabIdx === 0) {
      setIsTab0(true);
      setIsTab1(false);
    } else {
      setIsTab1(true);
      setIsTab0(false);
    }
  };

  const renderCards = (sessions, isCreatedSessions) => {
    return sessions.map((session) => (
      <div key={session.title}>
        <YellowSessionCard
          studySession={session}
          isCreatedSessions={isCreatedSessions}
        />
      </div>
    ));
  };

  return (
    <div className="bg-blue-light pt-10 h-screen">
      <nav
        className="flex ml-10 mr-10 mb-4 z-0 rounded-lg shadow divide-x divide-gray-200"
        aria-label="Tabs"
      >
        {tabs.map((tab, tabIdx) => (
          <a
            onClick={() => handleTabNavigation(tab, tabIdx)}
            key={tab.name}
            className={classNames(
              tab.current
                ? "text-gray-900 bg-purple-dark bg-opacity-30"
                : "text-gray-500 bg-purple-light hover:text-gray-700",
              tabIdx === 0 ? "rounded-l-lg" : "",
              tabIdx === tabs.length - 1 ? "rounded-r-lg" : "",
              "group relative min-w-0 flex-1 bg-white py-4 px-4 text-sm font-medium text-center hover:bg-purple-dark hover:bg-opacity-30 focus:z-10"
            )}
            aria-current={tab.current ? "page" : undefined}
          >
            <span>{tab.name}</span>
            <span
              aria-hidden="true"
              className={classNames(
                tab.current ? "bg-purple-dark" : "bg-transparent",
                "absolute inset-x-0 bottom-0 h-0.5"
              )}
            />
          </a>
        ))}
      </nav>
      <div className="flex flex-col gap-y-3">
        {isTab0
          ? renderCards(mySessions, isCreatedSessions)
          : renderCards(joinedSessions, !isCreatedSessions)}
      </div>
    </div>
  );
}
