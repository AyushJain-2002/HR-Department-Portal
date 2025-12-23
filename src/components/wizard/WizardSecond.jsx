// import React, { useState, useMemo, useEffect } from "react";
// import { Stepper, Step, Button, Typography } from "@material-tailwind/react";
// import SearchableSelect from "../../Pages/TableActions/SearchableSelect.jsx";
// import Select from "react-select";
// import CreatableSelect from "react-select/creatable";
// // import DatePicker from "react-datepicker";
// import DatePicker from "react-date-picker";
// import "react-date-picker/dist/DatePicker.css";
// import "react-calendar/dist/Calendar.css";
// import "react-datepicker/dist/react-datepicker.css";
// import { format } from "date-fns";
// import {
//   fetchCitiesByState,
//   fetchCitiesByStateAnother,
// } from "../../store/Actions/StateAction";
// import { useDispatch } from "react-redux";
// import { RxCross1 } from "react-icons/rx";
// import { IoCheckmark } from "react-icons/io5";
// import { TiTick } from "react-icons/ti";
// import { IoMdCheckmark } from "react-icons/io";
// import { useLocation } from "react-router-dom";
// import {
//   fetchPosp,
//   fetchRelationshipManager,
//   fetchReportingManager,
//   fetchReportingManagerWithPosp,
// } from "../../store/Actions/OperationAction";
// export function WizardSecond({
//   fields,
//   otherFields = [],
//   resetValue,
//   onSubmit,
//   onReset,
//   onChange,
//   isEditMode = false,
//   errors = {},
//   success,
//   initialValues = {},
//   otherHead,
// }) {
//   const location = useLocation();
//   const [activeStep, setActiveStep] = useState(0);
//   const [isLastStep, setIsLastStep] = useState(false);
//   const [isFirstStep, setIsFirstStep] = useState(false);
//   const [resetFlag, setResetFlag] = useState(false);
//   const [formData, setFormData] = useState({});
//   const [internalErrors, setInternalErrors] = useState({});
//   const [isInitialized, setIsInitialized] = useState(false);

//   useEffect(() => {
//     const isEditPage = ![
//       "/master/hr/create-employee",
//       "/master/hr/add-misp",
//     ].includes(location.pathname);

//     if (
//       isEditPage &&
//       initialValues &&
//       Object.keys(initialValues).length > 0 &&
//       !isInitialized
//     ) {
//       setFormData(initialValues); // ✅ fill form
//       setIsInitialized(true); // ✅ mark done
//     }
//   }, [initialValues, isInitialized, location.pathname]);
//   useEffect(() => {
//     if (
//       location.pathname === "/master/hr/create-employee" ||
//       location.pathname === "/master/hr/add-misp"
//     ) {
//       setFormData(resetValue);
//       setIsInitialized(false); // 🟡 Important: allow reinitialization if switching back to edit
//     }
//   }, [location.pathname, resetValue]);

//   // Runs when `initialValues` updates
//   const dispatch = useDispatch();
//   useEffect(() => {
//     if (success) {
//       const newFormData = [...fields, ...otherFields].reduce((acc, field) => {
//         acc[field.name] =
//           field.name === "branch_id" ? formData[field.name] : ""; // Reset each field to empty
//         return acc;
//       }, {});
//       setFormData(newFormData);
//       setResetFlag(false); // Reset the flag after reset
//     }
//   }, [success, fields, formData, otherFields]);
//   const handleChange = (selectedOption, actionMeta) => {
//     const name = actionMeta?.name;
//     if (!selectedOption) return;
//     const value = selectedOption ? selectedOption.value : "";
//     setFormData((prev) => {
//       let updatedFormData = { ...prev, [name]: value };

