import React, { useEffect, useMemo, useState } from "react";
import {  useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
// import WizardSecond from "../../components/wizard/WizardSecond";
import Cookies from "js-cookie";
import {
  // Button,
  Card,
  Dialog,
  DialogBody,
  Typography,
} from "@material-tailwind/react";
import {
  // FaAddressBook,
  // FaBriefcase,
  // FaCloudUploadAlt,
  // FaHome,
  // FaPiggyBank,
  FaUserCheck,
} from "react-icons/fa";
import { useMisp } from "../../hooks/hookIndex";
import Loading from "../Loading";
// import { resetMisp } from "../../store/NewReducers/MispSlice";
// import { addMisp, getMispById, updateMisp } from "../../store/Actions/MispAction";
import MispCreateConfig from "./MispCreateConfig";
import FormComponent from "../../components/wizard/FormComponent";
// import {
//   createEmployee,
//   fetchAllEmployees,
//   fetchEmployeeById,
// } from "../../../store/Actions/EmployeeAction";
// import { toast } from "react-toastify";
// import { FaDiagramProject } from "react-icons/fa6";
// import {
//   fetchCitiesByState,
//   fetchCitiesByStateAnother,
//   fetchStates,
// } from "../../../store/Actions/StateAction";
// import {
//   fetchDepartments,
//   fetchDesignation,
// } from "../../../store/Actions/Department_Designation_Action";
// import { fetchBanks } from "../../../store/Actions/FuelAction";
// import { fetchBranches } from "../../../store/Actions/BranchAction";
// import DateInputWithDayPicker from "../TableActions/DateInputWithDayPicker";
// import {
//   fetchBqp,
//   fetchReportingManager,
// } from "../../../store/Actions/OperationAction";

const MispCreate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {addMisp, getMispById, updateMisp,resetMisp} =useMisp();
  const { createSuccess, misp, createError, loading, error } = useSelector(
    (state) => state.misp
  );
  // const { bqpList, relationshipManagers, reportingManagerForPospMisp, pospTypes } =
  //   useSelector((state) => state.operationData);

  const location = useLocation();
  useEffect(() => {
    if (id) {
      (getMispById(id)); // ✅ Fetch employee if editing
    } else {
      (resetMisp()); // ✅ Reset when navigating to create
    }
  }, [, id, location.pathname]);
  // const { banks } = useSelector((state) => state.fuels);
  // const { branches } = useSelector((state) => state.branches);

  // useEffect(() => {
  //   if (!branches || branches.length === 0) (fetchBranches());
  //   if (!bqpList || bqpList.length === 0) (fetchBqp());
  //   if (!states || states.length === 0) (fetchStates());
  //   if (!banks || banks.length === 0) (fetchBanks());
  // }, []);
  const userBranchId = Cookies.get("branchId");
  const userRole = Cookies.get("role");
  const isRestrictedUser =
    userBranchId && !["admin", "Admin", "superadmin"].includes(userRole);
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    mobile_no: "",
    alternative_mobile_no: "",
    login_email: "",
    branch_id: isRestrictedUser ? userBranchId : "",
    bqp: "",
    reporting_manager: "",
    relationship_manager: "",
    posp_id: "",
    houseno: "",
    street: "",
    state: "",
    city: "",
    pincode: "",
    aadhar_no: "",
    pancard_number: "",
    bank_type: "",
    bankname: "",
    bankaccount_no: "",
    bankifsc_code: "",
    bank_branch_code: "",
    other_document: "",
    pancard_image: "",
    bank_passbook_image: "",
  });
  // const { states = [], cities = { cities: [] } } = useSelector(
  //   (state) => state.states
  // );
  const [showDialog, setShowDialog] = useState(false);
  
  // Check restriction

  // const parsedBranchId = Number(userBranchId);
  // const stepFields = useMemo(
    // () => [
    //   {
    //     title: "Personal Details",
    //     icon: FaHome,
    //     fields: [
    //       {
    //         name: "title",
    //         label: "Title",
    //         type: "select",
    //         options: [
    //           { value: 1, label: "Mr." },
    //           { value: 2, label: "Mrs." },
    //           { value: 3, label: "Miss." },
    //           { value: 4, label: "Dr." },
    //         ],
    //         storeLabel: true,
    //         placeholder: "Select title",
    //         required: true,
    //         step: 0,
    //       },
    //       {
    //         name: "name",
    //         label: "Name",
    //         type: "text",
    //         placeholder: "Name",
    //         required: true,
    //         step: 0,
    //       },
    //       {
    //         name: "mobile_no",
    //         label: "Mobile Number",
    //         type: "text",
    //         placeholder: "Mobile Number",
    //         required: true,
    //         step: 0,
    //       },
    //       {
    //         name: "alternative_mobile_no",
    //         label: "Alternative Mobile Number",
    //         type: "text",
    //         placeholder: "Alternative Mobile Number",
    //         required: true,
    //         step: 0,
    //       },
    //       {
    //         name: "login_email",
    //         label: "Login Email",
    //         type: "email",
    //         placeholder: "Login Email",
    //         required: true,
    //         step: 0,
    //       },
    //       {
    //         name: "aadhar_no",
    //         label: "Aadhar Number",
    //         type: "text",
    //         placeholder: "Aadhar Number",
    //         required: true,
    //         step: 0,
    //       },
    //       {
    //         name: "pancard_number",
    //         label: "Pancard Number",
    //         type: "text",
    //         placeholder: "Pancard Number",
    //         required: true,
    //         step: 0,
    //       },
    //       { name: "houseno", label: "House No.", type: "text" },
    //       {
    //         name: "street",
    //         label: "Street",
    //         type: "text",
    //         placeholder: "Enter street",
    //         required: true,
    //         step: 0,
    //       },
    //       {
    //         name: "state",
    //         label: "State",
    //         type: "select",
    //         options: (states || []).map((state) => ({
    //           value: state.id,
    //           label: state.state_name,
    //         })),
    //         placeholder: "Select state",
    //         storeLabel: true,
    //         required: true,
    //         step: 0,
    //       },
    //       {
    //         name: "city",
    //         label: "City",
    //         type: "select",
    //         options: (cities.cities || []).map((city) => ({
    //           value: city.city_id,
    //           label: city.city_name,
    //         })),
    //         placeholder: "Select a city",
    //         step: 0,
    //         required: true,
    //         storeLabel: true,
    //       },
    //       {
    //         name: "pincode",
    //         label: "Pincode",
    //         type: "text",
    //         placeholder: "Enter pincode",
    //         required: true,
    //         step: 0,
    //       },
    //     ],
    //   },

    //   {
    //     title: "Bank Details",
    //     icon: FaPiggyBank,
    //     fields: [
    //       {
    //         name: "bankname",
    //         label: "Bank Name",
    //         type: "select",
    //         options: (banks || []).map((bank) => ({
    //           value: bank.id,
    //           label: bank.bank_name,
    //         })),
    //         placeholder: "Bank Name",
    //         required: true,
    //         storeLabel: true,
    //         step: 3,
    //       },
    //       {
    //         name: "bank_branch_code",
    //         label: "Bank Branch Code",
    //         type: "text",
    //         placeholder: "Bank Branch Code",
    //         required: true,
    //         step: 1,
    //       },
    //       {
    //         name: "bankifsc_code",
    //         label: "IFSC Code",
    //         type: "text",
    //         placeholder: "IFSC Code",
    //         required: true,
    //         step: 1,
    //       },
    //       {
    //         name: "bankaccount_no",
    //         label: "Account Number",
    //         type: "text",
    //         placeholder: "Account Number",
    //         required: true,
    //         step: 1,
    //       },
    //       {
    //         name: "bank_type",
    //         label: "Account Type",
    //         type: "select",
    //         options: [
    //           { value: "Savings", label: "Savings" },
    //           { value: "Current", label: "Current" },
    //         ],
    //         placeholder: "Select Account Type",
    //         required: true,
    //         step: 3,
    //       },
    //       {
    //         name: "bank_passbook_image",
    //         label: "Bank Passbook Image",
    //         type: "file",
    //         required: true,
    //         step: 1,
    //       },
    //       {
    //         name: "pancard_image",
    //         label: "Pancard Image",
    //         type: "file",
    //         required: true,
    //         step: 1,
    //       },
    //       {
    //         name: "other_document",
    //         label: "Other Document",
    //         type: "file",
    //         required: true,
    //         step: 1,
    //       },
    //     ],
    //   },
    //   {
    //     title: "Official Details",
    //     icon: FaBriefcase, // Choose an appropriate icon
    //     fields: [
    //       {
    //         name: "branch_id",
    //         label: "Branch",
    //         type: "select",
    //         options: (branches || []).map((branch) => ({
    //           value: branch.id,
    //           label: branch.branch_code,
    //         })),
    //         placeholder: "Select Branch",
    //         required: true,
    //         step: 2,
    //         storeLabel: true,
    //         disabled: isRestrictedUser, // Disable if restricted user
    //         defaultValue:
    //           isRestrictedUser && parsedBranchId
    //             ? {
    //                 value: parsedBranchId,
    //                 label:
    //                   branches?.find((branch) => branch.id === parsedBranchId)
    //                     ?.branch_code || "Unknown Branch",
    //               }
    //             : undefined,
    //       },
    //       {
    //         name: "bqp",
    //         label: "BQP",
    //         type: "select",
    //         options: (bqpList || []).map((bqp) => ({
    //           value: bqp.id,
    //           label: bqp.name + " " + bqp.code,
    //         })),
    //         placeholder: "Select BQP",
    //         step: 2,
    //         storeLabel: false,
    //       },
    //       {
    //         name: "reporting_manager",
    //         label: "Reporting Manager",
    //         type: "select",
    //         options: (reportingManagerForPospMisp||[] ).map((bqp) => ({
    //           value: bqp.id,
    //           label: bqp.name + " " + bqp.code,
    //         })),
    //         placeholder: "Select Reporting Manager",
    //         step: 2,
    //         storeLabel: false,
    //       },
    //       {
    //         name: "relationship_manager",
    //         label: "Relationship Manager",
    //         type: "select",
    //         options: (relationshipManagers || []).map((bqp) => ({
    //           value: bqp.id,
    //           label: bqp.name + " " + bqp.code,
    //         })),
    //         placeholder: "Select Relationship Manager",
    //         step: 2,
    //         storeLabel: false,
    //       },
    //       {
    //         name: "posp_id",
    //         label: "POSP ID",
    //         type: "select",
    //         options: (pospTypes || []).map((bqp) => ({
    //           value: bqp.id,
    //           label: bqp.name + " " + bqp.posp_code,
    //         })),
    //         placeholder: "Select POSP ID",
    //         step: 2,
    //         storeLabel: false,
    //       },
    //     ],
    //   },
    // ],
  //   [
  //     states,
  //     cities,
  //     branches,
  //     reportingManagerForPospMisp,
  //     bqpList,
  //     relationshipManagers,
  //     pospTypes,
  //     banks,
  //     isRestrictedUser,
  //     parsedBranchId,
  //   ]
  // );
  
  const handleFieldChange = (name, selected) => {
    // Flatten all fields from `fields` and `fields2` to search for the matching field
    const allFields = stepFields.flatMap((field) => [
      ...(field.fields || []),
      ...(field.fields2 || []),
    ]);

    // Find the field configuration to check for `storeLabel` or other properties
    const fieldConfig = allFields.find((field) => field.name === name);
    const shouldStoreLabel = fieldConfig ? fieldConfig.storeLabel : false;

    // Update specific fields based on their name
    setFormData((prev) => {
      const updatedFields = { ...prev };
      if (selected?.target?.type === "file") {
        // Handle file input change safely
        const file = selected.target?.files ? selected.target.files[0] : null;
        if (file) {
          updatedFields[name] = file; // Store the file object in the form data
        } else {
          updatedFields[name] = null; // In case no file is selected (or canceled)
        }
      } else {
        // For other fields, update their value
        updatedFields[name] = shouldStoreLabel
          ? selected.label
          : selected?.value;
      }

      return updatedFields;
    });
  };
  const [formErrors, setFormErrors] = useState({});
  // useEffect(() => {
  //   if (createError) {
  //     // Handle validation errors from createError
  //     setFormErrors(createError.errors || {}); // Assuming createError.error contains field-level errors
  //     // toast.error(createError.message || "Please fix the errors and try again.");
  //   }
  // }, [createError, formErrors]);
    useEffect(() => {
    if (createError) {
      // Handle validation errors from createError
      setFormErrors(createError.errors || {}); // Assuming createError.error contains field-level errors
      // toast.error(createError.message || "Please fix the errors and try again.");
    }
  }, [createError]);
  const handleSubmit = (formData) => {
    // e.preventDefault(); // Prevent the form from refreshing the page
    console.log("Form Data:", formData);
    (addMisp(formData));
  };
  const isEditMode = !!id;

  const handleEditt = (formData) => {
    console.log("Editing MISP:",id, formData);
    // (updateMisp( id, formData ));
  };
  
  useEffect(() => {
    const token = Cookies.get("authToken");
    const userInfo = Cookies.get("userInfo");

    if (!token || !userInfo) {
      window.location.reload();
      navigate("/login"); // Redirect to login if no token or userInfo
      return;
    }
  }, [, navigate]);
  useEffect(() => {
    if (createSuccess) {
      // Clear formData
      setFormData({
        title: "",
        name: "",
        mobile_no: "",
        alternative_mobile_no: "",
        login_email: "",
        branch_id: isRestrictedUser ? userBranchId : "",
        bqp: "",
        reporting_manager: "",
        relationship_manager: "",
        posp_id: "",
        houseno: "",
        street: "",
        state: "",
        city: "",
        pincode: "",
        aadhar_no: "",
        pancard_number: "",
        bank_type: "",
        bankname: "",
        bankaccount_no: "",
        bankifsc_code: "",
        bank_branch_code: "",
        other_document: "",
        pancard_image: "",
        bank_passbook_image: "",
      });

      // Show dialog
      setShowDialog(true);

      // Hide dialog and reset state after 5 seconds
      const timer = setTimeout(() => {
        (resetMisp()); // Call resetMisp after dialog is hidden
        setShowDialog(false);
        navigate("/reports/hr/misp-report");
      }, 5000);

      return () => clearTimeout(timer); // Cleanup on unmount or effect change
    }
  }, [createSuccess]);

  return (
    <div className="relative h-fit pb-10 w-full ">
      {loading && <Loading />}
      <div
        className={`flex justify-between mb-5 items-center w-full px-2 lg:px-5 py-4 border-b border-gray-200 ${
          loading ? "backdrop-blur-sm" : ""
        }`}
      >
        {/* Heading and Subheading */}
        <div>
          <Typography variant="h4" color="blue-gray" className="font-bold">
            MISP Entry
          </Typography>
          <Typography variant="small" color="gray" className="mt-1">
            Fill in the details below to proceed
          </Typography>
        </div>

        {/* Logout Button */}
      </div>
      <Card className="lg:mx-10 mb-5 mx-2 px-2 shadow-lg border">
        <FormComponent
          onChange={handleFieldChange}
          onSubmit={isEditMode ? handleEditt : handleSubmit}
          config={MispCreateConfig(formData)}
          success={createSuccess}
          errors={formErrors}
          initialValues={misp}
          resetValue={formData}
        />
      </Card>
      <Dialog open={showDialog}>
        <DialogBody>
          <div className="flex flex-col items-center">
            <FaUserCheck className="text-6xl text-blue-500 mb-4" />
            <Typography variant="h6" className="font-bold mb-2 text-center">
              Success
            </Typography>
            <Typography variant="body2" className="text-gray-600 text-center">
              MISP created successfully! You can now view the MISP details or
              create another one.
            </Typography>
          </div>
        </DialogBody>
      </Dialog>
    </div>
  );
};

//changes
export default MispCreate;
