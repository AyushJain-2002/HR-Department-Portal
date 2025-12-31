import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {fetchAllPospData} from "../../../store/NewReducers/authSlice";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../../../hooks/useAuth";
import TableLayout from "../../TableActions/TableLayout";



const HrPosp = () => {
  const dispatch = useDispatch();
  // const { loading, allPosp,  } = useSelector((state) => state.posp);
  const {authState}=useAuth();
  const {loading,allPosp}=authState;


  useEffect(() => {
    if (!allPosp || allPosp.length === 0) dispatch(fetchAllPospData()); // Fetch zones on component mount
  }, [dispatch]);

  const columnKeys = [
    { key: "sno", label: "S NO" },
    {
      key: "actions",
      label: "Actions",
      actions: [
        "editUser",
        {
          type: "editOtherPage",
          text: "See Manager",
          redirectTo: "/hr-posp/:id",
        },
      ],
    },
    { key: "title", label: "Title" },
    { key: "name", label: "Name" },
    { key: "mobile_no", label: "Mobile No" },
    { key: "pancard_number", label: "PAN Card No" },
    { key: "email", label: "Email" },
    { key: "date_of_birth", label: "Date of Birth" },
    { key: "gender", label: "Gender" },
    { key: "aadhar_no", label: "Aadhar No" },
    { key: "education_level", label: "Education Level" },
    { key: "email_verification", label: "Email Verification" },
    { key: "documents_verification", label: "Documents Verification" },

    { key: "posp_code", label: "POSP Code" },
    { key: "branch.branch_name", label: "Branch" },
    { key: "branch.branch_code", label: "Branch Code" },

    { key: "bqp.name", label: "BQP" },
    {
      key: "posp_relationship_manager.name",
      label: "POSP Relationship Manager",
    },
    // { key: "referred_by_pancard_number", label: "Referred By PAN" },
    { key: "posp_reporting_manager", label: "Posp Reporting Manager" },
    { key: "active", label: "Active" },
    { key: "statuses", label: "Status", actions: "toggle" },
    
  ];

  return (
    <div className="md:py-8 py-3">
    

    <TableLayout
        filteredData={allPosp}
        columnKeys={columnKeys}
        fileName="User Data"
        idKey="id"
        loading={loading}
      />
      <ToastContainer 
      className="mt-16" // Add margin top to push toasts down from header
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"/>
    </div>
  );
};

export default HrPosp;