//       if (name === "current_address_state") {
//         updatedFormData.current_address_city = "";
//         updatedFormData[name] = selectedOption.label; // Set state name as label
//         dispatch(fetchCitiesByState(value));
//       } else if (name === "permanent_address_state") {
//         updatedFormData.permanent_address_city = "";
//         updatedFormData[name] = selectedOption.label; // Set state name as label
//         dispatch(fetchCitiesByStateAnother(value));
//       } else if (name === "state") {
//         updatedFormData.city = "";
//         updatedFormData[name] = selectedOption.label; // Set state name as label
//         dispatch(fetchCitiesByState(value));
//       } else if (name === "bqp") {
//         updatedFormData.reporting_manager = "";
//         updatedFormData[name] = selectedOption.value; // Set state name as label
//         dispatch(fetchReportingManager(value));
//         dispatch(fetchRelationshipManager(value));
//         dispatch(fetchReportingManagerWithPosp(value));
//       }
//       // else if (name === "reporting_manager") {
//       //   updatedFormData.relationship_manager = "";
//       //   updatedFormData[name] = selectedOption.value; // Set state name as label
//       //   dispatch(fetchRelationshipManager(value));
//       // }
//       else if (name === "relationship_manager") {
//         updatedFormData.posp_id = "";
//         updatedFormData[name] = selectedOption.value; // Set state name as label
//         dispatch(fetchPosp(value));
//       } else if (
//         name === "title" ||
//         name === "role" ||
//         name === "department" ||
//         name === "designation" ||
//         name === "bank_name" ||
//         name === "current_address_city" ||
//         name === "permanent_address_city" ||
//         name === "city" ||
//         name === "bankname" ||
//         name === "gender" ||
//         name === "education_level" ||
//         name === "account_type" ||
//         name === "marital_status" ||
//         name === "language"
//       ) {
//         updatedFormData[name] = selectedOption.label; // ✅ Set title as label
//       }
//       return updatedFormData;
//     });
//   };
//   useEffect(() => {
//     if (formData.bqp) {
//       dispatch(fetchReportingManager(formData.bqp));
//       dispatch(fetchRelationshipManager(formData.bqp));
//     }
//   }, [formData.bqp, dispatch]);

//   // useEffect(() => {
//   //   if (formData.reporting_manager) {
//   //     dispatch(fetchRelationshipManager(formData.reporting_manager));
//   //   }
//   // }, [formData.reporting_manager, dispatch]);
//   useEffect(() => {
//     if (formData.relationship_manager) {
//       dispatch(fetchPosp(formData.relationship_manager));
//     }
//   }, [formData.relationship_manager, dispatch]);

//   const [visitedSteps, setVisitedSteps] = useState(new Set([0]));
//   // console.log(formData)
//   const handleTextInputChange = (name, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     // console.log(value);
//     // if (onChange) {
//     //   onChange(name, value);
//     // }
//   };
//   const handleTextInput = (event) => {
//     const { name, value } = event.target;

//     let formattedValue = value;

//     if (
//       name === "mobile_no" ||
//       name === "alternative_mobile_no" ||
//       name === "nominee_mobile_number" ||
//       name === "alternative_mobile_number"
//     ) {
//       formattedValue = value.replace(/\D/g, "").slice(0, 10); // Max 10 digits only
//     } else if (name === "pancard_number") {
//       let cleaned = value.replace(/[^0-9A-Za-z]/g, "");
//       let letters = cleaned.slice(0, 5).replace(/[0-9]/g, "");
//       let numbers = cleaned.slice(5, 9).replace(/\D/g, "");
//       let lastLetter = cleaned.slice(9, 10).replace(/[0-9]/g, "");
//       formattedValue = (letters + numbers + lastLetter)
//         .toUpperCase()
//         .slice(0, 10);
//     } else if (name === "aadhar_no") {
//       formattedValue = value.replace(/\D/g, "").slice(0, 12); // Aadhaar: 12 digit numeric
//     } else if (name === "bankaccount_no" || name === "account_number") {
//       const cleaned = value.replace(/\D/g, "");
//       formattedValue = cleaned;
//       // Optional: You can also trigger an error if it's below min length
//       // Example: show a message if less than 9 digits
//       if (cleaned.length > 0 && cleaned.length < 9) {
//         console.warn("Bank account number should be at least 9 digits.");
//         // You can also set a formError here if you maintain one
//       } // Bank acc: digits only, max 18
//     } else if (
//       name === "pincode" ||
//       name === "permanent_address_pincode" ||
//       name === "current_address_pincode"
//     ) {
//       formattedValue = value.replace(/\D/g, "").slice(0, 6); // Pincode: 6 digits
//     }

//     setFormData((prev) => ({
//       ...prev,
//       [name]: formattedValue || "",
//     }));
//   };

//   const handlePrev = () => {
//     if (!isFirstStep) {
//       setActiveStep((prev) => prev - 1);
//     }
//   };
//   const handleStepClick = (index) => {
//     if (visitedSteps.has(index)) {
//       setActiveStep(index);
//     }
//   };

//   const handleSubmit = async () => {
//     try {
//       console.log("formData:", formData);

