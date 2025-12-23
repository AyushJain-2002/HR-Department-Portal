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

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../Loading";
import ReusableTable from "../TableActions/ReusableTable";
import {
  fetchDepartments,
  fetchDesignation,
} from "../../store/Actions/Department_Designation_Action";
import { useParams } from "react-router-dom";
import {
  createInsurerBranchManager,
  deleteInsurerBranchManager,
  fetchInsurerBranchById,
  fetchInsurerBranches,
  fetchInsurerBranchManagerByBranchId,
  fetchInsurerBranchManagerById,
  fetchInsurerBranchManagers,
  updateInsurerBranchManager,
} from "../../store/Actions/InsurerBranchAction";
import { fetchInsurerBranchManagerByIdStart } from "../../store/Reducers/InsurerBranchSlice";
const InsurerBranchManager = () => {
  const [openModal, setOpenModal] = useState(false);
  const { id } = useParams();
  const [branchManagerToEdit, setBranchManagerToEdit] = useState(null);
  const dispatch = useDispatch();
  const {
    insurerBranchManager,
    insurerBranchManagers,
    editSuccess,
    loading,
    success,
    error,
    editError,
    createError,
  } = useSelector((state) => state.insuranceCompany);
  const { departments, designations } = useSelector(
    (state) => state.departments
  );

  const [formErrors, setFormErrors] = useState({});
  const [editFormErrors, setEditFormErrors] = useState({});
  // Set default values for states and cities
  const [formState, setFormState] = useState({
    title: "",
    coordinate_person: "",
    designation: "",
    department: "",

    email: "",
    remark: "",
    coordinate_person_number: "",
    is_relationship_manager: "",
    insurer_branch_id: "",
  });
  // Fetch all states on component mount
  useEffect(() => {
     if (!departments || departments.length === 0) dispatch(fetchDepartments());
        if (!designations || designations.length === 0) dispatch(fetchDesignation());
    dispatch(fetchInsurerBranchManagerByBranchId(id));
  }, [dispatch, id]);

  // Handle state and city changes
  const handleFieldChange = (name, selected) => {
    console.log(selected);
  
      setFormState((prev) => ({
        ...prev,
        [name]: selected.label,
      }));
  };
  const [selectedBranchManagerIndex, setSelectedBranchManagerIndex] = useState(null);
  const handleEditBranch = (index) => {
    const selectedBranchManager = insurerBranchManagers?.[index]; // Get the object at the given index
console.log(insurerBranchManagers)
  if (selectedBranchManager) {
    setSelectedBranchManagerIndex(index); // Store the index
    dispatch(fetchInsurerBranchManagerById(id, index)); // Pass branch ID & index
    
  } else {
    console.error("Branch Manager not found at index:", index);
  }
  };
  useEffect(() => {
    if (insurerBranchManager) {
      // Log the insurerBranchManager data and open the modal after the data is fetched
      console.log("Fetched insurerBranchManager Data:", insurerBranchManager);
      setFormState({
        coordinate_person: insurerBranchManager.coordinate_person,
        title: insurerBranchManager.title,
        designation: insurerBranchManager.designation,
        department: insurerBranchManager.department,
        email: insurerBranchManager.email,

        coordinate_person_number: insurerBranchManager.coordinate_person_number,
        is_relationship_manager: insurerBranchManager.is_relationship_manager,
        remark: insurerBranchManager.remark,
        // branch_id: insurerBranchManager.branch_id || "", // Assuming comment can be null
      });

      // Now open the modal after the state has been updated
      setOpenModal(true);
    }
  }, [insurerBranchManager]); // This hook runs whenever the `branch` data is updated
  //   // This effect runs when `branch` changes

  const addFields = useMemo(
    () => [
      {
        name: "title",
        label: "Title",
        type: "select",
        options: [
          { value: 1, label: "Mr." },
          { value: 2, label: "Mrs." },
          { value: 3, label: "Miss" },
        ],
        placeholder: "Select title",
        required: true,
        storeLabel: true,
      },
      {
        name: "coordinate_person",
        label: "Coordinate Person Name",
        type: "text",
        placeholder: "Enter Coordinate name",
      },
      {
        name: "coordinate_person_number",
        label: "Coordinate Person Number",
        type: "text",
        placeholder: "Enter mobile number",
      },
      {
        name: "email",
        label: "E-mail Id",
        type: "text",
        placeholder: "Enter email",
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
        name: "is_relationship_manager",
        label: "Is Relationship Manager",
        type: "select",
        options: [
          { value: 1, label: "True" },
          { value: 0, label: "False" },
        ],
        placeholder: "Select true or false",
        required: true,
        storeLabel: false,
      },
      {
        name: "remark",
        label: "Remarks",
        type: "text",
        placeholder: "Enter remarks",
      },
    ],
    [designations, departments]
  );
  const handleCreateBranch = (formData) => {
    dispatch(createInsurerBranchManager(formData, id));
    setOpenModal(false);
    console.log("for create");
  };

  const handleUpdateBranch = (formData) => {
   
    dispatch(updateInsurerBranchManager(insurerBranchManager.id, formData));
  };

  useEffect(() => {
    if (editError) {
      setEditFormErrors(editError.message || {});
      setFormErrors({}); // Display backend validation errors
      toast.error("Please fix the errors and try again.");
    } else if (createError) {
      setFormErrors(createError.message || {});
      if (formErrors) setOpenModal(false);
      setEditFormErrors({});
      // Handle validation errors
      toast.error("Please fix the errors for and try again.");
    } else if (error) {
      toast.error(error);
    } else if (success || editSuccess) {
      toast.success("Branch Manager created/updated successfully!");
      setOpenModal(false);
      setFormState({
        title: "",
        coordinate_person: "",
        designation: "",
        department: "",
        email: "",
        remark: "",
        coordinate_person_number: "",
        is_relationship_manager: "",
        insurer_branch_id: "",
      });
      setFormErrors({});
      fetchInsurerBranchManagerByBranchId(id);
    }
  }, [createError, editError, editSuccess, success, dispatch, id]);

  const columnKeys = [
    { key: "sno", label: "S NO" },
    { key: "coordinate_person", label: "Coordinate Person Name" },

    { key: "coordinate_person_number", label: "Coordinate Person No" },
    { key: "email", label: "E-mail" },
    { key: "department", label: "Department" },
    { key: "designation", label: "Designation" },
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
              dispatch(deleteInsurerBranchManager(branchID)); // Delete city action
              toast.dismiss(toastId); // Dismiss toast
              toast.success("Branch manager deleted successfully!");
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
          Add Insurer Branch Manager
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
        tableData={insurerBranchManagers || []}
        handleDelete={handleDelete}
        columnKeys={columnKeys}
        fileName="Branch"
        idKey="id"
        titlename="coordinate_person"
        handleEditBranch={(index) => handleEditBranch(index)}
        loading={loading}
      />
      <Dialog
        size="lg"
        open={openModal}
        handler={() => {
          setOpenModal(false); // Close the modal
          dispatch(fetchInsurerBranchManagerByIdStart());
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

export default InsurerBranchManager;
