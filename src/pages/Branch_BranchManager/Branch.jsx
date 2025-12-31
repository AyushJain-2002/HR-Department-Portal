import {
  Card,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useMemo, useState } from "react";
import Loading from "../Loading";
import TableLayout from "../TableActions/TableLayout";
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import {addFields,editFields} from "./CreateBranchConfig";
import DynamicForm from "../Tables/DynamicForm";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Button from "../../components/ui/button/Button";
import { useStateData,useDepartment,useBranch,useZones } from "../../hooks/hookIndex";
const Branch = () => {
  const [formErrors, setFormErrors] = useState({});
  const [editModalOpen, setEditModalOpen] = useState(false); // Add separate state for edit modalz
  const [editingBranch, setEditingBranch] = useState(null); // Track which branch is being edited
  const [editFormErrors, setEditFormErrors] = useState({});
  const { fetchStates, states = [], cities = { cities: [] } } =useStateData();
  const {fetchDepartments,fetchDesignation,departments, designations } =useDepartment();
  const {  createBranch,createBranchManager,deleteBranch,fetchBranchById,fetchBranches,updateBranch,
    branches,createError,editError,editSuccess,fetchSuccess,currentBranch,loading,success,error} = useBranch();
  const {zones, region,fetchRegions, fetchZones} =useZones();
  
  const [formData, setFormData] = useState({
    branch_code: "",
    branch_name: "",
    state: "",
    city: "",
    address: "",
    zone: "",
    region: "",
    landline_number: "",
    mobile_number: "",
    gst_number: "",
    broker_pancard_number: "",
  });
  const [managerformData, setmanagerformData] = useState({
    title: "",
    branch_manager_name: "",
    designation: "",
    department: "",
    branch_manager_email: "",
    branch_manager_mobile_number: "",
    branch_id: "",
  });

  // Fetch all states on component mount
  useEffect(() => {
    (fetchBranches());
    (fetchDepartments());
    (fetchDesignation());
    (fetchStates());
    (fetchRegions());
    (fetchZones());
  }, []);
  const titles = [
    { id: 1, title: "Mr." },
    { id: 2, title: "Mrs." },
    { id: 3, title: "Miss." },
  ];
  const handleEditBranch = (branchId) => {
    (fetchBranchById(branchId));
     // Set the editing branch ID4
    setEditingBranch(branchId);
  };
  const handleProfile=(branchId)=>{
    (fetchBranchById(branchId));
  }
  useEffect(() => {
    if (currentBranch) {
      // Log the branch data and open the modal after the data is fetched
      setFormData({
        branch_code: currentBranch.branch_code || "",
        branch_name: currentBranch.branch_name || "",
        broker_pancard_number: currentBranch.broker_pancard_number || "",
        branch_type: currentBranch.branch_type || "",
        state: currentBranch.state || "",
        city: currentBranch.city || "",
        zone: currentBranch.zone || "",
        region: currentBranch.region || "",
        gst_number: currentBranch.gst_number || "",
        address: currentBranch.address || "",
        landline_number: currentBranch.landline_number || "",
        mobile_number: currentBranch.mobile_number || "",
        comment: currentBranch.comment || "",
      });
      setEditModalOpen(true); // Open edit modal instead of the create modal
    }
  }, [currentBranch,fetchSuccess]); 
 const handleSubmit = (formData) => {
    (createBranch(formData));
  };

  // Handle update branch submission
  const handleUpdateBranch = (formData) => {
    if (editingBranch) {
      updateBranch(editingBranch, formData);
    }
  };
  useEffect(() => {
    if (editError) {
      setEditFormErrors(editError.message || {});
      setFormErrors({}); // Display backend validation errors
      toast.error("Please fix the errors and try again.");
    } else if (createError) {
      setFormErrors(createError.message || {});
      // if (formErrors)
      setEditFormErrors({});
      // Handle validation errors
      toast.error("Please fix the errors for and try again.");
    } else if (error) {
      toast.error(error);
    } else if (success) {
      toast.success("Branch created successfully!");
      setFormData({
        branch_code: "",
        branch_name: "",
        state: "",
        city: "",
        address: "",
        zone: "",
        region: "",
        landline_number: "",
        mobile_number: "",
        gst_number: "",
        broker_pancard_number: "",
      });
      setmanagerformData({
        title: "",
        branch_manager_name: "",
        designation: "",
        department: "",
        branch_manager_email: "",
        branch_manager_mobile_number: "",
        branch_id: "",
      });
      setFormErrors({});
      (fetchBranches());
    } else if (editSuccess) {
      toast.success("Branch updated successfully!");
      setEditModalOpen(false); // Close edit modal
      // Reset editing state
      setEditingBranch(null);
      setFormData({
        branch_code: "",
        branch_name: "",
        state: "",
        city: "",
        address: "",
        zone: "",
        region: "",
        landline_number: "",
        mobile_number: "",
        gst_number: "",
        broker_pancard_number: "",
      });
      (fetchBranches());
    }
  }, [createError, editError, editSuccess, success,error ]);

  const columnKeys = [
    { key: "sno", label: "S NO" },
    { key: "branch_code", label: "Branch Code" },
    { key: "branch_name", label: "Branch Name" },
    { key: "mobile_number", label: "Branch Name" },
    { key: "address", label: "Address" },
    { key: "state", label: "States" },
    { key: "city", label: "City Name" },
    { key: "actions", label: "Actions",
          render: (row) => (
            <div className="flex gap-2 justify-center">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleDelete(row.id)}
              >
                {/* {deletingCityId === row.city_id ? "Deleting..." : "Delete"} */}<MdDeleteForever className="text-2xl text-red-800" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleEditBranch(row.id)}
              >
                {/* {deletingCityId === row.city_id ? "Deleting..." : "Delete"} */}<FaRegEdit className="text-2xl text-blue-600" />
              </Button>
            </div>
          )
        },
  ];
  const handleDelete = (branchID) => {
    const toastId = toast(
      <div className="flex flex-col items-center gap-4">
        <p>Are you sure you want to delete this city?</p>
        <div className="flex gap-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => {
              (deleteBranch(branchID)); // Delete city action
              toast.dismiss(toastId); // Dismiss toast
              toast.success("Branch deleted successfully!");
            }}
          >
            OK
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={() => toast.dismiss(toastId)} // Cancel delete
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        position: "top-right",
        autoClose: false,
        closeButton: false,
        draggable: false,
      }
    );
  };
  return (
    <div className="md:py-4 py-3 relative h-fit pb-10 w-full ">
      {loading && <Loading />}
      <div
        className={` ${
          loading ? "backdrop-blur-sm" : ""
        }`}
      >
          <PageBreadcrumb pageTitle="Add Branch"  />
        {/* Logout Button */}
      </div>
      <Card className=" mb-5  p-5 shadow-lg rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ">
        <DynamicForm
          config={addFields(formData)}
          // otherFields={addFieldsManager}
          onSubmit={handleSubmit}
          // onChange={handleChange}
          otherHead="Branch Contact Person"
          errors={formErrors}
          success={success}
          // containsButton={false}
          initialValues={formData}
          resetValue={formData}
        />
        </Card>
      <TableLayout
        tableHeaders={columnKeys.map((col) => col.label)}
        filteredData={branches}
        handleDelete={handleDelete}
        columns={columnKeys}
        fileName="Branch"
        idKey="id"
        enableSearch={true}
        enableExcel={true}
        // handleToggle={handleToggle}
        handleEditBranch={handleEditBranch}
        loading={loading}
      />
       {/* Create Branch Dialog (if you still need it for some reason) */}

        {/* Edit Branch Dialog */}
      <Dialog
        size="lg"
        open={editModalOpen}
        handler={() => {
          setEditModalOpen(false);
          setEditingBranch(null);
          setEditFormErrors({});
        }}
      >
        <DialogHeader className="pb-0">Edit Branch</DialogHeader>
        <DialogBody className="pt-0">
          <DynamicForm
            config={editFields(formData)}
            onSubmit={handleUpdateBranch}
            initialValues={formData}
            isEditMode={true}
            errors={editFormErrors}
            success={success}
            // containsButton={false}
            resetValue={formData}
          />
        </DialogBody>
      </Dialog>
      
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
        theme="light" 
      />
    </div>
  );
};

export default Branch;
