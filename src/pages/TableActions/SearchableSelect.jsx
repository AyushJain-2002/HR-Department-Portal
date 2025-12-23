import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";

const SearchableSelect = ({
  options,
  value,
  required,
  onChange,
  placeholder = "Select",
  storeLabel,
  errors,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchdata, setSearchdata] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null); // Reference for the select container
  const inputRef = useRef(null);
  // Filter options based on search term
  const filteredOptions = options.filter((option) =>
    option?.label?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // Handle selection of an option (send the entire option object)
  const handleSelect = (option) => {
    console.log(option)
    onChange(option); // Pass the entire option (both value and label)
    setIsOpen(true); // Close the dropdown immediately
    setSearchTerm(""); // Clear the search term
  };
  // Find the label for the currently selected value (from the options list)
  const selectedOption = options.find(
    (option) => option.label === value || option.value === Number(value) // Compare as strings for flexibility
  );
  console.log(value?value:"helloo")
  // Check if selectedOption is found, otherwise fallback to the placeholder
  const selectedLabel = selectedOption ? selectedOption.label : value && value!== null  ? value : placeholder;
  // console.log("all the things ",selectedLabel,selectedOption,value)
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update search term
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false); // Close dropdown if the click is outside the select area
        setSearchTerm(""); // Reset search term when closed
      }
    };
    document.addEventListener("mousedown", handleClickOutside); // Listen for click outside
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Cleanup listener
    };
  }, []);

  // Focus input when dropdown opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus(); // Automatically focus the input when the dropdown is open
    }
  }, [isOpen]);

  // Toggle dropdown when Tab key is pressed
  const handleTabKey = (e) => {
    if (e.key === "Tab") {
      setIsOpen((prev) => !prev); // Toggle the dropdown when Tab is pressed
    }
  };
  // console.log(value)
  const handleClick = () => {
    setIsOpen((prev) => !prev); // Toggle dropdown visibility
  };
  return (
    <div
      ref={selectRef}
      className="relative w-full"
      tabIndex={0}
      onClick={handleClick}
      // Close dropdown when hover ends
      onKeyDown={handleTabKey} // Capture the Tab key press
    >
      {/* Dropdown toggle */}
      <div
        className={`w-full ${
          errors ? "border-red-600 focus:border-red-600" : ""
        } text-slate-900 text-base hover:border-blue-600 border-2 rounded-xl pl-3 pr-4 py-1.5 flex items-center justify-between cursor-pointer`}
      >
        {isOpen ? (
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            required={required}
            placeholder="Search..."
            className="w-full font-times py-0 text-black border-slate-200 text-base outline-none"
            tabIndex={0} // Ensure the input field is part of the tab order
          />
        ) : (
          <span className="font-times">
            {storeLabel  ? selectedLabel : selectedLabel}
          </span>
        )}
        <IoIosArrowDown
          className={`h-5 w-5 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>
     
      {isOpen && (
        <div className="absolute top-full left-0  w-full bg-white border border-slate-200 rounded  shadow-md z-10">
          <div className="max-h-40 mt-3y  overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => handleSelect(option)} // Select the option object
                  className="px-3 py-1.5 font-times hover:bg-gray-200 cursor-pointer"
                  tabIndex={0} // Ensure that options are focusable via tab
                >
                  {option.label}
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-gray-500">No results found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchableSelect;


