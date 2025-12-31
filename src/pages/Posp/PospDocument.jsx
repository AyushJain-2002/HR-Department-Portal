import React, { useEffect, useMemo, useState } from "react";
import { logout } from "../../store/Reducers/PospSignUpInSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import WizardSecond1 from "../../components/wizard/WizardSecond1";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  Dialog,
  DialogBody,
  Typography,
} from "@material-tailwind/react";
import {
  FaAddressBook,
  FaCloudUploadAlt,
  FaHome,
  FaUserCheck,
  FaUserFriends,
} from "react-icons/fa";
import { RiProgress2Line } from "react-icons/ri";
import { FaDiagramProject } from "react-icons/fa6";
import {
  fetchCitiesByState,
  fetchCitiesByStateAnother,
  fetchStates,
} from "../../store/Actions/StateAction";
import {
  fetchPospById,
  verifyUserDocument,
} from "../../store/Actions/PospSignUpAction";
import Loading from "../Loading";
import { format } from "date-fns";





const PospDocument = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, posp, message, success, createSuccess, createError, loading } =
    useSelector((state) => state.posp);

  const [formData, setFormData] = useState({
    title: "",
    name: "",
    mobile_no: "",
    email: "",
    father_name: "",
    date_of_birth: "",
    gender: "",
    aadhar_no: "",
    permanent_address_street: "",
    permanent_address_city: "",
    permanent_address_state: "",
    permanent_house_no: "",
    permanent_address_town: "",
    permanent_address_pincode: "",
    current_address_street: "",
    current_address_city: "",
    current_address_state: "",
    current_house_no: "",
    current_address_pincode: "",
    current_address_town: "",
    alternative_mobile_number: "",
    education_level: "",
    language: "",
    marital_status: "",
    bank_name: "",
    bank_branch: "",
    ifsc_code: "",
    account_number: "",
    account_type: "",
    nominee_name: "",
    nominee_mobile_number: "",
    nominee_relation: "",
    nominee_address: "",
    declaration: "",
    bqp: "",
    same_as_permanent: "1",
    posp_with_other_insurer: "No",
    name_of_insurer: "",
    agency_code_no: "",
    date_of_appointment_as_agency: "",
    date_of_cessation_of_agency: "",
    reason_for_cessation_agency: "",
    noc_issused_by_other_insurer_image: "",
    aadhar_card_front: null,
    aadhar_card_back: null,
    bank_passbook_or_cancelled_cheque: null,
    passport_size_photo: null,
    pancard_image: null,
    signature_image: null,
    marksheet_image: null,
  });

  const {
    states = [],
    cities = { cities: [] },
    citiesBy = { cities: [] },
  } = useSelector((state) => state.states);
  const [showDialog, setShowDialog] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (createError) {
      setFormErrors(createError.errors || {});
      console.log("createError", createError);
      toast.error(createError.message || "Please fix the errors and try again.");
    }
  }, [createError]);

  useEffect(() => {
    const token = Cookies.get("authToken");
    const userId = Cookies.get("userInfo");

    if (!token || !userId) {
      window.location.reload();
      navigate("/login");
      return;
    }

    // Fetch POSP data if user state is null
    if (!user && userId) {
      dispatch(fetchPospById(userId));
    }

    // Always fetch states
    if (!states || states.length === 0) {
      dispatch(fetchStates());
    }
  }, [dispatch, navigate, user, states.length]);

  // Use posp data if available and user data is not
  const currentUserData = useMemo(() => {
    return posp || user;
  }, [posp, user]);

  useEffect(() => {
    if (!currentUserData) return;

    // Handle navigation based on user status
    if (
      currentUserData.documents_verification === 1 &&
      currentUserData.can_update_documents === 0 &&
      currentUserData.training_seconds < 86401 &&
      (currentUserData.training_status === "not-started" ||
        currentUserData.training_status === "in-progress")
    ) 
    
    {
      navigate("/posp-training-instructions");
    } else if (
      currentUserData.documents_verification === 1 &&
      currentUserData.training_seconds === 86400 &&
      currentUserData.can_exam === 1 &&
      (currentUserData.exam === "not-started" || currentUserData.exam === "fail")
    ) {
      navigate("/exam-instruction");
    } else if (
      currentUserData.training_seconds === 86400 &&
      currentUserData.can_exam === 1 &&
      currentUserData.exam === "pass"
    ) {
      navigate("/posp-dashboard");
    } else if (
      currentUserData.documents_verification === 0 &&
      (currentUserData.can_update_documents === false || currentUserData.can_update_documents === 0)
    ) {
      setShowDialog(true);
    }
  }, [currentUserData, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };


  const handleSubmit = async (submittedFormData) => {
    const formDataToSend = new FormData();
  
    const requiredFiles = [
      'aadhar_card_front',
      'aadhar_card_back',
      'bank_passbook_or_cancelled_cheque',
      'passport_size_photo',
      'signature_image',
      'pancard_image',
      'marksheet_image'
    ];
  
    const fileErrors = {};
    requiredFiles.forEach(field => {
      if (!submittedFormData[field] || 
          (!(submittedFormData[field] instanceof File) && 
           typeof submittedFormData[field] !== 'string')) {
        fileErrors[field] = 'This file is required';
      }
    });
  
    if (Object.keys(fileErrors).length > 0) {
      setFormErrors(fileErrors);
      toast.error('Please upload all required documents');
      return;
    }
  
    // Append all fields to FormData
    Object.entries(submittedFormData).forEach(([key, value]) => {
      if (value === null || value === undefined || value === '') {
        const isRequired = stepFields.some(step => 
          [...(step.fields || []), ...(step.fields2 || []), ...(step.fields3 || [])]
            .some(field => field.name === key && field.required)
        );
        if (!isRequired) return;
      }
  
      if (value instanceof File) {
        formDataToSend.append(key, value);
      } else if (key.includes('date')) {
        formDataToSend.append(key, format(new Date(value), 'yyyy-MM-dd')); // Corrected date format
      } else if (key === 'declaration') {
        formDataToSend.append(key, value ? '1' : '0');
      } else {
        formDataToSend.append(key, value);
      }
    });
  
    // Handle conditional insurer fields
    if (submittedFormData.posp_with_other_insurer === 'Yes') {
      const conditionalFields = [
        'name_of_insurer',
        'agency_code_no',
        'date_of_appointment_as_agency',
        'date_of_cessation_of_agency',
        'reason_for_cessation_agency',
        'noc_issused_by_other_insurer_image'
      ];
      
      conditionalFields.forEach(field => {
        const value = submittedFormData[field];
        if (value) formDataToSend.append(field, value);
      });
    }
  
    for (let [key, value] of formDataToSend.entries()) {
      console.log(key, value instanceof File ? value.name : value);
    }
  
    if (currentUserData?.documents_verification === 0) {
      try {
        await dispatch(
          verifyUserDocument({ 
            pospId: currentUserData.id, 
            formData: formDataToSend 
          })
        ).unwrap();
  
        toast.success("Documents submitted successfully!");
        dispatch(fetchPospById(currentUserData.id));
      } catch (error) {
        console.error('Submission error:', error);
        if (error.errors) {
          setFormErrors(error.errors);
          const firstError = Object.keys(error.errors)[0];
          if (firstError) {
            const element = document.querySelector(`[name="${firstError}"]`);
            if (element) element.scrollIntoView({ behavior: 'smooth' });
          }
        }
        toast.error(error.message || "Submission failed. Please check the form for errors.");
      }
    }
  };
  

  // const handleSubmit = (submittedFormData) => {
  //   const formDataToSend = new FormData();

  //   // Append all fields including files
  //   Object.entries(submittedFormData).forEach(([key, value]) => {
  //     if (value instanceof File) {
  //       formDataToSend.append(key, value);
  //     } else {
  //       formDataToSend.append(key, value || "");
  //     }
  //   });

  //   if (currentUserData?.documents_verification === 0) {
  //     dispatch(verifyUserDocument(currentUserData.id, formDataToSend))
  //       .unwrap()
  //       .then(() => {
  //         toast.success("Documents submitted successfully!");
  //         // Refresh the user data after submission
  //         dispatch(fetchPospById(currentUserData.id));
  //       })
  //       .catch((error) => {
  //         toast.error(error.message || "Submission failed");
  //         if (error.errors) {
  //           setFormErrors(error.errors);
  //         }
  //       });
  //   }
  // };






    // Comprehensive validation function
    

//     const handleSubmit = async (submittedFormData) => {
//       const formDataToSend = new FormData();

// // In your handleSubmit function, before dispatch
// const requiredFiles = [
//   'aadhar_card_front',
//   'aadhar_card_back',
//   'bank_passbook_or_cancelled_cheque',
//   'passport_size_photo',
//   'signature_image',
//   'pancard_image',
//   'marksheet_image'
// ];

// const fileErrors = {};
// requiredFiles.forEach(field => {
//   if (!submittedFormData[field] || 
//       (!(submittedFormData[field] instanceof File) && 
//        typeof submittedFormData[field] !== 'string')) {
//     fileErrors[field] = 'This file is required';
//   }
// });

// if (Object.keys(fileErrors).length > 0) {
//   setFormErrors(fileErrors);
//   toast.error('Please upload all required documents');
//   return;
// }

    
//       // Append all non-file fields first
//       Object.entries(submittedFormData).forEach(([key, value]) => {
//         // Skip null/undefined values and empty strings for non-required fields
//         if (value === null || value === undefined || value === '') {
//           // Only skip if the field is not required
//           const isRequired = stepFields.some(step => 
//             [...(step.fields || []), ...(step.fields2 || []), ...(step.fields3 || [])]
//               .some(field => field.name === key && field.required)
//           );
//           if (!isRequired) return;
//         }
        
//         // Handle file fields
//         if (value instanceof File) {
//           formDataToSend.append(key, value);
//         } 
//         // Handle date fields
//         else if (key.includes('date')) {
//           formDataToSend.append(key, format(new Date(value), 'yyyy-mm-dd'));
//         }
//         // Handle checkbox fields
//         else if (key === 'declaration') {
//           formDataToSend.append(key, value ? '1' : '0');
//         }
//         // Handle all other fields
//         else {
//           formDataToSend.append(key, value);
//         }
//       });
    
//       // Special handling for POSP With Other Insurer conditional fields
//       if (submittedFormData.posp_with_other_insurer === 'Yes') {
//         const conditionalFields = [
//           'name_of_insurer',
//           'agency_code_no',
//           'date_of_appointment_as_agency',
//           'date_of_cessation_of_agency',
//           'reason_for_cessation_agency',
//           'noc_issused_by_other_insurer_image'
//         ];
        
//         conditionalFields.forEach(field => {
//           const value = submittedFormData[field];
//           if (value instanceof File) {
//             formDataToSend.append(field, value);
//           } else if (value) {
//             formDataToSend.append(field, value);
//           }
//         });
//       }
    
//       // Debug: Log form data before submission
//       for (let [key, value] of formDataToSend.entries()) {
//         console.log(key, value instanceof File ? value.name : value);
//       }
    
//       if (currentUserData?.documents_verification === 0) {
//         try {
//           await dispatch(verifyUserDocument({ 
//             id: currentUserData.id, 
//             formData: formDataToSend 
//           })).unwrap();
          
//           toast.success("Documents submitted successfully!");
//           dispatch(fetchPospById(currentUserData.id));
//         } catch (error) {
//           console.error('Submission error:', error);
//           if (error.errors) {
//             setFormErrors(error.errors);
//             // Scroll to first error
//             const firstError = Object.keys(error.errors)[0];
//             if (firstError) {
//               const element = document.querySelector(`[name="${firstError}"]`);
//               if (element) element.scrollIntoView({ behavior: 'smooth' });
//             }
//           }
//           toast.error(error.message || "Submission failed. Please check the form for errors.");
//         }
//       }
//     };    
    
    
    // const validateStep = (stepIndex, formData, stepFields) => {
    //   const errors = {};
    //   const currentStep = stepFields[stepIndex];
      
    //   const allFields = [
    //     ...(currentStep.fields || []),
    //     ...(currentStep.fields2 || []),
    //     ...(currentStep.fields3 || [])
    //   ];
  
    //   allFields.forEach((field) => {
    //     const value = formData[field.name];
    //     const isRequired = field.required && !(field.name === 'alternative_mobile_number');
        
    //     // Skip validation for non-required alternative mobile number
    //     if (field.name === 'alternative_mobile_number') {
    //       if (value && !/^[6-9]\d{9}$/.test(value)) {
    //         errors[field.name] = 'Please enter a valid 10-digit mobile number';
    //       }
    //       return;
    //     }
  
    //     // Special handling for POSP With Other Insurer conditional fields
    //     if ([
    //       'name_of_insurer',
    //       'agency_code_no',
    //       'date_of_appointment_as_agency',
    //       'date_of_cessation_of_agency',
    //       'reason_for_cessation_agency',
    //       'noc_issused_by_other_insurer_image'
    //     ].includes(field.name)) {
    //       if (formData.posp_with_other_insurer === 'Yes' && !value && field.required) {
    //         errors[field.name] = `${field.label} is required when POSP with other insurer is Yes`;
    //       }
    //       return;
    //     }
  
    //     // Required field validation
    //     if (isRequired && !value && value !== 0) {
    //       errors[field.name] = `${field.label} is required`;
    //       return;
    //     }
  
    //     // Field-specific validations
    //     if (value) {
    //       switch (field.name) {
    //         case 'father_name':
    //           if (!/^[a-zA-Z ]+$/.test(value)) {
    //             errors[field.name] = 'Must contain only letters';
    //           }
    //           break;
    //         case 'aadhar_no':
    //           if (!/^\d{12}$/.test(value)) {
    //             errors[field.name] = 'Must be exactly 12 digits';
    //           }
    //           break;
    //         case 'mobile_no':
    //           if (!/^[6-9]\d{9}$/.test(value)) {
    //             errors[field.name] = 'Must be valid 10-digit number';
    //           }
    //           break;
    //         case 'email':
    //           if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    //             errors[field.name] = 'Must be valid email address';
    //           }
    //           break;
    //         case 'date_of_birth':
    //           if (new Date(value) >= new Date()) {
    //             errors[field.name] = 'Must be in the past';
    //           }
    //           break;
    //         case 'current_house_no':
    //         case 'permanent_house_no':
    //           if (!/^\d+$/.test(value)) {
    //             errors[field.name] = 'Must be a number';
    //           }
    //           break;
    //         case 'current_address_pincode':
    //         case 'permanent_address_pincode':
    //           if (!/^\d{6}$/.test(value)) {
    //             errors[field.name] = 'Must be 6 digits';
    //           }
    //           break;
    //         case 'account_number':
    //           if (!/^\d{9,18}$/.test(value)) {
    //             errors[field.name] = 'Must be 9-18 digits';
    //           }
    //           break;
    //         case 'nominee_mobile_number':
    //           if (!/^[6-9]\d{9}$/.test(value)) {
    //             errors[field.name] = 'Must be valid 10-digit number';
    //           }
    //           break;
    //         case 'aadhar_card_front':
    //         case 'aadhar_card_back':
    //         case 'bank_passbook_or_cancelled_cheque':
    //         case 'passport_size_photo':
    //         case 'signature_image':
    //         case 'pancard_image':
    //         case 'marksheet_image':
    //         case 'noc_issused_by_other_insurer_image':
    //           if (field.required && !(value instanceof File)) {
    //             errors[field.name] = `${field.label} is required`;
    //           }
    //           break;
    //       }
    //     }
    //   });
  
    //   return errors;
    // };
  


    const validateStep = (stepIndex, formData, stepFields) => {
      const errors = {};
      const currentStep = stepFields[stepIndex];
      
      const allFields = [
        ...(currentStep.fields || []),
        ...(currentStep.fields2 || []),
        ...(currentStep.fields3 || [])
      ];
    
      allFields.forEach((field) => {
        const value = formData[field.name];
        const isRequired = field.required;
    
        // Skip validation for non-required alternative mobile number
        if (field.name === 'alternative_mobile_number') {
          if (value && !/^[6-9]\d{9}$/.test(value)) {
            errors[field.name] = 'Please enter a valid 10-digit mobile number';
          }
          return;
        }
    
        // Special handling for POSP With Other Insurer conditional fields
        if ([
          'name_of_insurer',
          'agency_code_no',
          'date_of_appointment_as_agency',
          'date_of_cessation_of_agency',
          'reason_for_cessation_agency',
          'noc_issused_by_other_insurer_image'
        ].includes(field.name)) {
          if (formData.posp_with_other_insurer === 'Yes' && !value) {
            errors[field.name] = `${field.label} is required when POSP with other insurer is Yes`;
          }
          return;
        }
    
        // Required field validation
        if (isRequired && !value && value !== 0) {
          errors[field.name] = `${field.label} is required`;
          return;
        }
    
        // Field-specific Fs
        if (value) {
          switch (field.name) {
            case 'father_name':
              if (!/^[a-zA-Z ]+$/.test(value)) {
                errors[field.name] = 'Must contain only letters';
              }
              break;
            case 'aadhar_no':
              if (!/^\d{12}$/.test(value)) {
                errors[field.name] = 'Must be exactly 12 digits';
              }
              break;
            case 'mobile_no':
            case 'alternative_mobile_number':
            case 'nominee_mobile_number':
              if (!/^[6-9]\d{9}$/.test(value)) {
                errors[field.name] = 'Must be valid 10-digit number';
              }
              break;
            case 'email':
              if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                errors[field.name] = 'Must be valid email address';
              }
              break;
            case 'date_of_birth':
            case 'date_of_appointment_as_agency':
            case 'date_of_cessation_of_agency':
              if (new Date(value) >= new Date()) {
                errors[field.name] = 'Must be in the past';
              }
              break;
            case 'current_address_pincode':
            case 'permanent_address_pincode':
              if (!/^\d{6}$/.test(value)) {
                errors[field.name] = 'Must be 6 digits';
              }
              break;
            case 'account_number':
              if (!/^\d{9,18}$/.test(value)) {
                errors[field.name] = 'Must be 9-18 digits';
              }
              break;
            // case 'ifsc_code':
            //   if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(value)) {
            //     errors[field.name] = 'Must be valid IFSC code';
            //   }
            //   break;
            case 'aadhar_card_front':
            case 'aadhar_card_back':
            case 'bank_passbook_or_cancelled_cheque':
            case 'passport_size_photo':
            case 'signature_image':
            case 'pancard_image':
            case 'marksheet_image':
            case 'noc_issused_by_other_insurer_image':
              if (field.required && !(value instanceof File) && typeof value !== 'string') {
                errors[field.name] = `${field.label} is required`;
              }
              break;
            // case 'declaration':
            //   if (value !== true && value !== '1') {
            //     errors[field.name] = 'You must agree to the terms and conditions';
            //   }
            //   break;
          }
        }
      });
    
      return errors;
    };


    const stepFields = useMemo(
      () => [
        {
          title: "Personal Details",
          icon: FaHome,
          fields: [
            {
              name: "title",
              label: "Title",
              type: "select",
              options: [
                { value: 1, label: "Mr." },
                { value: 2, label: "Mrs." },
                { value: 3, label: "Miss." },
                { value: 4, label: "Dr." },
              ],
              storeLabel: true,
              placeholder: "Select title",
              required: true,
              step: 0,
            },
            {
              name: "name",
              label: "Name",
              type: "text",
              placeholder: "Name",
              readOnly: true, // Make the field read-only
              step: 0,
            },
            {
              name: "mobile_no",
              label: "Mobile Number",
              type: "text",
              placeholder: "Mobile Number",
              readOnly: true, // Make the field read-only
              step: 0,
            },
            {
              name: "email",
              label: "Email ID",
              type: "text",
              placeholder: "Email ID",
              readOnly: true, // Make the field read-only
              step: 0,
            },
  
            {
              name: "father_name",
              label: "Father's Name",
              type: "text",
              placeholder: "Enter father's name",
              required: true,
              step: 0,
            },
            {
              name: "date_of_birth",
              label: "Date of Birth",
              type: "date",
              placeholder: "Select your birth date",
              required: true,
              step: 0,
            },
            {
              name: "gender",
              label: "Gender",
              type: "select",
              options: [
                { value: 1, label: "Female" },
                { value: 2, label: "Male" },
                { value: 3, label: "Other" },
                { value: 4, label: "Psycho" },
              ],
              storeLabel: true,
              required: true,
              step: 0,
            },
            {
              name: "education_level",
              label: "Education Level",
              type: "select",
              options: [
                { value: 1, label: "10th" },
                { value: 2, label: "12th" },
                { value: 3, label: "Diploma / Certificate" },
                { value: 4, label: "Bachelor's Degree" },
                { value: 5, label: "Master's Degree" },
              ],
              storeLabel: true,
              placeholder: "Select Level",
              required: true,
              step: 0,
            },
            {
              name: "aadhar_no",
              label: "Aadhar Card Number",
              type: "text",
              placeholder: "Enter Aadhar card number",
              required: true,
              step: 0,
             
            },
            {
              name: "marital_status",
              label: "Marital Status",
              type: "select",
              options: [
                { value: 1, label: "Single" },
                { value: 2, label: "Married" },
                { value: 3, label: "Other" },
              ],
              storeLabel: true,
              placeholder: "Select Status",
              required: true,
              step: 0,
            },
            
            {
              name: "language",
              label: "Preferred Language",
              type: "select",
              options: [
                { value: 1, label: "Hindi" },
                { value: 2, label: "English" },
                { value: 3, label: "Marathi" },
                { value: 4, label: "Gujarati" },
                { value: 5, label: "Tamil" },
                { value: 6, label: "Telugu" },
                { value: 7, label: "Bengali" },
                { value: 8, label: "Punjabi" },
                { value: 9, label: "Malayalam" },
                { value: 10, label: "Kannada" },
                { value: 11, label: "Urdu" },
                { value: 12, label: "Odia" },
                { value: 13, label: "Assamese" },
                { value: 14, label: "Other" },
              ],
              storeLabel: false,
              placeholder: "Select title",
              required: true,
              step: 0,
            },
          ],
        },
        {
          title: "Address Book Details",
          icon: FaAddressBook,
          fields2: [
            {
              name: "permanent_house_no",
              label: "Permanent  House No",
              type: "text",
              placeholder: "Enter House No",
              required: true,
              step: 1,
            },
            {
              name: "permanent_address_town",
              label: "Permanent  Town",
              type: "text",
              placeholder: "Enter Town",
              required: true,
              step: 1,
            },
            {
              name: "permanent_address_street",
              label: "Permanent  Street",
              type: "text",
              placeholder: "Enter street",
              required: true,
              step: 1,
            },
            {
              name: "permanent_address_state",
              label: "Permanent State",
              type: "select",
              required: true,
              options: states.map((state) => ({
                value: state.id,
                label: state.state_name,
              })),
              placeholder: "Select a state",
              step: 1,
              storeLabel: true,
            },
            {
              name: "permanent_address_city",
              label: "Permanent  City",
              type: "select",
  
              options: (citiesBy.cities || []).map((city) => ({
                value: city.city_id,
                label: city.city_name,
              })),
              placeholder: "Select a city",
              step: 1,
              required: true,
              storeLabel: true,
            },
            {
              name: "permanent_address_pincode",
              label: "Permanent Pincode",
              type: "number",
              placeholder: "Enter pincode",
              required: true,
              step: 1,
            },
          ],
          fields: [
            {
              name: "current_house_no",
              label: "Current  House No",
              type: "text",
              placeholder: "Enter House No",
              required: true,
              step: 1,
            },
            {
              name: "current_address_town",
              label: "Current  Town",
              type: "text",
              placeholder: "Enter Town",
              required: true,
              step: 1,
            },
            {
              name: "current_address_street",
              label: "Current  Street",
              type: "text",
  
              placeholder: "Enter street",
              required: true,
              step: 1,
            },
            {
              name: "current_address_state",
              label: "Current  State",
              type: "select",
              options: states.map((state) => ({
                value: state.id,
                label: state.state_name,
              })),
  
              placeholder: "Select state",
              storeLabel: true,
              required: true,
              step: 1,
            },
            {
              name: "current_address_city",
              label: "Current City",
              type: "select",
              options: (cities.cities || []).map((city) => ({
                value: city.city_id,
                label: city.city_name,
              })),
              placeholder: "Select a city",
              step: 1,
              required: true,
              storeLabel: true,
            },
            {
              name: "current_address_pincode",
              label: "Current Pincode",
              type: "text",
              placeholder: "Enter pincode",
              required: true,
              step: 1,
            },
            {
              name: "alternative_mobile_number",
              label: "Alternative Mobile Number",
              type: "text",
              placeholder: "Enter alternative mobile number",
              required: false,
              step: 1,
            },
            {
              name: "same_as_permanent",
              label: "Same as Current Address",
              type: "radio",
              required: true,
              options: [
                { value: "1", label: "NO" },
                { value: "2", label: "YES" },
              ],
              step: 1,
            },
          ],
        },
        {
          title: "Account Details",
          icon: FaDiagramProject,
          fields: [
            {
              name: "bank_name",
              label: "Bank Name",
              type: "text",
              placeholder: "Enter bank name",
              required: true,
              step: 2,
            },
            {
              name: "bank_branch",
              label: "Bank Branch",
              type: "text",
              placeholder: "Enter bank branch",
              required: true,
              step: 2,
            },
            {
              name: "ifsc_code",
              label: "IFSC Code",
              type: "text",
              placeholder: "Enter IFSC code",
              required: true,
              step: 2,
            },
            {
              name: "account_number",
              label: "Account Number",
              type: "text",
              placeholder: "Enter account number",
              required: true,
              step: 2,
            },
            {
              name: "account_type",
              label: "Account Type",
              type: "select",
              options: [
                {
                  value: 1,
                  label: "Savings Account",
                },
                { value: 2, label: "Current Account" },
                { value: 3, label: "Joint Account" },
                { value: 4, label: "Psycho" },
              ],
              required: true,
              storeLabel: true,
              step: 2,
            },
          ],
        },
        {
          title: "POSP With Other Insurer",
          icon: FaUserFriends,
          fields: [
            {
              name: "posp_with_other_insurer",
              label: "POSP  With Other Insurer If Yes ",
              type: "radio",
              required: true,
              options: [
                { value: "No", label: "NO" },
                { value: "Yes", label: "YES" },
              ],
              step: 3,
            },
          ],
          fields3: [
            {
              name: "name_of_insurer",
              label: "Name of Insurer",
              type: "text",
              placeholder: "Enter Insurer Name",
  
              required: true,
              step: 3,
            },
  
            {
              name: "agency_code_no",
              label: "Agency Code No.",
              placeholder: "Enter Agency code",
              type: "text",
              required: true,
              step: 3,
            },
            {
              name: "date_of_appointment_as_agency",
              label: "Date Of Appointment As Agency",
              placeholder: "Enter date ",
              type: "date",
              required: true,
              step: 3,
            },
            {
              name: "date_of_cessation_of_agency",
              label: "Date Of Cessation Of Agency",
              type: "date",
              placeholder: "Enter date ",
              required: true,
              step: 3,
            },
  
            {
              name: "reason_for_cessation_agency",
              label: "Reason For Cessation Agency",
              type: "text",
              placeholder: "Enter Reason ",
              required: true,
              step: 3,
            },
            {
              name: "noc_issused_by_other_insurer_image",
              label: "Noc Issued By Other Image",
              type: "file",
              placeholder: "",
              required: true,
              step: 3,
            },
          ],
        },
        {
          title: "Nominee Details",
          icon: FaUserCheck,
          fields: [
            {
              name: "nominee_name",
              label: "Nominee Name",
              type: "text",
              placeholder: "Enter nominee name",
              required: true,
              step: 4,
            },
            {
              name: "nominee_mobile_number",
              label: "Nominee Mobile Number",
              type: "text",
              placeholder: "Enter nominee mobile number",
              required: true,
              step: 3,
            },
            {
              name: "nominee_relation",
              label: "Nominee Relation",
              type: "text",
              placeholder: "Enter relation with nominee",
              required: true,
              step: 4,
            },
            {
              name: "nominee_address",
              label: "Nominee Address",
              type: "text",
              placeholder: "Enter nominee address",
              required: true,
              step: 4,
            },
          ],
        },
        {
          title: "Process to Upload",
          icon: RiProgress2Line,
          fields: [
            {
              label:
                "Upload a clear image of the front side of your Aadhar Card.",
              sampleImage: "../../../../assets/Images/Aadhar_PVC_Front.jpg",
              step: 5,
              type: "file",
            },
            {
              label: "Upload a clear image of the back side of your Aadhar Card.",
              step: 5,
              type: "file",
              sampleImage:
                "../../../../public/assets/Images/Sample_PVC_Aadhar_Card_back.jpg",
            },
            {
              label:
                "Upload your Bank Passbook first page or a Cancelled Cheque.",
              step: 5,
              type: "file",
              sampleImage: "../../../../assets/Images/Aadhar_PVC_Front.jpg",
            },
            {
              label:
                "Upload a recent Passport Size Photo with a clear background.",
              step: 5,
              type: "file",
              sampleImage: "../../../../assets/Images/passport-size.webp",
            },
            {
              label: "Upload a clear image of your signature on white paper.",
              step: 5,
              type: "file",
              sampleImage: "../../../../assets/Images/signature.png",
            },
            {
              label: "Upload a clear image of your PAN Card.",
              step: 5,
              type: "file",
              sampleImage: "../../../../assets/Images/pancard.webp",
            },
            {
              label: "Upload your latest education Marksheet.",
              step: 5,
              type: "file",
              sampleImage: "../../../../assets/Images/marksheet.jpg",
            },
          ],
        },
        {
          title: "Documents to Upload",
          icon: FaCloudUploadAlt,
          fields: [
            {
              name: "aadhar_card_front",
              label: "Aadhar Card Front",
              type: "file",
              required: true,
              step: 6,
            },
            {
              name: "aadhar_card_back",
              label: "Aadhar Card Back",
              type: "file",
              required: true,
              step: 6,
            },
            {
              name: "bank_passbook_or_cancelled_cheque",
              label: "Bank Passbook / Canc. Cheque",
              type: "file",
              required: true,
              step: 6,
            },
            {
              name: "passport_size_photo",
              label: "Passport Size Photo",
              type: "file",
              required: true,
              step: 6,
            },
            {
              name: "signature_image",
              label: "Signature",
              type: "file",
              required: true,
              step: 6,
            },
            {
              name: "pancard_image",
              label: "PAN Card",
              type: "file",
              required: true,
              step: 6,
            },
            {
              name: "marksheet_image",
              label: "Marksheet",
              type: "file",
              required: true,
              step: 6,
            },
            {
              name: "declaration",
              label: "I Agree to the Terms and Conditions",
              type: "checkbox",
              required: true,
              step: 6,
            },
          ],
        },
      ],
      [
        states,
        cities,
        citiesBy,
        formData.permanent_address_state,
        formData.current_address_state,
      ]
    );
  
    const handleFieldChange = (name, selected) => {
      const allFields = stepFields.flatMap((field) => [
        ...(field.fields || []),
        ...(field.fields2 || []),
      ]);
  
      const fieldConfig = allFields.find((field) => field.name === name);
      const shouldStoreLabel = fieldConfig ? fieldConfig.storeLabel : false;
  
      setFormData((prev) => {
        const updatedFields = { ...prev };
  
        if (name === "current_address_state") {
          updatedFields[name] = shouldStoreLabel ? selected.label : selected.value;
          updatedFields.current_address_city = "";
          dispatch(fetchCitiesByState(selected.value));
        } else if (name === "permanent_address_state") {
          updatedFields[name] = shouldStoreLabel ? selected.label : selected.value;
          updatedFields.permanent_address_city = "";
          dispatch(fetchCitiesByStateAnother(selected.value));
        } else if (selected?.target?.type === "file") {
          const file = selected.target?.files ? selected.target.files[0] : null;
          updatedFields[name] = file;
        } else {
          updatedFields[name] = shouldStoreLabel ? selected.label : selected?.value;
        }
  
        return updatedFields;
      });
    };

  return (
    <div className="relative h-fit w-full bg-gray-50">
      {loading && <Loading />}
      <div
        className={`flex justify-between mb-5 items-center w-full px-2 lg:px-8 py-0 border-b border-gray-200 ${
          loading ? "backdrop-blur-sm" : ""
        }`}
      >
        <div className="h-24">
          <img
            src="/assets/Images/logo.webp"
            alt="Notion insurance"
            loading="lazy"
            className="mr-4 py-0 cursor-pointer object-cover h-full w-full lg:ml-2"
          />
        </div>
        <div>
          <Typography variant="h4" color="blue-gray" className="font-bold">
            Posp Document Details
          </Typography>
        </div>
        <Button
          size="sm"
          color="red"
          onClick={handleLogout}
          className="rounded-lg"
        >
          Logout
        </Button>
      </div>


<Card className="lg:mx-16 mb-5 mx-2 px-2 shadow-lg border">
  <WizardSecond1
    onChange={handleFieldChange}
    onSubmit={handleSubmit}
    fields={stepFields}
    success={createSuccess}
    errors={formErrors}
    validateStep={validateStep}
    initialValues={
      currentUserData && {
        ...currentUserData,
        same_as_permanent: formData.same_as_permanent,
        posp_with_other_insurer: formData.posp_with_other_insurer,
      }
    }
  />
</Card>

      <Dialog open={showDialog}>
        <div className="flex justify-between items-center p-4 border-b">
          <Typography variant="h5" className="font-bold">
            Document Verification
          </Typography>
          <Button
            size="sm"
            color="red"
            onClick={handleLogout}
            className="rounded-lg"
          >
            Logout
          </Button>
        </div>
        <DialogBody>
          <div className="flex flex-col items-center p-4">
            <FaUserCheck className="text-6xl text-blue-500 mb-4" />
            <Typography variant="h6" className="font-bold mb-2 text-center">
              Document Verification Pending
            </Typography>
            <Typography variant="body2" className="text-gray-600 text-center">
              We will verify your details or documents. If any changes are
              required, you will need to fill out this form again.
            </Typography>
          </div>
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default PospDocument;