//       onSubmit(formData);
//       // setResetFlag(true);
//     } catch (error) {
//       console.log(error);
//       // alert("Failed to submit the form. Please try again.");
//     }
//   };
//   useEffect(() => {
//     setIsLastStep(activeStep === fields.length - 1);
//     setIsFirstStep(activeStep === 0);
//   }, [activeStep, fields.length]);
//   const handleRadioChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value, // Only update the field that was changed
//     }));

//     if (name === "same_as_permanent") {
//       if (value === "2") {
//         // If "Yes" is selected, copy current address to permanent address
//         setFormData((prev) => ({
//           ...prev,
//           permanent_address_street: prev.current_address_street,
//           permanent_address_city: prev.current_address_city,
//           permanent_address_state: prev.current_address_state,
//           permanent_address_pincode: prev.current_address_pincode,
//           permanent_address_town: prev.current_address_town,
//           permanent_house_no: prev.current_house_no,
//         }));
//       } else {
//         // Clear permanent address fields if "No" is selected
//         setFormData((prev) => ({
//           ...prev,
//           permanent_address_street: "",
//           permanent_address_city: "",
//           permanent_address_state: "",
//           permanent_address_pincode: "",
//         }));
//       }
//     }
//   };

//   // Filter fields for the active step
//   const renderStepContent = (currentStep) => {
//     if (!currentStep) return null;
//     // Find the current step's fields based on the active step
//     // const currentStep = fields[activeStep]; // Get the current step from the fields array
//     const currentFields = currentStep?.fields || []; // Access the fields of the current step
//     const permanentAddressFields = currentStep?.fields2 || [];
//     const otherFields = currentStep?.fields3 || [];
//     let allFields = [...currentFields, ...otherFields]; // Start with current fields

//     if (formData.same_as_permanent !== "2") {
//       allFields = [...allFields, ...permanentAddressFields];
//     }
//     return (
//       <div
//         className={` w-full  ${
//           currentStep?.title === "Address" ||
//           currentStep?.title === "Process to Upload" ||
//           currentStep?.title === "Documents" ||
//           currentStep?.title === "Address Book Details"
//             ? "lg:h-fit"
//             : "lg:h-80"
//         } `}
//       >
//         {/* Render the title for the current step */}
//         <Typography
//           variant="h6"
//           color="blue-gray"
//           className="mb-4 font-roboto text-xl underline font-bold"
//         >
//           {currentStep?.title}
//         </Typography>

//         {/* Map through the fields of the current step */}
//         <div
//           className={`grid  w-full gap-y-5 gap-x-4 ${
//             currentStep?.title === "Process to Upload"
//               ? "lg:grid-cols-2 "
//               : "lg:grid-cols-4"
//           } md:grid-cols-3`}
//         >
//           {allFields.map((field, index) => {
//             const getInputClass = (fieldName) =>
//               errors[fieldName]
//                 ? "border-red-600 focus:border-red-600"
//                 : "border-slate-200";

