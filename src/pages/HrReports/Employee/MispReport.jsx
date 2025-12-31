import React, { useEffect, useMemo } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Card, Typography } from "@material-tailwind/react";
import TableLayout from "../../TableActions/TableLayout";
const MispReport = () => {
    const {fetchMisps, toggleMispActiveStatus,createSuccess,misps, createError, loading, error} =useMisp();
  useEffect(() => {
 if(!misps || misps.length === 0) (fetchMisps()); // Fetch zones on component mount
  }, []);
  const flattenedMisps = useMemo(() => {
    return misps?.map((item, index) => ({
      ...item,
      // sno: index + 1,
      bqp: item.bqp ? `${item.bqp.name} - ${item.bqp.employee_code}` : "",
      reporting_manager: item.reporting_manager
        ? `${item.reporting_manager.name} - ${item.reporting_manager.employee_code}`
        : "",
      relationship_manager: item.relationship_manager
        ? `${item.relationship_manager.name} - ${item.relationship_manager.employee_code}`
        : "",
        posp_id: item.posp_id
      ? `${item.posp_id.name} - ${item.posp_id.posp_code}`
      : "",
    }));
  }, [misps]);

  
  const columnKeys = [
    { key: "sno", label: "S No" },
  { key: "title", label: "Title" },
  { key: "name", label: "Employee Name" },
  { key: "mobile_no", label: "Mobile Number" },
  { key: "login_email", label: "Email" },
  { key: "branch_id.branch_code", label: "Branch" },
  { key: "bqp", label: "BQP Name" },
  { key: "reporting_manager", label: "Reporting Manager" },
  { key: "relationship_manager", label: "Relationship Manager" },
  { key: "posp_id", label: "POSP " },
  { key: "state", label: "State" },
  { key: "city", label: "City" },
  { key: "pincode", label: "Pincode" },
    { key: "statuses", label: "Status", actions: "toggle" }, // This column will have actions like delete and edit
    { key: "actions", label: "Actions", actions: [{
        type: "editOtherPage",
        text: "Edit Employee",
        redirectTo: "/master/hr/edit-misp/:id",
      },] }, // This column will have actions like delete and edit
  ];
  const handleToggle = async (employeeId) => {
  (toggleMispActiveStatus(employeeId)); // Call Redux action
    
  };

  const handleDelete = (depID) => {
    const toastId = toast(
      <div className="flex flex-col items-center gap-4">
        <p>Are you sure you want to delete this Department?</p>
        <div className="flex gap-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => {
              // (deleteEmplo(depID)); // Proceed with the delete action
              toast.dismiss(toastId); // Dismiss the confirmation toast
              toast.success("Fuel data deleted successfully!"); // Show success toast
            }}
          >
            OK
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={() => toast.dismiss(toastId)} // Dismiss the confirmation toast without doing anything
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        position: "top-right",
        autoClose: false, // Keep the toast open until dismissed
        closeButton: false, // Disable the close button
        draggable: false,
      }
    );
  };
  return (
    <div className="md:py-8 py-3">
    <Typography variant="h4" color="blue-gray">
      Misp Report
    </Typography>
  <TableLayout
    tableHeaders={columnKeys.map((col) => col.label)}
    filteredData={flattenedMisps}
    handleDelete={handleDelete}
    columnKeys={columnKeys}
    fileName="Fuels"
    loading={loading}
    handleToggle={handleToggle}
    
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
  )
}

export default MispReport