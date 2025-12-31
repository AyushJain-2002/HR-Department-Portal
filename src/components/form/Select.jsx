import { useEffect, useRef, useState } from "react";
import ReactSelect from "react-select";
const Select= ({
  field,
  options,
  disabled =false,
  placeholder="Select",
  onChange,
  className = "",
  defaultValue = "",
  onBlur,
  error=false,
  hint
}) => { 

  const dropdownRef=useRef(null);
  const [selectedValue, setSelectedValue] = useState(null);
  
  // 🔴 FIXED: Handle defaultValue changes properly
  // ✅ Sync defaultValue (object OR primitive)
  useEffect(() => {
    if (!defaultValue) {
      setSelectedValue(null);
      return;
    }

    if (typeof defaultValue === "object") {
      setSelectedValue(defaultValue);
    } else {
      const found = options.find(
        (opt) => String(opt.value) === String(defaultValue)
      );
      setSelectedValue(found || null);
    }
  }, [defaultValue, options]);
  
  const handleChange = (option, actionMeta) => {
  setSelectedValue(option);
   onChange(option, {
    name: field?.name,
    required: field?.required,
    action: actionMeta?.action || "select-option",
  });
};
 
  const handleBlur = () => {
    if (onBlur) {
      onBlur(selectedValue || null);
    }
  };
  return (
    <div ref={dropdownRef} className="relative w-full">
    <ReactSelect
        value={selectedValue}
        options={options}
        isDisabled={disabled}
        placeholder={placeholder}
        isClearable
        onChange={handleChange}
        onBlur={handleBlur}
        classNamePrefix="react-select"
        className="text-sm  dark:border-gray-700 dark:bg-gray-900 dark:focus:border-brand-800 dark:bg-dark-900 dark:bg-dark-900 dark:placeholder:text-white/30 dark:text-slate-100 dark:bg-dark-900"
        styles={{
          control: (base, state) => ({
            ...base,
            minHeight: "44px",
            borderRadius: "0.6rem",
            borderColor: !state.isFocused
             ? "#d1d5db"
              : "#3b82f6",
            boxShadow: state.isFocused
              ? "0 0 0 1px rgba(59,130,246,0.1)"
              : "none",
            "&:hover": {
              borderColor: "#3b82f6d",
            },
            backgroundColor: "transparent",
          }),
          placeholder: (base) => ({
            ...base,
            color: "#9ca3af",
          }),
          singleValue: (base) => ({
            ...base,
            color: "gray",
          }),
          menu: (base) => ({
            ...base,
            zIndex: 50,
          }),
        }}
        
      />
      {hint && (
        <p
          className={`mt-1.5 text-xs ${
            error
              ? "text-error-500"
              : success
              ? "text-success-500"
              : "text-gray-500"
          }`}
        >
          {hint}
        </p>
      )}
    </div>
  );
};

export default Select;
