import React, { useEffect, useState } from "react";
// import { Typography } from "@material-tailwind/react";
import Input from "../../components/form/input/InputField";
import FormButton from "../../components/ui/button/Button"; // your custom button
import DatePicker from "../../components/form/date-picker";
import Select from "../../components/form/Select";
import Button from "../../components/ui/button/Button";
import { Typography } from "@material-tailwind/react";
import { useStateData } from "../../hooks/hookIndex";
import { useLocation } from "react-router";
import FileInput from "../../components/form/input/FileInput";


export default function DynamicForm({
  config,
  resetAfterSubmit,
  onSubmit,
  initialValues,
  submitButton, // ⭐ added
  containsButton,
  onEdit,
  errors={},
  success,
  onChange,
  isEditPage
}) {
  const [formData, setFormData] = useState(initialValues);
  const [internalErrors, setInternalErrors] = useState({});
  const [isInitialized, setIsInitialized] = useState(false);
  
  const {fetchCitiesByState,fetchCitiesByStateAnother}=useStateData();
  const location =useLocation();
  // console.log(config,"department")
  // Reset form after successful submit
  useEffect(() => {
    if (resetAfterSubmit) {
      setFormData({});
      setInternalErrors({});
    }
  }, [resetAfterSubmit]);
   useEffect(() => {
      // const isEditPage = ![
      //   "/master/hr/create-employee",
      //   "/master/hr/add-misp",
      // ].includes(location.pathname);
  
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
    if (success) {
      const newFormData = [...config.stepFields].reduce((acc, field) => {
        acc[field.name] =
          field.name === "branch_id" ? formData[field.name] : ""; // Reset each field to empty
        return acc;
      }, {});
      setFormData(newFormData);
      // setResetFlag(false); // Reset the flag after reset
      }
  }, [success]);

  const handleFileInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // console.log(value);
    // if (onChange) {
    //   onChange(name, value);
    // }
  }
  const handleRadioChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => {
    const updated = { ...prev, [name]: value };

    // if (name === "same_as_permanent") {
    //   if (value === "2") {
    //     // 🔴 FIXED: If "Yes" is selected, copy ALL current address fields to permanent
    //     console.log("Copying current address to permanent...");
    //     return {
    //       ...updated,
    //       permanent_house_no: prev.current_house_no || "",
    //       permanent_address_street: prev.current_address_street || "",
    //       permanent_address_state: prev.current_address_state || "",
    //       permanent_address_city: prev.current_address_city || "",
    //       permanent_address_town: prev.current_address_town || "",
    //       permanent_address_pincode: prev.current_address_pincode || "",
    //     };
    //   } else {
    //     // 🔴 FIXED: Clear permanent address fields if "No" is selected
    //     console.log("Clearing permanent address fields...");
    //     return {
    //       ...updated,
    //       permanent_house_no: "",
    //       permanent_address_street: "",
    //       permanent_address_state: "",
    //       permanent_address_city: "",
    //       permanent_address_town: "",
    //       permanent_address_pincode: "",
    //     };
    //   }
    // }

    return updated;
  });
};

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
      // } else if (name === "bqp") {
      //   updatedFormData.relationship_manager = "";
      //   updatedFormData.reporting_manager = "";
      //   // updatedFormData[name] = selectedOption?.value; // Set state name as label
      //   (fetchReportingManager(value));
      //   (fetchRelationshipManager(value));
      //   (fetchReportingManagerWithPosp(value));
      // }
      // else if (name === "reporting_manager") {
      //   updatedFormData.relationship_manager = "";
      //   updatedFormData[name] = selectedOption.value; // Set state name as label
      //   // dispatch(fetchRelationshipManager(value));
      // }
      // else if (name === "relationship_manager") {
      //   // updatedFormData.posp_id = "";
      //   updatedFormData[name] = selectedOption?.value; // Set state name as label
      //   // (fetchPosp(value));
      }
       else if (
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

   const validateCurrentStep = () => {
     (config.stepFields.map((step,index)=>{
      // console.log(step.fields)
      
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
            // required: isOtherInsurerYes,
          };
        }
        return field;
      }),
    ];

    // const requiredFields = dynamicFields.filter((field) => field.required);
    const errors = {};
      dynamicFields.forEach((field) => {
        // console.log(field)
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
          // console.log(field.type, field.name)
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
      });
    }))
    setInternalErrors(errors);
    return Object.keys(errors).length === 0;
  };
 const handleSubmit = () => {
    if (!validateCurrentStep()) {
    console.log("me yaha hu error aa gai")
      return; // Stop if required fields aren't filled
    }
    console.log("me yaha hu",formData)
    // if (onSubmit) onSubmit(formData);
    try {
      // console.log("formData:", formData);

      onSubmit(formData);
      // setResetFlag(true);
    } catch (error) {
      console.log(error);
      // alert("Failed to submit the form. Please try again.");
    }
  };
    // Submit handler 
