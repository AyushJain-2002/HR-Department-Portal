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
  const [isOpen, setIsOpen] = useState(false);
  // console.log("placeholder",placeholder)
  //   const toggleDropdown = () => {
  //   if (!disabled) {
  //     setIsOpen((prev) => !prev);
  //     setFocusedIndex(-1);
  //   }
  // };

  // ⭐ Sync value when formData changes
  //  useEffect(() => {
  //   setSelectedValue(defaultValue);
  //   // console.log(defaultValue)
  // }, [defaultValue]);
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
  //  useEffect(() => {
  //     const handleClickOutside = (event) => {
  //       if (
  //         dropdownRef.current &&
  //         // !dropdownRef.current.contains(event.target)
  //         !dropdownRef.current.contains(event)
  //       ) {
  //         setIsOpen(false);
  //       }
  //     };
      
  //   if (isOpen) {
  //     document.addEventListener("mousedown", handleClickOutside);
  //     return () =>
  //       document.removeEventListener("mousedown", handleClickOutside);
  //   }
  // }, [isOpen]);
  // const handleChange = (e) => {
  //   const value = e.value;
  //   // console.log(options,"options")
  //   // console.log(value,"value")

  //    // ⭐ Allow user to clear placeholder
  //   if (value === "") {
  //     setSelectedValue("");
  //     onChange(null, { name: field?.name });
  //     return;
  //   }
  //   const selectedOption =  options.find((opt) => {return opt.value == value });
  //   // console.log(selectedOption,"values in select") 
  //   setSelectedValue(value);

  //   // ⚠️ Send object + actionMeta (like React-Select)
  //   if (selectedOption) {
  //   onChange(
  //       selectedOption,
  //       { 
  //         name: field?.name, 
  //         required: field?.required,
  //         action: "select-option" 
  //       }  // same structure used in your form handleChange
  //     );
  //   }
  // };
  
  // console.log(`in select value field is ${defaultValue}`)
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
      // // 🔴 FIXED: Pass proper value to onBlur
      // const value = e.value;
      // const selectedOption = options?.find((opt) => String(opt.value) === String(value));
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
      {/* <svg className="absolute text-gray-700 dark:text-gray-400 right-3 top-1/2 -translate-y-1/2 pointer-events-none" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.79175 8.02075L10.0001 13.2291L15.2084 8.02075" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg> */}
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



{/* <select

      className={`h-11 w-full appearance-none rounded-lg border-1 border-gray-300 bg-transparent px-3 
                  py-1.5 pr-11  shadow-theme-xs  focus:border-brand-300 focus:outline-hidden 
                  focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 
                dark:focus:border-brand-800 dark:bg-dark-900 focus:outline-hidden focus:ring-3 
                text-slate-400 placeHolder:text-slate-400 focus:outline-hidden focus:ring-3 
                dark:bg-dark-900 dark:placeholder:text-white/30 focus:outline-hidden focus:ring-3 font-time text-sm 
                transition duration-300 ease focus:outline-none hover:border-blue-600 border-slate-200
                dark:text-slate-100 dark:bg-dark-900 focus:outline-hidden focus:ring-3   
        ${
        selectedValue
          ? "text-gray-800 dark:text-white/90"
          : "text-gray-400 dark:text-gray-400"
      } ${className}`}

      value={selectedValue}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder={placeholder}
      disabled={disabled} 
    >

      {/* Placeholder option */}
      {/* {placeholder && (<option
        key=""
        value=""
        className="text-gray-700 dark:bg-gray-600 dark:text-gray-400 "
      >
        {placeholder}
      </option>)} */}
      {/* Map over options */}

      {/* {options?.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}


    </select> */}





// import { useEffect, useRef, useState } from "react";
// import Select from "react-select"; // Import react-select

// const CustomSelect = ({
//   field,
//   options,
//   disabled = false,
//   placeholder = "Select",
//   onChange,
//   className = "",
//   defaultValue = "",
//   onBlur,
//   errors
// }) => {
//   const dropdownRef = useRef(null);
//   // Convert defaultValue to react-select format (object or null)
//   const initialValue = defaultValue ? 
//     options?.find(opt => opt.value == defaultValue) || null : 
//     null;
  
//   const [selectedValue, setSelectedValue] = useState(initialValue);
//   const [isOpen, setIsOpen] = useState(false);

//   // Handle outside click (similar to your original logic)
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target)
//       ) {
//         setIsOpen(false);
//       }
//     };
    
//     if (isOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//       return () =>
//         document.removeEventListener("mousedown", handleClickOutside);
//     }
//   }, [isOpen]);

