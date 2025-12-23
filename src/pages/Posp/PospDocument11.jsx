import  { useEffect, useMemo, useState } from "react";
import { logout, resetPosp } from "../../../store/Reducers/PospSignUpInSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import WizardSecond from "../../wizard/WizardSecond";
// import WizardSecond1 from "../../wizard/WizardSecond1";

import Cookies from "js-cookie";
// import { toast } from "react-toastify";
import {
  Button,
  Card,
  Dialog,
  DialogBody,
  Typography,
} from "@material-tailwind/react";
import {
  // FaAddressBook,
  // FaCloudUploadAlt,
  // FaHome,
  FaUserCheck,
  // FaUserFriends,
} from "react-icons/fa";
// import { RiProgress2Line } from "react-icons/ri";
// import { FaDiagramProject } from "react-icons/fa6";
import {
  // fetchCitiesByState,
  // fetchCitiesByStateAnother,
  fetchStates,
} from "../../../store/Actions/StateAction";
import {
  fetchPospById,
  verifyUserDocument,
} from "../../../store/Actions/PospSignUpAction";
import Loading from "../Loading";
// import WizardSecond from "../../wizard/WizardSecond";
import { getDecryptedCookie } from "../../../Utils/secureCookie";
import FormComponent from "../../wizard/FormComponent";
import PospDocument11config from "./PospDocument11config";