const handleEdit = () => {
  if (!validateCurrentStep()) {
      console.log("me yaha hu error aa gai")
        return; // Stop if required fields aren't filled
      }
      console.log("me yaha hu")
      // if (onSubmit) onSubmit(formData);
      try {
        // console.log("formData:", formData);

        onEdit(formData);
        // setResetFlag(true);
      } catch (error) {
        console.log(error);
        // alert("Failed to submit the form. Please try again.");
      }
  };

  const handleReset = () => {
  if (!validateCurrentStep()) {
      console.log("me yaha hu error aa gai")
        return; // Stop if required fields aren't filled
      }
      console.log("me yaha hu")
      // if (onSubmit) onSubmit(formData);
      try {
        // console.log("formData:", formData);

        onReset(formData);
        // setResetFlag(true);
      } catch (error) {
        console.log(error);
        // alert("Failed to submit the form. Please try again.");
      }
  };

   const isFieldDisabled = (field) => {
     const deps = field?.dependsOn;
      // No dependencies → never disabled
      if (!deps || deps.length === 0) return false;
      // // 1️⃣ If "same_as_permanent" exists in dependsOn
      // const hasSAP = deps.includes("same_as_permanent");
      // if (hasSAP) {
      //   // Auto-fill mode → disable field
      //   if (formData.same_as_permanent === "2") {
      //     return true;
      //   }

      //   // If field also depends on permanent_address_state
      //   if (deps.includes("permanent_address_state")) {
      //     return !formData.permanent_address_state;
      //   }

      //   // Only depends on same_as_permanent → enable when SAP = "1"
      //   return false;
      // }
      // 2️⃣ NORMAL dependency (like permanent_address_city → permanent_address_state)
      // 🔴 FIXED: Check if permanent_address_city depends on permanent_address_state
      // if (field.name === "permanent_address_city" && deps.includes("permanent_address_state")) {
      //   return !formData.permanent_address_state || formData.same_as_permanent === "2";
      // }
      // 2️⃣ NORMAL dependency (like current_address_city → current_address_state)
      return deps.some((d) => !formData[d]);
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
  // Render fields dynamically
  const renderField = (field) => {
    // console.log(field.name,field.value)
    if (field.hidden) return null;
    switch (field.type) {
      case "select":
        return (
          <Select
            key={`${field.type}-${field.name}`}
            id={`${field.name}-${field.type}`} 
            field={field}
            formData={formData}
            onChange={handleChange}
            onBlur={() =>validateField(field.name, formData[field.name], field)}
            disabled={field.disabled  || isFieldDisabled(field)}
            defaultValue={field.storeLabel? field?.options?.find(o => o.value === formData[field.name])?.value || "": formData[field.name]}
            error={!!errors[field.name] || !!internalErrors[field.name]}
            hint={internalErrors[field.name] || errors[field.name]  || field.hint}
            options={field.options || []} // Pass options via props
            loading={false} // You can pass loading state if needed
            className={`${field.readOnly || isFieldDisabled(field)? "bg-gray-100 dark:bg-gray-500 rounded-lg ": "bg-transparent"
            } ${errors[field.name]? "border-red-600 focus:border-red-600": "border-slate-200"} sm:w-10 sm:gap-3 ${field.className}`}
            placeholder={field.label || ""}
          />
        );
      case "text":
      case "number":
      case "password":
        return (
           <div className="relative">
            <Input
              key={`${field.type}-${field.name}`}
              id={`${field.name}-${field.type}`} 
              type={field.type}
              name={field.name}
              value={(formData[field?.name] || field?.value || "" )}
              // disabled={field.disabled || isReadOnly || isFieldDisabled(field)}
              disabled={field.disabled || isFieldDisabled(field)}
              onChange={handleTextInput}
              // onChange={(e) => handleChange(e, field)}
              // readOnly={field.readOnly || isReadOnly}
              placeholder={field.label || field.placeholder ||""}
              onBlur={(e) => validateField(field.name, e.target.value,field)}
              className={`${// field.readOnly || isReadOnly || isFieldDisabled(field)
                field.readOnly || isFieldDisabled(field)? "bg-gray-200": "bg-transparent"} 
                ${errors[field.name]? "border-red-600 focus:border-red-600": "border-slate-200"} 
                ${field.className}`}
              error={!!errors[field.name] || !!internalErrors[field.name]}
              hint={internalErrors[field.name] || errors[field.name]  || field.hint}
            />
            </div>
        );
        case "datepicker":
          return(
             <div
            // ref={(el) => (datePickerRefs.current[field.name] = el)}
            className="relative w-full z-auto date-wrapper h-fit"
          >
            <DatePicker
              key={`${field.type}-${field.name}`}
              id={`${field.name}-${field.type}`} 
              type={field.type}
              placeholder={field.label}
              // value={String(formData[field.name] || field?.value || "" )}
              error={!!errors[field.name] || !!internalErrors[field.name]}
              hint={internalErrors[field.name] || errors[field.name]  || field.hint}
              disabled={field.disabled}
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
            </div>
          );
            case "file":
              return(
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
                         handleFileInputChange(field.name, file);
                       }
                     }
                   }}
                   onBlur={() =>
                     validateField(field.name, formData[field.name], field)
                   }
                   error={!!errors[field.name] || !!internalErrors[field.name]}
                   hint={internalErrors[field.name] || errors[field.name]  || field.hint}
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
              );
              case "button":
          case "submit":
          case "reset":
            return(
              <Button
                key={`${field.type}-${field.name}`}
                id={`${field.name}-${field.type}`} 
                type={field.type}
                children={field.label}
                onClick={()=>{
                 if (field.type =="edit")
                    handleEdit()
                  else if(field.type == "reset")
                    handleReset()
                }
                }
                className={` ${field.className}`}
              />
            );
      default:
        return <div key={field.name}>Unknown field type: {field.type}</div>;
    }
  };
  // console.log("confing stepfield ",config.stepFields)
  // config.stepFields.map((step, index) => (console.log("config map",step)))
  return (
    // <form onSubmit={handleSubmit}  className="space-y-6 mt-4 p-5">
      <form
    className={`mt-8 mb-2 ${
      window.innerWidth < 640 ? "w-full px-2" : "w-80 max-w-screen"} sm:w-full`}
    encType="multipart/form-data"
    // onSubmit={(e) =>e.preventDefault()}
    onSubmit={(e) => {
        e.preventDefault(); // ⭐ ADDED: Prevent page reload
        handleSubmit(); // ⭐ ADDED: Call handleSubmit when form is submitted
      }}
  >
      {config.stepFields.map((step, index) => (
        <div key={index}>
          {(step.title) &&(<Typography variant="h5" className="mb-2 mt-7 font-pt_serif">
            {step.title}
          </Typography>)}
          <div className=" gap-7">    {/* grid grid-cols-2 */}
             <div className={`gap-4 ${step.className}`}> {/* grid grid-cols-1 md:grid-cols-2 */}
              {step?.fields?.map((field) => renderField(field))}
           </div>
          </div>
        </div>
      ))}


    </form>
  );
}



