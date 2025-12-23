import React, { useEffect, useMemo, useState } from "react";
import { Card, Dialog, DialogBody, DialogHeader, Typography } from "@material-tailwind/react";
import FormDynamic from "../TableActions/FormDynamic";
import ReusableTable from "../TableActions/ReusableTable";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  createInventory,
  deleteInventory,
  fetchInventories,
  fetchInventoryById,
  updateInventory,
} from "../../store/Actions/InventoryAction";

const Inventory = () => {
  const [openModal, setOpenModal] = useState(false);
  const [inventoryToEdit, setInventoryToEdit] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [editFormErrors, setEditFormErrors] = useState({});
  const [resetAfterSubmit, setResetAfterSubmit] = useState(false);

  const dispatch = useDispatch();
  const {
    inventory,
    inventories,
    loading,
    success,
    error,
    createError,
    editError,
    editSuccess,
  } = useSelector((state) => state.inventory);

  const [formState, setFormState] = useState({
    inventory_name: "",
    inventory_category: "",
    inventory_description: "",
    inventory_code: "",
    inventory_type: "",
    unit_of_measure: "",
    manufacturer: "",
    inventory_Name_add_by: "",
  });

  const handleCreateInventory = (formData) => {
    dispatch(createInventory(formData));
    dispatch(fetchInventories());
    
    setOpenModal(false);
  };




  const handleUpdateInventory = (formData) => {
    console.log("Form Data to Update:", formData);
    if (inventoryToEdit) {
      console.log("Inventory ID to Edit:", inventoryToEdit.id);
      dispatch(updateInventory(inventoryToEdit.id, formData))
        .then((response) => {
          console.log("Update Response:", response);
        })
        .catch((error) => {
          console.error("Update Error:", error);
        });
    }
  };
  

  const handleEditInventory = (inventoryId) => {
    console.log("Editing Inventory ID:", inventoryId); // Log the ID
    setInventoryToEdit({ id: inventoryId }); // Set the ID to edit
    dispatch(fetchInventoryById(inventoryId));
  };
  useEffect(() => {
    dispatch(fetchInventories());
  }, [dispatch]);



  

  useEffect(() => {
    if (editError) {
      setEditFormErrors(editError.message || {});
      setFormErrors({});
      toast.error("Please fix the errors and try again.");
    } else if (createError) {
      setFormErrors(createError.message || {});
      if (formErrors) setOpenModal(false);
      setEditFormErrors({});
      toast.error("Please fix the errors and try again.");
    } else if (error) {
      toast.error(error);
    } else if (success || editSuccess) {
      toast.success("Inventory created/updated successfully!");
      setOpenModal(false);
      dispatch(fetchInventories());
      
      setEditFormErrors({});
      setFormErrors({});
      dispatch(fetchInventories());
    }
  }, [createError, editError, editSuccess, success, inventoryToEdit, dispatch]);

  useEffect(() => {
    if (inventory) {
      setFormState({
        inventory_name: inventory.inventory_name,
        inventory_category: inventory.inventory_category,
        inventory_description: inventory.inventory_description,
        inventory_code: inventory.inventory_code,
        inventory_type: inventory.inventory_type,
        unit_of_measure: inventory.unit_of_measure,
        manufacturer: inventory.manufacturer,
        inventory_Name_add_by: inventory.inventory_Name_add_by,
      });
      setOpenModal(true);
    }
  }, [inventory]);

  const types = [
    { id: 1, type: "Raw Material" },
    { id: 2, type: "General Inventory" },
  ]; 


  const inventoryFields = useMemo(
    () => [
      { name: "inventory_name", label: "Inventory Name", type: "text", placeholder: "Enter Inventory Name", required: true },
      { name: "inventory_category", label: "Category", type: "text", placeholder: "Enter Category" },
      { name: "inventory_description", label: "Description", type: "textarea", placeholder: "Enter Description" },
      { name: "inventory_code", label: "Inventory Code", type: "text", placeholder: "Enter Code" },
      // { name: "inventory_type", label: "Inventory Type", type: "text", placeholder: "Enter Type" },
      {
        name: "inventory_type",
        label: "Inventory Type",
        type: "select",
        // options: ["Raw Material", "Finished Goods", "Packaging", "Tools"],
        required: true,
        options: types.map((tp) => ({
          value: tp.id,
          label: tp.type,
        })),
        placeholder: "Select a Type",
        // required: true,
        storeLabel: true,

      },
      { name: "unit_of_measure", label: "Unit of Measure", type: "text", placeholder: "Enter Unit (e.g., kg, piece)" },
      { name: "manufacturer", label: "Manufacturer", type: "text", placeholder: "Enter Manufacturer Name" },
      { name: "inventory_Name_add_by", label: "Added By (Employee ID)", type: "number", placeholder: "Enter Employee ID", required: true },
    ],
    []
  );

  const columnKeys = [
    { key: "sno", label: "S NO" },
    { key: "inventory_name", label: "Name" },
    { key: "inventory_category", label: "Category" },
    { key: "inventory_description", label: "Description" },
    { key: "inventory_code", label: "Code" },
    { key: "inventory_type", label: "Type" },
    { key: "unit_of_measure", label: "Unit" },
    { key: "manufacturer", label: "Manufacturer" },
    { key: "actions", label: "Actions", actions: ["delete", "edit"] },
  ];

  const handleDelete = (inventoryId) => {
    const toastId = toast(
      <div className="flex flex-col items-center gap-4">
        <p>Are you sure you want to delete this inventory?</p>
        <div className="flex gap-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => {
              dispatch(deleteInventory(inventoryId));
              toast.dismiss(toastId);
              toast.success("Inventory deleted successfully!");
            }}
          >
            OK
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={() => toast.dismiss(toastId)}
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
        <Typography variant="h4" color="blue-gray">
          Add Inventory
        </Typography>
        <FormDynamic
          fields={inventoryFields}
          onSubmit={handleCreateInventory}
          resetAfterSubmit={resetAfterSubmit}
          errors={formErrors}
          success={success}
        />
      </Card>
      <ReusableTable
        tableHeaders={columnKeys.map((col) => col.label)}
        tableData={inventories}
        handleDelete={handleDelete}
        columnKeys={columnKeys}
        fileName="Inventories"
        idKey="id"
        handleEditBranch={handleEditInventory}
        loading={loading}
      />
      <Dialog size="lg" open={openModal} handler={() => setOpenModal(false)}>
        <DialogHeader className="pb-0">Edit Inventory</DialogHeader>
        <ToastContainer containerId="modal-toast" position="top-right" autoClose={3000} />
        <DialogBody className="pt-0">
          <FormDynamic
            fields={inventoryFields}
            onSubmit={handleUpdateInventory}
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

export default Inventory;
