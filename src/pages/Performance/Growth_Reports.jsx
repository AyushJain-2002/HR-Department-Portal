import {
  Card,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReusableTable from "../TableActions/ReusableTable";
import {
  fetchDefaultGrowthreports,
  fetchGrowthreports,
} from "../../store/Actions/GrowthReportAction";
import { fetchBranches } from "../../store/Actions/BranchAction";
import FormDynamic from "../TableActions/FormDynamic";
import {
  fetchBqp,
  fetchRelationshipManager,
  fetchPosp,
} from "../../store/Actions/OperationAction";

const Growth_Reports = () => {
  const dispatch = useDispatch();

  const {
    growthreports = [],
    loading,
    error,
    success,
  } = useSelector((state) => state.growthreports);
  const { branches } = useSelector((state) => state.branches);
  const { bqpList, relationshipManagers, pospTypes } = useSelector(
    (state) => state.operationData
  );

  const [filters, setFilters] = useState({
    datetype: "",
    policy_date_type: "",
    from: "",
    to: "",
    financial_year: "",
    month: "",
    branch: "",
    bqp: "",
    relationship_manager: "",
    posp: "",
  });

  useEffect(() => {
    if (!branches?.length) dispatch(fetchBranches());
    if (!bqpList?.length) dispatch(fetchBqp());
    if (!relationshipManagers?.length) dispatch(fetchRelationshipManager());
    if (!pospTypes?.length) dispatch(fetchPosp());
    if (!growthreports?.length) dispatch(fetchDefaultGrowthreports());
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
    if (
      filters.policy_date_type === "between_date" &&
      (!filters.from || !filters.to)
    ) {
      toast.error("Please select From Date and To Date for Between Date filter");
      return;
    }

    if (
      filters.policy_date_type === "financial_year" &&
      !filters.financial_type
    ) {
      toast.error("Please select Financial Quarter/Half");
      return;
    }

    if (filters.policy_date_type === "month_type" && !filters.month) {
      toast.error("Please select Month");
      return;
    }

    dispatch(fetchGrowthreports(filters));
  };

  const handleReset = () => {
    const resetFilters = {
      datetype: "",
      policy_date_type: "",
      from: "",
      to: "",
      financial_year: "",
      month: "",
      branch: "",
      bqp: "",
      relationship_manager: "",
      posp: "",
    };
    setFilters(resetFilters);
    dispatch(fetchGrowthreports({}));
  };

  const policyDateTypes = [
    { value: "between_date", label: "Between Date" },
    { value: "Month", label: "Month" },
    { value: "Q1", label: "Q1 (April - June)" },
    { value: "Q2", label: "Q2 (July - September)" },
    { value: "Q3", label: "Q3 (October - December)" },
    { value: "Q4", label: "Q4 (January - March)" },
    { value: "H1", label: "H1 (April - September)" },
    { value: "H2", label: "H2 (October - March)" },
    { value: "FY", label: "Year (April - March)" },
  ];

  const monthList = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const currentYear = new Date().getFullYear();
  const yearTypes = Array.from({ length: 9 }, (_, i) => {
    const startYear = currentYear - i;
    const endYear = startYear + 1;
    return {
      value: `${startYear}-${endYear}`,
      label: `${startYear}-${endYear}`,
    };
  });

  const filterFields = useMemo(
    () => [
      {
        id: "datetype",
        name: "datetype",
        label: "Policy Date Type",
        type: "select",
        options: [
          { value: "entry_date", label: "Entry Date" },
          { value: "policy_start_date", label: "Start Date" },
          { value: "policy_issue_date", label: "Issue Date" },
        ],
        placeholder: "Select Date Type",
        required: true,
      },
      {
        name: "policy_date_type",
        label: "Data Filter Type",
        type: "select",
        options: policyDateTypes,
        placeholder: "Select Filter Type",
        required: true,
      },
      {
        id: "from",
        name: "from",
        label: "From Date",
        type: "date",
        placeholder: "Select From Date",
        required: true,
        visibleIf: {
          field: "policy_date_type",
          value: "between_date",
        },
      },
      {
        id: "to",
        name: "to",
        label: "To Date",
        type: "date",
        placeholder: "Select To Date",
        required: true,
        visibleIf: {
          field: "policy_date_type",
          value: "between_date",
        },
      },      
      {
        name: "financial_year",
        label: "Year",
        type: "select",
        options: yearTypes,
        placeholder: "Select Year",
        required: true,
        visibleIf: {
          field: "policy_date_type",
          value: ["Month", "Q1", "Q2", "Q3", "Q4", "H1", "H2", "FY"],
        },
      },
      {
        name: "month",
        label: "Month",
        type: "select",
        options: monthList,
        placeholder: "Select Month",
        required: true,
        visibleIf: {
          field: "policy_date_type",
          value: "Month",
        },
      },
      {
        id: "branch",
        name: "branch",
        label: "Branch",
        type: "select",
        options: (branches || []).map((branch) => ({
          value: branch.id,
          label: branch.branch_code,
        })),
        placeholder: "Select Branch",
        required: false,
      },
      {
        name: "bqp",
        label: "BQP",
        type: "select",
        options: bqpList?.map((bqp) => ({
          value: bqp.id,
          label: `${bqp.name} - ${bqp.code}`,
        })),
        placeholder: "Select BQP",
        required: false,
      },
      {
        name: "relationship_manager",
        label: "Relationship Manager",
        type: "select",
        options: relationshipManagers?.map((rm) => ({
          value: rm.id,
          label: `${rm.name} - ${rm.code}`,
        })),
        placeholder: "Select Relationship Manager",
        required: false,
      },
      {
        name: "posp",
        label: "POSP",
        type: "select",
        options: pospTypes?.map((pos) => ({
          value: pos.id,
          label: `${pos.name} - ${pos.code}`,
        })),
        placeholder: "Select POSP",
        required: false,
      },
    ],
    [branches, bqpList, relationshipManagers, pospTypes, filters.year]
  );

  return (
    <div className="md:py-8 py-3">
      <Card className="w-full border p-5" color="transparent">
        <Typography variant="h4" color="blue-gray" className="mb-4">
          Growth Report Filters
        </Typography>
        <FormDynamic
          fields={filterFields}
          onSubmit={handleSubmit}
          onChange={handleFilterChange}
          onReset={handleReset}
          initialValues={filters}
        />
      </Card>

      <div className="mt-6">
        <ReusableTable
          tableData={growthreports}
          columnKeys={[
            { key: "sno", label: "S.No" },
            { key: "branch", label: "Branch" },
            { key: "name", label: "Name" },
            { key: "code", label: "Code" },
            { key: "current_nop", label: "Current Nop" },
            { key: "current_net_premium", label: "Current Premium" },
            { key: "previous_nop", label: "Previous Nop" },
            { key: "previous_net_premium", label: "Previous Premium" },
            { key: "nop_persistency", label: "NOP Persistency(%)" },
            { key: "premium_persistency", label: "Premium Persistency(%)" },
          ]}
          fileName="Growth Report"
          idKey="sno"
          loading={loading}
        />
      </div>

      <ToastContainer />
    </div>
  );
};

export default Growth_Reports;
