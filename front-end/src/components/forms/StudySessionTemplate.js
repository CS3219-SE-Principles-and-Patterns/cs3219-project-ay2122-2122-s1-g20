import { VscChromeClose } from "react-icons/vsc";
import Popup from "reactjs-popup";
import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import PropTypes from "prop-types";
import { AccountContext } from "../../context/AccountContext";
import ModuleButton from "./ModuleButton";
import TimeRangeSlider from "react-time-range-slider";
import YellowButton from "../YellowButton";
import SessionAlerts from "../alerts/SessionAlerts";
import { SessionContext } from "../../context/SessionContext";

const StudySessionTemplate = ({ setOpen, open, studySession }) => {
  const { updateMySessions, addMySession } = useContext(SessionContext);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const { modules, username } = useContext(AccountContext);
  const [session, setSession] = useState(
    studySession
      ? studySession
      : {
          title: "",
          isOnline: "",
          capacity: "",
          module: "",
          date: "",
          time: { start: "00:00", end: "23:59" },
          timeLimit: "",
          owner: username,
          participants: [username],
        }
  );

  const [isOnlineOption, setIsOnlineOption] = useState(
    studySession
      ? {
          value: studySession.isOnline,
          label: capitalizeFirstLetter(studySession.isOnline),
        }
      : null
  );

  // const addSelectedMods = (moduleCode) => {
  //   setSelectedMod([...selectedMod, moduleCode]);
  // };

  // const removeSelectedMods = (moduleCode) => {
  //   setSelectedMod(selectedMod.filter((mod) => mod != moduleCode));
  // };
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [show, setShow] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    return () => {
      setAlertMessage({});
      setIsError({});
      setShow({});
    };
  }, []);

  const resetStates = () => {
    setSession({
      owner: username,
      title: "",
      isOnline: "",
      capacity: "",
      module: "",
      date: "",
      time: { start: "00:00", end: "23:59" },
      timeLimit: "",
      participants: [username],
    });
    setIsOnlineOption(null);
  };

  const renderModuleOptions = modules.map((mod) => (
    <div key={mod.moduleCode}>
      <ModuleButton
        moduleCode={mod.moduleCode}
        session={session}
        setSession={setSession}
      />
    </div>
  ));

  const typeOptions = [
    { value: "online", label: "Online" },
    { value: "offline", label: "Offline" },
  ];

  const handleSelectDay = (event) => {
    setSession({ ...session, date: event.target.value });
  };
  const handleSelectType = (selectedOption) => {
    setSession({ ...session, isOnline: selectedOption.value });
    setIsOnlineOption(selectedOption);
  };

  const typeStyles = {
    indicatorSeparator: () => {},
    control: (provided) => ({
      ...provided,
      borderRadius: "16px",
      padding: "6px",
    }),
  };

  const handleSubmitForm = () => {
    setIsLoading(true);
    if (studySession) {
      handleSave();
    } else {
      handleCreate();
    }
  };

  const handleSave = async () => {
    try {
      const response = await updateMySessions(session);
      setAlertMessage(response);
      setIsError(false);
      setShow(true);
      setOpen(false);
    } catch (err) {
      setAlertMessage(err.message);
      setIsError(true);
      setShow(true);
      setOpen(true);
    }
    setIsLoading(false);
  };

  const handleCreate = async () => {
    try {
      const response = await addMySession(session);
      setAlertMessage(response);
      setIsError(false);
      setShow(true);
      setOpen(false);
    } catch (err) {
      setAlertMessage(err.message);
      setIsError(true);
      setShow(true);
      setOpen(true);
    }
    setIsLoading(false);
  };

  return (
    <div className="w-10">
      <Popup open={open} modal closeOnDocumentClick={false} lockScroll={true}>
        <form className="bg-blue-dark px-24 py-10 rounded-2xl" action="#">
          <button
            className="bg-purple-dark text-white mr-2 mt-2 absolute top-1 right-1 p-2 rounded-full"
            onClick={(event) => {
              event.preventDefault();
              setOpen(false);
              if (!studySession) {
                resetStates();
              }
            }}
          >
            <VscChromeClose />
          </button>
          <p className="text-3xl font-semibold text-grey-whitetinge ml-6">
            {studySession ? "Edit" : "Create a new"} study session
          </p>

          <div className="mt-4 grid grid-cols-6 items-center gap-x-2">
            <label className="text-lg text-white col-span-1 justify-self-end">
              Name
            </label>
            <input
              onChange={(event) =>
                setSession({ ...session, title: event.target.value })
              }
              value={session.title}
              type="text"
              placeholder="Enter name"
              id="groupName"
              name="groupName"
              required
              className={"p-3 rounded-2xl col-span-5"}
            />
          </div>
          <div className="mt-4 grid grid-cols-6 items-center gap-x-2">
            <label className="text-lg text-white col-span-1 justify-self-end">
              Capacity
            </label>
            <input
              onChange={(event) =>
                setSession({
                  ...session,
                  capacity: event.target.value.replace(/\D/, ""),
                })
              }
              value={session.capacity}
              type="text"
              placeholder="Enter capacity"
              id="capacity"
              name="capacity"
              required
              className={"p-3 rounded-2xl col-span-2"}
            />

            <label className="text-lg text-white col-span-1 justify-self-end">
              Type
            </label>
            <Select
              value={isOnlineOption}
              onChange={handleSelectType}
              options={typeOptions}
              placeholder="Select type"
              autoFocus
              isSearchable={false}
              styles={typeStyles}
              className="col-span-2"
            />
          </div>
          <div className="mt-4 grid grid-cols-6 gap-x-2">
            <label className="text-lg text-white col-span-1 justify-self-end">
              Modules
            </label>
            <div className="col-span-5 grid grid-cols-3 gap-2">
              {renderModuleOptions}
            </div>
          </div>
          <div className="mt-2 grid grid-cols-6 gap-x-2 items-center">
            {/* <div className="mt-2 flex flex-col justify-between"> */}
            <label className="text-lg text-white col-span-1 justify-self-end">
              Date
            </label>
            <input
              onChange={handleSelectDay}
              value={session.date}
              type="date"
              placeholder="Select Date"
              id="date"
              name="date"
              required
              className="p-3 rounded-2xl col-span-2"
            />
            {/* <Select
                value={selectedDayOption}
                onChange={handleSelectDay}
                options={options}
                placeholder="Select day"
                autoFocus
                isSearchable={false}
                styles={customStyles}
              /> */}
            <label className="text-lg text-white col-span-1 justify-self-end">
              Time
            </label>
            <div className="col-span-2 flex flex-col pb-4 pl-2">
              <div className="flex justify-between">
                <span className="text-lg text-white">{session.time.start}</span>
                <span className="text-lg text-white">{session.time.end}</span>
              </div>
              <span>
                <TimeRangeSlider
                  disabled={false}
                  format={24}
                  maxValue={"23:59"}
                  minValue={"00:00"}
                  name={"time_range"}
                  // onChangeStart={this.changeStartHandler}
                  // onChangeComplete={this.changeCompleteHandler}
                  onChange={(time) => setSession({ ...session, time })}
                  step={15}
                  value={session.time}
                />
              </span>
            </div>
          </div>
          <div className="mt-2 grid grid-cols-6 items-center gap-x-2">
            <label className="text-lg text-white col-span-1 justify-self-end">
              Time Limit
            </label>
            <input
              onChange={(event) =>
                setSession({
                  ...session,
                  timeLimit: event.target.value.replace(/\D/, ""),
                })
              }
              value={session.timeLimit}
              type="text"
              placeholder="Enter time limit (hrs)"
              id="timeLimit"
              name="timeLimit"
              required
              className={"p-3 rounded-2xl col-span-2"}
            />
          </div>
          <div className="flex justify-center mt-6">
            <YellowButton
              text={studySession ? "Save" : "Create"}
              onClick={handleSubmitForm}
              isLoading={isLoading}
              textSize="text-lg"
              px="px-8"
            />
          </div>
        </form>
      </Popup>
      {show ? (
        <SessionAlerts
          show={show}
          setShow={setShow}
          isError={isError}
          message={alertMessage}
        />
      ) : undefined}
    </div>
  );
};

StudySessionTemplate.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  setLoad: PropTypes.func,
  load: PropTypes.bool,
  studySession: PropTypes.object,
};

export default StudySessionTemplate;
