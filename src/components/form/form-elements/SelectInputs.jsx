import React from "react";
import Select from "../Select";

export default function SelectInputs({ 
  field, 
  formData, 
  onChange, 
  errors,
  options = [],
  loading = false 
}) {
  // // Debug current field
  // console.log("🎯 SELECTINPUTS - Field:", field?.name);
  // console.log("🎯 SELECTINPUTS - FormData for this field:", formData ? formData[field?.name] : 'no formData');
  // console.log("🎯 SELECTINPUTS - All formData:", formData);
  // console.log("🎯 SELECTINPUTS - Options:", options);

  const handleSelectChange = (selectedOption) => {
    console.log("🔄 SELECT Change:", field?.name, selectedOption);
    if (onChange && field?.name) {
      onChange(selectedOption, { name: field.name });
    }
  };

  const getCurrentValue = () => {
    if (!field?.name || !formData) {
      // console.log("❌ No field name or formData");
      return null;
    }
    
    const currentValue = formData[field.name];
    // console.log("🔍 getCurrentValue - field:", field.name, "value:", currentValue);
    
    if (currentValue === undefined || currentValue === null || currentValue === "") {
      // console.log("⚠️ Current value is empty");
      return null;
    }
    
    const foundOption = options.find(option => {
      const match = String(option.value) === String(currentValue);
      // console.log(`   Comparing: ${option.value} == ${currentValue} => ${match}`);
      return match;
    });
    
    // console.log("✅ Found option:", foundOption);
    return foundOption || null;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
      <Select
        options={options}
        value={getCurrentValue()}
        placeholder={field?.placeholder || `Select ${field?.label || ''}`}
        onChange={handleSelectChange}
        className={`${errors && errors[field?.name] ? 'border-red-600' : ''}`}
        isDisabled={field?.readOnly || field?.disabled}
        required={field?.required}
      />
    </div>
  );
}




// import React, { useState } from "react";
// import Select from "../Select";

// export default function SelectInputs() {
//   // Define your options here
//   const options = [
//     { value: "marketing", label: "Marketing" },
//     { value: "template", label: "Template" },
//     { value: "development", label: "Development" }
//   ];

//   const handleSelectChange = (value) => {
//     console.log("Selected value:", value);
//   };

//   return (
//     <div className="space-y-3">
//       <Select
//         options={options}
//         placeholder="Select Option"
//         onChange={handleSelectChange}
//         className="dark:bg-dark-900"
//       />
      
//     </div>
//   );
// }


// import { useState } from "react";
// import ComponentCard from "../../common/ComponentCard";
// import Label from "../Label";
// import Select from "../Select";
// import MultiSelect from "../MultiSelect";

// export default function SelectInputs() {
//   const options = [
//     { value: "marketing", label: "Marketing" },
//     { value: "template", label: "Template" },
//     { value: "development", label: "Development" },
//   ];
//   const handleSelectChange = (value) => {
//     console.log("Selected value:", value);
//   };
//   const [selectedValues, setSelectedValues] = useState([]);

//   const multiOptions = [
//     { value: "1", text: "Option 1", selected: false },
//     { value: "2", text: "Option 2", selected: false },
//     { value: "3", text: "Option 3", selected: false },
//     { value: "4", text: "Option 4", selected: false },
//     { value: "5", text: "Option 5", selected: false },
//   ];
//   return (
//     <ComponentCard title="hiii">
//       <div className="space-y-3 ">
//         <div>
//           {/* <Label>Select Input</Label> */}
//           <Select
//             options={options}
//             placeholder="Select Option"
//             onChange={handleSelectChange}
//             className="dark:bg-dark-900"
//           />
//         </div>
//         <div>
//           {/* <MultiSelect
//             label="Multiple Select Options"
//             options={multiOptions}
//             defaultSelected={["1", "3"]}
//             onChange={(values) => setSelectedValues(values)}
//           /> */}
//           <p className="sr-only">
//             Selected Values: {selectedValues.join(", ")}
//           </p>
//         </div>
//       </div>
//     </ComponentCard>
//   );
// }
