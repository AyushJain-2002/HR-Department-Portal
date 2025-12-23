import {
  Button,
  Card,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import { toast, ToastContainer } from "react-toastify";
import FormDynamic from "../TableActions/FormDynamic";
// import {
//   fetchCities,fetchCitiesByState,fetchStates,
// } from "../../store/Actions/StateAction";
import { useEffect, useMemo, useState } from "react";
// import { use, useSelector } from "react-redux";
// import {
//   createBranch,
//   createBranchManager,
//   deleteBranch,
//   deleteBranchManager,
//   fetchBranchById,
//   fetchBranches,
//   fetchBranchManagerById,
//   fetchBranchManagers,
//   updateBranch,
//   updateBranchManager,
// } from "../../store/Actions/BranchAction";
// import { fetchRegions, fetchZones } from "../../store/Actions/ZoneAction";
import Loading from "../Loading";
import ReusableTable from "../TableActions/ReusableTable";
// import {
//   fetchDepartments,
//   fetchDesignation,
// } from "../../store/Actions/Department_Designation_Action";
import { useParams } from "react-router-dom";
import { useDepartment,useBranch,useStateData } from "../../hooks/hookIndex";

const BranchManager = () => {
  const [openModal, setOpenModal] = useState(false);
  const { id } = useParams();
  const [formErrors, setFormErrors] = useState({});
  const [editFormErrors, setEditFormErrors] = useState({});
  const [branchToEdit, setBranchToEdit] = useState(null);
  const { createBranch,createBranchManager,deleteBranch,deleteBranchManager,fetchBranchById,fetchBranches,
    fetchBranchManagerById,fetchBranchManagers,updateBranch,updateBranchManager,branch,editSuccess,branchManager,
    loading,success,error,createBranchManagerError,editBranchManagerError,}=useBranch()
  // const {
  //   branch,
  //   editSuccess,
  //   branchManager,
  //   loading,
  //   success,
  //   error,
  //   createBranchManagerError,
  //   editBranchManagerError,
  // } = useSelector((state) => state.branches);
  // const { departments, designations } = useSelector(
  //   (state) => state.departments
  // );
  const {departments,designations,  fetchDepartments,fetchDesignation,}=useDepartment()
  const {  fetchCities,fetchCitiesByState,fetchStates}=useStateData();
  // Set default values for states and cities
  const [formState, setFormState] = useState({
    title: "",
    branch_manager_name: "",
    designation: "",
    department: "",
    email: "",
    mobile_number: "",
    branch_id: "",
  });

  // Fetch all states on component mount
  useEffect(() => {
    (fetchBranchById(id));
    (fetchDepartments());
    (fetchDesignation());
  }, [, id]);

  // Handle state and city changes
  const handleFieldChange = (name, selected) => {
    // console.log(selected);
    if (name === "state") {
      setFormState((prev) => ({
        ...prev,
        [name]: selected.label, // Set the selected state
        city: "", // Reset city field when state changes
      }));

      // Optionally, you can fetch the cities again for the selected state
      (fetchCitiesByState(selected.value));
    } else {
      setFormState((prev) => ({
        ...prev,
        [name]: selected.label,
      }));
    }
  };
  const handleEditBranch = (branchId) => {
    (fetchBranchManagerById(branchId));
    // console.log("Branch ID for Edit:", branchId);
  };
  useEffect(() => {
    if (branchManager) {
      // Log the branchManager data and open the modal after the data is fetched
      // console.log("Fetched branchManager Data:", branchManager
      setFormState({
        branch_manager_name: branchManager.branch_manager_name,
        title: branchManager.title,
        designation: branchManager.designation,
        department: branchManager.department,
        email: branchManager.email,
        mobile_number: branchManager.mobile_number,
        branch_id: branchManager.branch_id || "", // Assuming comment can be null
      });
      setOpenModal(true);
    }
  }, [branchManager]); // This hook runs whenever the `branch` data is updated
  //   // This effect runs when `branch` changes
  const titles = [
    { id: 1, title: "Mr." },
    { id: 2, title: "Mrs." },
    { id: 3, title: "Miss." },
  ];
  const addFields = useMemo(
    () => [
      {
        name: "title",
        label: "Title",
        type: "select",
        options: titles.map((tit) => ({
          value: tit.id,
          label: tit.title,
        })),
        placeholder: "Select a Title",
        storeLabel: true,
      },
      {
        name: "branch_manager_name",
        label: "Branch Manager Name",
        type: "text",
        placeholder: "Enter branch name",
      },
      {
        name: "department",
        label: "Department",
        type: "select",
        options:
          departments?.map((dep) => ({
            value: dep.id,
            label: dep.department_name,
          })) || [],
        placeholder: "Select Department",
        storeLabel: true,
      },
      {
        name: "designation",
        label: "Designation",
        type: "select",
        options:
          designations?.map((des) => ({
            value: des.id,
            label: des.designation_name,
          })) || [],
        placeholder: "Select Designation",
        storeLabel: true,
      },
      {
        name: "email",
        label: "E-mail",
        type: "text",
        placeholder: "Enter Email ID",
      },
      {
        name: "mobile_number",
        label: "Mobile Number",
        type: "text",
        placeholder: "Enter mobile number",
      },
    ],
    [departments, titles, designations]
  );
  const handleCreateBranch = (formData) => {
    const dataToSubmit = {
      ...formData,
      branch_id: id, // Automatically set branch_id from useParams
    };
    (createBranchManager(dataToSubmit));
    setOpenModal(false);
    // console.log("for create");
  };

  const handleUpdateBranch = (formData) => {
      const dataToSubmit = {
        ...formData,
        branch_id: id, // Automatically set branch_id from useParams
      };
      (updateBranchManager(branchManager.id, dataToSubmit));
  };

  useEffect(() => {
    if (editBranchManagerError) {
      setEditFormErrors(editBranchManagerError.message || {});
      setFormErrors({}); 
      toast.error("Please fix the errors and try again.");
    } else if (createBranchManagerError) {
      setFormErrors(createBranchManagerError.message || {});
      if (formErrors) setOpenModal(false);
      setBranchToEdit(null);
      setEditFormErrors({});
      toast.error("Please fix the errors for and try again.");
    } else if (error) {
      toast.error(error);
    } else if (success || editSuccess) {
      toast.success("Branch Manager created/updated successfully!");
      setOpenModal(false);
      setFormState({
        title: "",
        branch_manager_name: "",
        designation: "",
        department: "",
        email: "",
        mobile_number: "",
        branch_id: "",
      });
      setFormErrors({});
      (fetchBranchById(id)); // Call this after successful creation or edit
    }
  }, [createBranchManagerError, editBranchManagerError,error,id, editSuccess, success, ]);

  const columnKeys = [
    { key: "sno", label: "S NO" },
    { key: "branch_manager_name", label: "Branch Manager Name" },
    { key: "mobile_number", label: "Branch Name" },
    { key: "email", label: "E-mail" },
    { key: "department", label: "Department" },
    { key: "designation", label: "Designation" },
    // { key: "branch_name", label: "City Name" },
    { key: "actions", label: "Actions", actions: ["delete", "edit"] },
  ];
  const handleDelete = (branchID) => {
    const toastId = toast(
      <div className="flex flex-col items-center gap-4">
        <p>Are you sure you want to delete this city?</p>
        <div className="flex gap-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => {
              (deleteBranchManager(branchID)); // Delete city action
              toast.dismiss(toastId); // Dismiss toast
              (fetchBranchById(id));
              toast.success("Branch Manager deleted successfully!");
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
    <div className="md:py-8 py-3">
      <Card className="w-full border p-5" color="transparent">
        <Typography variant="h4" className="font-gdsherpa" color="blue-gray">
          Add Branch Manager
        </Typography>

        <FormDynamic
          fields={addFields}
          onSubmit={handleCreateBranch}
          onChange={handleFieldChange}
          storeLabel={true}
          errors={formErrors}
          success={success}
        />
      </Card>
   
        <ReusableTable
          tableData={branch?.branch_managers || []}
          handleDelete={handleDelete}
          columnKeys={columnKeys}
          fileName="Branch"
          idKey="id"
          loading={loading}
          titlename="branch_manager_name"
          handleEditBranch={handleEditBranch}
        />
      <Dialog
        size="lg"
        open={openModal}
        handler={() => {
          setOpenModal(false);
          setEditFormErrors({}); // Reset branchToEdit to null when modal is closed
        }}
      >
        <DialogHeader className="pb-0">Edit Branch</DialogHeader>
        <DialogBody className="pt-0">
          <FormDynamic
            fields={addFields}
            onSubmit={handleUpdateBranch}
            onChange={handleFieldChange}
            storeLabel={true}
            idKey="id"
            initialValues={formState}
            isEditMode={true}
            errors={editFormErrors}
          />
        </DialogBody>
      </Dialog>

      <ToastContainer />
    </div>
  );
};

export default BranchManager;
