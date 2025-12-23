import React, { useState, useMemo, useEffect } from "react";
import { Stepper, Step, Button, Typography } from "@material-tailwind/react";
import SearchableSelect from "../Pages/TableActions/SearchableSelect";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import {
  fetchCitiesByState,
  fetchCitiesByStateAnother,
} from "../../store/Actions/StateAction";
import { useDispatch } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import { IoCheckmark } from "react-icons/io5";
import { TiTick } from "react-icons/ti";
import { IoMdCheckmark } from "react-icons/io";
import { useLocation } from "react-router-dom";
import { fetchPosp, fetchRelationshipManager, fetchReportingManager } from "../../store/Actions/OperationAction";

export function WizardSecond({
  fields,
  otherFields = [],
  onSubmit,
  onReset,
  onChange,
  isEditMode = false,
  errors = {},
  success,
  initialValues = {},
  otherHead,
  validateStep, // Add validateStep prop
}) {
  const location = useLocation();
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);
  const [resetFlag, setResetFlag] = useState(false);
  const [formData, setFormData] = useState({});
  const [isInitialized, setIsInitialized] = useState(false);
  const [formErrors, setFormErrors] = useState({}); // Local form errors state
  const [visitedSteps, setVisitedSteps] = useState(new Set([0]));
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.pathname === "/master/hr/create-employee") {
      setFormData({});
    } else if (!isInitialized && initialValues && Object.keys(initialValues).length > 0) {
      setFormData(initialValues);
      setIsInitialized(true);
    }
  }, [location.pathname, initialValues, isInitialized]);

  // Runs when `initialValues` updates
 useEffect(() => {
    if (success) {
      const newFormData = [...fields, ...otherFields].reduce((acc, field) => {
        acc[field.name] = ""; // Reset each field to empty
        return acc;
      }, {});
      setFormData(newFormData);
      setResetFlag(false); // Reset the flag after reset
    }
  }, [success, fields, otherFields]);

  const handleChange = (selectedOption, actionMeta) => {
    const name = actionMeta?.name;
    if (!selectedOption) return;
    const value = selectedOption ? selectedOption.value : "";
    setFormData((prev) => {
      let updatedFormData = { ...prev, [name]: value };

      if (name === "current_address_state") {
        updatedFormData.current_address_city = "";
        updatedFormData[name] = selectedOption.label;
        dispatch(fetchCitiesByState(value));
      } else if (name === "permanent_address_state") {
        updatedFormData.permanent_address_city = "";
        updatedFormData[name] = selectedOption.label;
        dispatch(fetchCitiesByStateAnother(value));
      } else if (name === "state") {
        updatedFormData.city = "";
        updatedFormData[name] = selectedOption.label;
        dispatch(fetchCitiesByState(value));
      } else if (name === "bqp") {
        updatedFormData.reporting_manager = "";
        updatedFormData[name] = selectedOption.value; // Set state name as label
        dispatch(fetchReportingManager(value));
      }else if (name === "reporting_manager") {
        updatedFormData.relationship_manager = "";
        updatedFormData[name] = selectedOption.value; // Set state name as label
        dispatch(fetchRelationshipManager(value));
      }else if (name === "relationship_manager") {
        updatedFormData.posp_id = "";
        updatedFormData[name] = selectedOption.value; // Set state name as label
        dispatch(fetchPosp(value));
      }else if (
        name === "title" ||
        name === "current_address_city" ||
        name === "permanent_address_city" ||
        name === "city" ||
        name === "bankname" ||
        name === "gender" ||
        name === "education_level" ||
        name === "account_type" || 
        name === "marital_status" || 
        name === "language"
      ) {
        updatedFormData[name] = selectedOption.label;
      }
      return updatedFormData;
    });
  };

  const handleTextInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTextInput = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value || "",
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
      onSubmit(formData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsLastStep(activeStep === fields.length - 1);
    setIsFirstStep(activeStep === 0);
  }, [activeStep, fields.length]);

  const handleRadioChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "same_as_permanent") {
      if (value === "2") {
        setFormData((prev) => ({
          ...prev,
          permanent_address_street: prev.current_address_street,
          permanent_address_city: prev.current_address_city,
          permanent_address_state: prev.current_address_state,
          permanent_address_pincode: prev.current_address_pincode,
          permanent_address_town: prev.current_address_town,
          permanent_house_no: prev.current_house_no,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          permanent_address_street: "",
          permanent_address_city: "",
          permanent_address_state: "",
          permanent_address_pincode: "",
        }));
      }
    }
  };

  const validateCurrentStep = () => {
    if (validateStep) {
      const stepErrors = validateStep(activeStep, formData, fields);
      setFormErrors(stepErrors);
      return Object.keys(stepErrors).length === 0;
    }
    return true;
  };

  const handleNext = () => {
    // Validate current step before proceeding
    const isValid = validateCurrentStep();
    
    if (!isValid) {
      // Find the first error and scroll to it
      const firstErrorField = Object.keys(formErrors)[0];
      if (firstErrorField) {
        const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
        if (errorElement) {
          errorElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
      }
      return;
    }

    const isLastStep = activeStep === fields.length - 1;
    if (isLastStep) {
      handleSubmit();
      return;
    }

    setActiveStep((prev) => {
      const nextStep = prev + 1;
      setVisitedSteps((prevVisited) => new Set(prevVisited).add(nextStep));
      return nextStep;
    });
  };

  const renderStepContent = (currentStep) => {
    if (!currentStep) return null;
    const currentFields = currentStep?.fields || [];
    const permanentAddressFields = currentStep?.fields2 || [];
    const otherFields = currentStep?.fields3 || [];
    let allFields = [...currentFields, ...otherFields];

    if (formData.same_as_permanent !== "2") {
      allFields = [...allFields, ...permanentAddressFields];
    }

    return (
      <div className={`w-full ${
        currentStep?.title === "Process to Upload" ||
        currentStep?.title === "Documents to Upload" ||
        currentStep?.title === "Address Book Details"
          ? "lg:h-fit"
          : "lg:h-80"
      }`}>
        <Typography
          variant="h6"
          color="blue-gray"
          className="mb-4 font-roboto text-xl underline font-bold"
        >
          {currentStep?.title}
        </Typography>

        <div className={`grid w-full gap-y-5 gap-x-4 ${
          currentStep?.title === "Process to Upload"
            ? "lg:grid-cols-2 "
            : "lg:grid-cols-4"
        } md:grid-cols-3`}>
          {allFields.map((field, index) => {
            const getInputClass = (fieldName) =>
              formErrors[fieldName] // Use formErrors instead of errors
                ? "border-red-600 focus:border-red-600"
                : "border-slate-200";

            const isOtherField = otherFields.some(
              (otherField) => otherField.name === field.name
            );
            const isReadOnly =
              isOtherField && formData.posp_with_other_insurer !== "Yes";

            return (
              <div
                key={index}
                className={`grid gap-3 ${
                  (field.type === "radio" &&
                    field.name === "posp_with_other_insurer") ||
                  field.type === "checkbox"
                    ? "col-span-full"
                    : ""
                } ${
                  field.name === "reason_for_cessation_agency" ? " h-20" : ""
                }`}
              >
                {field.type !== "checkbox" && (
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className={`mb-0 font-roboto text-base font-normal ${getInputClass(
                      field.name
                    )} ${
                      currentStep?.title === "Process to Upload"
                        ? "font-semibold font-roboto"
                        : "max-w-[150px] sm:max-w-[200px] md:max-w-[250px]"
                    } overflow-hidden text-ellipsis`}
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
                      <div className="flex -mt-2 gap-4">
                        {field.options.map((option, optionIndex) => (
                          <label key={optionIndex} className="flex items-center">
                            <input
                              type="radio"
                              name={field.name}
                              value={option.value}
                              checked={
                                String(formData[field.name]) ===
                                String(option.value)
                              }
                              onChange={handleRadioChange}
                              className="mr-2"
                            />
                            <span>{option.label}</span>
                          </label>
                        ))}
                      </div>
                    ) : field.type === "checkbox" ? (
                      <div className="flex flex-col gap-4">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            name={field.name}
                            checked={formData[field.name] === 1}
                            onChange={(e) => {
                              const newValue = e.target.checked ? 1 : "";
                              setFormData({
                                ...formData,
                                [field.name]: newValue,
                              });
                            }}
                            className={`mr-2 ${getInputClass(field.name)}`}
                          />
                          <span>{field.label}</span>
                        </label>
                      </div>
                    ) : field.type === "select" ? (
                      <CreatableSelect
                        options={field.options}
                        onChange={(selectedOption) =>
                          handleChange(selectedOption, { name: field.name })
                        }
                        onCreateOption={(inputValue) => {
                          const existingOption = field.options.find(
                            (option) =>
                              option.label.toLowerCase() ===
                              inputValue.toLowerCase()
                          );

                          if (!existingOption) {
                            const newOption = {
                              value: field.options.length + 1,
                              label: inputValue,
                            };
                            field.options.push(newOption);

                            setFormData((prev) => ({
                              ...prev,
                              [field.name]: inputValue,
                            }));
                          } else {
                            setFormData((prev) => ({
                              ...prev,
                              [field.name]: existingOption.value,
                            }));
                          }
                        }}
                        id={field.name}
                        name={field.name}
                        isDisabled={field.disabled || isReadOnly}
                        defaultValue={
                          field.defaultValue && field.defaultValue.value
                            ? field.defaultValue
                            : null
                        }
                        required={field.required}
                        value={
                          field.disabled
                            ? field.defaultValue
                            : formData[field.name]
                            ? field.options.find(
                                (option) =>
                                  option.value === formData[field.name] ||
                                  option.label === formData[field.name]
                              ) || {
                                value: formData[field.name],
                                label:
                                  field.options.find(
                                    (option) =>
                                      option.value === formData[field.name]
                                  )?.label || formData[field.name],
                              }
                            : null
                        }
                        placeholder={field.placeholder}
                        className={`${getInputClass(field.name)} basic-single font-roboto`}
                        styles={{
                          control: (base, state) => ({
                            ...base,
                            borderRadius: "0.75rem",
                            borderWidth: "2px",
                            borderColor: formErrors[field.name]
                              ? "#dc2626"
                              : state.isFocused
                              ? "#1e88e5"
                              : "#e2e8f0",
                            fontSize: "14px",
                            boxShadow: "none",
                            "&:hover": {
                              borderColor: formErrors[field.name]
                                ? "#dc2626"
                                : "#1e88e5",
                            },
                          }),
                          menu: (base) =>
                            field.dropdown ? { ...base, zIndex: 9999 } : base,
                          singleValue: (base) => ({
                            ...base,
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            maxWidth: "90%",
                          }),
                        }}
                        filterOption={(option, inputValue) =>
                          option.data.label
                            .toLowerCase()
                            .includes(inputValue.toLowerCase())
                        }
                        classNamePrefix="select"
                      />
                    ) : field.type === "date" ? (
                      <div className="w-full z-auto date-wrapper h-fit">
                        <DatePicker
                          name={field.name}
                          yearPlaceholder="yyyy"
                          monthPlaceholder="mm"
                          disabled={field.readOnly || isReadOnly}
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
                          format="dd/MM/yyyy"
                          required={field.required}
                          className={`react-date-picker ${
                            formErrors[field.name]
                              ? "border-red-600 focus:border-red-600"
                              : "border-slate-200"
                          } ${
                            field.readOnly || isReadOnly
                              ? "bg-gray-200 cursor-not-allowed"
                              : ""
                          }`}
                          calendarClassName="rounded-lg font-roboto bg-red-400 shadow-lg"
                          placeholderText="dd/mm/yyyy"
                          clearIcon={null}
                        />
                      </div>
                    ) : field.type === "file" ? (
                      <div className="w-full">
                        {formData[field.name] &&
                        formData[field.name] !== "null" ? (
                          <div className="mb-4 flex items-center space-x-4">
                            <img
                              src={
                                typeof formData[field.name] === "string"
                                  ? formData[field.name]
                                  : URL.createObjectURL(formData[field.name])
                              }
                              alt="Uploaded File"
                              className={`w-full h-32 object-fill rounded-lg border border-gray-200`}
                            />
                          </div>
                        ) : field.sampleImage ? (
                          <div className="mb-4 flex items-center space-x-4">
                            <img
                              src={field.sampleImage}
                              alt="Sample Image"
                              className="w-full h-32 object-fill rounded-lg border border-gray-200"
                            />
                          </div>
                        ) : null}

                        <input
                          id={field.name}
                          name={field.name}
                          type="file"
                          readOnly={field.readOnly || isReadOnly}
                          accept={field.accept || "*"}
                          onChange={(e) => {
                            if (!isReadOnly && !field.readOnly) {
                              const file = e.target.files[0];
                              if (file) {
                                handleTextInputChange(field.name, file);
                              }
                            }
                          }}
                          disabled={field.readOnly || isReadOnly}
                          required={!formData[field.name] && field.required}
                          className={`block w-full text-sm text-gray-900 border border-gray-300 rounded-lg ${
                            field.readOnly || isReadOnly
                              ? "cursor-not-allowed bg-gray-200"
                              : "cursor-pointer bg-gray-50 hover:bg-gray-100"
                          } ${
                            formErrors[field.name]
                              ? "border-red-600 focus:border-red-600"
                              : "border-slate-200"
                          } focus:outline-none transition duration-200 file:bg-blue-600 file:border-none file:mr-4 file:py-2 file:px-4 file:rounded-l-lg file:text-white file:font-semibold file:hover:bg-blue-700`}
                        />
                      </div>
                    ) : (
                      <input
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        value={formData[field.name] || ""}
                        onChange={handleTextInput}
                        readOnly={field.readOnly || isReadOnly}
                        placeholder={field.placeholder || ""}
                        className={`w-full font-times placeholder:text-slate-400 text-slate-900 text-base border-2 rounded-xl px-3 py-1.5 transition duration-300 ease focus:outline-none hover:border-blue-600 ${
                          field.readOnly || isReadOnly
                            ? "bg-gray-200"
                            : "bg-transparent"
                        } ${
                          formErrors[field.name]
                            ? "border-red-600 focus:border-red-600"
                            : "border-slate-200"
                        }`}
                      />
                    )}
                  </>
                )}

                {formErrors[field.name] && (
                  <span className="text-red-600 -mt-2 pl-2 text-xs">
                    {formErrors[field.name]}
                  </span>
                )}

                {currentStep?.title === "Process to Upload" && (
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
    );
  };

  const filteredSteps = fields.filter(
    (step) =>
      !(
        step.title === "Experienced Details" &&
        formData.employee_type !== "Experienced" 
      )
  );


  const correctedActiveStep = Math.min(activeStep, filteredSteps.length - 1);
    setActiveStep((prev) => {
      const nextStep = prev + 1;
      setVisitedSteps((prevVisited) => new Set(prevVisited).add(nextStep));
      return nextStep;
    });
  const stepHasError = (step) => {
    const allFields = [
      ...(step.fields || []),
      ...(step.fields2 || []),
      ...(step.fields3 || []),
    ];
  
    return allFields.some((field) => errors[field.name]);
  };
 
  return (
    <div className="flex flex-col justify-center items-center py-4 lg:px-8">
      <Stepper
        lineClassName="bg-blue-200"
        activeLineClassName="bg-blue-700"
        className="lg:w-3/5 z-0"
        activeStep={correctedActiveStep}
      >
        {/* {filteredSteps.map((step, index) => (
          <Step
            className={`cursor-pointer ${hasError ? "!bg-red-500 text-white" : ""} ${
              index === correctedActiveStep
                ? "!bg-blue-800"
                : visitedSteps.has(index)
                ? "!bg-blue-400 text-white"
                : "!bg-blue-100"
            }`}
            key={index}
            onClick={() => handleStepClick(index)}
          >
            <div
              className={`text-sm ${
                visitedSteps.has(index)
                  ? "text-white "
                  : index === correctedActiveStep
                  ? "text-white"
                  : "text-blue-800"
              }`}
            >
              {React.createElement(step.icon, {
                className: `h-5 w-5`,
                strokeWidth: 2,
              })}
            </div>
            <div className="absolute -bottom-7 w-max text-center">
              <Typography
                color={correctedActiveStep === 0 ? "blue-gray" : "gray"}
                className="text-xs text-blue-500 font-bold"
              >
                {index === correctedActiveStep ? step.title : ""}
              </Typography>
            </div>
          </Step>
        ))} */}
        {filteredSteps.map((step, index) => {
  const isActive = index === correctedActiveStep;
  const isVisited = visitedSteps.has(index);
  const hasError = stepHasError(step);

  return (
    <Step
      key={index}
      onClick={() => handleStepClick(index)}
      className={`cursor-pointer 
       ${hasError ? "!bg-red-400 text-white" : ""}
      ${isActive && !hasError? "!bg-blue-800 text-white" : ""}
      ${isVisited && !hasError && !isActive ? "!bg-blue-400 text-white" : ""}
      ${!isVisited && !isActive && !hasError ? "bg-blue-100 text-blue-800" : ""}
      `}
    >
      <div
        className={`text-sm ${
          isActive || isVisited || hasError ? "text-white" : "text-blue-800"
        }`}
      >
        {React.createElement(step.icon, {
          className: "h-5 w-5",
          strokeWidth: 2,
        })}
      </div>
      <div className="absolute -bottom-7 w-max text-center">
        <Typography
          color={isActive ? "blue-gray" : "gray"}
          className="text-xs text-blue-500 font-bold"
        >
          {isActive ? step.title : ""}
        </Typography>
      </div>
    </Step>
  );
})}

      </Stepper>

      <form
        className="mt-8 mb-2 w-80 max-w-screen sm:w-full"
        encType="multipart/form-data"
        onSubmit={(e) => {
          e.preventDefault();
          handleNext();
        }}
      >
        {renderStepContent(filteredSteps[correctedActiveStep])}

        <div className="mt-16 flex justify-between">
          <Button onClick={handlePrev} disabled={isFirstStep}>
            Prev
          </Button>
          <Button
            type={correctedActiveStep === filteredSteps.length - 1 ? "submit" : "button"}
            onClick={correctedActiveStep === filteredSteps.length - 1 ? null : handleNext}
            color={
              correctedActiveStep === filteredSteps.length - 1
                ? "green"
                : "blue"
            }
            disabled={
              correctedActiveStep === filteredSteps.length - 1 &&
              "declaration" in formData &&
              !formData.declaration
            }
          >
            {correctedActiveStep === filteredSteps.length - 1
              ? "Finish & Submit"
              : "Next"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default WizardSecond;