import { VscChromeClose } from "react-icons/vsc";
import Popup from "reactjs-popup";
import React, { useContext, useState } from "react";
import Select from "react-select";
import PropTypes from "prop-types";
import { AccountContext } from "../../context/AccountContext";
import ModuleButton from "./ModuleButton";
import TimeRangeSlider from "react-time-range-slider";
import YellowButton from "../YellowButton";

const StudySessionTemplate = ({ setOpen, open, studySession }) => {
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const { modules } = useContext(AccountContext);
  const [name, setName] = useState(studySession ? studySession.title : "");
  const [isOnlineOption, setIsOnlineOption] = useState(
    studySession
      ? {
          value: studySession.isOnline,
          label: capitalizeFirstLetter(studySession.isOnline),
        }
      : null
  );
  const [isOnline, setIsOnline] = useState(
    studySession ? studySession.isOnline : ""
  );
  const [capacity, setCapacity] = useState(
    studySession ? studySession.capacity : ""
  );
  const [selectedMod, setSelectedMod] = useState(
    studySession ? studySession.module : ""
  );
  // const [selectedDayOption, setSelectedDayOption] = useState(
  //   studySession
  //     ? {
  //         value: studySession.date,
  //         label: capitalizeFirstLetter(studySession.date),
  //       }
  //     : null
  // );
  const [selectedDay, setSelectedDay] = useState(
    studySession ? studySession.date : ""
  );
  const [time, setTime] = useState(
    studySession
      ? studySession.time
      : {
          start: "00:00",
          end: "23:59",
        }
  );
  const [timeLimit, setTimeLimit] = useState(
    studySession ? studySession.timeLimit : ""
  );

  console.log(isOnline, selectedDay);

  // const addSelectedMods = (moduleCode) => {
  //   setSelectedMod([...selectedMod, moduleCode]);
  // };

  // const removeSelectedMods = (moduleCode) => {
  //   setSelectedMod(selectedMod.filter((mod) => mod != moduleCode));
  // };

  const resetStates = () => {
    setName("");
    setCapacity("");
    setIsOnline("");
    setIsOnlineOption(null);
    setSelectedMod("");
    setSelectedDay("");
    // setSelectedDayOption(null);
    setTime({
      start: "00:00",
      end: "23:59",
    });
  };

  const renderModuleOptions = modules.map((mod) => (
    <div key={mod.moduleCode}>
      <ModuleButton
        moduleCode={mod.moduleCode}
        selectedMod={selectedMod}
        setSelectedMod={setSelectedMod}
      ></ModuleButton>
    </div>
  ));

  // const options = [
  //   { value: "monday", label: "Monday" },
  //   { value: "tuesday", label: "Tuesday" },
  //   { value: "wednesday", label: "Wednesday" },
  //   { value: "thursday", label: "Thursday" },
  //   { value: "friday", label: "Friday" },
  //   { value: "saturday", label: "Saturday" },
  //   { value: "sunday", label: "Sunday" },
  // ];

  const typeOptions = [
    { value: "online", label: "Online" },
    { value: "offline", label: "Offline" },
  ];

  const handleSelectDay = (event) => {
    setSelectedDay(event.target.value);
    // setSelectedDayOption(selectedOption);
  };
  const handleSelectType = (selectedOption) => {
    setIsOnline(selectedOption.value);
    setIsOnlineOption(selectedOption);
  };

  // const customStyles = {
  //   indicatorSeparator: () => {},
  //   control: (provided) => ({
  //     ...provided,
  //     borderRadius: "16px",
  //     padding: "6px",
  //     width: "10.5rem",
  //   }),
  //   menuList: (provided) => ({
  //     ...provided,
  //     height: "6rem",
  //   }),
  // };

  const typeStyles = {
    indicatorSeparator: () => {},
    control: (provided) => ({
      ...provided,
      borderRadius: "16px",
      padding: "6px",
    }),
  };

  return (
    <div className="w-10">
      <Popup open={open} modal closeOnDocumentClick={false} lockScroll={false}>
        <form
          className="bg-blue-dark px-32 py-10 rounded-2xl"
          action="#"
          method="POST"
        >
          <button
            className="bg-purple-dark text-white mr-2 mt-2 absolute top-1 right-1 p-2 rounded-full"
            onClick={() => {
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
              onChange={(event) => setName(event.target.value)}
              value={name}
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
                setCapacity(event.target.value.replace(/\D/, ""))
              }
              value={capacity}
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
            <div className="col-span-5 grid grid-cols-4 gap-2">
              {renderModuleOptions}
            </div>
          </div>
          <div className="mt-2 grid grid-cols-6 gap-x-2 items-center">
            {/* <div className="mt-2 flex flex-col justify-between"> */}
            <label className="text-lg text-white col-span-1 justify-self-end">
              Date and Time
            </label>
            <div className="col-span-2">
              <input
                onChange={handleSelectDay}
                value={selectedDay}
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
            </div>

            <div className="col-span-3 flex flex-col pb-4">
              <div className="flex justify-between">
                <span className="text-lg text-white">{time.start}</span>
                <span className="text-lg text-white">{time.end}</span>
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
                  onChange={(time) => setTime(time)}
                  step={15}
                  value={time}
                />
              </span>
            </div>
            {/* <YellowButton
                text="Add"
                onClick={handleAddTime}
                textSize="text-sm"
                px="px-1"
              /> */}
          </div>
          <div className="mt-2 grid grid-cols-6 items-center gap-x-2">
            <label className="text-lg text-white col-span-1 justify-self-end">
              Time Limit
            </label>
            <input
              onChange={(event) =>
                setTimeLimit(event.target.value.replace(/\D/, ""))
              }
              value={timeLimit}
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
              // onClick={handleSave} OR handleCreate
              textSize="text-lg"
              px="px-8"
            />
          </div>
        </form>
      </Popup>
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
