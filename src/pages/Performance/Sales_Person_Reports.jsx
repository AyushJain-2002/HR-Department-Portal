import { Card, Typography } from "@material-tailwind/react";
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReusableTable from "../TableActions/ReusableTable";
import {
  fetchDefaultSalesPerson,
  fetchSalesPerson,
  fetchSalesEmployees,
} from "../../store/Actions/SalesPersonAction";
import { fetchBranches } from "../../store/Actions/BranchAction";
import FormDynamic from "../TableActions/FormDynamic";
import { fetchBqp } from "../../store/Actions/OperationAction";

const Sales_Person_Reports = () => {
  const dispatch = useDispatch();

  const {
    salesperson = [],
    salespersonlist = [],
    loading,
    error,
  } = useSelector((state) => state.salesperson);
  
  const { branches = [] } = useSelector((state) => state.branches);
  const { bqpList = [] } = useSelector((state) => state.operationData);

  const [filters, setFilters] = useState({
    datetype: "entry_date",
    from: "",
    to: "",
    branch: "",
    bqp: "",
  });

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        await Promise.all([
          dispatch(fetchBranches()),
          dispatch(fetchBqp()),
          dispatch(fetchDefaultSalesPerson()),
          dispatch(fetchSalesEmployees()),
        ]);
      } catch (err) {
        toast.error("Failed to load initial data");
      }
    };
    loadInitialData();
  }, [dispatch]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (formData) => {
    if (!formData.from || !formData.to) {
      toast.error("Please select both From and To dates");
      return;
    }
    dispatch(fetchSalesPerson(formData));
  };

  const filterFields = useMemo(() => [
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
      value: filters.datetype,
      onChange: (e) => handleFilterChange("datetype", e.target.value),
    },
    {
      id: "from",
      name: "from",
      label: "From Date",
      type: "date",
      placeholder: "Select From Date",
      required: true,
      value: filters.from,
      onChange: (e) => handleFilterChange("from", e.target.value),
    },
    {
      id: "to",
      name: "to",
      label: "To Date",
      type: "date",
      placeholder: "Select To Date",
      required: true,
      value: filters.to,
      onChange: (e) => handleFilterChange("to", e.target.value),
    },
    {
      id: "branch",
      name: "branch",
      label: "Branch",
      type: "select",
      options: [
        { value: "", label: "All Branches" },
        ...branches.map(branch => ({
          value: branch.id,
          label: branch.branch_code,
        })),
      ],
      placeholder: "Select Branch",
      value: filters.branch,
      onChange: (e) => handleFilterChange("branch", e.target.value),
    },
    {
      id: "sales",
      name: "sales",
      label: "Sales Person",
      type: "select",
      options: [
        { value: "", label: "All Sales Persons" },
        ...salespersonlist.map(sales => ({
          value: sales.id,
          label: `${sales.name} - ${sales.code}`,
        })),
      ],
      placeholder: "Select Sales Person",
      value: filters.bqp,
      onChange: (e) => handleFilterChange("bqp", e.target.value),
    },
  ], [branches, salespersonlist, filters]);

  // Add serial numbers to table data
  const tableDataWithSno = useMemo(() => (
    salesperson.map((item, index) => ({
      ...item,
      sno: index + 1,
    }))
  ), [salesperson]);

  return (
    <div className="md:py-8 py-3">
      <Card className="w-full border p-5" color="transparent">
        <Typography variant="h4" color="blue-gray" className="mb-4">
          Sales Person Report
        </Typography>
        <FormDynamic
          fields={filterFields}
          onSubmit={handleSubmit}
          initialValues={filters}
        />
      </Card>

      <div className="mt-6">
        <ReusableTable
          tableData={tableDataWithSno}
          columnKeys={[
            { key: "sno", label: "S.No" },
            { key: "branch_id", label: "Branch" },
            { key: "employee_name", label: "Name" },
            { key: "employee_code", label: "Code" },
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
          fileName="sales_person_report"
          idKey="sno"
          loading={loading}
        />
      </div>

      <ToastContainer position="bottom-right" autoClose={5000} />
    </div>
  );
};

export default Sales_Person_Reports;