// import React, { useEffect, useState } from "react";
// import { Typography } from "@material-tailwind/react";
// import SelectInputs from "../../components/form/form-elements/SelectInputs";
// import Input from "../../components/form/input/InputField";
// import FormButton from "../../components/ui/button/Button"; // ← your custom button

// export default function DynamicForm({ config, onSubmit, resetAfterSubmit }) {
//   const [formData, setFormData] = useState({});
//   const [errors, setErrors] = useState({});
//   // Reset form data
//   useEffect(() => {
//     if (resetAfterSubmit) {
//       setFormData({});
//       setErrors({});
//     }
//   }, [resetAfterSubmit]);

//   // Generic set value to formData
//   const handleChange = (value, field) => {
//     const newValue = value?.value || value?.target?.value || value;

//     setFormData((prev) => ({
//       ...prev,
//       [field.name]: newValue,
//     }));

//     setErrors((prev) => ({ ...prev, [field.name]: "" }));
//   };

//   // Required validations
//   const validateForm = () => {
//     const newErrors = {};

//     config.stepFields.forEach((step) => {
//       step.fields.forEach((field) => {
//         if (field.required && !formData[field.name]) {
//           newErrors[field.name] = `${field.label} is required`;
//         }
//       });
//     });

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Submit handler
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;
//     if (onSubmit) onSubmit(formData);
//   };

//   // Renders input components dynamically
//   const renderField = (field) => {
//     if (field.hidden) return null;

//     switch (field.type) {
//       case "select":
//         return (
//           <SelectInputs
//             key={field.name}
//             field={field}
//             options={field.options}
//             formData={formData}
//             onChange={handleChange}
//             errors={errors}
//           />
//         );

//       case "text":
//       case "number":
//       case "password":
//         return (
//           <Input
//             key={field.name}
//             type={field.type}
//             name={field.name}
//             placeholder={field.placeholder}
//             value={formData[field.name] || ""}
//             onChange={(e) => handleChange(e, field)}
//             error={!!errors[field.name]}
//             hint={errors[field.name] || field.hint}
//             disabled={field.disabled}
//           />
//         );

//       default:
//         return <div key={field.name}>Unknown field type: {field.type}</div>;
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6 mt-4">
//       {/* Steps Loop */}
//       {config.stepFields.map((step, stepIndex) => (
//         <div key={stepIndex} className="">
//           <Typography variant="h5" className="mb-4 font-pt_serif">
//             {step.title}
//           </Typography>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {step.fields.map((field) => renderField(field))}
//           </div>
//         </div>
//       ))}

//       {/* ACTION BUTTONS */}
//       <div className="flex justify-center gap-3">

//         {/* SUBMIT BUTTON */}
//         <FormButton
//           size="lg"
//           variant="primary"
//           type="submit"
//         >
//           Submit
//         </FormButton>

//         {/* EXAMPLE EXTRA BUTTONS FOR FUTURE */}
//         {/* 
//         <FormButton variant="outline" onClick={() => console.log("Cancel")}>
//           Cancel
//         </FormButton>

//         <FormButton variant="primary" startIcon={<PlusIcon />}>
//           Add More
//         </FormButton>
//         */}
//       </div>
//     </form>
//   );
// }