//             // Identify if the field belongs to otherFields
//             const isOtherField = otherFields.some(
//               (otherField) => otherField.name === field.name
//             );
//             const isReadOnly =
//               isOtherField && formData.posp_with_other_insurer !== "Yes";
//             return (
//               <div
//                 key={index}
//                 className={`grid relative gap-3 ${
//                   (field.type === "radio" &&
//                     field.name === "posp_with_other_insurer") ||
//                   field.type === "checkbox"
//                     ? "col-span-full"
//                     : ""
//                 } ${
//                   field.name === "reason_for_cessation_agency" ? " h-20" : ""
//                 }  `}
//               >
//                 {field.type !== "checkbox" && (
//                   <Typography
//                     variant="h6"
//                     color="blue-gray"
//                     className={`mb-0 font-roboto text-base font-normal ${getInputClass(
//                       field.name
//                     )} ${
//                       currentStep?.title === "Process to Upload"
//                         ? "font-semibold font-roboto"
//                         : "max-w-[150px] sm:max-w-[200px] md:max-w-[250px]"
//                     } overflow-hidden text-ellipsis `}
//                   >
//                     {currentStep?.title === "Process to Upload" &&
//                       `${index + 1}. `}
//                     {field.label}{" "}
//                     {field.required ? (
//                       <span className="text-red-500">*</span>
//                     ) : (
//                       ""
//                     )}
//                   </Typography>
//                 )}
//                 {currentStep?.title !== "Process to Upload" && (
//                   <>
//                     {field.type === "radio" ? (
//                       <div className="flex -mt-2  gap-4">
//                         {field.options.map((option, optionIndex) => (
//                           <label
//                             key={optionIndex}
//                             className="flex items-center"
//                           >
//                             <input
//                               type="radio"
//                               name={field.name}
//                               value={option.value}
//                               checked={
//                                 String(formData[field.name]) ===
//                                 String(option.value)
//                               }
//                               onChange={handleRadioChange}
//                               className="mr-2"
//                             />
//                             <span>{option.label}</span>
//                           </label>
//                         ))}
//                       </div>
//                     ) : field.type === "checkbox" ? (
//                       <div className="flex flex-col gap-4">
//                         <label className="flex items-center">
//                           <input
//                             type="checkbox"
//                             name={field.name}
//                             checked={formData[field.name] === 1} // Correctly bind the checkbox value to 1 or null
//                             onChange={(e) => {
//                               // Set the value to 1 if checked, or null (or 0) if unchecked
//                               const newValue = e.target.checked ? 1 : "";
//                               setFormData({
//                                 ...formData,
//                                 [field.name]: newValue,
//                               });
//                             }}
//                             className={`mr-2 ${getInputClass(field.name)}`}
//                           />
//                           <span>{field.label}</span>
//                         </label>
//                       </div>
//                     ) : field.type === "select" ? (
//                       <CreatableSelect
//                         options={field.options}
//                         // getOptionLabel={getOptionLabel}
//                         onChange={(selectedOption) =>
//                           handleChange(selectedOption, { name: field.name })
//                         }
//                         onCreateOption={(inputValue) => {
//                           const existingOption = field.options.find(
//                             (option) =>
//                               option.label.toLowerCase() ===
//                               inputValue.toLowerCase()
//                           );

//                           if (!existingOption) {
//                             const newOption = {
//                               value: field.options.length + 1,
//                               label: inputValue,
//                             };
//                             field.options.push(newOption);

