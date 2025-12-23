import React, { useState, useEffect } from "react";
import { Stepper, Step, Typography, Tooltip, step } from "@material-tailwind/react";
// import SearchableSelect from "../Pages/TableActions/SearchableSelect";
// import Select from "react-select";
import CreatableSelect from "react-select/creatable";
// import DatePicker from "react-datepicker";
import DatePicker from "../../components/form/date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
// import SelectInputs from "../form/form-elements/SelectInputs";
// import {
//   fetchCitiesByState,
//   fetchCitiesByStateAnother,
// } from "../../store/Actions/StateAction";
import { useDispatch, useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import { IoCheckmark } from "react-icons/io5";
// import { TiTick } from "react-icons/ti";
// import { IoMdCheckmark } from "react-icons/io";
import { useLocation } from "react-router-dom";
// import {
//   fetchPosp,
//   fetchRelationshipManager,
//   fetchReportingManager,
//   fetchReportingManagerWithPosp,
// } from "../../store/Actions/OperationAction";
import DialogBox from "../common/DialogBox"
import Radio from "../form/input/Radio";
import Input from "../form/input/InputField";
import { CalenderIcon, EnvelopeIcon } from "../../icons";
import { PhoneIcon } from "@heroicons/react/24/outline";
import Select from "../form/Select";
import FileInput from "../form/input/FileInput";
import Checkbox from "../form/input/Checkbox";
import Button from "../../components/ui/button/Button"
import { useOperation } from "../../hooks/useOperation";
import {useStateData} from "../../hooks/useStatesData"

export default function FormComponent({
  config,
  resetValue,
  onSubmit,
  onReset,
  onChange,
  isEditMode = false,
  errors = {},
  success,
  initialValues = {},
  otherHead,
}) {
  const [formData, setFormData] = useState({});
  const [internalErrors, setInternalErrors] = useState({});
  const {stepFields=[], dialogBox,uploadInstruction}=config;
  const location = useLocation();
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);
  const [resetFlag, setResetFlag] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  
  const { fetchPosp,fetchRelationshipManager,fetchReportingManager,fetchReportingManagerWithPosp } = useOperation()
  const {cities,citiesBy,fetchCitiesByState,fetchCitiesByStateAnother} =useStateData(); 
  // const[dialog,setDialog]=useState(true);
// console.log("fields:", stepFields);
//  const {
//     // states = [],
//     // cities = { cities: [] },
//     citiesBy = { cities: [] }
//   } = useSelector((state) => state.states);
  useEffect(() => {
    const isEditPage = ![
      "/master/hr/create-employee",
      "/master/hr/add-misp",
    ].includes(location.pathname);

    if (
      isEditPage &&
      initialValues &&
      Object.keys(initialValues).length > 0 &&
      !isInitialized
    ) {
      setFormData(initialValues); // ✅ fill form
      setIsInitialized(true); // ✅ mark done
    }
  }, [initialValues, isInitialized, location.pathname]);
  useEffect(() => {
    if (
      location.pathname === "/master/hr/create-employee" ||
      location.pathname === "/master/hr/add-misp"
    ) {
      setFormData(resetValue);
      setIsInitialized(false); // 🟡 Important: allow reinitialization if switching back to edit
    }
  }, [location.pathname, resetValue]);
  // Runs when `initialValues` updates


  // useEffect(() => {
  //   if (success) {
  //     const newFormData = [...stepFields].reduce((acc, field) => {
  //       acc[field.name] =
  //         field.name === "branch_id" ? formData[field.name] : ""; // Reset each field to empty
  //       return acc;
  //     }, {});
  //     setFormData(newFormData);
  //     setResetFlag(false); // Reset the flag after reset
  //     }
  // }, [success, stepFields, formData]);  //  
   useEffect(() => {
    if (success) {
      const newFormData = [...stepFields].reduce((acc, field) => {
        acc[field.name] =
          field.name === "branch_id" ? formData[field.name] : ""; // Reset each field to empty
        return acc;
      }, {});
      setFormData(newFormData);
      setResetFlag(false); // Reset the flag after reset
      }
  }, [success]);
  const handleChange = (selectedOption, actionMeta) => {
    // console.log("selectedOption with action meta",selectedOption,actionMeta)
    const name = actionMeta?.name;
    // console.log("selectedopt",selectedOption)
    // validateField(name,selectedOption.value,actionMeta)
    // console.log(internalErrors) ;
    const value =selectedOption?.value || "";

    // console.log(`value ${value} on name ${name}`)
    setFormData((prev) => {
      let updatedFormData = { ...prev, [name]: value };

      if (name === "current_address_state") {
        updatedFormData.current_address_city = "";
        // updatedFormData[name] = selectedOption?.label; // Set state name as label
        (fetchCitiesByState(value));
      } else if (name === "permanent_address_state") {
        updatedFormData.permanent_address_city = "";
        // updatedFormData[name] = selectedOption?.label; // Set state name as label
        (fetchCitiesByStateAnother(value));
      } else if (name === "state") {
        updatedFormData.city = "";
        // updatedFormData[name] = selectedOption?.label; // Set state name as label
        (fetchCitiesByState(value));
      } else if (name === "bqp") {
        updatedFormData.relationship_manager = "";
        updatedFormData.reporting_manager = "";
        // updatedFormData[name] = selectedOption?.value; // Set state name as label
        (fetchReportingManager(value));
        (fetchRelationshipManager(value));
        (fetchReportingManagerWithPosp(value));
      }
      else if (name === "reporting_manager") {
        updatedFormData.relationship_manager = "";
        updatedFormData[name] = selectedOption.value; // Set state name as label
        // dispatch(fetchRelationshipManager(value));
      }
      else if (name === "relationship_manager") {
        // updatedFormData.posp_id = "";
        updatedFormData[name] = selectedOption?.value; // Set state name as label
        // (fetchPosp(value));
      } else if (
        name === "title" ||
        name === "role" ||
        name === "department" ||
        name === "designation" ||
        name === "bank_name" ||
        name === "current_address_city" ||
        name === "permanent_address_city" ||
        name === "city" ||
        name === "bankname" ||
        name === "gender" ||
        name === "education_level" ||
        name === "account_type" ||
        name === "marital_status" ||
        name === "language" ||
        name === "branch_id"
      ) {
        // if(name === "branch_id")
          updatedFormData[name]=selectedOption?.value;
        // else
        // updatedFormData[name] = selectedOption?.label; // ✅ Set title as label
      }
      // console.log(`updated form data ${updatedFormData[name]}`)
      return updatedFormData;
    });
  };
  // useEffect(() => {
  //   if (formData.bqp) {
  //     (fetchReportingManager(formData.bqp));
  //     (fetchRelationshipManager(formData.bqp));
  //   }
  // }, [formData.bqp]);
 
  // useEffect(() => {
  //   if (formData.reporting_manager) {
  //     (fetchRelationshipManager(formData.reporting_manager));
  //   }
  // }, [formData.reporting_manager, dispatch]);
  // useEffect(() => {
  //   if (formData.relationship_manager) {
  //     (fetchPosp(formData.relationship_manager));
  //   }
  // }, [formData.relationship_manager]);

  const [visitedSteps, setVisitedSteps] = useState(new Set([0]));
  // console.log(formData)
  const handleTextInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // console.log(value);
    // if (onChange) {
    //   onChange(name, value);
    // }
  };
  const handleTextInput = (event) => {
    const { name, value } = event.target;

    let formattedValue = value;

    if (
      name === "mobile_no" ||
      name === "alternative_mobile_no" ||
      name === "nominee_mobile_number" ||
      name === "alternative_mobile_number"
    ) {
      formattedValue = value.replace(/\D/g, "").slice(0, 10); // Max 10 digits only
    } else if (name === "pancard_number") {
      let cleaned = value.replace(/[^0-9A-Za-z]/g, "");
      let letters = cleaned.slice(0, 5).replace(/[0-9]/g, "");
      let numbers = cleaned.slice(5, 9).replace(/\D/g, "");
      let lastLetter = cleaned.slice(9, 10).replace(/[0-9]/g, "");
      formattedValue = (letters + numbers + lastLetter)
        .toUpperCase()
        .slice(0, 10);
    } else if (name === "aadhar_no") {
      formattedValue = value.replace(/\D/g, "").slice(0, 12); // Aadhaar: 12 digit numeric
    } else if (name === "bankaccount_no" || name === "account_number") {
      const cleaned = value.replace(/\D/g, "");
      formattedValue = cleaned;
      // Optional: You can also trigger an error if it's below min length
      // Example: show a message if less than 9 digits
      if (cleaned.length > 0 && cleaned.length < 9) {
        console.warn("Bank account number should be at least 9 digits.");
        // You can also set a formError here if you maintain one
      } // Bank acc: digits only, max 18
    } else if (
      name === "pincode" ||
      name === "permanent_address_pincode" ||
      name === "current_address_pincode"
    ) {
      formattedValue = value.replace(/\D/g, "").slice(0, 6); // Pincode: 6 digits
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue || "",
    }));
  };

  const handlePrev = () => {
    if (!isFirstStep) {
      setActiveStep((prev) => prev - 1);
    }
  };
  const handleStepClick = (index) => {
    if (visitedSteps.has(index)) {
      setActiveStep(index);
    }
  };

  const handleSubmit = async () => {
    try {
      // console.log("formData:", formData);

      onSubmit(formData);
      // setResetFlag(true);
    } catch (error) {
      console.log(error);
      // alert("Failed to submit the form. Please try again.");
    }
  };

  useEffect(() => {
    setIsLastStep(activeStep === stepFields.length - 1);
    setIsFirstStep(activeStep === 0);
  }, [activeStep, stepFields.length]);
  // console.log("in formcomponent",formData)
  
  const isFieldDisabled = (field) => {
  const deps = field.dependsOn;

  // No dependencies → never disabled
  if (!deps || deps.length === 0) return false;

  // 1️⃣ If "same_as_permanent" exists in dependsOn
  const hasSAP = deps.includes("same_as_permanent");

  if (hasSAP) {
    // Auto-fill mode → disable field
    if (formData.same_as_permanent === "2") {
      return true;
    }

    // If field also depends on permanent_address_state
    if (deps.includes("permanent_address_state")) {
      return !formData.permanent_address_state;
    }

    // Only depends on same_as_permanent → enable when SAP = "1"
    return false;
  }
  // 2️⃣ NORMAL dependency (like permanent_address_city → permanent_address_state)
  // 🔴 FIXED: Check if permanent_address_city depends on permanent_address_state
  if (field.name === "permanent_address_city" && deps.includes("permanent_address_state")) {
    return !formData.permanent_address_state || formData.same_as_permanent === "2";
  }
  // 2️⃣ NORMAL dependency (like current_address_city → current_address_state)
  return deps.some((d) => !formData[d]);
};

const handleRadioChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => {
    const updated = { ...prev, [name]: value };

    if (name === "same_as_permanent") {
      if (value === "2") {
        // 🔴 FIXED: If "Yes" is selected, copy ALL current address fields to permanent
        console.log("Copying current address to permanent...");
        return {
          ...updated,
          permanent_house_no: prev.current_house_no || "",
          permanent_address_street: prev.current_address_street || "",
          permanent_address_state: prev.current_address_state || "",
          permanent_address_city: prev.current_address_city || "",
          permanent_address_town: prev.current_address_town || "",
          permanent_address_pincode: prev.current_address_pincode || "",
        };
      } else {
        // 🔴 FIXED: Clear permanent address fields if "No" is selected
        console.log("Clearing permanent address fields...");
        return {
          ...updated,
          permanent_house_no: "",
          permanent_address_street: "",
          permanent_address_state: "",
          permanent_address_city: "",
          permanent_address_town: "",
          permanent_address_pincode: "",
        };
      }
    }

    return updated;
  });
};
  // const handleRadioChange = (e) => {         //original
  
  //   const { name, value } = e.target;

  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value, // Only update the field that was changed
  //   }));

  //   if (name === "same_as_permanent") {
  //     if (value === "2") {
  //       // If "Yes" is selected, copy current address to permanent address
  //       setFormData((prev) => ({
  //         ...prev,
  //         permanent_address_street: prev.current_address_street,
  //         permanent_address_city: prev.current_address_city,
  //         permanent_address_state: prev.current_address_state,
  //         permanent_address_pincode: prev.current_address_pincode,
  //         permanent_address_town: prev.current_address_town,
  //         permanent_house_no: prev.current_house_no,
  //       }));
  //     } else {
  //       // Clear permanent address fields if "No" is selected
  //       setFormData((prev) => ({
  //         ...prev,
  //         permanent_address_street: "",
  //         permanent_address_city: "",
  //         permanent_address_state: "",
  //         permanent_address_pincode: "",
  //         permanent_address_town: "",
  //         permanent_house_no: "",
  //       }));
  //     }
  //   }
  // };
   // Check if a field should be visible (based on "dependsOn" rule)

  // // Check if step should be visible (if all its fields are hidden)
  // const visibleSteps = steps.filter((_, index) => {
  //   const visibleFields = stepFields[index].filter((f) => isFieldDisabled(f));
  //   return visibleFields.length > 0;
  // });
  // const visibleFields = stepFields[currentStep].filter((field) =>
  //   isFieldDisabled(field)
  // );

  // const handleNext = () => {
  //   if (currentStep < visibleSteps.length - 1)
  //     setCurrentStep((prev) => prev + 1);
  // };

