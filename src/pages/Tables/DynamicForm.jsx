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
  const [showAllErrors, setShowAllErrors] = useState(false); // ⭐ ADDED: Track when to show all errors

  const {fetchCitiesByState,fetchCitiesByStateAnother}=useStateData();
  const location =useLocation();
  // Reset form after successful submit
  useEffect(() => {
    if (resetAfterSubmit) {
      setFormData({});
      setInternalErrors({});
      setShowAllErrors(false); // ⭐ ADDED: Reset error display
    }
  }, [resetAfterSubmit]);
   useEffect(() => {
  
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
      setInternalErrors({});
      setShowAllErrors(false); // ⭐ ADDED: Reset error display on success
      }
  }, [success]);

  const handleFileInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  const handleRadioChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => {
    const updated = { ...prev, [name]: value };
    return updated;
  });
};

 const handleChange = (selectedOption, actionMeta) => {
    const name = actionMeta?.name;
    const value =selectedOption?.value || "";

    setFormData((prev) => {
      let updatedFormData = { ...prev, [name]: value };

      if (name === "current_address_state") {
        updatedFormData.current_address_city = "";
        (fetchCitiesByState(value));
      } else if (name === "permanent_address_state") {
        updatedFormData.permanent_address_city = "";
        (fetchCitiesByStateAnother(value));
      } else if (name === "state") {
        updatedFormData.city = "";
        (fetchCitiesByState(value));
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
      }
      return updatedFormData;
    });
    // ⭐ ADDED: Clear error when user starts typing
    if (internalErrors[name]) {
      setInternalErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };

const validateCurrentStep = () => {
    const allErrors = {};
    let hasErrors = false;
    
    config.stepFields.forEach((step) => {
      const dynamicFields = [
        ...(step.fields || []),
        ...(step.fields2 || []),
        ...(step.fields3 || []),
      ];

      dynamicFields.forEach((field) => {
        const value = formData[field.name];
        const isEmpty = value === undefined || value === "" || value === null || 
                       (field.type === "file" && value === "null");

        if (field.required && isEmpty) {
          allErrors[field.name] = `${field.label || field.name} is required`;
          hasErrors = true;
        } else if (field.required || !isEmpty) {
          if (
            field.name === "mobile_no" ||
            field.name === "alternative_mobile_no" ||
            field.name === "alternative_mobile_number"
          ) {
            if (value && !/^\d{10}$/.test(value)) {
              allErrors[field.name] = `${field.label} must be exactly 10 digits`;
              hasErrors = true;
            }
          } else if (field.name === "pancard_number") {
            if (value && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value)) {
              allErrors[field.name] = "Invalid PAN format (e.g., ABCDE1234F)";
              hasErrors = true;
            }
          } else if (field.name === "date_of_birth") {
            if (value) {
              const dob = new Date(value);
              const today = new Date();
              const age = today.getFullYear() - dob.getFullYear();
              const hasBirthdayPassed =
                today.getMonth() > dob.getMonth() ||
                (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());
              const actualAge = hasBirthdayPassed ? age : age - 1;

              if (actualAge < 18) {
                allErrors[field.name] = "User must be at least 18 years old";
                hasErrors = true;
              }
            }
          } else if (field.name === "aadhar_no") {
            if (value && !/^\d{12}$/.test(value)) {
              allErrors[field.name] = "Aadhaar must be exactly 12 digits";
              hasErrors = true;
            }
          } else if (field.name === "bankaccount_no" || field.name === "account_number") {
            if (value && !/^\d{9,18}$/.test(value)) {
              allErrors[field.name] = "Account number must be 9 to 18 digits";
              hasErrors = true;
            }
          } else if (
            field.name === "pincode" ||
            field.name === "permanent_address_pincode" ||
            field.name === "current_address_pincode"
          ) {
            if (value && !/^\d{6}$/.test(value)) {
              allErrors[field.name] = "Pincode must be exactly 6 digits";
              hasErrors = true;
            }
          } else if (field.type === "email" && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
              allErrors[field.name] = "Invalid email format";
              hasErrors = true;
            }
          }
        }
      });
    });

    setInternalErrors(allErrors);
    setShowAllErrors(hasErrors); // ⭐ ADDED: Show all errors when validation fails
    return hasErrors;
  };