//                             setFormData((prev) => ({
//                               ...prev,
//                               [field.name]: newOption.value,
//                             }));
//                           } else {
//                             setFormData((prev) => ({
//                               ...prev,
//                               [field.name]: existingOption.value,
//                             }));
//                           }
//                         }}
//                         id={field.name}
//                         name={field.name}
//                         isDisabled={field.disabled || isReadOnly}
//                         defaultValue={
//                           field.defaultValue && field.defaultValue.value
//                             ? field.defaultValue
//                             : null
//                         }
//                         // isDisabled={isReadOnly}
//                         required={field.required}
//                         value={
//                           field.disabled
//                             ? field.defaultValue
//                             : formData[field.name] !== undefined &&
//                               formData[field.name] !== null &&
//                               formData[field.name] !== ""
//                             ? field.options.find(
//                                 (option) =>
//                                   String(option.value) ===
//                                   String(formData[field.name])
//                               ) || {
//                                 value: formData[field.name],
//                                 label: String(formData[field.name]),
//                               }
//                             : null
//                         }
//                         placeholder={field.placeholder}
//                         className={` ${getInputClass(
//                           field.name
//                         )} basic-single font-roboto`}
//                         styles={{
//                           control: (base, state) => ({
//                             ...base,
//                             borderRadius: "0.75rem",
//                             borderWidth: "2px",
//                             borderColor: errors[field.name]
//                               ? "#dc2626" // Red border for errors
//                               : state.isFocused
//                               ? "#1e88e5" // Blue border when focused
//                               : "#e2e8f0",
//                             fontSize: "14px",
//                             boxShadow: "none",
//                             "&:hover": {
//                               borderColor: errors[field.name]
//                                 ? "#dc2626"
//                                 : "#1e88e5",
//                             },
//                           }),
//                           menu: (base) =>
//                             field.dropdown ? { ...base, zIndex: 9999 } : base,
//                           singleValue: (base) => ({
//                             ...base,
//                             overflow: "hidden",
//                             whiteSpace: "nowrap",
//                             textOverflow: "ellipsis",
//                             maxWidth: "90%",
//                           }),
//                         }}
//                         filterOption={(option, inputValue) =>
//                           option.data.label
//                             .toLowerCase()
//                             .includes(inputValue.toLowerCase())
//                         }
//                         classNamePrefix="select"
//                       />
//                     ) : field.type === "date" ? (
//                       <div
//                         // ref={(el) => (datePickerRefs.current[field.name] = el)}
//                         className="w-full z-auto date-wrapper h-fit"
//                       >
//                         <DatePicker
//                           name={field.name}
//                           yearPlaceholder="yyyy"
//                           monthPlaceholder="mm"
//                           disabled={field.readOnly || isReadOnly}
//                           dayPlaceholder="dd"
//                           yearAriaLabel="Year"
//                           minDate={new Date(1900, 11, 31)}
//                           maxDate={new Date(new Date().getFullYear(), 11, 31)}
//                           onChange={(date) => {
//                             if (date) {
//                               const formattedDateForDatabase = format(
//                                 date,
//                                 "yyyy-MM-dd"
//                               );
//                               handleTextInput({
//                                 target: {
//                                   name: field.name,
//                                   value: formattedDateForDatabase,
//                                 },
//                               });
//                             }
//                           }}
//                           value={
//                             formData[field.name]
//                               ? new Date(formData[field.name])
//                               : null
//                           }
//                           format="dd/MM/yyyy"
//                           required={field.required}
//                           className={`react-date-picker  ${
//                             errors[field.name]
//                               ? "border-red-600 focus:border-red-600"
//                               : "border-slate-200"
//                           } ${
//                             field.readOnly || isReadOnly
//                               ? "bg-gray-200 cursor-not-allowed"
//                               : ""
//                           }`}
//                           calendarClassName="rounded-lg font-roboto bg-red-400 shadow-lg"
//                           placeholderText="dd/mm/yyyy"
//                           clearIcon={null}
//                           // onKeyDown={(event) => handleKeyDown(event, field.name)}
//                           // onInvalid={(event) => handleInvalid(event, field.name)} // FIX
//                         />
//                       </div>
//                     ) : field.type === "file" ? (
//                       <div className="w-full">
//                         {/* Display sample image or uploaded file preview */}
//                         {formData[field.name] &&
//                         formData[field.name] !== "null" ? (
//                           // Display uploaded file preview if formData[field.name] is not null
//                           <div className="mb-4 flex items-center space-x-4">
//                             <img
//                               src={
//                                 typeof formData[field.name] === "string"
//                                   ? formData[field.name] // If it's a URL, use it directly
//                                   : URL.createObjectURL(formData[field.name]) // If it's a file object, create a preview URL
//                               }
//                               alt="Uploaded File"
//                               className={`w-full h-32 object-fill rounded-lg  border border-gray-200`}
//                             />
//                           </div>
//                         ) : field.sampleImage ? (
//                           // Display sample image only if field.sampleImage exists
//                           <div className="mb-4 flex items-center space-x-4">
//                             <img
//                               src={field.sampleImage}
//                               alt="Sample Image"
//                               className="w-full h-32 object-fill rounded-lg border border-gray-200"
//                             />
//                           </div>
//                         ) : null}
//                         {/* If no uploaded file or sample image, nothing is shown */}

//                         {/* File input for uploading a new file */}
//                         <input
//                           id={field.name}
//                           name={field.name}
//                           type="file"
//                           readOnly={field.readOnly || isReadOnly}
//                           accept={field.accept || "*"} // Allow file type restrictions if provided
//                           onChange={(e) => {
//                             if (!isReadOnly && !field.readOnly) {
//                               // ✅ Prevent file selection if read-only
//                               const file = e.target.files[0];
//                               if (file) {
//                                 handleTextInputChange(field.name, file);
//                               }
//                             }
//                           }}
//                           disabled={field.readOnly || isReadOnly}
//                           required={!formData[field.name] && field.required}
//                           className={`block w-full text-sm text-gray-900 border border-gray-300 rounded-lg ${
//                             field.readOnly || isReadOnly
//                               ? "cursor-not-allowed bg-gray-200"
//                               : "cursor-pointer bg-gray-50 hover:bg-gray-100"
//                           } ${
//                             errors[field.name]
//                               ? "border-red-600 focus:border-red-600"
//                               : "border-slate-200"
//                           } focus:outline-none transition duration-200 file:bg-blue-600 file:border-none file:mr-4 file:py-2 file:px-4 file:rounded-l-lg file:text-white file:font-semibold file:hover:bg-blue-700`}
//                         />
//                       </div>
//                     ) : (
//                       <input
//                         id={field.name}
//                         name={field.name}
//                         type={field.type}
//                         value={formData[field.name] || ""}
//                         // required={field.required}
//                         onChange={handleTextInput}
//                         readOnly={field.readOnly || isReadOnly}
//                         placeholder={field.placeholder || ""}
//                         className={`w-full  font-times placeholder:text-slate-400 text-slate-900 text-base border-2 rounded-xl px-3 py-1.5 transition duration-300 ease focus:outline-none hover:border-blue-600 ${
//                           field.readOnly || isReadOnly
//                             ? "bg-gray-200"
//                             : "bg-transparent"
//                         } ${
//                           errors[field.name]
//                             ? "border-red-600 focus:border-red-600"
//                             : "border-slate-200"
//                         }`}
//                       />
//                     )}
//                   </>
//                 )}