// ⭐ NEW FUNCTION ADDED



  // Filter fields for the active step
  const renderStepContent = (currentStep) => {
    if (!currentStep) return null;
    const currentFields = currentStep?.fields || []; // Access the fields of the current step
    const permanentAddressFields = currentStep?.fields2 || [];
    const otherFields = currentStep?.fields3 || [];
    let allFields = [...currentFields,...otherFields]; // Start with current fields
    // if (formData.same_as_permanent !== "2") {
    //   allFields = [...allFields, ...permanentAddressFields];
    // }
    // console.log("allfields",allFields)
    return (
      <>
      {dialogBox && 
        <DialogBox
          dialogBox={dialogBox}
          uploadInstruction={uploadInstruction}
          />
      }
        <div
          className={` w-full ${
            currentStep?.title === "Address" ||
            // currentStep?.title === "Process to Upload" ||
            currentStep?.title === "Documents" ||
            currentStep?.title === "Address Book Details"
              ? "lg:h-fit"
              : "lg:h-auto"
          } `}
        >
          {/* Render the title for the current step */}
          {/* <Typography
            variant="h6"
            color="blue-gray"
            className="mb-4 font-roboto text-xl underline font-bold"
          >
            {currentStep?.title}
          </Typography> */}

          {/* Map through the fields of the current step */}
          <div
            className={`grid  w-full gap-y-5 gap-x-4 ${
              currentStep?.title === "Process to Upload"
                ? "lg:grid-cols-2 "
                : "lg:grid-cols-3"
            } md:grid-cols-3 ` }
          >
            {allFields.map((field, index) => {
              // const Default=(
              //                 field.storeLabel
              //                   ? field?.options?.find(o => o.label === formData[field.name])?.value || ""
              //                   : formData[field.name]  
              //               );
              //               console.log(field)
              //               console.log(field?.options?.find(o => o?.label === formData[field.name]));
              const getInputClass = (fieldName) =>
                errors[fieldName]
                  ? "border-red-600 focus:border-red-600"
                  : "border-slate-200";

              // Identify if the field belongs to otherFields
              const isOtherField = otherFields.some(
                (otherField) => otherField.name === field.name
              );
              const isReadOnly =
                isOtherField && formData.posp_with_other_insurer !== "Yes";
              return (
                <div
                  key={index}
                  className={`grid relative gap-1 mt-3 ${
                    (field.type === "radio" &&
                      field.name === "posp_with_other_insurer") ||
                    field.type === "checkbox"
                      ? "col-span-full"
                      : ""
                  } ${
                    field.name === "reason_for_cessation_agency" ? " h-20" : ""
                  }  `}
                >
                  {field.type !== "checkbox" && (
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className={`mb-0 font-roboto text-[14px] font-normal px-3 dark:text-gray-400 ${getInputClass(
                        field.name
                      )} ${
                        currentStep?.title === "Process to Upload"
                          ? "font-semibold font-roboto"
                          : "max-w-[150px] sm:max-w-[200px] md:max-w-[250px]"
                      } overflow-hidden text-ellipsis `}
                    >
                      {currentStep?.title === "Process to Upload" &&
                        `${index + 1}. `}
                      {field.label}{" "}
                      {field.required ? (
                        <span className="text-red-500">*</span>
                      ) : (
                        ""
                      )}
                    </Typography>
                  )}
                  {currentStep?.title !== "Process to Upload" && (
                    <>
                      {field.type === "radio" ? (
                        <div className="flex -mt-2  gap-4">
                          {field.options.map((option, optionIndex) => (
                            // <label
                            //   key={optionIndex}
                            //   className="flex items-center"
                            // >
                              <Radio  //new
                                key={optionIndex}                              // ADDED key (important for lists)
                                id={`${field.name}-${optionIndex}`}            // CHANGED: more unique id
                                // type="radio"
                                name={field.name}
                                value={option.value}
                                checked={
                                  String(formData[field.name]) ===
                                  String(option.value)
                                }
                                disabled={isFieldDisabled(field)}
                                onChange={handleRadioChange}
                                onBlur={() =>
                                  validateField(field.name, formData[field.name], field)
                                }
                                className="mr-2  "
                                label={option.label} //new
                              />
                            ))}
                              {/* <span>{option.label}</span>     //new 
                            // </label> */}
                        </div>
                      ) : field.type === "checkbox" ? (
                        <div className="flex flex-col gap-4">
                          {/* <label className="flex items-center"> */}
                            <Checkbox
                              id={`${field.name}-${field.type}`} 
                              type="checkbox"
                              name={field.name}
                              label={field.label}
                              checked={formData[field.name] === 1} // Correctly bind the checkbox value to 1 or null
                              onChange={(e) => {
                                // Set the value to 1 if checked, or null (or 0) if unchecked
                                const newValue = e.target.checked ? 1 : "";
                                setFormData({
                                  ...formData,
                                  [field.name]: newValue,
                                });
                              }}
                              onBlur={() =>
                                validateField(field.name, formData[field.name], field)
                              }
                              className={`mr-2 ${getInputClass(field.name)}`}
                            />
                            {/* <span>{field.label}</span> */}
                          {/* </label> */}
                        </div>
                      ) : field.type === "select" ? (
                         <Select
                            field={field}
                            formData={formData}
                            onChange={handleChange}
                            onBlur={() =>
                              validateField(field.name, formData[field.name], field)
                            }
                            disabled={field.disabled || isReadOnly || isFieldDisabled(field)}
                            defaultValue={
                              field.storeLabel
                                ? field?.options?.find(o => o.value === formData[field.name])?.value || ""
                                : formData[field.name]  
                            }
                            errors={errors}
                            options={field.options || []} // Pass options via props
                            loading={false} // You can pass loading state if needed
                            className={`${
                            field.readOnly || isReadOnly || isFieldDisabled(field)
                              ? "bg-slate-300 dark:bg-gray-600"
                              : "bg-transparent"
                          } ${
                            errors[field.name]
                              ? "border-red-600 focus:border-red-600"
                              : "border-slate-200"
                          }`}
                          /> 
                        
                      ) : field.type === "date" ? (
                        <div
                          // ref={(el) => (datePickerRefs.current[field.name] = el)}
                          className="relative w-full z-auto date-wrapper h-fit"
                        >
                          <DatePicker
                            name={field.name}
                            yearPlaceholder="yy"
                            monthPlaceholder="mm"
                            // disabled={field.readOnly || isReadOnly}
                            dayPlaceholder="dd"
                            yearAriaLabel="Year"
                            minDate={new Date(1900, 11, 31)}
                            maxDate={new Date(new Date().getFullYear(), 11, 31)}
                            onChange={(date) => {
                              if (date) {
                                const formattedDateForDatabase = format(
                                  date,
                                  "yyyy-MM-dd"
                                );
                                handleTextInput({
                                  target: {
                                    name: field.name,
                                    value: formattedDateForDatabase,
                                  },
                                });
                              }
                            }}
                            value={
                              formData[field.name]
                                ? new Date(formData[field.name])
                                : null
                            }
                            format="d/m/Y"
                            required={field.required}
                            className={`react-date-picker pr-[180px] ${
                              errors[field.name]
                                ? "border-red-600 focus:border-red-600"
                                : "border-slate-200"
                            } ${
                              field.readOnly || isReadOnly
                                ? "bg-gray-200 cursor-not-allowed"
                                : ""
                            }`}
                            calendarClassName="rounded-lg font-roboto bg-red-400  flatpickr-calendar shadow-lg"
                            placeholderText="dd/mm/yyyy"
                            clearIcon={null}
                             onBlur={(value) => validateField(field.name, value, field)}
                             />
                             {/* // onBlur={(e) =>
                             //   // validateField(field.name, formData[field.name], field)
                             //   validateField(field.name, e.target.value, field)
 
                             // }
                             // onKeyDown={(event) => handleKeyDown(event, field.name)}
                             // onInvalid={(event) => handleInvalid(event, field.name)} // FIX */}
                        </div>
                      ) : field.type === "file" ? (
                        <div className="w-full">
                          {/* Display sample image or uploaded file preview */}
                          {formData[field.name] &&
                          formData[field.name] !== "null" ? (
                            // Display uploaded file preview if formData[field.name] is not null
                            <div className="mb-4 flex items-center space-x-4">
                              <img
                                src={
                                  typeof formData[field.name] === "string"
                                    ? formData[field.name] // If it's a URL, use it directly
                                    : URL.createObjectURL(formData[field.name]) // If it's a file object, create a preview URL
                                }
                                alt="Uploaded File"
                                className={`w-full h-32 object-fill rounded-lg  border border-gray-200`}
                              />
                            </div>
                          ) : field.sampleImage ? (
                            // Display sample image only if field.sampleImage exists
                            <div className="mb-4 flex items-center space-x-4">
                              <img
                                src={field.sampleImage}
                                alt="Sample Image"
                                className="w-full h-32 object-fill rounded-lg border border-gray-200"
                              />
                            </div>
                          ) : null}
                          {/* If no uploaded file or sample image, nothing is shown */}

                          {/* File input for uploading a new file */}
                          <FileInput
                            id={`${field.name}-${field.type}`} 
                            name={field.name}
                            type="file"
                            readOnly={field.readOnly || isReadOnly}
                            accept={field.accept || "*"} // Allow file type restrictions if provided
                            onChange={(e) => {
                              if (!isReadOnly && !field.readOnly) {
                                // ✅ Prevent file selection if read-only
                                const file = e.target.files[0];
                                if (file) {
                                  const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
                                  if (!validTypes.includes(file.type)) {
                                    alert('Please select an image file (JPEG, PNG, JPG)');
                                    e.target.value = ''; // Clear the input
                                    return;
                                  }
                                  handleTextInputChange(field.name, file);
                                }
                              }
                            }}
                            onBlur={() =>
                              validateField(field.name, formData[field.name], field)
                            }
                            disabled={field.readOnly || isReadOnly }
                            required={!formData[field.name] && field.required}
                            className={`block w-full text-sm text-gray-900 border border-gray-300 rounded-lg ${
                              field.readOnly || isReadOnly
                                ? "cursor-not-allowed bg-gray-200"
                                : "cursor-pointer bg-gray-50 hover:bg-gray-100"
                            } ${
                              errors[field.name]
                                ? "border-red-600 focus:border-red-600"
                                : "border-slate-200"
                            } focus:outline-none transition duration-200 file:bg-blue-600 file:border-none file:mr-4 file:py-2 file:px-4 file:rounded-l-lg file:text-white file:font-semibold file:hover:bg-blue-400`}
                          />
                        </div>
                      ) :(field.type === "email" || field.type === "tel") ? (
                         <> 
                         <div className="relative">
                          <Input
                            id={`${field.name}-${field.type}`} 
                            name={field.name}
                            type={field.type}
                            value={formData[field.name] || ""}
                            // required={field.required}
                            disabled={field.disabled || isReadOnly || isFieldDisabled(field)}
                            onChange={handleTextInput}
                            readOnly={field.readOnly || isReadOnly}
                            placeholder={field.placeholder || ""}
                            onBlur={(e) => validateField(field.name, e.target.value,field)}
                            className={`pl-[62px]  ${
                              field.readOnly || isReadOnly || isFieldDisabled(field)
                                ? "bg-gray-200"
                                : "bg-transparent"
                            } ${
                              errors[field.name]
                                ? "border-red-600 focus:border-red-600"
                                : "border-slate-200"
                            }`}
                            /> 
                            
              
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                              {field.type==="email" && (<EnvelopeIcon className="size-6" />)}
                              {field.type==="tel" && (<PhoneIcon className="size-6" />)}
                            </span>
                          </div>
                        </>
                      )  : 
                      (
                        <Input
                          id={`${field.name}-${field.type}`} 
                          name={field.name}
                          type={field.type}
                          value={formData[field.name] || ""}
                          // required={field.required}
                          disabled={field.disabled || isFieldDisabled(field)}
                          onChange={handleTextInput}
                          readOnly={field.readOnly || isReadOnly}
                          placeholder={field.placeholder || ""}
                          onBlur={(e) => validateField(field.name, e.target.value,field)}
                          className={`${
                            field.readOnly || isReadOnly || isFieldDisabled(field)
                              ? "bg-gray-200"
                              : "bg-transparent"
                          } ${
                            errors[field.name]
                              ? "border-red-600 focus:border-red-600"
                              : "border-slate-200"
                          }`}
                        />
                      )
                      }
                    </>
                  )}

                  {(internalErrors[field.name] || errors[field.name]) && (
                    <div className="absolute bottom-0 left-0 transform translate-y-full">
                      <span className="text-red-600  pl-2 text-xs">
                        {internalErrors[field.name] || errors[field.name]}
                      </span>
                    </div>
                  )}

                  {currentStep?.title === "Process to Upload" && (
                    // Show only uploaded file preview or sample image
                    <>
                      {field.sampleImage ? (
                        <div className="mb-4 flex items-center gap-10 space-x-4">
                          <div className="right flex flex-col items-center justify-center">
                            <IoCheckmark className="text-5xl text-green-600 font-extrabold" />
                            <img
                              src={field.sampleImage}
                              alt="Sample Image"
                              className="h-32 object-fill rounded-lg border border-gray-200"
                            />
                          </div>
                          <div className="right flex flex-col gap-2 items-center justify-center">
                            <RxCross1 className="text-4xl text-red-500 font-extrabold" />
                            <img
                              src={field.sampleImage}
                              alt="Sample Image"
                              className="h-32 blur-[1px] object-fill rounded-lg border border-gray-200"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="text-gray-500 text-sm">
                          No file uploaded
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  };
  const filteredSteps = stepFields.filter(
    (step) =>
      !(
        step.title === "Experienced Details" &&
        formData.employee_type !== "Experienced"
      )
  );
  // Ensure activeStep is within bounds of filteredSteps
  const correctedActiveStep = Math.min(activeStep, filteredSteps.length - 1);
  const validateCurrentStep = () => {
    const step = filteredSteps[correctedActiveStep];

    // Determine dynamic requirements
    const isOtherInsurerYes = formData.posp_with_other_insurer === "Yes";

    const dynamicFields = [
      ...(step.fields || []),
      ...(step.fields2 || []),
      ...(step.fields3 || []).map((field) => {
        if (
          [
            "name_of_insurer",
            "agency_code_no",
            "date_of_appointment_as_agency",
            "date_of_cessation_of_agency",
            "reason_for_cessation_agency",
            "noc_issused_by_other_insurer_image",
          ].includes(field.name)
        ) {
          return {
            ...field,
            required: isOtherInsurerYes,
          };
        }
        return field;
      }),
    ];

    const requiredFields = dynamicFields.filter((field) => field.required);
    const errors = {};

    dynamicFields.forEach((field) => {
      const value = formData[field.name];
      const isEmpty =
      value === undefined ||
      value === "" ||
      value === null ||
      (field.type === "file" && value === "null");
      if (field.required && isEmpty) {
        errors[field.name] = `${field.label} is required`;
      } else if (field.required || !isEmpty) {
        // Extra validations based on field name
        if (
          field.name === "mobile_no" ||
          field.name === "alternative_mobile_no" ||
          field.name === "alternative_mobile_number"
        ) {
          if (!/^\d{10}$/.test(value)) {
            errors[field.name] = `${field.label} must be exactly 10 digits`;
          }
        } else if (field.name === "pancard_number") {
          if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value)) {
            errors[field.name] = "Invalid PAN format (e.g., ABCDE1234F)";
          }
        } else if (field.name === "date_of_birth") {
          const dob = new Date(value);
          const today = new Date();
          const age = today.getFullYear() - dob.getFullYear();
          const hasBirthdayPassed =
            today.getMonth() > dob.getMonth() ||
            (today.getMonth() === dob.getMonth() &&
              today.getDate() >= dob.getDate());

          const actualAge = hasBirthdayPassed ? age : age - 1;

          if (actualAge < 18) {
            errors[field.name] = "User must be at least 18 years old";
          }
        } else if (field.name === "aadhar_no") {
          if (!/^\d{12}$/.test(value)) {
            errors[field.name] = "Aadhaar must be exactly 12 digits";
          }
        } else if (
          field.name === "bankaccount_no" ||
          field.name === "account_number"
        ) {
          if (!/^\d{9,18}$/.test(value)) {
            errors[field.name] = "Account number must be 9 to 18 digits";
          }
        } else if (
          field.name === "pincode" ||
          field.name === "permanent_address_pincode" ||
          field.name === "current_address_pincode"
        ) {
          if (!/^\d{6}$/.test(value)) {
            errors[field.name] = "Pincode must be exactly 6 digits";
          }
        } else if (field.type === "email" && value) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            errors[field.name] = "Invalid email format";
          }
        }
      }
    // else{
    //     if (
    //       field.name === "alternative_mobile_number" && value
    //     ) {
    //       if (!/^\d{10}$/.test(value)) {
    //         errors[field.name] = `${field.label} must be exactly 10 digits`;
    //       }
    //     }
    //   }
    });

    setInternalErrors(errors);
    return Object.keys(errors).length === 0;
  };

// ⭐ UNIVERSAL FIELD VALIDATION FOR INPUT, SELECT, RADIO, CHECKBOX, DATEPICKER
const validateField = (fieldName, value, fieldMeta = {}) => {
  let errorMsg = "";
  // console.log(fieldName,"name")
  // console.log("value",value)
  // console.log("fieldMeta",fieldMeta)
  const isRequired = fieldMeta.required;

  const isEmpty =
    value === undefined ||
    value === "" ||
    value === null ||
    (fieldMeta.type === "file" && value === "null");

  // ⭐ 1. REQUIRED VALIDATION
  if (isRequired && isEmpty) {
    errorMsg = `${fieldMeta.label || fieldName} is required`;
  }
  // console.log("fieldMeta in formcomponent validateion" , fieldMeta,fieldMeta.acceptedTypes)
  // ⭐ 2. OTHER VALIDATION RULES (MATCHING validateCurrentStep)
  if (!errorMsg && (isRequired || !isEmpty)) {
    if (
      fieldName === "mobile_no" ||
      fieldName === "alternative_mobile_no" ||
      fieldName === "alternative_mobile_number"
    ) {
      if (!/^\d{10}$/.test(value)) {
        errorMsg = `${fieldMeta.label || "Mobile"} must be exactly 10 digits`;
      }
    }

    else if (fieldName === "pancard_number") {
      if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value)) {
        errorMsg = "Invalid PAN format (e.g., ABCDE1234F)";
      }
    }

    else if (fieldName === "date_of_birth") {
      const dob = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      const hasBirthdayPassed =
        today.getMonth() > dob.getMonth() ||
        (today.getMonth() === dob.getMonth() &&
          today.getDate() >= dob.getDate());

      const actualAge = hasBirthdayPassed ? age : age - 1;

      if (actualAge < 18) {
        errorMsg = "User must be at least 18 years old";
      }
    }

    else if (fieldName === "aadhar_no") {
      if (!/^\d{12}$/.test(value)) {
        errorMsg = "Aadhaar must be exactly 12 digits";
      }
    }

    else if (
      fieldName === "bankaccount_no" ||
      fieldName === "account_number"
    ) {
      if (!/^\d{9,18}$/.test(value)) {
        errorMsg = "Account number must be 9 to 18 digits";
      }
    }

    else if (
      fieldName === "pincode" ||
      fieldName === "permanent_address_pincode" ||
      fieldName === "current_address_pincode"
    ) {
      if (!/^\d{6}$/.test(value)) {
        errorMsg = "Pincode must be exactly 6 digits";
      }
    }

    else if (fieldMeta.type === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errorMsg = "Invalid email format";
      }
    }
    // Add file type validation
    else if (fieldMeta.type === 'file' && value && value instanceof File) {
      const acceptedTypes = fieldMeta.acceptTypes || ['image/jpeg', 'image/png', 'image/jpg'];
      if (!acceptedTypes.includes(value.type)) {
        errorMsg = `File must be of type: ${acceptedTypes.map(t => t.split('/')[1]).join(', ')}`;
      }
    }
  }
  // ⭐ UPDATE ERROR STATE
  setInternalErrors((prev) => ({
    ...prev,
    [fieldName]: errorMsg,
  }));
};


  const handleNext = () => {
    if (!validateCurrentStep()) {
      return; // Stop if required fields aren't filled
    }

    const isLastStep = correctedActiveStep === filteredSteps.length - 1;
    if (isLastStep) {
      handleSubmit(); // if you have this method in scope
      return;
    }

    setActiveStep((prev) => {
      const nextStep = prev + 1;
      setVisitedSteps((prevVisited) => new Set(prevVisited).add(nextStep));
      return nextStep;
    });
  };

  const stepHasError = (step) => {
    const allFields = [
      ...(step.fields || []),
      ...(step.fields2 || []),
      ...(step.fields3 || []),
    ];

    return allFields.some((field) => errors[field.name]);
  };

  useEffect(() => {
    const formElement = document.querySelector("form");

    if (!formElement) return;

    const handleTabKey = (event) => {
      if (event.key === "Tab") {
        const focusableElements = formElement.querySelectorAll(
          'input, select, textarea, button, [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus(); // Loop focus to first field
        }

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus(); // Loop focus to last field
        }
      }
    };

    formElement.addEventListener("keydown", handleTabKey);

    return () => {
      formElement.removeEventListener("keydown", handleTabKey);
    };
  }, []);
  const isSteps=stepFields.filter(
    (field) =>
    (field.fields.filter((f)=>f.step!==undefined).length>0)
  ).length!==0;

  // console.log("isSteps",isSteps);

  return (
    <div className="flex flex-col justify-center items-center py-4 px-3 lg:px-5 xl:px-8">
  {/* Stepper - No scrolling, fixed width for all screens */}
  {isSteps && (<div className="w-full flex justify-center">
    <Stepper
      lineClassName="bg-blue-200"
      activeLineClassName="bg-blue-700"
      className="w-full max-w-[900px] md:w-3/5 z-0" // Fixed max width
      activeStep={correctedActiveStep}
    >
      {filteredSteps.map((step, index) => {
        const isActive = index === correctedActiveStep;
        // const isActive = false;
        const isVisited = visitedSteps.has(index);
        const hasError = stepHasError(step);

        return (
          <Step
            key={index}
            onClick={() => handleStepClick(index)}
            className={`cursor-pointer ${
              hasError ? "!bg-red-400 text-white" : ""
            } ${
              isActive && !hasError ? "!bg-blue-800 text-white" : ""
            } ${
              isVisited && !hasError && !isActive ? "!bg-blue-400 text-white" : ""
            } ${
              !isVisited && !isActive && !hasError ? "bg-blue-100 text-blue-800" : ""
            }`}
          >
            <Tooltip content={step.title} placement="bottom-start" className={`z-10 bg-gray-800 ${isActive && "hidden"}`}>
              <div
                className={`text-sm ${
                  isActive || isVisited || hasError ? "text-white" : "text-blue-800"
                }`}
                >
                {React.createElement(step.icon, {
                  className: "h-5 w-5 m-2", // Original size
                  strokeWidth: 2,
                })}
              </div>
            </Tooltip>
            <div className="absolute -bottom-7 w-max text-center">
              <Typography
                color={isActive ? "blue-gray" : "gray"}
                className="cursor-default text-xs text-blue-500 font-bold"
              >
                {isActive ? step.title : ""}
              </Typography>
            </div>
          </Step>
        );
      })}
    </Stepper>
  </div>)}

  {/* Form - Responsive only for mobile, unchanged for tablet/laptop */}
  <form
    className={`mt-8 mb-2 ${
      window.innerWidth < 640 ? "w-full px-2" : "w-80 max-w-screen"
    } sm:w-full`}
    encType="multipart/form-data"
    onSubmit={(e) => e.preventDefault()}
  >
    {renderStepContent(filteredSteps[correctedActiveStep])}

    <div className="mt-16 flex justify-between">
      {isSteps && (<Button onClick={handlePrev} disabled={isFirstStep}>
        Prev
      </Button>)}
      <Button
        onClick={handleNext}
        color={isSteps ?
          (correctedActiveStep === filteredSteps.length - 1
            ? "green":"blue")
            : "blue"
        }
        disabled={
          correctedActiveStep === filteredSteps.length - 1 &&
          "declaration" in formData &&
          !formData.declaration
        }
      >
        {isSteps ? (correctedActiveStep === filteredSteps.length - 1
          ? "Finish & Submit"
          : "Next") : "Submit"}
      </Button>
    </div>
  </form>
</div>
  );
}