const PospDocument = () => {
let userInfo = getDecryptedCookie("userInfo");


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { posp, user, message, success, createSuccess, createError, loading } =
    useSelector((state) => state.posp);

  const [formData, setFormData] = useState({
    // Add read-only fields populated from `user` data
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
    // ✅ Added fields from fields3
    name_of_insurer: "",
    agency_code_no: "",
    date_of_appointment_as_agency: "",
    date_of_cessation_of_agency: "",
    reason_for_cessation_agency: "",
    noc_issused_by_other_insurer_image: "",

    // Document uploads
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

  // const stepFields = useMemo(
  //   () => [
  //     {
  //       title: "Personal",
  //       icon: FaHome,
  //       fields: [
  //         {
  //           name: "title",
  //           label: "Title",
  //           type: "select",
  //           options: [
  //             { value: 1, label: "Mr." },
  //             { value: 2, label: "Mrs." },
  //             { value: 3, label: "Miss." },
  //             { value: 4, label: "Dr." },
  //           ],
  //           storeLabel: true,
  //           placeholder: "Select Title",
  //           required: true,
  //           step: 0,
  //         },
  //         {
  //           name: "name",
  //           label: "Name",
  //           type: "text",
  //           placeholder: "Name",
  //           readOnly: true, // Make the field read-only
  //           step: 0,
  //         },
  //         {
  //           name: "mobile_no",
  //           label: "Mobile Number",
  //           type: "text",
  //           placeholder: "Mobile Number",
  //           readOnly: true, // Make the field read-only
  //           step: 0,
  //         },
  //         {
  //           name: "email",
  //           label: "Email ID",
  //           type: "text",
  //           placeholder: "Email ID",
  //           readOnly: true, // Make the field read-only
  //           step: 0,
  //         },

  //         {
  //           name: "father_name",
  //           label: "Father's Name",
  //           type: "text",
  //           placeholder: "Enter father's name",
  //           required: true,
  //           step: 0,
  //         },
  //         {
  //           name: "date_of_birth",
  //           label: "Date of Birth",
  //           type: "date",
  //           placeholder: "Select your birth date",
  //           required: true,
  //           step: 0,
  //         },
  //         {
  //           name: "gender",
  //           label: "Gender",
  //           type: "select",
  //           options: [
  //             { value: 1, label: "Female" },
  //             { value: 2, label: "Male" },
  //             { value: 3, label: "Other" },
  //             { value: 4, label: "Psycho" },
  //           ],
  //           storeLabel: true,
  //           required: true,
  //           step: 0,
  //           placeholder:"Select Gender"
  //         },
  //         {
  //           name: "education_level",
  //           label: "Education Level",
  //           type: "select",
  //           options: [
  //             { value: 1, label: "10th" },
  //             { value: 2, label: "12th" },
  //             { value: 3, label: "Diploma / Certificate" },
  //             { value: 4, label: "Bachelor's Degree" },
  //             { value: 5, label: "Master's Degree" },
  //           ],
  //           storeLabel: true,
  //           placeholder: "Select Level",
  //           required: true,
  //           step: 0,
  //         },
  //         {
  //           name: "aadhar_no",
  //           label: "Aadhar Number",
  //           type: "text",
  //           placeholder: "Enter Aadhar card number",
  //           required: true,
  //           step: 0,
  //         },
  //         {
  //           name: "marital_status",
  //           label: "Marital Status",
  //           type: "select",
  //           options: [
  //             { value: 1, label: "Single" },
  //             { value: 2, label: "Married" },
  //             { value: 3, label: "Other" },
  //           ],
  //           storeLabel: true,
  //           placeholder: "Select Status",
  //           required: true,
  //           step: 0,
  //         },

  //         {
  //           name: "language",
  //           label: "Language",
  //           type: "select",
  //           options: [
  //             { value: 1, label: "Hindi" },
  //             { value: 2, label: "English" },
  //             { value: 3, label: "Marathi" },
  //             { value: 4, label: "Gujarati" },
  //             { value: 5, label: "Tamil" },
  //             { value: 6, label: "Telugu" },
  //             { value: 7, label: "Bengali" },
  //             { value: 8, label: "Punjabi" },
  //             { value: 9, label: "Malayalam" },
  //             { value: 10, label: "Kannada" },
  //             { value: 11, label: "Urdu" },
  //             { value: 12, label: "Odia" },
  //             { value: 13, label: "Assamese" },
  //             { value: 14, label: "Other" },
  //           ],
  //           storeLabel: false,
  //           placeholder: "Select Language",
  //           required: true,
  //           step: 0,
  //         },
  //       ],
  //     },
  //     {
  //       title: "Address",
  //       icon: FaAddressBook,
  //       fields2: [
  //         {
  //           name: "permanent_house_no",
  //           label: "Permanent H.No.",
  //           type: "text",
  //           placeholder: "Enter House No",
  //           required: true,
  //           step: 1,
  //         },
  //         {
  //           name: "permanent_address_town",
  //           label: "Permanent Town",
  //           type: "text",
  //           placeholder: "Enter Town",
  //           required: true,
  //           step: 1,
  //         },
  //         {
  //           name: "permanent_address_street",
  //           label: "Permanent Street",
  //           type: "text",
  //           placeholder: "Enter Street",
  //           required: true,
  //           step: 1,
  //         },
  //         {
  //           name: "permanent_address_state",
  //           label: "Permanent State",
  //           type: "select",
  //           required: true,
  //           options: states.map((state) => ({
  //             value: state.id,
  //             label: state.state_name,
  //           })),
  //           placeholder: "Select a state",
  //           step: 1,
  //           storeLabel: true,
  //         },
  //         {
  //           name: "permanent_address_city",
  //           label: "Permanent City",
  //           type: "select",

  //           options: (citiesBy.cities || []).map((city) => ({
  //             value: city.city_id,
  //             label: city.city_name,
  //           })),
  //           placeholder: "Select a city",
  //           step: 1,
  //           required: true,
  //           storeLabel: true,
  //         },
  //         {
  //           name: "permanent_address_pincode",
  //           label: "Permanent Pincode",
  //           type: "number",
  //           placeholder: "Enter pincode",
  //           required: true,
  //           step: 1,
  //         },
  //       ],
  //       fields: [
  //         {
  //           name: "current_house_no",
  //           label: "Current  House No",
  //           type: "text",
  //           placeholder: "Enter House No",
  //           required: true,
  //           step: 1,
  //         },
  //         {
  //           name: "current_address_town",
  //           label: "Current  Town",
  //           type: "text",
  //           placeholder: "Enter Town",
  //           required: true,
  //           step: 1,
  //         },
  //         {
  //           name: "current_address_street",
  //           label: "Current  Street",
  //           type: "text",

  //           placeholder: "Enter street",
  //           required: true,
  //           step: 1,
  //         },
  //         {
  //           name: "current_address_state",
  //           label: "Current  State",
  //           type: "select",
  //           options: states.map((state) => ({
  //             value: state.id,
  //             label: state.state_name,
  //           })),

  //           placeholder: "Select state",
  //           storeLabel: true,
  //           required: true,
  //           step: 1,
  //         },
  //         {
  //           name: "current_address_city",
  //           label: "Current City",
  //           type: "select",
  //           options: (cities.cities || []).map((city) => ({
  //             value: city.city_id,
  //             label: city.city_name,
  //           })),
  //           placeholder: "Select a city",
  //           step: 1,
  //           required: true,
  //           storeLabel: true,
  //         },
  //         {
  //           name: "current_address_pincode",
  //           label: "Current Pincode",
  //           type: "text",
  //           placeholder: "Enter pincode",
  //           required: true,
  //           step: 1,
  //         },
  //         {
  //           name: "alternative_mobile_number",
  //           label: "Alternative Mobile Number",
  //           type: "text",
  //           placeholder: "Enter alternative mobile number",
  //           required: false,
  //           step: 1,
  //         },
  //         {
  //           name: "same_as_permanent",
  //           label: "Same as Current Address",
  //           type: "radio",
  //           required: true,
  //           options: [
  //             { value: "1", label: "NO" },
  //             { value: "2", label: "YES" },
  //           ],
  //           step: 1,
  //         },
  //       ],
  //     },
  //     {
  //       title: "Account",
  //       icon: FaDiagramProject,
  //       fields: [
  //         {
  //           name: "bank_name",
  //           label: "Bank Name",
  //           type: "text",
  //           placeholder: "Enter bank name",
  //           required: true,
  //           step: 2,
  //         },
  //         {
  //           name: "bank_branch",
  //           label: "Bank Branch",
  //           type: "text",
  //           placeholder: "Enter bank branch",
  //           required: true,
  //           step: 2,
  //         },
  //         {
  //           name: "ifsc_code",
  //           label: "IFSC Code",
  //           type: "text",
  //           placeholder: "Enter IFSC code",
  //           required: true,
  //           step: 2,
  //         },
  //         {
  //           name: "account_number",
  //           label: "Account Number",
  //           type: "text",
  //           placeholder: "Enter account number",
  //           required: true,
  //           step: 2,
  //         },
  //         {
  //           name: "account_type",
  //           label: "Account Type",
  //           type: "select",
  //           options: [
  //             {
  //               value: 1,
  //               label: "Savings Account",
  //             },
  //             { value: 2, label: "Current Account" },
  //             { value: 3, label: "Joint Account" },
  //             { value: 4, label: "Psycho" },
  //           ],
  //           required: true,
  //           storeLabel: true,
  //           step: 2,
  //         },
  //       ],
  //     },
     
  //     // {
  //     //   title: "POSP With Other Insurer",
  //     //   icon: FaUserFriends,
  //     //   fields: [
  //     //     {
  //     //       name: "posp_with_other_insurer",
  //     //       label: "POSP  With Other Insurer If Yes ",
  //     //       type: "radio",
  //     //       required: true,
  //     //       options: [
  //     //         { value: "No", label: "NO" },
  //     //         { value: "Yes", label: "YES" },
  //     //       ],
  //     //       step: 3,
  //     //     },
  //     //   ],
  //     //   fields3: [
  //     //     {
  //     //       name: "name_of_insurer",
  //     //       label: "Name of Insurer",
  //     //       type: "text",
  //     //       placeholder: "Enter Insurer Name",

  //     //       required: true,
  //     //       step: 3,
  //     //     },

  //     //     {
  //     //       name: "agency_code_no",
  //     //       label: "Agency Code No.",
  //     //       placeholder: "Enter Agency code",
  //     //       type: "text",
  //     //       required: true,
  //     //       step: 3,
  //     //     },
  //     //     {
  //     //       name: "date_of_appointment_as_agency",
  //     //       label: "Date Of Appointment As Agency",
  //     //       placeholder: "Enter date ",
  //     //       type: "date",
  //     //       required: true,
  //     //       step: 3,
  //     //     },
  //     //     {
  //     //       name: "date_of_cessation_of_agency",
  //     //       label: "Date Of Cessation Of Agency",
  //     //       type: "date",
  //     //       placeholder: "Enter date ",
  //     //       required: true,
  //     //       step: 3,
  //     //     },

  //     //     {
  //     //       name: "reason_for_cessation_agency",
  //     //       label: "Reason For Cessation Agency",
  //     //       type: "text",
  //     //       placeholder: "Enter Reason ",
  //     //       required: true,
  //     //       step: 3,
  //     //     },
  //     //     {
  //     //       name: "noc_issused_by_other_insurer_image",
  //     //       label: "Noc Issued By Other Image",
  //     //       type: "file",
  //     //       placeholder: "",
  //     //       required: true,
  //     //       step: 3,
  //     //     },
  //     //   ],
  //     // },
      
      
      
  //     {
  //       title: "Nominee Info",
  //       icon: FaUserCheck,
  //       fields: [
  //         {
  //           name: "nominee_name",
  //           label: "Nominee Name",
  //           type: "text",
  //           placeholder: "Enter nominee name",
  //           required: true,
  //           step: 4,
  //         },
  //         {
  //           name: "nominee_mobile_number",
  //           label: "Nominee Mobile Number",
  //           type: "text",
  //           placeholder: "Enter nominee mobile number",
  //           required: true,
  //           step: 3,
  //         },
  //         {
  //           name: "nominee_relation",
  //           label: "Nominee Relation",
  //           type: "text",
  //           placeholder: "Enter relation with nominee",
  //           required: true,
  //           step: 4,
  //         },
  //         {
  //           name: "nominee_address",
  //           label: "Nominee Address",
  //           type: "text",
  //           placeholder: "Enter nominee address",
  //           required: true,
  //           step: 4,
  //         },
  //       ],
  //     },
  //     {
  //       title: "Process to Upload",
  //       icon: RiProgress2Line,
  //       fields: [
  //         {
  //           label:
  //             "Upload a clear image of the front side of your Aadhar Card.",
  //           sampleImage: "../../../../assets/images/Aadhar_PVC_Front.jpg",
  //           step: 5,
  //           // type: "file",
  //         },
  //         {
  //           label: "Upload a clear image of the back side of your Aadhar Card.",
  //           step: 5,
  //           type: "file",
  //           sampleImage:
  //             "../../../../public/assets/images/Sample_PVC_Aadhar_Card_back.jpg",
  //         },
  //         {
  //           label:
  //             "Upload your Bank Passbook first page or a Cancelled Cheque.",
  //           step: 5,
  //           type: "file",
  //           sampleImage: "../../../../assets/images/Aadhar_PVC_Front.jpg",
  //         },
  //         {
  //           label:
  //             "Upload a recent Passport Size Photo with a clear background.",
  //           step: 5,
  //           type: "file",
  //           sampleImage: "../../../../assets/images/passport-size.webp",
  //         },
  //         {
  //           label: "Upload a clear image of your signature on white paper.",
  //           step: 5,
  //           type: "file",
  //           sampleImage: "../../../../assets/images/signature.png",
  //         },
  //         {
  //           label: "Upload a clear image of your PAN Card.",
  //           step: 5,
  //           type: "file",
  //           sampleImage: "../../../../assets/images/pancard.webp",
  //         },
  //         {
  //           label: "Upload your latest education Marksheet.",
  //           step: 5,
  //           type: "file",
  //           sampleImage: "../../../../assets/images/marksheet.jpg",
  //         },
  //       ],
  //     },
  //     {
  //       title: "Documents",
  //       icon: FaCloudUploadAlt,
  //       fields: [
  //         {
  //           name: "aadhar_card_front",
  //           label: "Aadhar Card Front",
  //           type: "file",
  //           required: true,
  //           step: 6,
  //         },
  //         {
  //           name: "aadhar_card_back",
  //           label: "Aadhar Card Back",
  //           type: "file",
  //           required: true,
  //           step: 6,
  //         },
  //         {
  //           name: "bank_passbook_or_cancelled_cheque",
  //           label: "Bank Passbook / Canc. Cheque",
  //           type: "file",
  //           required: true,
  //           step: 6,
  //         },
  //         {
  //           name: "passport_size_photo",
  //           label: "Passport Size Photo",
  //           type: "file",
  //           required: true,
  //           step: 6,
  //         },
  //         {
  //           name: "signature_image",
  //           label: "Signature",
  //           type: "file",
  //           required: true,
  //           step: 6,
  //         },
  //         {
  //           name: "pancard_image",
  //           label: "PAN Card",
  //           type: "file",
  //           required: true,
  //           step: 6,
  //         },
  //         {
  //           name: "marksheet_image",
  //           label: "Marksheet",
  //           type: "file",
  //           required: true,
  //           step: 6,
  //         },
  //         {
  //           name: "declaration",
  //           label: "I Agree to the Terms and Conditions",
  //           type: "checkbox",
  //           required: true,
  //           step: 6,
  //         },
  //       ],
  //     },
  //   ],
  //   [
  //     states,
  //     cities,
  //     citiesBy,
  //     formData.permanent_address_state,
  //     formData.current_address_state,
  //   ]
  // );

  
  const [formErrors, setFormErrors] = useState({});
  useEffect(() => {
    if (createError) {
      // Handle validation errors from createError
      setFormErrors(createError.errors || {}); // Assuming createError.error contains field-level errors
      // toast.error(createError.message || "Please fix the errors and try again.");
    }
  }, [createError, formErrors]);



  useEffect(() => {
    const token = Cookies.get("authToken");
    const userId = Cookies.get("userId");


    if (!token || !userInfo.id) {
      window.location.reload();
      navigate("/login");
      return;
    }

    if (!posp && userInfo.id) {
      dispatch(fetchPospById(userInfo.id));
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (!states || states.length === 0) dispatch(fetchStates());
  }, [dispatch]); // Only depend on dispatch

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
    ) {
      navigate("/posp-training-instructions");
    } else if (
      currentUserData.documents_verification === 1 &&
      currentUserData.training_seconds === 86400 &&
      currentUserData.can_exam === 1 &&
      (currentUserData.exam === "not-started" ||
        currentUserData.exam === "fail")
    ) {
      navigate("/exam-instruction");
    } else if (
      currentUserData.documents_verification === 1 &&
      currentUserData.training_seconds === 86400 &&
      currentUserData.can_exam === 0 &&
        currentUserData.exam === "fail"
    ) {
      navigate("/posp-reattampt-mail");
    }else if (
      currentUserData.documents_verification === 1 &&
      currentUserData.training_seconds === 86400 &&
      currentUserData.can_exam === 0 &&
        currentUserData.exam === "pass"
    ) {
      navigate("/");
    } else if (
      currentUserData.training_seconds === 86400 &&
      currentUserData.can_exam === 1 &&
      currentUserData.exam === "pass"
    ) {
      navigate("/posp-dashboard");
    } else if (
      currentUserData.documents_verification === 0 &&
      (currentUserData.can_update_documents === false ||
        currentUserData.can_update_documents === 0)
    ) {
      setShowDialog(true);
    }
  }, [currentUserData, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login"); // Close the menu after logout
  };

  const handleSubmit = (submittedFormData) => {
    const formDataToSend = new FormData();

    // Append text fields
    Object.keys(formData).forEach((key) => {
      // Exclude preview fields and any other non-file data
      if (!key.includes("_preview")) {
        formDataToSend.append(key, formData[key]);
      }
    });

    // Append files to FormData
    Object.keys(formData).forEach((key) => {
      if (formData[key] && formData[key] instanceof File) {
        formDataToSend.append(key, formData[key]);
      }
    });
    const allowedFields = Object.keys(formData); // ✅ Get the keys from your state
    const filteredFormData = allowedFields.reduce((acc, key) => {
      acc[key] = submittedFormData[key] || ""; // Fallback to empty if missing
      return acc;
    }, {});
    if (posp?.documents_verification === 0) {
      dispatch(verifyUserDocument(posp.id, filteredFormData));
    }
  };
  useEffect(() => {
    if (createSuccess) {
      setShowDialog(true); // 1️⃣ Show dialog
  
      dispatch(resetPosp()); // 2️⃣ Reset reducer state
  
      if (posp?.id) {
        dispatch(fetchPospById(posp.id)); // 3️⃣ Fetch latest data
      }
    }
  }, [createSuccess, dispatch, posp?.id]);
  
  return (
    <>
      <div className="relative h-fit w-full bg-gray-50">
        {loading && <Loading />}
    
<div
  className={`flex flex-row justify-between items-center w-full px-4 py-2 border-b border-gray-200 ${
    loading ? "backdrop-blur-sm" : ""
  }`}
>
  {/* Logo on the Left */}
  <div className="h-16 w-36">
    <img
      src="/assets/images/logo.webp"
      alt="Notion Insurance"
      loading="lazy"
      className="h-full w-full object-contain cursor-pointer"
    />
  </div>

  {/* Logout on the Right */}
  <Button
    size="sm"
    color="red"
    onClick={handleLogout}
    className="rounded-lg"
  >
    Logout
  </Button>
</div>

{/* Centered Heading */}
<div className="w-full text-center my-5">
  <h2 className="text-2xl md:text-3xl font-semibold text-blue-gray-700">
    Posp Document Details
  </h2>
</div>

<Card className="lg:mx-16 mb-5 mx-2 px-2 shadow-lg border">
  <FormComponent
    onSubmit={handleSubmit}
    config={PospDocument11config()}
    success={createSuccess}
    errors={formErrors}
    initialValues={
      posp && {
        ...posp,
        same_as_permanent: formData.same_as_permanent,
        posp_with_other_insurer: formData.posp_with_other_insurer,
      }
    }
  />
    {/* <WizardSecond
    onSubmit={handleSubmit}
    fields={stepFields}
    success={createSuccess}
    errors={formErrors}
    initialValues={
      posp && {
        ...posp,
        same_as_permanent: formData.same_as_permanent,
        posp_with_other_insurer: formData.posp_with_other_insurer,
      }
    }
  /> */}

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
    </>
  );
};
export default PospDocument;



    // <div
    //       className={`flex flex-col sm:flex-row justify-between mb-5 items-center w-full px-2 lg:px-8 py-0 border-b border-gray-200 ${
    //         loading ? "backdrop-blur-sm" : ""
    //       }`}
    //     >
    //       {/* Heading and Subheading */}
    //       <div className="h-24">
    //         <img
    //           src="/assets/images/logo.webp"
    //           alt="Notion insurance "
    //           loading="lazy"
    //           className="mr-4 py-0 cursor-pointer object-cover  h-full w-full  lg:ml-2"
    //         />
    //       </div>
       

    //       {/* Logout Button */}
    //       <Button
    //         size="sm"
    //         color="red"
    //         onClick={handleLogout}
    //         className="rounded-lg"
    //       >
    //         Logout
    //       </Button>
    //     </div>
    //     <Card className="lg:mx-16 mb-5 mx-2 px-2 shadow-lg border">
    //          <div>
    //         <Typography variant="h4" color="blue-gray" className="font-bold">
    //           Posp Document Details
    //         </Typography>
        
    //       </div>

    //       <WizardSecond
    //         // onChange={handleFieldChange}
    //         onSubmit={handleSubmit}
    //         fields={stepFields}
    //         success={createSuccess}
    //         errors={formErrors}
    //         initialValues={
    //           posp && {
    //             ...posp,
    //             same_as_permanent: formData.same_as_permanent,
    //             posp_with_other_insurer: formData.posp_with_other_insurer,
    //           }
    //         }
    //       />
    //     </Card>