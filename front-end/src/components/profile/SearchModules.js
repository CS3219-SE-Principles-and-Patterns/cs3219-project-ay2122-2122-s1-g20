import React, { useContext, useState, useEffect } from "react";
import Autosuggest from "react-autosuggest";
import axios from "axios";
import { FiSearch } from "react-icons/fi";
import { AccountContext } from "../../context/AccountContext";

const SearchModules = () => {
  const [value, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [moduleList, setModuleList] = useState("");
  const { handleAddModules } = useContext(AccountContext);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data } = await axios.get(
      "https://api.nusmods.com/v2/2021-2022/moduleList.json"
    );
    setModuleList(data);
  };

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : moduleList.filter((mod) => {
          const label = mod.moduleCode + " " + mod.title;
          return label.toLowerCase().slice(0, inputLength) === inputValue;
        });
  };

  const getSuggestionValue = (suggestion) =>
    suggestion.moduleCode + " " + suggestion.title;

  const renderSuggestion = (suggestion) => (
    <div>{suggestion.moduleCode + " " + suggestion.title}</div>
  );

  const inputProps = {
    placeholder: "Search for a module",
    value,
    onChange: (event, { newValue }) => {
      setSearchInput(newValue);
    },
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  // REMOVED -- add button
  // const handleSearch = (event) => setSearchInput(event.target.value);
  // const handleEnter = (event) => {
  //   event.preventDefault();
  //   setSearchInput("");
  //   handleAddModules(value);
  // };

  // const handleOnPress = () => {
  //   setSearchInput("");
  //   handleAddModules(value);
  // };

  const handleSelectModule = (event, { suggestion }) => {
    if (suggestion) {
      handleAddModules(suggestion);
      setSearchInput("");
    }
  };

  return (
    <div className="flex flex-row justify-center my-5 space-x-5">
      <span className="relative">
        {/* styling @ app.css */}
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          onSuggestionSelected={handleSelectModule}
          highlightFirstSuggestion
        />
        {/* <input
          value={value.label}
          onChange={handleSearch}
          id="value"
          name="value"
          type="text"
          placeholder="Search for modules"
          className={`text-xs sm:${textSize} w-64 sm:w-80 pl-12 pr-3 py-2 sm:py-3 rounded-2xl ${
            isProfilePage ? "bg-blue-light" : "bg-purple-light"
          } focus:outline-none focus:ring-purple-dark focus:border-purple-dark`}
        /> */}
        <FiSearch className="absolute top-4 left-4 text-purple-dark" />
      </span>
      {/* <YellowButton
        text="Add"
        onClick={handleOnPress}
        textSize={textSize}
        px="px-7"
      /> */}
    </div>
  );
};

export default SearchModules;
