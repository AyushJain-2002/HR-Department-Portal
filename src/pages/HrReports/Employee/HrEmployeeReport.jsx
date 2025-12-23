import React, { useEffect } from "react";
// import {
//   fetchAllEmployees,
//   toggleEmployeeStatus,
// } from "../../../store/Actions/EmployeeAction.jsx";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import ReusableTable from "../../TableActions/ReusableTable";
import { Card, Typography } from "@material-tailwind/react";
import { useEmployee } from "../../../hooks/hookIndex";
const AllEmployee = () => {

  // const { loading, allEmployee, createError, error } = useSelector(
  //   (state) => state.employee
  // );
  const{fetchAllEmployees,toggleEmployeeStatus,loading, allEmployee, createError, error }=useEmployee();
  useEffect(() => {
 if(!allEmployee || allEmployee.length === 0) (fetchAllEmployees()); // Fetch zones on component mount
  }, []);
  const columnKeys = [
    { key: "sno", label: "S No" },
    { key: "title", label: "Title" },
    { key: "name", label: "Employee Name" },
    { key: "employee_code", label: "Employee Code" },
    { key: "personal_email", label: "Email" },
    { key: "department", label: "Department" },
    { key: "designation", label: "Designation" },
    { key: "bqp.name", label: "BQP Name" },
    { key: "reporting_manager.name", label: "Reporting Manager" },
    { key: "relationship_manager.name", label: "Relationship Manager" },
    { key: "role", label: "Role" },
    { key: "level", label: "Level" },
    { key: "statuses", label: "Status", actions: "toggle" }, // This column will have actions like delete and edit
    { key: "actions", label: "Actions", actions: [{
        type: "editOtherPage",
        text: "Edit Employee",
        redirectTo: "/master/hr/edit-employee/:id",
      },] }, // This column will have actions like delete and edit
  ];
  const handleToggle = async (employeeId) => {
  (toggleEmployeeStatus(employeeId)); // Call Redux action
    
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
          Employees Report
        </Typography>
      <ReusableTable
        tableHeaders={columnKeys.map((col) => col.label)}
        tableData={allEmployee}
        handleDelete={handleDelete}
        columnKeys={columnKeys}
        fileName="Fuels"
        loading={loading}
        handleToggle={handleToggle}
      />
      <ToastContainer />
    </div>
  );
};

export default AllEmployee;
