import React, { useState, useEffect } from "react";
import { Button, Typography } from "@material-tailwind/react";
import SearchableSelect from "./SearchableSelect";
import CreatableSelect from "react-select/creatable";
// import {
//   fetchPosp,
//   fetchRelationshipManager,
//   fetchReportingManager,
//   fetchReportingManagerWithPosp,
// } from "../../store/Actions/OperationAction";
import { useOperation } from "../../hooks/useOperation";
import { useDispatch } from "react-redux";

const FormDynamic = ({
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
}) => {
  const [formData, setFormData] = useState(
    [...fields, ...otherFields].reduce((acc, field) => {
      const fieldName =
        field.name || `field_${Math.random().toString(36).substr(2, 9)}`;
      acc[fieldName] = initialValues[field.name] || field.value || "";
      return acc;
    }, {})
  );
  const [resetFlag, setResetFlag] = useState(false);
    const {fetchPosp,fetchRelationshipManager,fetchReportingManager,fetchReportingManagerWithPosp} =useOperation()
  useEffect(() => {
    if (success) {
      const newFormData = [...fields, ...otherFields].reduce((acc, field) => {
        acc[field.name] = field.name === "branch_id" ? formData[field.name] : "";
        return acc;
      }, {});
      setFormData(newFormData);
      setResetFlag(false);
    }
  }, [success, fields, formData,otherFields]);
  const dispatch = useDispatch();
  const handleStateChange = (name, selectedOption) => {
    const field = [...fields, ...otherFields].find((f) => f.name === name);
    const shouldStoreLabel = field ? field.storeLabel : false;
    const valueToStore = shouldStoreLabel
      ? selectedOption.label
      : selectedOption.value;

    const updatedFormData = { ...formData };

    if (name === "state") {
      updatedFormData.state = valueToStore;
      updatedFormData.city = "";
    } else if (name === "type_of_insurance_branch") {
      updatedFormData[name] = valueToStore;
      updatedFormData.insurer_company_id = "";
    } else if (name === "bqp") {
      updatedFormData.reporting_manager = "";
      updatedFormData.relationship_manager = "";
      updatedFormData.posp_id = "";
      updatedFormData.posp = "";
      if (!updatedFormData.reporting_manager) {
        updatedFormData.reporting_manager = "";
      }
      if (!updatedFormData.relationship_manager) {
        updatedFormData.relationship_manager = "";
      }
      if (!updatedFormData.posp_id) {
        updatedFormData.posp_id = "";
      }
      updatedFormData[name] = selectedOption.value;
      dispatch(fetchReportingManager(selectedOption.value));
      dispatch(fetchRelationshipManager(selectedOption.value));
      dispatch(fetchReportingManagerWithPosp(selectedOption.value));
    }
    // else if (name === "reporting_manager") {
    //   updatedFormData.relationship_manager = "";
    //   updatedFormData.posp_id = "";
    //   updatedFormData[name] = selectedOption.value;
    //   //dispatch(fetchRelationshipManager(selectedOption.value));
    // }
    else if (name === "relationship_manager") {
      if (!updatedFormData.posp_id) {
        updatedFormData.posp_id = "";
      }
      updatedFormData[name] = selectedOption.value;
      dispatch(fetchPosp(selectedOption.value));
    } else {
      updatedFormData[name] = valueToStore;
    }

    setFormData(updatedFormData);

    if (onChange) {
      onChange(name, selectedOption);
    }
  };

  const handleTextInputChange = (name, value) => {
    let formattedValue = value;

    if (
      name === "mobile_no" ||
      name === "alternative_mobile_no" ||
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
    } else if (name === "bank_account_no" || name === "account_number") {
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

    if (onChange) {
      onChange(name, value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(formData);
    setResetFlag(true);
  };

  const handleReset = () => {
    const newFormData = [...fields, ...otherFields].reduce((acc, field) => {
      acc[field.name] = field.value || "";
      return acc;
    }, {});
    setFormData(newFormData);

    if (onReset) onReset();
  };

  const getOptionLabel = (option) => {
    if (option.label === "client") {
      return (
        <div>
          <strong>
            {option.title} {option.name}
          </strong>
          <br />
          {option.customerType}
          <br />
          {option.address}
        </div>
      );
    } else if (option.label === "use another") {
      return (
        <div>
          {option.state} / {option.city} / {option.pincode}
          <br />
          <strong>{option.address}</strong>
        </div>
      );
    } else {
      return (
        <div>
          {option.label}
          {option.code
            ? ` (${option.code})`
            : option.mobile_no
            ? ` (${option.mobile_no})`
            : ""}
        </div>
      );
    }
  };

  // Determine visible fields based on conditions
  // const getVisibleFields = (fieldsList) => {
  //   return fieldsList.filter(field => {
  //     if (field.hidden) return false;
      
  //     // Check if field has visibility conditions
  //     if (field.visibleIf) {
  //       const { field: dependentField, value: expectedValue } = field.visibleIf;
  //       return formData[dependentField] === expectedValue;
  //     }
      
  //     return true;
  //   });
  // };
  const getVisibleFields = (fieldsList) => {
    return fieldsList.filter((field) => {
      if (field.hidden) return false;
      if (field.visibleIf) {
        const { field: dependentField, value: expectedValue } = field.visibleIf;
        const currentValue = formData[dependentField];
  
        if (Array.isArray(expectedValue)) {
          return expectedValue.includes(currentValue);
        }
  
        return currentValue === expectedValue;
      }

      return true;
    });
  };
  const getInputClass = (fieldName) =>
    errors[fieldName]
      ? "border-red-600 focus:border-red-600"
      : "border-slate-200";
  const visibleFields = getVisibleFields(fields);
  const visibleOtherFields = getVisibleFields(otherFields);

  return (
    <form onSubmit={handleSubmit} className="mt-4 mb-2 w-full gap-4">
      <div className="mb-1">
        <div
          className={`grid md:grid-cols-3 ${
            isEditMode
              ? "lg:grid-cols-3 xl:grid-cols-4"
              : "lg:grid-cols-4 xl:grid-cols-5"
          } gap-4`}
        >
          {visibleFields.map((field, index) => (
            <div key={index} className="flex relative flex-col gap-4">
              <Typography
                variant="h6"
                color="blue-gray"
                className="-mb-2 font-times text-[16px] font-normal"
              >
                {field.label} {field.required ? (
                      <span className="text-red-500">*</span>
                    ) : (
                      ""
                    )}
              </Typography>
              {field.type === "select" ? (
                <CreatableSelect
                  options={field.options}
                  // getOptionLabel={getOptionLabel}
                  onChange={(selectedOption) =>
                    handleStateChange(field.name, selectedOption)
                  }
                    // onCreateOption={(inputValue) => {
                    //   const existingOption = field.options.find(
                    //     (option) =>
                    //       option.label.toLowerCase() === inputValue.toLowerCase()
                    //   );

                    //   if (!existingOption) {
                    //     const newOption = {
                    //       value: field.options.length + 1,
                    //       label: inputValue,
                    //     };
                    //     field.options.push(newOption);

                    //     setFormData((prev) => ({
                    //       ...prev,
                    //       [field.name]: newOption.value,
                    //     }));
                    //   } else {
                    //     setFormData((prev) => ({
                    //       ...prev,
                    //       [field.name]: existingOption.value,
                    //     }));
                    //   }
                    // }}
                  id={field.name}
                  name={field.name}
                  isDisabled={field.disabled}
                  defaultValue={
                    field.defaultValue && field.defaultValue.value
                      ? field.defaultValue
                      : null
                  }
                  // isDisabled={isReadOnly}
                  required={field.required}
                  // value={
                  //   field.disabled
                  //     ? field.defaultValue // Ensure disabled users see the default value
                  //     : formData[field.name]
                  //     ? field.options.find(
                  //         (option) =>
                  //           option.value === formData[field.name] ||
                  //           option.label === formData[field.name]
                  //       ) || {
                  //         value: formData[field.name],
                  //         label:
                  //           field.options.find(
                  //             (option) =>
                  //               option.value === formData[field.name]
                  //           )?.label || formData[field.name],
                  //       }
                  //     : null
                  // }
                  value={
                    field.disabled
                      ? field.defaultValue
                      : formData[field.name] !== undefined &&
                        formData[field.name] !== null &&
                        formData[field.name] !== ""
                      ? field.options.find(
                          (option) =>
                            String(option.value) ===
                            String(formData[field.name])
                        ) || {
                          value: formData[field.name],
                          label: String(formData[field.name]),
                        }
                      : null
                  }
                  placeholder={field.placeholder}
                  className={` ${getInputClass(
                    field.name
                  )} basic-single font-roboto`}
                  styles={{
                    control: (base, state) => ({
                      ...base,
                      borderRadius: "0.75rem",
                      borderWidth: "2px",
                      borderColor: errors[field.name]
                        ? "#dc2626" // Red border for errors
                        : state.isFocused
                        ? "#1e88e5" // Blue border when focused
                        : "#e2e8f0",
                      fontSize: "14px",
                      boxShadow: "none",
                      "&:hover": {
                        borderColor: errors[field.name] ? "#dc2626" : "#1e88e5",
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
              ) : (
                /* <CreatableSelect
                  options={field.options}
                  isDisabled={field.disabled}
                  defaultValue={field.defaultValue}
                  onChange={(selectedOption) =>
                    handleStateChange(field.name, selectedOption)
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
                        [field.name]: newOption.value,
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
                  required={field.required}
                  value={
                    formData[field.name] !== undefined &&
                    formData[field.name] !== null &&
                    formData[field.name] !== ""
                      ? field.options.find(
                          (option) =>
                            String(option.value) ===
                            String(formData[field.name])
                          ) || {
                            value: formData[field.name],
                            label: String(formData[field.name]),
                          }
                      : null
                  }
                  placeholder={field.placeholder || "Select or type to add"}
                  className="basic-single font-roboto"
                  styles={{
                    control: (base, state) => ({
                      ...base,
                      borderRadius: "0.75rem",
                      borderWidth: "2px",
                      borderColor: state.isFocused ? "#1e88e5" : "#eeeeee",
                      padding: "0px",
                      fontSize: "14px",
                      boxShadow: "none",
                      "&:hover": {
                        borderColor: "#eeeeee",
                      },
                    }),
                    menu: (base) =>
                      field.dropdown
                        ? {
                            ...base,
                            zIndex: 9999,
                            transform: "translateY(-120%)",
                            left: "0%",
                          }
                        : base,
                    menuPortal: (base) =>
                      field.dropdown
                        ? {
                            ...base,
                            zIndex: 9999,
                          }
                        : base,
                    singleValue: (base) => ({
                      ...base,
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      maxWidth: "90%",
                    }),
                    valueContainer: (base) => ({
                      ...base,
                      minHeight: "40px",
                      maxHeight: "40px",
                      overflow: "hidden",
                    }),
                  }}
                  filterOption={(option, inputValue) =>
                    option.data.label
                      .toLowerCase()
                      .includes(inputValue.toLowerCase())
                  }
                /> */
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  value={formData[field.name] || ""}
                  required={field.required}
                  onChange={(e) =>
                    handleTextInputChange(field.name, e.target.value)
                  }
                  placeholder={field.placeholder || ""}
                  className={`w-full bg-transparent font-times placeholder:text-slate-400 text-slate-900 text-base border-2 rounded-xl px-3 py-1.5 transition duration-300 ease focus:outline-none hover:border-blue-600 ${
                    errors[field.name]
                      ? "border-red-600 focus:border-red-600"
                      : "border-slate-200"
                  }`}
                />
              )}
              {errors[field.name] && (
                <div className="absolute bottom-0 left-0  transform translate-y-full">

                <span className="text-red-600 m-0 p-0  text-xs pl-1">
                  {errors[field.name]}
                </span>
                </div>
              )}
            </div>
          ))}
        </div>
        {otherHead && (
          <Typography
            variant="h4"
            className="font-pt_serif pt-8 font-semibold text-[28px]"
            color="blue-gray"
          >
            Add {otherHead}
          </Typography>
        )}
        <div
          className={`grid md:grid-cols-3 ${
            isEditMode
              ? "lg:grid-cols-3 xl:grid-cols-4"
              : "lg:grid-cols-4 xl:grid-cols-5"
          } gap-4 mt-4`}
        >
          {visibleOtherFields.map((field, index) => (
            <div key={index} className="flex flex-col gap-4">
              <Typography
                variant="h6"
                color="blue-gray"
                className="-mb-2 font-pt_serif text-lg font-medium"
              >
                {field.label}
              </Typography>
              {field.type === "select" ? (
                <CreatableSelect
                  options={field.options}
                  // getOptionLabel={getOptionLabel}
                  onChange={(selectedOption) =>
                    handleStateChange(field.name, selectedOption)
                  }
                  // onCreateOption={(inputValue) => {
                  //   const existingOption = field.options.find(
                  //     (option) =>
                  //       option.label.toLowerCase() === inputValue.toLowerCase()
                  //   );

                  //   if (!existingOption) {
                  //     const newOption = {
                  //       value: field.options.length + 1,
                  //       label: inputValue,
                  //     };
                  //     field.options.push(newOption);

                  //     setFormData((prev) => ({
                  //       ...prev,
                  //       [field.name]: newOption.value,
                  //     }));
                  //   } else {
                  //     setFormData((prev) => ({
                  //       ...prev,
                  //       [field.name]: existingOption.value,
                  //     }));
                  //   }
                  // }}
                  id={field.name}
                  name={field.name}
                  isDisabled={field.disabled}
                  defaultValue={
                    field.defaultValue && field.defaultValue.value
                      ? field.defaultValue
                      : null
                  }
                  // isDisabled={isReadOnly}
                  required={field.required}
                  // value={
                  //   field.disabled
                  //     ? field.defaultValue // Ensure disabled users see the default value
                  //     : formData[field.name]
                  //     ? field.options.find(
                  //         (option) =>
                  //           option.value === formData[field.name] ||
                  //           option.label === formData[field.name]
                  //       ) || {
                  //         value: formData[field.name],
                  //         label:
                  //           field.options.find(
                  //             (option) =>
                  //               option.value === formData[field.name]
                  //           )?.label || formData[field.name],
                  //       }
                  //     : null
                  // }
                  value={
                    field.disabled
                      ? field.defaultValue
                      : formData[field.name] !== undefined &&
                        formData[field.name] !== null &&
                        formData[field.name] !== ""
                      ? field.options.find(
                          (option) =>
                            String(option.value) ===
                            String(formData[field.name])
                        ) || {
                          value: formData[field.name],
                          label: String(formData[field.name]),
                        }
                      : null
                  }
                  placeholder={field.placeholder}
                  className={` ${getInputClass(
                    field.name
                  )} basic-single font-roboto`}
                  styles={{
                    control: (base, state) => ({
                      ...base,
                      borderRadius: "0.75rem",
                      borderWidth: "2px",
                      borderColor: errors[field.name]
                        ? "#dc2626" // Red border for errors
                        : state.isFocused
                        ? "#1e88e5" // Blue border when focused
                        : "#e2e8f0",
                      fontSize: "14px",
                      boxShadow: "none",
                      "&:hover": {
                        borderColor: errors[field.name] ? "#dc2626" : "#1e88e5",
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
              ) : (
                /* <CreatableSelect
                  options={field.options}
                  onChange={(selectedOption) =>
                    handleStateChange(field.name, selectedOption)
                  }
                  isDisabled={field.disabled}
                  defaultValue={field.defaultValue}
                  onCreateOption={(inputValue) => {
                    const existingOption = field.options.find(
                      (option) =>
                        option.label.toLowerCase() === inputValue.toLowerCase()
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
                  required={field.required}
                  value={
                    formData[field.name] !== undefined &&
                    formData[field.name] !== null &&
                    formData[field.name] !== ""
                      ? field.options.find(
                          (option) =>
                            String(option.value) ===
                            String(formData[field.name])
                          ) || {
                            value: formData[field.name],
                            label: String(formData[field.name]),
                          }
                      : null
                  }
                  placeholder={field.placeholder || "Select or type to add"}
                  className="basic-single font-roboto"
                  styles={{
                    control: (base, state) => ({
                      ...base,
                      borderRadius: "0.75rem",
                      borderWidth: "2px",
                      borderColor: state.isFocused ? "#1e88e5" : "#eeeeee",
                      padding: "0px",
                      fontSize: "14px",
                      boxShadow: "none",
                      "&:hover": {
                        borderColor: "#eeeeee",
                      },
                    }),
                    menu: (base) =>
                      field.dropdown
                        ? {
                            ...base,
                            zIndex: 9999,
                            transform: "translateY(-120%)",
                            left: "0%",
                          }
                        : base,
                    menuPortal: (base) =>
                      field.dropdown
                        ? {
                            ...base,
                            zIndex: 9999,
                          }
                        : base,
                    singleValue: (base) => ({
                      ...base,
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      maxWidth: "90%",
                    }),
                    valueContainer: (base) => ({
                      ...base,
                      minHeight: "40px",
                      maxHeight: "40px",
                      overflow: "hidden",
                    }),
                  }}
                  filterOption={(option, inputValue) =>
                    option.data.label
                      .toLowerCase()
                      .includes(inputValue.toLowerCase())
                  }
                /> */
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  value={formData[field.name] || ""}
                  required={field.required}
                  onChange={(e) =>
                    handleTextInputChange(field.name, e.target.value)
                  }
                  placeholder={field.placeholder || ""}
                  className={`w-full bg-transparent font-times placeholder:text-slate-400 text-slate-900 text-base border-2 rounded-xl px-3 py-1.5 transition duration-300 ease focus:outline-none hover:border-blue-600 ${
                    errors[field.name]
                      ? "border-red-600 focus:border-red-600"
                      : "border-slate-200"
                  }`}
                />
              )}
              {errors[field.name] && (
                <div className="absolute bottom-0 left-0 transform translate-y-full">

                <span className="text-red-600 text-sm">
                  {errors[field.name]}
                </span>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex w-fit gap-4 mt-6">
          <Button
            type="submit"
            className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-[16px] py-3 px-6 rounded-lg bg-blue-500 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none tracking-wider"
            fullWidth
          >
            Submit
          </Button>
          <Button
            onClick={handleReset}
            className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 text-[16px] disabled:shadow-none disabled:pointer-events-none py-3 px-6 rounded-lg bg-gray-700 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-gray-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none tracking-wider"
            fullWidth
          >
            Reset
          </Button>
        </div>
      </div>
    </form>
  );
};

export default FormDynamic;
