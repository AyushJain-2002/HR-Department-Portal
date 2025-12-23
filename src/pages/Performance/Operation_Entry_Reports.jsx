import {
    Button,
    Card,
    Typography,
    Select,
    Option,
    Input,
  } from "@material-tailwind/react";
  import React, { useEffect, useState, useMemo } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { toast, ToastContainer } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  import ReusableTable from "../TableActions/ReusableTable";
  import { fetchDefaultOperationentryreports, fetchOperationentryreports } from "../../store/Actions/OperationEntryReportAction";
  import { fetchBranches } from "../../store/Actions/BranchAction";
  import FormDynamic from "../TableActions/FormDynamic";
  
  const Operation_Entry_Reports = () => {
    const dispatch = useDispatch();
    const { operationentryreports = [], loading, error, success } = useSelector(
      (state) => state.operationentryreports
    );
    const { branches } = useSelector((state) => state.branches);
  
    const [filters, setFilters] = useState({
      type: "",
      from: "",
      to: "",
      branch: "",
    });
  
    useEffect(() => {
      if(!branches || branches.length===0)dispatch(fetchBranches());
      if(!operationentryreports || operationentryreports.length===0)dispatch(fetchDefaultOperationentryreports());
    }, [dispatch]);
  
    useEffect(() => {
      if (error) toast.error(error);
    }, [error, success]);
  
    const handleFilterChange = (name, value) => {
      setFilters((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    const handleSubmit = (filters) => {
  console.log(filters)
      if (!filters.type || !filters.from || !filters.to) {
        toast.error("Please select Entry Date Type, From Date, and To Date");
        return;
      }
      dispatch(fetchOperationentryreports(filters));
    };
  
    const handleReset = () => {
      setFilters({
        type: "",
        from: "",
        to: "",
        branch: "",
      });
  
      setSelectKey((prevKey) => prevKey + 1);
  
      dispatch(fetchOperationentryreports({}));
    };
  
    const [selectKey, setSelectKey] = useState(0);
  
    const filterFields = useMemo(
      () => [
        {
          id: "type",
          name: "type",
          label: "Entry Date Type",
          type: "select",
          options: [
            { value: "entry_date", label: "Entry Date" },
            { value: "policy_start_date", label: "Start Date" },
            { value: "policy_issue_date", label: "Issue Date" },
          ],
          required: true,
        },
        {
          id: "from",
          name: "from",
          label: "From Date",
          type: "date",
          placeholder: "Select From Date",
          required: true,
        },
        {
          id: "to",
          name: "to",
          label: "To Date",
          type: "date",
          placeholder: "Select To Date",
          required: true,
        },
        {
          id: "branch",
          name: "branch",
          label: "Branch",
          type: "select",
          options:
            (branches || []).map((branch) => ({
              value: branch.id,
              label: branch.branch_code,
            })) || [],
        storeLabel:false,
          required: false,
        },
      ],
      [branches]
    );
  
    return (
      <div className="md:py-8 py-3">
        {/* Filter Form */}
        <Card className="w-full border p-5" color="transparent">
          <Typography variant="h4" color="blue-gray">
            Operation Report Filters
          </Typography>
          <FormDynamic
          fields={filterFields}
          onSubmit={handleSubmit}
          onChange={handleFilterChange}
        />
        </Card>
  
        {/* Table Section */}
        <ReusableTable
          tableData={operationentryreports}
          columnKeys={[
            { key: "sno", label: "S.No" },
            { key: "name", label: "Name" },
            { key: "employee_code", label: "Code" },
            { key: "nop", label: "NOP" },
            { key: "quotation_given", label: "Quotation Given" },
            { key: "quotation_complete", label: "Quotation Complete" },
            { key: "quotation_pending", label: "Quotation Pending" },
          ]}
          fileName="Operation Report"
          idKey="sno"
          loading={loading}
        />
  
        <ToastContainer />
      </div>
    );
  };
  
  export default Operation_Entry_Reports;
  