const handleSubmit = () => {
    const hasErrors = validateCurrentStep();
    if (hasErrors) {
      return; // Stop if required fields aren't filled
    }
    try {
      onSubmit(formData);
      setShowAllErrors(false); // ⭐ ADDED: Hide errors on successful submission
    } catch (error) {
      console.log(error);
    }
  };
    // Submit handler 
 const handleEdit = () => {
    const hasErrors = validateCurrentStep();
    if (hasErrors) {
      return; // Stop if required fields aren't filled
    }
    try {
      onEdit(formData);
      setShowAllErrors(false); // ⭐ ADDED: Hide errors on successful edit
    } catch (error) {
      console.log(error);
    }
  };

  const handleReset = () => {
    const hasErrors = validateCurrentStep();
    if (hasErrors) {
      return; // Stop if required fields aren't filled
    }
    try {
      onReset(formData);
      setShowAllErrors(false); // ⭐ ADDED: Hide errors on reset
    } catch (error) {
      console.log(error);
    }
  };

   const isFieldDisabled = (field) => {
     const deps = field?.dependsOn;
      // No dependencies → never disabled
      if (!deps || deps.length === 0) return false;
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
 // ⭐ ADDED: Clear error when user starts typing
    if (internalErrors[name]) {
      setInternalErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };


  // ⭐ UNIVERSAL FIELD VALIDATION FOR INPUT, SELECT, RADIO, CHECKBOX, DATEPICKER
const validateField = (fieldName, value, fieldMeta = {}) => {
  let errorMsg = "";
  const isRequired = fieldMeta.required;
  
  const isEmpty =
    value === undefined ||
    value === "" ||
    value === null ||
    (fieldMeta.type === "file" && value === "null");
    
    //submit button validation
  if(fieldMeta.type==="button"||fieldMeta.type==="submit"){
  }

  // ⭐ 1. REQUIRED VALIDATION
  if (isRequired && isEmpty) {
    errorMsg = `${fieldMeta.label || fieldName} is required`;
  }
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

// ⭐ ADDED: Helper function to get error for a field
  const getFieldError = (fieldName) => {
    // Show error if:
    // 1. There's an internal error for this field
    // 2. AND (showAllErrors is true OR the field has been touched)
    if (internalErrors[fieldName] && showAllErrors) {
      return internalErrors[fieldName];
    }
    if (errors[fieldName]) {
      return errors[fieldName];
    }
    return "";
  };

  // Render fields dynamically
  const renderField = (field) => {
    if (field.hidden) return null;
    const fieldError = getFieldError(field.name); // ⭐ ADDED: Get error for this field
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
            // error={!!errors[field.name] || !!internalErrors[field.name]}
            // hint={internalErrors[field.name] || errors[field.name]  || field.hint}
            error={!!fieldError} // ⭐ CHANGED: Use fieldError instead
            hint={fieldError || field.hint} // ⭐ CHANGED: Use fieldError instead
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
              // error={!!errors[field.name] || !!internalErrors[field.name]}
              // hint={internalErrors[field.name] || errors[field.name]  || field.hint}
              error={!!fieldError} // ⭐ CHANGED: Use fieldError instead
              hint={fieldError || field.hint} // ⭐ CHANGED: Use fieldError instead
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
              // error={!!errors[field.name] || !!internalErrors[field.name]}
              // hint={internalErrors[field.name] || errors[field.name]  || field.hint}
              error={!!fieldError} // ⭐ CHANGED: Use fieldError instead
              hint={fieldError || field.hint} // ⭐ CHANGED: Use fieldError instead
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
                  //  error={!!errors[field.name] || !!internalErrors[field.name]}
                  //  hint={internalErrors[field.name] || errors[field.name]  || field.hint}
                  error={!!fieldError} // ⭐ CHANGED: Use fieldError instead
                  hint={fieldError || field.hint} // ⭐ CHANGED: Use fieldError instead
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
                onBlur={() =>validateField(field.name, formData[field.name], field)}
                // error={!!errors[field.name] || !!internalErrors[field.name]}
                // hint={internalErrors[field.name] || errors[field.name]  || field.hint}
                error={!!fieldError} // ⭐ CHANGED: Use fieldError instead
                hint={fieldError || field.hint} // ⭐ CHANGED: Use fieldError instead
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
  return (
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