//                 {(internalErrors[field.name] || errors[field.name]) && (
//                   <div className="absolute bottom-0 left-0 transform translate-y-full">
//                     <span className="text-red-600  pl-2 text-xs">
//                       {internalErrors[field.name] || errors[field.name]}
//                     </span>
//                   </div>
//                 )}

//                 {currentStep?.title === "Process to Upload" && (
//                   // Show only uploaded file preview or sample image
//                   <>
//                     {field.sampleImage ? (
//                       <div className="mb-4 flex items-center gap-10 space-x-4">
//                         <div className="right flex flex-col items-center justify-center">
//                           <IoCheckmark className="text-5xl text-green-600 font-extrabold" />
//                           <img
//                             src={field.sampleImage}
//                             alt="Sample Image"
//                             className="h-32 object-fill rounded-lg border border-gray-200"
//                           />
//                         </div>
//                         <div className="right flex flex-col gap-2 items-center justify-center">
//                           <RxCross1 className="text-4xl text-red-500 font-extrabold" />
//                           <img
//                             src={field.sampleImage}
//                             alt="Sample Image"
//                             className="h-32 blur-[1px] object-fill rounded-lg border border-gray-200"
//                           />
//                         </div>
//                       </div>
//                     ) : (
//                       <div className="text-gray-500 text-sm">
//                         No file uploaded
//                       </div>
//                     )}
//                   </>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     );
//   };

//   const filteredSteps = fields.filter(
//     (step) =>
//       !(
//         step.title === "Experienced Details" &&
//         formData.employee_type !== "Experienced"
//       )
//   );
//   // Ensure activeStep is within bounds of filteredSteps
//   const correctedActiveStep = Math.min(activeStep, filteredSteps.length - 1);
//   const validateCurrentStep = () => {
//     const step = filteredSteps[correctedActiveStep];

//     // Determine dynamic requirements
//     const isOtherInsurerYes = formData.posp_with_other_insurer === "Yes";

//     const dynamicFields = [
//       ...(step.fields || []),
//       ...(step.fields2 || []),
//       ...(step.fields3 || []).map((field) => {
//         if (
//           [
//             "name_of_insurer",
//             "agency_code_no",
//             "date_of_appointment_as_agency",
//             "date_of_cessation_of_agency",
//             "reason_for_cessation_agency",
//             "noc_issused_by_other_insurer_image",
//           ].includes(field.name)
//         ) {
//           return {
//             ...field,
//             required: isOtherInsurerYes,
//           };
//         }
//         return field;
//       }),
//     ];

//     const requiredFields = dynamicFields.filter((field) => field.required);
//     const errors = {};

//     requiredFields.forEach((field) => {
//       const value = formData[field.name];

//       const isEmpty =
//         value === undefined ||
//         value === "" ||
//         value === null ||
//         (field.type === "file" && value === "null");

//       if (isEmpty) {
//         errors[field.name] = `${field.label} is required`;
//       } else {
//         // Extra validations based on field name
//         if (
//           field.name === "mobile_no" ||
//           field.name === "alternative_mobile_no" ||
//           field.name === "alternative_mobile_number"
//         ) {
//           if (!/^\d{10}$/.test(value)) {
//             errors[field.name] = `${field.label} must be exactly 10 digits`;
//           }
//         } else if (field.name === "pancard_number") {
//           if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value)) {
//             errors[field.name] = "Invalid PAN format (e.g., ABCDE1234F)";
//           }
//         } else if (field.name === "date_of_birth") {
//           const dob = new Date(value);
//           const today = new Date();
//           const age = today.getFullYear() - dob.getFullYear();
//           const hasBirthdayPassed =
//             today.getMonth() > dob.getMonth() ||
//             (today.getMonth() === dob.getMonth() &&
//               today.getDate() >= dob.getDate());

