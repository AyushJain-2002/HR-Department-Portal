import React, { useState } from 'react';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { format, parse } from "date-fns";
const DateInputWithDayPicker = () => {
  const [value, setValue] = useState(null); // Initial state is null (empty input)
  const handleChange = (newValue) => {
    if (newValue instanceof Date && !isNaN(newValue.getTime())) {
      setValue(newValue);
    } else {
      setValue(null);
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-gray-700 font-medium">Select Date</label>
      <DatePicker
        onChange={handleChange}
        value={value}
        format="dd-MM-yyyy"
        className="react-date-picker"
        calendarClassName="rounded-lg bg-red-400 shadow-lg"
        placeholderText="dd-mm-yyyy" // Placeholder text
        clearIcon={null}             // Removes the clear button for cleaner UI
      />
    </div>
  );
};

export default DateInputWithDayPicker;
