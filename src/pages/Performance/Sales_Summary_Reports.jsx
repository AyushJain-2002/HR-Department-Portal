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
  fetchDefaultSalesSummary,
  fetchSalesSummary,
} from "../../store/Actions/SalesSummaryAction";
import { fetchBranches } from "../../store/Actions/BranchAction";
import FormDynamic from "../TableActions/FormDynamic";
import {
  fetchBqp,
  fetchRelationshipManager,
  fetchPosp,
} from "../../store/Actions/OperationAction";

const Sales_Summary_Reports = () => {
  const dispatch = useDispatch();

  const {
    salessummary = [],
    loading,
    error,
    success,
  } = useSelector((state) => state.salessummary);
  const { branches } = useSelector((state) => state.branches);
  const { bqpList, relationshipManagers, pospTypes } = useSelector(
    (state) => state.operationData
  );

  const [filters, setFilters] = useState({
    datetype: "",
    from: "",
    to: "",
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
    if (!salessummary?.length) dispatch(fetchDefaultSalesSummary());
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
    dispatch(fetchSalesSummary(filters));
  };

  // const handleReset = () => {
  //   const resetFilters = {
  //     datetype: "",
  //     from: "",
  //     to: "",
  //     branch: "",
  //     bqp: "",
  //     relationship_manager: "",
  //     posp: "",
  //   };
  //   setFilters(resetFilters);
  //   dispatch(fetchSalesSummary({}));
  // };

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
        options: [
          { value: "null", label: "All Branches" }, // default option
          ...(branches || []).map((branch) => ({
            value: branch.id,
            label: branch.branch_code,
          })),
        ],
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
    [branches, bqpList, relationshipManagers, pospTypes]
  );

  return (
    <div className="md:py-8 py-3">
      <Card className="w-full border p-5" color="transparent">
        <Typography variant="h4" color="blue-gray" className="mb-4">
          Sales Summary Report Filters
        </Typography>
        <FormDynamic
          fields={filterFields}
          onSubmit={handleSubmit}
          onChange={handleFilterChange}
          //onReset={handleReset}
          initialValues={filters}
        />
      </Card>

      <div className="mt-6">
        <ReusableTable
          tableData={salessummary}
          columnKeys={[
            { key: "sno", label: "S.No" },
            { key: "branch", label: "Branch" },
            { key: "bqpname", label: "BQP Name" },
            { key: "bqpcode", label: "BQP Code" },
            { key: "relationship_manager_name", label: "RM Name" },
            { key: "relationship_manager_code", label: "RM Code" },
            { key: "pospname", label: "Pos Name" },
            { key: "pospcode", label: "Pos Code" },
            { key: "two_wheeler_nop", label: "Two Wh. NOP" }, 
            { key: "two_wheeler_premium", label: "Two Wh. Premium" }, 
            { key: "private_car_nop", label: "PVT Car NOP" },
            { key: "private_car_premium", label: "PVT Car Premium" },
            { key: "commercial_vehicle_nop", label: "Commercial Vehicle NOP" },
            { key: "commercial_vehicle_premium", label: "Commercial Vehicle Premium" },
            { key: "non_motor_nop", label: "Non-Motor NOP" },
            { key: "non_motor_premium", label: "Non-Motor Premium" },
            { key: "health_nop", label: "Health NOP" },
            { key: "health_premium", label: "Health Premium" },
            { key: "life_nop", label: "Life NOP" },
            { key: "life_premium", label: "Life Premium" },
            { key: "total_nop", label: "Total NOP" },
            { key: "total_premium", label: "Total Premium" },
          ]}
          fileName="Sales Summary Report"
          idKey="sno"
          loading={loading}
        />
      </div>

      <ToastContainer />
    </div>
  );
};

export default Sales_Summary_Reports;