//           const actualAge = hasBirthdayPassed ? age : age - 1;

//           if (actualAge < 18) {
//             errors[field.name] = "User must be at least 18 years old";
//           }
//         } else if (field.name === "aadhar_no") {
//           if (!/^\d{12}$/.test(value)) {
//             errors[field.name] = "Aadhaar must be exactly 12 digits";
//           }
//         } else if (
//           field.name === "bankaccount_no" ||
//           field.name === "account_number"
//         ) {
//           if (!/^\d{9,18}$/.test(value)) {
//             errors[field.name] = "Account number must be 9 to 18 digits";
//           }
//         } else if (
//           field.name === "pincode" ||
//           field.name === "permanent_address_pincode" ||
//           field.name === "current_address_pincode"
//         ) {
//           if (!/^\d{6}$/.test(value)) {
//             errors[field.name] = "Pincode must be exactly 6 digits";
//           }
//         }
//       }
//     });

//     setInternalErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleNext = () => {
//     if (!validateCurrentStep()) {
//       return; // Stop if required fields aren't filled
//     }

//     const isLastStep = correctedActiveStep === filteredSteps.length - 1;
//     if (isLastStep) {
//       handleSubmit(); // if you have this method in scope
//       return;
//     }

//     setActiveStep((prev) => {
//       const nextStep = prev + 1;
//       setVisitedSteps((prevVisited) => new Set(prevVisited).add(nextStep));
//       return nextStep;
//     });
//   };

//   const stepHasError = (step) => {
//     const allFields = [
//       ...(step.fields || []),
//       ...(step.fields2 || []),
//       ...(step.fields3 || []),
//     ];

//     return allFields.some((field) => errors[field.name]);
//   };

//   useEffect(() => {
//     const formElement = document.querySelector("form");

//     if (!formElement) return;

//     const handleTabKey = (event) => {
//       if (event.key === "Tab") {
//         const focusableElements = formElement.querySelectorAll(
//           'input, select, textarea, button, [tabindex]:not([tabindex="-1"])'
//         );

//         if (focusableElements.length === 0) return;

//         const firstElement = focusableElements[0];
//         const lastElement = focusableElements[focusableElements.length - 1];

//         if (!event.shiftKey && document.activeElement === lastElement) {
//           event.preventDefault();
//           firstElement.focus(); // Loop focus to first field
//         }

//         if (event.shiftKey && document.activeElement === firstElement) {
//           event.preventDefault();
//           lastElement.focus(); // Loop focus to last field
//         }
//       }
//     };

//     formElement.addEventListener("keydown", handleTabKey);

//     return () => {
//       formElement.removeEventListener("keydown", handleTabKey);
//     };
//   }, []);

  
//   return (
//     // <div className="flex flex-col justify-center items-center py-4 px-3  ">
//     //   <Stepper
//     //     lineClassName="bg-blue-200"
//     //     activeLineClassName="bg-blue-700"
//     //     className=" md:w-3/5  z-0"
//     //     activeStep={correctedActiveStep}
//     //   >
//     //     {filteredSteps.map((step, index) => {
//     //       const isActive = index === correctedActiveStep;
//     //       const isVisited = visitedSteps.has(index);
//     //       const hasError = stepHasError(step);

//     //       return (
//     //         <Step
//     //           key={index}
//     //           onClick={() => handleStepClick(index)}
//     //           className={`cursor-pointer 
//     //    ${hasError ? "!bg-red-400 text-white" : ""}
//     //   ${isActive && !hasError ? "!bg-blue-800 text-white" : ""}
//     //   ${isVisited && !hasError && !isActive ? "!bg-blue-400 text-white" : ""}
//     //   ${!isVisited && !isActive && !hasError ? "bg-blue-100 text-blue-800" : ""}
//     //   `}
//     //         >
//     //           <div
//     //             className={`text-sm ${
//     //               isActive || isVisited || hasError
//     //                 ? "text-white"
//     //                 : "text-blue-800"
//     //             }`}
//     //           >
//     //             {React.createElement(step.icon, {
//     //               className: "h-5 w-5",
//     //               strokeWidth: 2,
//     //             })}
//     //           </div>
//     //           <div className="absolute -bottom-7 w-max text-center">
//     //             <Typography
//     //               color={isActive ? "blue-gray" : "gray"}
//     //               className="text-xs text-blue-500 font-bold"
//     //             >
//     //               {isActive ? step.title : ""}
//     //             </Typography>
//     //           </div>
//     //         </Step>
//     //       );
//     //     })}
//     //   </Stepper>

