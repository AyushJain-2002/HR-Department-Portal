import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCustomer } from "../../store/Actions/CustomerAction";
import Loading from "../Loading";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Card,
  Typography,
} from "@material-tailwind/react";
import {
  fetchCitiesByState,
  fetchStates,
} from "../../store/Actions/StateAction";
import { fetchBranches } from "../../store/Actions/BranchAction";
import DynamicForm from "../Tables/DynamicForm";
import Button from "../../components/ui/button/Button";

const Customer = () => {
  const dispatch = useDispatch();
  const { loading, createError, createSuccess } = useSelector((state) => state.customer);
  const { states = [], cities = { cities: [] } } = useSelector((state) => state.states);
  const { branches = [] } = useSelector((state) => state.branches);
  
  // State options use names
  const stateOptions = states?.map(s => ({ value: s.state_name, label: s.state_name })) || [];
  // Branch options use IDs as values but show names as labels
  const branchOptions = branches?.map(b => ({ value: b.id, label: b.branch_name })) || [];
  
  // Fetch initial data
  useEffect(() => {
    if (!states || states.length === 0) dispatch(fetchStates());
    if (!branches || branches.length === 0) dispatch(fetchBranches());
  }, [dispatch, states, branches]);

  // Title options
  const titleOptions = [
    { value: 'Mr.', label: 'Mr.' },
    { value: 'Ms.', label: 'Ms.' },
    { value: 'Mrs.', label: 'Mrs.' },
    { value: 'Dr.', label: 'Dr.' },
    { value: 'Prof.', label: 'Prof.' },
    { value: 'M/s', label: 'M/s' }
  ];

  // Customer type options
  const customerTypeOptions = [
    { value: 'Individual', label: 'Individual' },
    { value: 'Proprietor', label: 'Proprietor' },
    { value: 'Corporate', label: 'Corporate' }
  ];

  // Gender options
  const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' }
  ];

  // Blood group options
  const bloodGroupOptions = [
    { value: 'A+', label: 'A+' },
    { value: 'A-', label: 'A-' },
    { value: 'B+', label: 'B+' },
    { value: 'B-', label: 'B-' },
    { value: 'AB+', label: 'AB+' },
    { value: 'AB-', label: 'AB-' },
    { value: 'O+', label: 'O+' },
    { value: 'O-', label: 'O-' }
  ];

  // Qualification options
  const qualificationOptions = [
    { value: 'High School', label: 'High School' },
    { value: 'Diploma', label: 'Diploma' },
    { value: 'Bachelor\'s Degree', label: 'Bachelor\'s Degree' },
    { value: 'Master\'s Degree', label: 'Master\'s Degree' },
    { value: 'PhD', label: 'PhD' },
    { value: 'Other', label: 'Other' }
  ];

  // Occupation options
  const occupationOptions = [
    { value: 'Student', label: 'Student' },
    { value: 'Employed', label: 'Employed' },
    { value: 'Self-Employed', label: 'Self-Employed' },
    { value: 'Business', label: 'Business' },
    { value: 'Professional', label: 'Professional' },
    { value: 'Retired', label: 'Retired' },
    { value: 'Other', label: 'Other' }
  ];

  // Initial form state
  const initialFormState = { 
    type_of_policy: "Motor",
    customer_type: 'Individual',
    title: '',
    state: '',
    city: '',
    branch_id: '',
    email: '',
    mobile_number: '',
    pancard_number: '',
    customer_name: '',
    gender: '',
    date_of_birth: '',
    aadhar_number: '',
    address: '',
    pincode: '',
    gst_no: '',
    qualification: '',
    occupation: '',
    nature_of_duties: '',
    dieases: '',
    anniversary_date: '',
    no_of_children: '',
    blood_group: '',
    place_of_birth: '',
    annual_income: ''
  };

  const [form, setForm] = useState(initialFormState);
  const [documents, setDocuments] = useState({});
  const [fieldErrors, setFieldErrors] = useState({});

  // Handle state selection - fetch cities by state ID but store state name
  const handleStateChange = (stateName) => {
    setForm(prev => ({ 
      ...prev, 
      state: stateName,
      city: '' // Reset city when state changes
    }));
    // Find state ID by name to fetch cities
    const stateId = states.find(s => s.state_name === stateName)?.id;
    if (stateId) dispatch(fetchCitiesByState(stateId));
  };

  // Handle form success/error
  useEffect(() => {
    if (createSuccess) {
      toast.success("Customer created successfully!");
      setForm(initialFormState);
      setDocuments({});
      setFieldErrors({});
    }
  }, [createSuccess]);

  useEffect(() => {
    if (createError) {
      setFieldErrors(createError);
      if (typeof createError === "string") {
        toast.error(`Error: ${createError}`);
      }
    }
  }, [createError]);

  // Custom onChange handler for DynamicForm
  const handleFormChange = (value, field) => {
    let processedValue = value;
    
    // Handle special cases for title and customer type
    if (field.name === 'customer_type') {
      const newTitle = value === 'Corporate' || form.type_of_policy === 'Non_Motor' ? 'M/s' : form.title;
      setForm(prev => ({ 
        ...prev, 
        [field.name]: value,
        title: newTitle
      }));
      return;
    }

    if (field.name === 'type_of_policy') {
      const newTitle = value === 'Non_Motor' ? 'M/s' : '';
      const newCustomerType = value === 'Non_Motor' ? 'Corporate' : 'Individual';
      setForm({
        ...initialFormState,
        type_of_policy: value,
        title: newTitle,
        customer_type: newCustomerType
      });
      setDocuments({});
      setFieldErrors({});
      return;
    }

    if (field.name === 'state') {
      handleStateChange(value);
      return;
    }
    
    // Input validation
    if (field.name === 'mobile_number' || field.name === 'aadhar_number' || field.name === 'pincode') {
      processedValue = value.replace(/[^0-9]/g, '');
    } else if (field.name === 'customer_name' || field.name === 'city' || field.name === 'state' || field.name === 'place_of_birth') {
      processedValue = value.replace(/[^a-zA-Z\s]/g, '');
    } else if (field.name === 'pancard_number') {
      processedValue = value.toUpperCase();
      if (value.length <= 5) {
        processedValue = value.replace(/[^A-Z]/g, '');
      } else if (value.length <= 9) {
        processedValue = value.substring(0, 5).replace(/[^A-Z]/g, '') + 
                        value.substring(5).replace(/[^0-9]/g, '');
      } else {
        processedValue = value.substring(0, 9) + 
                        value.substring(9).replace(/[^A-Z]/g, '');
      }
    } else if (field.name === 'annual_income' || field.name === 'no_of_children') {
      processedValue = value.replace(/[^0-9]/g, '');
    }
    
    setForm((prev) => ({ ...prev, [field.name]: processedValue }));
    setFieldErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field.name];
      return newErrors;
    });
  };

  const handleDocumentChange = (e) => {
    const { name, files } = e.target;
    setDocuments((prev) => ({ ...prev, [name]: files[0] }));
    setFieldErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  };

  const handleSubmit = (formData) => {
    const submitData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      submitData.append(key, value);
    });
    Object.entries(documents).forEach(([key, file]) => {
      submitData.append(key, file);
    });
    dispatch(createCustomer(submitData));
  };

  // Policy fields configuration for DynamicForm
  const getPolicyFields = (policyType) => {
    const baseFields = {
      Motor: [
        { name: 'title', label: 'Title', required: true, type: 'select', options: titleOptions, placeholder: 'Select Title' },
        { name: 'customer_name', label: 'Customer Name', required: true, type: 'text', placeholder: 'Enter Customer Name' },
        { name: 'gender', label: 'Gender', required: true, type: 'select', options: genderOptions, placeholder: 'Select Gender' },
        { name: 'date_of_birth', label: 'Date of Birth', required: true, type: 'date', placeholder: 'Select Date of Birth' },
        { name: 'email', label: 'Email', required: true, type: 'email', placeholder: 'Enter Email Address' },
        { name: 'mobile_number', label: 'Mobile Number', required: true, type: 'text', maxLength: 10, placeholder: 'Enter Mobile Number' },
        { name: 'pancard_number', label: 'PAN Card Number', required: true, type: 'text', maxLength: 10, placeholder: 'Enter PAN Card Number' },
        { name: 'customer_type', label: 'Customer Type', required: true, type: 'select', options: customerTypeOptions, placeholder: 'Select Customer Type' },
        { name: 'aadhar_number', label: 'Aadhar Number', required: true, type: 'text', maxLength: 12, placeholder: 'Enter Aadhar Number' },
        { name: 'address', label: 'Address', required: true, type: 'text', placeholder: 'Enter Complete Address' },
        { name: 'state', label: 'State', required: true, type: 'select', options: stateOptions, placeholder: 'Select State' },
        { name: 'city', label: 'City', type: 'select', required: true, options: cities?.cities?.map((c) => ({ value: c.city_name, label: c.city_name })) || [], placeholder: 'Select City' },
        { name: 'pincode', label: 'Pincode', required: true, type: 'text', maxLength: 6, placeholder: 'Enter Pincode' },
        { name: 'branch_id', label: 'Branch', required: true, type: 'select', options: branchOptions, placeholder: 'Select Branch' }
      ],
      Non_Motor: [
        { name: 'title', label: 'Title', required: true, type: 'select', options: titleOptions, placeholder: 'Select Title' },
        { name: 'customer_name', label: 'Company Name', required: true, type: 'text', placeholder: 'Enter Company Name' },
        { name: 'email', label: 'Email', required: true, type: 'email', placeholder: 'Enter Email Address' },
        { name: 'gst_no', label: 'GST Number', required: true, type: 'text', placeholder: 'Enter GST Number' },
        { name: 'mobile_number', label: 'Mobile Number', required: true, type: 'text', maxLength: 10, placeholder: 'Enter Mobile Number' },
        { name: 'pancard_number', label: 'PAN Card Number', required: true, type: 'text', maxLength: 10, placeholder: 'Enter PAN Card Number' },
        { name: 'address', label: 'Address', required: true, type: 'text', placeholder: 'Enter Complete Address' },
        { name: 'state', label: 'State', required: true, type: 'select', options: stateOptions, placeholder: 'Select State' },
        { name: 'city', label: 'City', type: 'select', required: true, options: cities?.cities?.map((c) => ({ value: c.city_name, label: c.city_name })) || [], placeholder: 'Select City' },
        { name: 'pincode', label: 'Pincode', required: true, type: 'text', maxLength: 6, placeholder: 'Enter Pincode' },
        { name: 'branch_id', label: 'Branch', required: true, type: 'select', options: branchOptions, placeholder: 'Select Branch' },
      ],
      Health: [
        { name: 'title', label: 'Title', required: true, type: 'select', options: titleOptions, placeholder: 'Select Title' },
        { name: 'customer_name', label: 'Customer Name', required: true, type: 'text', placeholder: 'Enter Customer Name' },
        { name: 'gender', label: 'Gender', required: true, type: 'select', options: genderOptions, placeholder: 'Select Gender' },
        { name: 'date_of_birth', label: 'Date of Birth', required: true, type: 'date', placeholder: 'Select Date of Birth' },
        { name: 'email', label: 'Email', required: true, type: 'email', placeholder: 'Enter Email Address' },
        { name: 'mobile_number', label: 'Mobile Number', required: true, type: 'text', maxLength: 10, placeholder: 'Enter Mobile Number' },
        { name: 'pancard_number', label: 'PAN Card Number', required: true, type: 'text', maxLength: 10, placeholder: 'Enter PAN Card Number' },
        { name: 'customer_type', label: 'Customer Type', required: true, type: 'select', options: customerTypeOptions, placeholder: 'Select Customer Type' },
        { name: 'aadhar_number', label: 'Aadhar Number', required: true, type: 'text', maxLength: 12, placeholder: 'Enter Aadhar Number' },
        { name: 'address', label: 'Address', required: true, type: 'text', placeholder: 'Enter Complete Address' },
        { name: 'state', label: 'State', required: true, type: 'select', options: stateOptions, placeholder: 'Select State' },
        { name: 'city', label: 'City', type: 'select', required: true, options: cities?.cities?.map((c) => ({ value: c.city_name, label: c.city_name })) || [], placeholder: 'Select City' },
        { name: 'pincode', label: 'Pincode', required: true, type: 'text', maxLength: 6, placeholder: 'Enter Pincode' },
        { name: 'qualification', label: 'Qualification', required: true, type: 'select', options: qualificationOptions, placeholder: 'Select Qualification' },
        { name: 'occupation', label: 'Occupation', required: true, type: 'select', options: occupationOptions, placeholder: 'Select Occupation' },
        { name: 'nature_of_duties', label: 'Nature of Duties', required: true, type: 'text', placeholder: 'Enter Nature of Duties' },
        { name: 'dieases', label: 'Diseases', required: true, type: 'text', placeholder: 'Enter Diseases (if any)' },
        { name: 'branch_id', label: 'Branch', required: true, type: 'select', options: branchOptions, placeholder: 'Select Branch' },
      ],
      Life: [
        { name: 'title', label: 'Title', required: true, type: 'select', options: titleOptions, placeholder: 'Select Title' },
        { name: 'customer_name', label: 'Customer Name', required: true, type: 'text', placeholder: 'Enter Customer Name' },
        { name: 'gender', label: 'Gender', required: true, type: 'select', options: genderOptions, placeholder: 'Select Gender' },
        { name: 'date_of_birth', label: 'Date of Birth', required: true, type: 'date', placeholder: 'Select Date of Birth' },
        { name: 'email', label: 'Email', required: true, type: 'email', placeholder: 'Enter Email Address' },
        { name: 'mobile_number', label: 'Mobile Number', required: true, type: 'text', maxLength: 10, placeholder: 'Enter Mobile Number' },
        { name: 'pancard_number', label: 'PAN Card Number', required: true, type: 'text', maxLength: 10, placeholder: 'Enter PAN Card Number' },
        { name: 'customer_type', label: 'Customer Type', required: true, type: 'select', options: customerTypeOptions, placeholder: 'Select Customer Type' },
        { name: 'aadhar_number', label: 'Aadhar Number', required: true, type: 'text', maxLength: 12, placeholder: 'Enter Aadhar Number' },
        { name: 'address', label: 'Address', required: true, type: 'text', placeholder: 'Enter Complete Address' },
        { name: 'pincode', label: 'Pincode', required: true, type: 'text', maxLength: 6, placeholder: 'Enter Pincode' },
        { name: 'state', label: 'State', required: true, type: 'select', options: stateOptions, placeholder: 'Select State' },
        { name: 'city', label: 'City', type: 'select', required: true, options: cities?.cities?.map((c) => ({ value: c.city_name, label: c.city_name })) || [], placeholder: 'Select City' },
        { name: 'qualification', label: 'Qualification', required: true, type: 'select', options: qualificationOptions, placeholder: 'Select Qualification' },
        { name: 'occupation', label: 'Occupation', required: true, type: 'select', options: occupationOptions, placeholder: 'Select Occupation' },
        { name: 'nature_of_duties', label: 'Nature of Duties', required: true, type: 'text', placeholder: 'Enter Nature of Duties' },
        { name: 'dieases', label: 'Diseases', required: true, type: 'text', placeholder: 'Enter Diseases (if any)' },
        { name: 'anniversary_date', label: 'Anniversary Date', required: true, type: 'date', placeholder: 'Select Anniversary Date' },
        { name: 'no_of_children', label: 'Number of Children', required: true, type: 'text', placeholder: 'Enter Number of Children' },
        { name: 'blood_group', label: 'Blood Group', required: true, type: 'select', options: bloodGroupOptions, placeholder: 'Select Blood Group' },
        { name: 'place_of_birth', label: 'Place of Birth', required: true, type: 'text', placeholder: 'Enter Place of Birth' },
        { name: 'annual_income', label: 'Annual Income', required: true, type: 'text', placeholder: 'Enter Annual Income' },
        { name: 'branch_id', label: 'Branch', required: true, type: 'select', options: branchOptions, placeholder: 'Select Branch' },
      ],
    };
    return baseFields[policyType] || [];
  };

  const documentFields = {
    Motor: [
      { name: 'pancard_image', label: 'PAN Card Image', required: true },
      { name: 'aadhar_front_card', label: 'Aadhar Front', required: true },
      { name: 'aadhar_back_card', label: 'Aadhar Back', required: true }
    ],
    Non_Motor: [
      { name: 'pancard_image', label: 'PAN Card Image', required: true },
      { name: 'proposal_image', label: 'Proposal Image', required: true },
      { name: 'gst_image', label: 'GST Image', required: true },
    ],
    Health: [
      { name: 'pancard_image', label: 'PAN Card Image', required: true },
      { name: 'aadhar_front_card', label: 'Aadhar Front', required: true },
      { name: 'aadhar_back_card', label: 'Aadhar Back', required: true }
    ],
    Life: [
      { name: 'pancard_image', label: 'PAN Card Image', required: true },
      { name: 'aadhar_front_card', label: 'Aadhar Front', required: true },
      { name: 'aadhar_back_card', label: 'Aadhar Back', required: true }
    ],
  };

  const handleReset = () => {
    setForm(initialFormState);
    setDocuments({});
    setFieldErrors({});
  };

  // DynamicForm configuration - removed submitButton prop
  const formConfig = {
    stepFields: [
      {
        title: "",
        fields: [
          {
            name: 'type_of_policy',
            label: 'Type of Policy',
            required: true,
            type: 'select',
            options: [
              { value: 'Motor', label: 'Motor' },
              { value: 'Non_Motor', label: 'Non Motor' },
              { value: 'Health', label: 'Health' },
              { value: 'Life', label: 'Life' }
            ],
            placeholder: 'Select Policy Type'
          },
          ...getPolicyFields(form.type_of_policy)
        ]
      }
    ]
  };

  return (
    <div className="md:py-8 py-3">
      <ToastContainer />
      <Card className="w-full border p-5" color="transparent">
        <Typography variant="h4" color="blue-gray" className="font-pt_serif mb-4">
          Create Customer
        </Typography>

        {loading && (
          <div className="flex justify-center my-4">
            <Loading size="md" />
          </div>
        )}

        {/* DynamicForm Integration - without submitButton prop */}
        <DynamicForm 
          config={formConfig}
          formData={form}
          onChange={handleFormChange}
          onSubmit={handleSubmit}
          resetAfterSubmit={createSuccess}
          submitButton={() => null}
          // Removed submitButton prop to prevent buttons from appearing here
        />

        {/* Documents Section */}
        <div className="mt-8">
          <Typography variant="h4" className="font-pt_serif font-semibold text-[28px]" color="blue-gray">
            Documents
          </Typography>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4">
            {documentFields[form.type_of_policy]?.map((docField) => (
              <div key={docField.name} className="flex relative flex-col gap-4">
                <Typography variant="h6" color="blue-gray" className="-mb-2 font-times text-[16px] font-normal">
                  {docField.label} {docField.required && <span className="text-red-500">*</span>}
                </Typography>
                <input
                  key={`${docField.name}-${form.type_of_policy}`}
                  type="file"
                  id={docField.name}
                  name={docField.name}
                  onChange={handleDocumentChange}
                  className={`w-full bg-transparent font-times text-slate-900 text-base border-2 rounded-xl px-3 py-1.5 file:mr-4 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${
                    fieldErrors[docField.name]
                      ? "border-red-600 focus:border-red-600"
                      : "border-slate-200"
                  }`}
                />
                {fieldErrors[docField.name] && (
                  <span className="text-red-600 text-xs pl-1 -mt-3">
                    {fieldErrors[docField.name][0]}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Buttons Section - Now appears after Documents */}
        <div className="flex flex-col md:flex-row gap-4 w-full justify-center mt-8">
          <Button 
            size="lg"
            variant="primary"
            onClick={() => handleSubmit(form)}
            className="w-full md:w-auto"
            disabled={loading}
          >
            {loading ? "Creating..." : "Submit"}
          </Button>
          <Button 
            size="lg"
            variant="outline"
            type="button"
            onClick={handleReset}
            className="w-full md:w-auto"
          >
            Reset
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Customer;



// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { createCustomer } from "../../store/Actions/CustomerAction";
// import Loading from "../Loading";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import CreatableSelect from 'react-select/creatable';
// import {
//   Card,
//   Typography,
//   Button,
// } from "@material-tailwind/react";
// import {
//   fetchCitiesByState,
//   fetchStates,
// } from "../../store/Actions/StateAction";
// import { fetchBranches } from "../../store/Actions/BranchAction";

// const Customer = () => {
//   const dispatch = useDispatch();
//   const { loading, createError, createSuccess } = useSelector((state) => state.customer);
//   const { states = [], cities = { cities: [] } } = useSelector((state) => state.states);
//   const { branches = [] } = useSelector((state) => state.branches);
  
//   // State options use names
//   const stateOptions = states?.map(s => ({ value: s.state_name, label: s.state_name })) || [];
//   // Branch options use IDs as values but show names as labels
//   const branchOptions = branches?.map(b => ({ value: b.id, label: b.branch_name })) || [];
  
//   // Fetch initial data
//   useEffect(() => {
//     if (!states || states.length === 0) dispatch(fetchStates());
//     if (!branches || branches.length === 0) dispatch(fetchBranches());
//   }, [dispatch, states, branches]);

//   // Title options
//   const titleOptions = [
//     { value: 'Mr.', label: 'Mr.' },
//     { value: 'Ms.', label: 'Ms.' },
//     { value: 'Mrs.', label: 'Mrs.' },
//     { value: 'Dr.', label: 'Dr.' },
//     { value: 'Prof.', label: 'Prof.' },
//     { value: 'M/s', label: 'M/s' }
//   ];

//   // Customer type options
//   const customerTypeOptions = [
//     { value: 'Individual', label: 'Individual' },
//     { value: 'Proprietor', label: 'Proprietor' },
//     { value: 'Corporate', label: 'Corporate' }
//   ];

//   // Initial form state
//   const initialFormState = { 
//     type_of_policy: "Motor",
//     customer_type: 'Individual',
//     title: '',
//     state: '', // Will store state name
//     city: '',  // Will store city name
//     branch_id: '', // Will store branch ID
//     email: '',
//     mobile_number: '',
//     pancard_number: '',
//     customer_name: '',
//     gender: '',
//     date_of_birth: '',
//     aadhar_number: '',
//     address: '',
//     pincode: '',
//     gst_no: '',
//     qualification: '',
//     occupation: '',
//     nature_of_duties: '',
//     dieases: '',
//     anniversary_date: '',
//     no_of_children: '',
//     blood_group: '',
//     place_of_birth: '',
//     annual_income: ''
//   };

//   const [form, setForm] = useState(initialFormState);
//   const [documents, setDocuments] = useState({});
//   const [fieldErrors, setFieldErrors] = useState({});

//   // Select styles
//   const selectStyles = {
//     control: (base, state) => ({
//       ...base,
//       borderRadius: "0.75rem",
//       borderWidth: "2px",
//       borderColor: state.isFocused ? "#1e88e5" : "#e2e8f0",
//       fontSize: "14px",
//       boxShadow: "none",
//       "&:hover": {
//         borderColor: "#1e88e5",
//       },
//     }),
//     menu: (base) => ({
//       ...base,
//       zIndex: 9999
//     }),
//     singleValue: (base) => ({
//       ...base,
//       overflow: "hidden",
//       whiteSpace: "nowrap",
//       textOverflow: "ellipsis",
//       maxWidth: "90%",
//     }),
//   };

//   // Handle state selection - fetch cities by state ID but store state name
//   const handleStateChange = (stateName) => {
//     setForm(prev => ({ 
//       ...prev, 
//       state: stateName,
//       city: '' // Reset city when state changes
//     }));
//     // Find state ID by name to fetch cities
//     const stateId = states.find(s => s.state_name === stateName)?.id;
//     if (stateId) dispatch(fetchCitiesByState(stateId));
//   };

//   // Handle form success/error
//   useEffect(() => {
//     if (createSuccess) {
//       toast.success("Customer created successfully!");
//       setForm(initialFormState);
//       setDocuments({});
//       setFieldErrors({});
//     }
//   }, [createSuccess]);

//   useEffect(() => {
//     if (createError) {
//       setFieldErrors(createError);
//       if (typeof createError === "string") {
//         toast.error(`Error: ${createError}`);
//       }
//     }
//   }, [createError]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
    
//     // Handle special cases for title
//     if (name === 'customer_type') {
//       const newTitle = value === 'Corporate' || form.type_of_policy === 'Non_Motor' ? 'M/s' : form.title;
//       setForm(prev => ({ 
//         ...prev, 
//         [name]: value,
//         title: newTitle
//       }));
//       return;
//     }
    
//     // Input validation
//     let processedValue = value;
//     if (name === 'mobile_number' || name === 'aadhar_number' || name === 'pincode') {
//       processedValue = value.replace(/[^0-9]/g, '');
//     } else if (name === 'customer_name' || name === 'city' || name === 'state') {
//       processedValue = value.replace(/[^a-zA-Z\s]/g, '');
//     } else if (name === 'pancard_number') {
//       processedValue = value.toUpperCase();
//       if (value.length <= 5) {
//         processedValue = value.replace(/[^A-Z]/g, '');
//       } else if (value.length <= 9) {
//         processedValue = value.substring(0, 5).replace(/[^A-Z]/g, '') + 
//                         value.substring(5).replace(/[^0-9]/g, '');
//       } else {
//         processedValue = value.substring(0, 9) + 
//                         value.substring(9).replace(/[^A-Z]/g, '');
//       }
//     }
    
//     setForm((prev) => ({ ...prev, [name]: processedValue }));
//     setFieldErrors(prev => {
//       const newErrors = { ...prev };
//       delete newErrors[name];
//       return newErrors;
//     });
//   };

//   const handleSelectChange = (name, value) => {
//     if (name === 'state') {
//       handleStateChange(value);
//     } else {
//       setForm(prev => ({ ...prev, [name]: value }));
//     }
//     setFieldErrors(prev => {
//       const newErrors = { ...prev };
//       delete newErrors[name];
//       return newErrors;
//     });
//   };

//   const handleDocumentChange = (e) => {
//     const { name, files } = e.target;
//     setDocuments((prev) => ({ ...prev, [name]: files[0] }));
//     setFieldErrors(prev => {
//       const newErrors = { ...prev };
//       delete newErrors[name];
//       return newErrors;
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     Object.entries(form).forEach(([key, value]) => {
//       formData.append(key, value);
//     });
//     Object.entries(documents).forEach(([key, file]) => {
//       formData.append(key, file);
//     });
//     dispatch(createCustomer(formData));
//   };

//   // Policy fields configuration
//   const policyFields = {
//     Motor: [
//       { name: 'title', label: 'Title', required: true, type: 'select', options: titleOptions },
//       { name: 'customer_name', label: 'Customer Name', required: true },
//       { name: 'gender', label: 'Gender', required: true },
//       { name: 'date_of_birth', label: 'Date of Birth', required: true, type: 'date' },

//       { name: 'email', label: 'Email', required: true, type: 'email' },
//       { name: 'mobile_number', label: 'Mobile Number', required: true, maxLength: 10 },
//       { name: 'pancard_number', label: 'PAN Card Number', required: true, maxLength: 10 },
     
//       { name: 'customer_type', label: 'Customer Type', required: true, type: 'select', options: customerTypeOptions },
//       { name: 'aadhar_number', label: 'Aadhar Number', required: true, maxLength: 12 },
//       { name: 'address', label: 'Address', required: true },
//       { name: 'state', label: 'State', required: true, type: 'select', options: stateOptions},
//       {
//         name: 'city',
//         label: 'City',
//         type: 'select',
//         required: true,
//         options: cities?.cities?.map((c) => ({
//           value: c.city_name,
//           label: c.city_name
//         })) || []
//       },
//       { name: 'pincode', label: 'Pincode', required: true, maxLength: 6 },
//       { name: 'branch_id', label: 'Branch', required: true, type: 'select', options: branchOptions }
//     ],
//     Non_Motor: [
//       { name: 'title', label: 'Title', required: true, type: 'select', options: titleOptions },
//       { name: 'customer_name', label: 'Company Name', required: true },
//       { name: 'email', label: 'Email', required: true, type: 'email' },
//       { name: 'gst_no', label: 'GST Number', required: true },
//       { name: 'mobile_number', label: 'Mobile Number', required: true, maxLength: 10 },
//       { name: 'pancard_number', label: 'PAN Card Number', required: true, maxLength: 10 },
//       { name: 'address', label: 'Address', required: true },
//       { name: 'state', label: 'State', required: true, type: 'select', options: stateOptions },
//       {
//         name: 'city',
//         label: 'City',
//         type: 'select',
//         required: true,
//         options: cities?.cities?.map((c) => ({
//           value: c.city_name,
//           label: c.city_name
//         })) || []
//       },
//       { name: 'pincode', label: 'Pincode', required: true, maxLength: 6 },
//       { name: 'branch_id', label: 'Branch', required: true, type: 'select', options: branchOptions},
     
//     ],
//     Health: [
//       { name: 'title', label: 'Title', required: true, type: 'select', options: titleOptions },
//       { name: 'customer_name', label: 'Customer Name', required: true },
//       { name: 'gender', label: 'Gender', required: true },
//       { name: 'date_of_birth', label: 'Date of Birth', required: true, type: 'date' },

//       { name: 'email', label: 'Email', required: true, type: 'email' },
//       { name: 'mobile_number', label: 'Mobile Number', required: true, maxLength: 10 },
//       { name: 'pancard_number', label: 'PAN Card Number', required: true, maxLength: 10 },
     
//       { name: 'customer_type', label: 'Customer Type', required: true, type: 'select', options: customerTypeOptions },
//       { name: 'aadhar_number', label: 'Aadhar Number', required: true, maxLength: 12 },
//       { name: 'address', label: 'Address', required: true },
//       { name: 'state', label: 'State', required: true, type: 'select', options: stateOptions },
//       {
//         name: 'city',
//         label: 'City',
//         type: 'select',
//         required: true,
//         options: cities?.cities?.map((c) => ({
//           value: c.city_name,
//           label: c.city_name
//         })) || []
//       },
//       { name: 'pincode', label: 'Pincode', required: true, maxLength: 6 },
//       { name: 'qualification', label: 'Qualification', required: true },
//       { name: 'occupation', label: 'Occupation', required: true },
//       { name: 'nature_of_duties', label: 'Nature of Duties', required: true },
//       { name: 'dieases', label: 'Diseases', required: true },
//       { name: 'branch_id', label: 'Branch', required: true, type: 'select', options: branchOptions},

//     ],
//     Life: [
//       { name: 'title', label: 'Title', required: true, type: 'select', options: titleOptions },
//       { name: 'customer_name', label: 'Customer Name', required: true },
//       { name: 'gender', label: 'Gender', required: true },
//       { name: 'date_of_birth', label: 'Date of Birth', required: true, type: 'date' },

//       { name: 'email', label: 'Email', required: true, type: 'email' },
//       { name: 'mobile_number', label: 'Mobile Number', required: true, maxLength: 10 },
//       { name: 'pancard_number', label: 'PAN Card Number', required: true, maxLength: 10 },
    
//       { name: 'customer_type', label: 'Customer Type', required: true, type: 'select', options: customerTypeOptions },
//       { name: 'aadhar_number', label: 'Aadhar Number', required: true, maxLength: 12 },
//       { name: 'address', label: 'Address', required: true },
//       { name: 'pincode', label: 'Pincode', required: true, maxLength: 6 },
//       { name: 'state', label: 'State', required: true, type: 'select', options: stateOptions },
//       {
//         name: 'city',
//         label: 'City',
//         type: 'select',
//         required: true,
//         options: cities?.cities?.map((c) => ({
//           value: c.city_name,
//           label: c.city_name
//         })) || []
//       },
//       { name: 'qualification', label: 'Qualification', required: true },
//       { name: 'occupation', label: 'Occupation', required: true },
//       { name: 'nature_of_duties', label: 'Nature of Duties', required: true },
//       { name: 'dieases', label: 'Diseases', required: true },
//       { name: 'anniversary_date', label: 'Anniversary Date', required: true, type: 'date' },
//       { name: 'no_of_children', label: 'Number of Children', required: true },
//       { name: 'blood_group', label: 'Blood Group', required: true },
//       { name: 'place_of_birth', label: 'Place of Birth', required: true },
//       { name: 'annual_income', label: 'Annual Income', required: true },
//       { name: 'branch_id', label: 'Branch', required: true, type: 'select', options: branchOptions},

//     ],
//   };
  
//   const documentFields = {
//     Motor: [
//       { name: 'pancard_image', label: 'PAN Card Image', required: true },
//       { name: 'aadhar_front_card', label: 'Aadhar Front', required: true },
//       { name: 'aadhar_back_card', label: 'Aadhar Back', required: true }
//     ],
//     Non_Motor: [
//       { name: 'pancard_image', label: 'PAN Card Image', required: true },
//       { name: 'proposal_image', label: 'Proposal Image', required: true },
//       { name: 'gst_image', label: 'GST Image', required: true },


//     ],
//     Health: [
//       { name: 'pancard_image', label: 'PAN Card Image', required: true },
//       { name: 'aadhar_front_card', label: 'Aadhar Front', required: true },
//       { name: 'aadhar_back_card', label: 'Aadhar Back', required: true }
//     ],
//     Life: [
//       { name: 'pancard_image', label: 'PAN Card Image', required: true },
//       { name: 'aadhar_front_card', label: 'Aadhar Front', required: true },
//       { name: 'aadhar_back_card', label: 'Aadhar Back', required: true }
//     ],
//   };
//   const handleReset = () => {
//     setForm(initialFormState);
//     setDocuments({});
//     setFieldErrors({});
//     // Force a small delay to ensure DOM updates
//     setTimeout(() => {
//       // Any additional cleanup if needed
//     }, 50);
//   };

//   const fieldsToRender = policyFields[form.type_of_policy] || [];
//   const docsToRender = documentFields[form.type_of_policy] || [];
  
//   return (
//     <div className="md:py-8 py-3">
//       <ToastContainer />
//       <Card className="w-full border p-5" color="transparent">
//         <Typography variant="h4" color="blue-gray" className="font-pt_serif mb-4">
//           Create Customer
//         </Typography>

//         {loading && (
//           <div className="flex justify-center my-4">
//             <Loading size="md" />
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="mb-2 w-full gap-4">
//           <div className="mb-1">
//             <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4">
//               {/* Type of Policy field */}
//               <div className="flex relative flex-col gap-4 sm:col-span-2 lg:col-span-1">
//                 <Typography variant="h6" color="blue-gray" className="-mb-2 font-times text-[16px] font-normal">
//                   Type of Policy <span className="text-red-500">*</span>
//                 </Typography>
//                 <CreatableSelect
//   options={[
//     { value: 'Motor', label: 'Motor' },
//     { value: 'Non_Motor', label: 'Non Motor' },
//     { value: 'Health', label: 'Health' },
//     { value: 'Life', label: 'Life' }
//   ]}
//   value={{ value: form.type_of_policy, label: form.type_of_policy.replace('_', ' ') }}
//   onChange={(selectedOption) => {
//     const newType = selectedOption?.value || 'Motor';
//     const newTitle = newType === 'Non_Motor' ? 'M/s' : '';
//     setForm({
//       ...initialFormState,
//       type_of_policy: newType,
//       title: newTitle,
//       customer_type: newType === 'Non_Motor' ? 'Corporate' : 'Individual'
//     });
//     setDocuments({}); // Reset documents when type changes
//     setFieldErrors({});
//   }}
//   className="basic-single"
//   classNamePrefix="select"
//   styles={selectStyles}
//   isClearable={false}
// />
//                 {fieldErrors.type_of_policy && (
//                   <span className="text-red-600 text-xs pl-1">
//                     {fieldErrors.type_of_policy[0]}
//                   </span>
//                 )}
//               </div>

//               {/* Render all fields including selects */}
//               {fieldsToRender.map((field) => (
//                 <div key={field.name} className="flex relative flex-col gap-4">
//                   <Typography variant="h6" color="blue-gray" className="-mb-2 font-times text-[16px] font-normal">
//                     {field.label} {field.required && <span className="text-red-500">*</span>}
//                   </Typography>
                  
//                   {field.type === 'select' ? (
//                     <CreatableSelect
//                       options={field.options}
//                       value={field.options.find(opt => opt.value === form[field.name]) || null}
//                       onChange={(selectedOption) => 
//                         handleSelectChange(field.name, selectedOption?.value || '')
//                       }
//                       isDisabled={field.disabled || 
//                         (field.name === 'title' && 
//                          (form.customer_type === 'Corporate' || form.type_of_policy === 'Non_Motor'))}
//                       placeholder={field.placeholder || `Select ${field.label}`}
//                       className="basic-single"
//                       classNamePrefix="select"
//                       styles={selectStyles}
//                       isClearable={field.isClearable !== false}
//                     />
//                   ) : (
//                     <input
//                       id={field.name}
//                       name={field.name}
//                       type={field.type || "text"}
//                       value={form[field.name] || ""}
//                       onChange={handleChange}
//                       maxLength={field.maxLength}
//                       className={`w-full bg-transparent font-times placeholder:text-slate-400 text-slate-900 text-base border-2 rounded-xl px-3 py-1.5 transition duration-300 ease focus:outline-none hover:border-blue-600 ${
//                         fieldErrors[field.name]
//                           ? "border-red-600 focus:border-red-600"
//                           : "border-slate-200"
//                       }`}
//                       placeholder={field.label}
//                     />
//                   )}
                  
//                   {fieldErrors[field.name] && (
//                     <span className="text-red-600 text-xs pl-1 -mt-3">
//                       {fieldErrors[field.name][0]}
//                     </span>
//                   )}
//                 </div>
//               ))}
//             </div>

//             {/* Documents section */}
//             <Typography variant="h4" className="font-pt_serif pt-8 font-semibold text-[28px]" color="blue-gray">
//               Documents
//             </Typography>

//             <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4">
// {docsToRender.map((docField) => (
//   <div key={docField.name} className="flex relative flex-col gap-4">
//     <Typography variant="h6" color="blue-gray" className="-mb-2 font-times text-[16px] font-normal">
//       {docField.label} {docField.required && <span className="text-red-500">*</span>}
//     </Typography>
//     <input
//       key={`${docField.name}-${form.type_of_policy}`} // Add this key to force re-render
//       type="file"
//       id={docField.name}
//       name={docField.name}
//       onChange={handleDocumentChange}
//       className={`w-full bg-transparent font-times text-slate-900 text-base border-2 rounded-xl px-3 py-1.5 file:mr-4 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${
//         fieldErrors[docField.name]
//           ? "border-red-600 focus:border-red-600"
//           : "border-slate-200"
//       }`}
//     />
//     {fieldErrors[docField.name] && (
//       <span className="text-red-600 text-xs pl-1 -mt-3">
//         {fieldErrors[docField.name][0]}
//       </span>
//     )}
//   </div>
// ))}
//             </div>




//           </div>

//           <div className="flex w-fit gap-4 mt-6">
//             <Button
//               type="submit"
//               disabled={loading}
//               className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-[16px] py-3 px-6 rounded-lg bg-blue-500 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none tracking-wider"
//               fullWidth
//             >
//               Submit
//             </Button>
        


// <Button
//   type="button"
//   onClick={handleReset}
//   className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 text-[16px] disabled:shadow-none disabled:pointer-events-none py-3 px-6 rounded-lg bg-gray-700 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-gray-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none tracking-wider"
//   fullWidth
// >
//   Reset
// </Button>
//           </div>
//         </form>
//       </Card>
//     </div>
//   );
// };

// export default Customer;
