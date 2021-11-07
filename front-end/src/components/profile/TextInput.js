import React from "react";

const TextInput = ({
  label,
  value,
  setValue,
  type,
  isDisabled,
  editButton,
}) => {
  const handleTextChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <label
        //   htmlFor="email"
        className="flex text-xs sm:text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <span className="flex flex-row mt-0.5 space-x-2">
        <input
          disabled={isDisabled}
          onChange={handleTextChange}
          type={type ? type : "text"}
          name={label}
          id={label}
          value={value}
          className={`${
            isDisabled ? "text-black text-opacity-50 bg-opacity-50" : ""
          } appearance-none border-none w-56 sm:w-72 px-3 py-2 sm:py-3 text-xs sm:text-sm rounded-lg bg-blue-light focus:outline-none focus:ring-purple-dark focus:border-purple-dark`}
        />
        {editButton}
      </span>
    </div>
  );
};

export default TextInput;
