import React, { useEffect, useMemo, useState } from "react";
import {
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
// import { use, useSelector } from "react-redux";
// import { fetchAllEmployees } from "../../../store/Actions/EmployeeAction";
import ReusableTable from "../../TableActions/ReusableTable";
import { ToastContainer } from "react-toastify";
import { useEmployee } from "../../../hooks/hookIndex";

const EmployeeAccountReport = () => {

  const{fetchAllEmployees,loading, allEmployee}=useEmployee()
  // const { loading, allEmployee } = useSelector((state) => state.employee);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    if (!allEmployee || allEmployee.length === 0) {
      (fetchAllEmployees());
    }
  }, []);

  const columnKeys = [
    { key: "sno", label: "Sno" },
    { key: "name", label: "Name" },
    { key: "employee_code", label: "Code" },
    { key: "pancard_number", label: "Pan" },
    { key: "branch_id", label: "Branch Name" },
    { key: "bank_name", label: "Bank Name" },
    { key: "account_number", label: "Account No." },
    { key: "ifsc_code", label: "IFSC Code" },
    { key: "bank_branch", label: "Branch Name" },
    { key: "account_type", label: "Account Type" },
    { key: "active", label: "Status" },
  ];

  const filteredData = useMemo(() => {
    if (!allEmployee) return [];

    if (activeFilter === "All") return allEmployee;

    return allEmployee.filter((emp) => String(emp.active) === activeFilter);
  }, [allEmployee, activeFilter]);

  return (
    <div className="md:py-8 py-3">
      <div className="flex items-center justify-between mb-4">
        <Typography variant="h4" color="blue-gray">
          Employee Account Details Reports
        </Typography>
        <div className="w-48">
          <Select
            label="Filter by Active"
            value={activeFilter}
            onChange={(val) => setActiveFilter(val)}
          >
            <Option value="All">All</Option>
            <Option value="1">Active</Option>
            <Option value="0">Inactive</Option>
          </Select>
        </div>
      </div>

      <ReusableTable
        tableHeaders={columnKeys.map((col) => col.label)}
        tableData={filteredData || []}
        columnKeys={columnKeys}
        fileName="Employee Account Reports"
        idKey="id"
        loading={loading}
      />

      <ToastContainer />
    </div>
  );
};

export default EmployeeAccountReport;
