import React from "react";
import Input from "../form/input/InputField";

const SearchBar = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <Input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3 py-2 border rounded-md dark:bg-black"
    />
  );
};

export default SearchBar;