//   // Handle value change - matches your original logic
//   const handleChange = (selectedOption, actionMeta) => {
//     // ⭐ Allow user to clear selection (matches your logic)
//     if (!selectedOption) {
//       setSelectedValue(null);
//       onChange(null, { name: field?.name });
//       return;
//     }
    
//     setSelectedValue(selectedOption);
    
//     // ⚠️ Send object + actionMeta (same structure as your original)
//     // react-select already provides the selected option object
//     onChange(
//       selectedOption,
//       { 
//         name: field?.name, 
//         required: field?.required,
//         ...actionMeta
//       }
//     );
//   };
//   console.log(selectedValue)
//   // Convert onBlur to react-select format
//   const handleBlur = (event) => {
//     if (onBlur) {
//       onBlur(event);
//     }
//   };

//   return (
//     <div ref={dropdownRef} className="relative w-full">
//       <Select
//         // Basic configuration
//         value={selectedValue}
//         onChange={handleChange}
//         onBlur={handleBlur}
//         options={options}
//         placeholder={placeholder}
//         isDisabled={disabled}
//         isClearable={true} // Allows clearing like your empty value option
//         isSearchable={true} // Standard feature in react-select
        
//         // Maintain your original class structure
//         className={`react-select-container ${className}`}
//         classNamePrefix="react-select"
        
//         // // Custom styles to match your original appearance
//         // styles={{
//         //   control: (base, state) => ({
//         //     ...base,
//         //     height: '44px', // ~ h-11
//         //     borderRadius: '0.5rem', // rounded-lg
//         //     borderWidth: '1px',
//         //     borderColor: state.isFocused ? '#3b82f6' : '#e5e7eb', // focus:border-blue-600 default
//         //     backgroundColor: 'transparent',
//         //     boxShadow: state.isFocused ? '0 0 0 3px rgba(59, 130, 246, 0.1)' : 'none', // focus:ring-3
//         //     '&:hover': {
//         //       borderColor: '#2563eb' // hover:border-blue-600
//         //     }
//         //   }),
//         //   placeholder: (base) => ({
//         //     ...base,
//         //     color: '#94a3b8' // text-slate-400
//         //   }),
//         //   singleValue: (base) => ({
//         //     ...base,
//         //     color: selectedValue ? '#1f2937' : '#94a3b8' // Your conditional text colors
//         //   }),
//         //   menu: (base) => ({
//         //     ...base,
//         //     backgroundColor: '#1f2937', // dark:bg-dark-900 equivalent
//         //     zIndex: 9999
//         //   }),
//         //   option: (base, state) => ({
//         //     ...base,
//         //     backgroundColor: state.isSelected ? '#3b82f6' : 
//         //                    state.isFocused ? '#374151' : 'transparent',
//         //     color: state.isSelected ? 'white' : '#e5e7eb',
//         //     '&:hover': {
//         //       backgroundColor: '#4b5563'
//         //     }
//         //   })
//         // }}
        
//         // // Theme customization for dark mode
//         // theme={(theme) => ({
//         //   ...theme,
//         //   colors: {
//         //     ...theme.colors,
//         //     primary: '#3b82f6', // brand color
//         //     primary25: 'rgba(59, 130, 246, 0.1)', // focus ring color
//         //     neutral0: '#111827', // dark background
//         //     neutral80: '#f9fafb', // light text
//         //     neutral50: '#94a3b8' // placeholder
//         //   }
//         // })}
//       />
//     </div>
//   );
// };

// export default CustomSelect;











// // import { useState } from "react";


// // const Select= ({
// //   options,
// //   placeholder = "Select an option",
// //   onChange,
// //   className = "",
// //   defaultValue = "",
// // }) => {
// //   // Manage the selected value
// //   const [selectedValue, setSelectedValue] = useState(defaultValue);

// //   const handleChange = (e) => {
// //     const value = e.target.value;
// //     setSelectedValue(value);
// //     onChange(value); // Trigger parent handler
// //   };

// //   return (
// //     <select
// //       className={`h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 ${
// //         selectedValue
// //           ? "text-gray-800 dark:text-white/90"
// //           : "text-gray-400 dark:text-gray-400"
// //       } ${className}`}
// //       value={selectedValue}
// //       onChange={handleChange}
// //     >
// //       {/* Placeholder option */}
// //       <option
// //         value=""
// //         disabled
// //         className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
// //       >
// //         {placeholder}
// //       </option>
// //       {/* Map over options */}
// //       {options.map((option) => (
// //         <option
// //           key={option.value}
// //           value={option.value}
// //           className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
// //         >
// //           {option.label}
// //         </option>
// //       ))}
// //     </select>
// //   );
// // };

// // export default Select;

