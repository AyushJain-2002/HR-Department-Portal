import React, { useEffect, useState, useMemo } from "react";
import { Typography, Select, Option } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPospData } from "../../../store/NewReducers/authSlice";
import ReusableTable from "../../TableActions/ReusableTable";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../../../hooks/useAuth";

const PospAccountReport = () => {
  const dispatch = useDispatch();
  const {authState}=useAuth();
  const { loading, allPosp } = authState;
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    if (!allPosp || allPosp.length === 0) {
      dispatch(fetchAllPospData());
    }
  }, [dispatch, allPosp]);

  const renderStatus = (value) => (
    <span className={`font-semibold ${value ? "text-green-600" : "text-red-600"}`}>
      {value ? "Active" : "Inactive"}
    </span>
  );

  const columnKeys = [
    { key: "sno", label: "Sno" },
    { key: "name", label: "Name" },
    { key: "posp_code", label: "Code" },
    { key: "pancard_number", label: "Pan" },
    { key: "branch_id", label: "Branch Name" },
    { key: "bank_name", label: "Bank Name" },
    { key: "account_number", label: "Account No." },
    { key: "ifsc_code", label: "IFSC Code" },
    { key: "bank_branch", label: "Branch Name" },
    { key: "account_type", label: "Account Type" },
    { key: "active", label: "Status",},
  ];

  const filteredData = useMemo(() => {
    if (!allPosp) return [];
    if (activeFilter === "All") return allPosp;
    return allPosp.filter((posp) => String(posp.active) === activeFilter);
  }, [allPosp, activeFilter]);

  return (
    <div className="md:py-8 py-3">
      <div className="flex items-center justify-between mb-4">
        <Typography variant="h4" color="blue-gray">
          POSP Account Details Reports
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
        tableData={filteredData}
        columnKeys={columnKeys}
        fileName="POSP Account Reports"
        idKey="id"
        loading={loading}
      />

      <ToastContainer />
    </div>
  );
};

export default PospAccountReport;
