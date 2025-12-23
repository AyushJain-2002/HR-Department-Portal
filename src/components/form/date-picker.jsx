import { useEffect, useRef } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";
import Label from "./Label";
import { CalenderIcon } from "../../icons";

export default function DatePicker({
  id,
  name,
  label,
  mode,
  onChange,
  defaultDate,
  placeholder,
  minDate,
  maxDate,
  value,
  format = "Y-m-d",
  required,
  className = "",
  placeholderText,
  onBlur,
  error,
  hint,
  ...rest
}) {
  const fpRef = useRef(null);
  const inputRef=useRef(null);
  useEffect(() => {
      fpRef.current = flatpickr(inputRef.current, {
      mode: mode || "single",
      static: false,
      monthSelectorType: "static",
      dateFormat: format,
      defaultDate: value || defaultDate,
      minDate: minDate,
      maxDate: maxDate,
       position: "auto", // Let flatpickr handle positioning
      positionElement: inputRef.current, // Anchor to input element
      onChange: (selectedDates) => {
        if (onChange) {
          onChange(selectedDates[0] || null);
        }
      },
    });

     return () => {
      if (fpRef.current?.destroy) {
        fpRef.current.destroy();
        fpRef.current = null;
      }
    };
  }, []);
// [mode, onChange, defaultDate, minDate, maxDate, value, format]
    // Update flatpickr when value changes
 useEffect(() => {
  if (fpRef.current && value) {
    fpRef.current.setDate(value || null, false); 
  }
}, [value]);


  return (
    <div>
      {label ? <Label htmlFor={id}>{label}</Label> : null}

      <div className="relative">
        <input
          id={id}
          name={name}
          ref={inputRef}
          required={required}
          placeholder={placeholderText || placeholder}
          className={`h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800 flatpickr-input ${className}`}
          onBlur={() => {
            if (onBlur) {
              const inputValue = fpRef.current?.input?.value || "";
              onBlur(inputValue);
            }
          }}
          {...rest}
        />
      <span className="absolute right-0 top-1/2 -translate-y-1/2 border-l border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
        <CalenderIcon className="size-6" />
      </span>
      </div>
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
}




// import { useEffect } from "react";
// import flatpickr from "flatpickr";
// import "flatpickr/dist/flatpickr.css";
// import Label from "./Label";
// import { CalenderIcon } from "../../icons";

// export default function DatePicker({
//   id,
//   mode,
//   onChange,
//   label,
//   defaultDate,
//   placeholder,
// }) {
//   useEffect(() => {
//     const flatPickr = flatpickr(`#${id}`, {
//       mode: mode || "single",
//       static: true,
//       monthSelectorType: "static",
//       dateFormat: "Y-m-d",
//       defaultDate,
//       onChange,
//     });

//     return () => {
//       if (flatPickr && typeof flatPickr.destroy === "function") {
//         flatPickr.destroy();
//       }
//     };
//   }, [mode, onChange, id, defaultDate]);

//   return (
//     <div>
//       {label ? <Label htmlFor={id}>{label}</Label> : null}

//       <div className="relative">
//         <input
//           id={id}
//           placeholder={placeholder}
//           className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800"
//         />

//         <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
//           <CalenderIcon className="size-6" />
//         </span>
//       </div>
//     </div>
//   );
// }