//     //   <form
//     //     className="mt-8 mb-2 w-80 max-w-screen sm:w-full"
//     //     encType="multipart/form-data"
//     //     onSubmit={(e) => e.preventDefault()}
//     //   >
//     //     {renderStepContent(filteredSteps[correctedActiveStep])}

//     //     <div className="mt-16 flex justify-between">
//     //       <Button onClick={handlePrev} disabled={isFirstStep}>
//     //         Prev
//     //       </Button>
//     //       <Button
//     //         onClick={handleNext}
//     //         color={
//     //           correctedActiveStep === filteredSteps.length - 1
//     //             ? "green"
//     //             : "blue"
//     //         }
//     //         disabled={
//     //           correctedActiveStep === filteredSteps.length - 1 &&
//     //           "declaration" in formData && // Check if declaration field exists
//     //           !formData.declaration // Disable only if declaration field is present and not filled
//     //         }
//     //       >
//     //         {correctedActiveStep === filteredSteps.length - 1
//     //           ? "Finish & Submit"
//     //           : "Next"}
//     //       </Button>
//     //     </div>
//     //   </form>
//     // </div>

//     <div className="flex flex-col justify-center items-center py-4 px-3 lg:px-5 xl:px-8">
//   {/* Stepper - No scrolling, fixed width for all screens */}
//   <div className="w-full flex justify-center">
//     <Stepper
//       lineClassName="bg-blue-200"
//       activeLineClassName="bg-blue-700"
//       className="w-full max-w-[600px] md:w-3/5 z-0" // Fixed max width
//       activeStep={correctedActiveStep}
//     >
//       {filteredSteps.map((step, index) => {
//         const isActive = index === correctedActiveStep;
//         const isVisited = visitedSteps.has(index);
//         const hasError = stepHasError(step);

//         return (
//           <Step
//             key={index}
//             onClick={() => handleStepClick(index)}
//             className={`cursor-pointer ${
//               hasError ? "!bg-red-400 text-white" : ""
//             } ${
//               isActive && !hasError ? "!bg-blue-800 text-white" : ""
//             } ${
//               isVisited && !hasError && !isActive ? "!bg-blue-400 text-white" : ""
//             } ${
//               !isVisited && !isActive && !hasError ? "bg-blue-100 text-blue-800" : ""
//             }`}
//           >
//             <div
//               className={`text-sm ${
//                 isActive || isVisited || hasError ? "text-white" : "text-blue-800"
//               }`}
//             >
//               {React.createElement(step.icon, {
//                 className: "h-5 w-5", // Original size
//                 strokeWidth: 2,
//               })}
//             </div>
//             <div className="absolute -bottom-7 w-max text-center">
//               <Typography
//                 color={isActive ? "blue-gray" : "gray"}
//                 className="text-xs text-blue-500 font-bold"
//               >
//                 {isActive ? step.title : ""}
//               </Typography>
//             </div>
//           </Step>
//         );
//       })}
//     </Stepper>
//   </div>

//   {/* Form - Responsive only for mobile, unchanged for tablet/laptop */}
//   <form
//     className={`mt-8 mb-2 ${
//       window.innerWidth < 640 ? "w-full px-2" : "w-80 max-w-screen"
//     } sm:w-full`}
//     encType="multipart/form-data"
//     onSubmit={(e) => e.preventDefault()}
//   >
//     {renderStepContent(filteredSteps[correctedActiveStep])}

//     <div className="mt-16 flex justify-between">
//       <Button onClick={handlePrev} disabled={isFirstStep}>
//         Prev
//       </Button>
//       <Button
//         onClick={handleNext}
//         color={
//           correctedActiveStep === filteredSteps.length - 1
//             ? "green"
//             : "blue"
//         }
//         disabled={
//           correctedActiveStep === filteredSteps.length - 1 &&
//           "declaration" in formData &&
//           !formData.declaration
//         }
//       >
//         {correctedActiveStep === filteredSteps.length - 1
//           ? "Finish & Submit"
//           : "Next"}
//       </Button>
//     </div>
//   </form>
// </div>
//   );
// }

// export default WizardSecond;
