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
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createRider,
  deleteRider,
  fetchRiderById,
  fetchRiders,
  updateRider,
} from "../../store/Actions/RiderAction";
import Loading from "../Loading";
import ReusableTable from "../TableActions/ReusableTable";

const Rider = () => {
  const [openModal, setOpenModal] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [editFormErrors, setEditFormErrors] = useState({});
  const dispatch = useDispatch();
  const {
    riders,
    createError,
    editError,
    editSuccess,
    rider,
    loading,
    success,
    error,
  } = useSelector((state) => state.riders);
  const [formState, setFormState] = useState({
    rider_name: "",
    rider_type: "",
    remuneration_first: "",
    weightage_for_first: "",
    remuneration_second: "",
    weightage_for_second: "",
    remuneration_third: "",
    weightage_for_third: "",
    remuneration_fourth: "",
    weightage_for_fourth: "",
    remuneration_fifth: "",
    weightage_for_fifth: "",
  });

  // Fetch all riders on component mount
  useEffect(() => {
    dispatch(fetchRiders());
  }, [dispatch]);
  useEffect(() => {
    if (rider) {
      // Log the rider data and open the modal after the data is fetched
      console.log("Fetched Rider Data:", rider);
      setFormState({
        rider_name: rider.rider_name,
        rider_type: rider.rider_type,
        remuneration_first: rider.remuneration_first,
        weightage_for_first: rider.weightage_for_first,
        remuneration_second: rider.remuneration_second,
        weightage_for_second: rider.weightage_for_second,
        remuneration_third: rider.remuneration_third,
        weightage_for_third: rider.weightage_for_third,
        remuneration_fourth: rider.remuneration_fourth,
        weightage_for_fourth: rider.weightage_for_fourth,
        remuneration_fifth: rider.remuneration_fifth,
        weightage_for_fifth: rider.weightage_for_fifth,
      });
      setOpenModal(true);
    }
  }, [rider]);

  const handleCreateRider = (formData) => {
    dispatch(createRider(formData));
    setOpenModal(false);
    console.log("Creating new rider");
  };

  const handleUpdateRider = (formData) => {
    dispatch(updateRider(rider.id, formData));
  };

  useEffect(() => {
    if (editError) {
      setEditFormErrors(editError.message || {});
      setFormErrors({});
      toast.error("Please fix the errors and try again.");
    } else if (createError) {
      setFormErrors(createError.message || {});
      setEditFormErrors({});
      toast.error("Please fix the errors and try again.");
    } else if (error) {
      toast.error(error);
    } else if (success) {
      dispatch(fetchRiders());
      toast.success("Rider created successfully!");
      setOpenModal(false);
      setFormState({
        rider_name: "",
        rider_type: "",
        remuneration_first: "",
        weightage_for_first: "",
        remuneration_second: "",
        weightage_for_second: "",
        remuneration_third: "",
        weightage_for_third: "",
        remuneration_fourth: "",
        weightage_for_fourth: "",
        remuneration_fifth: "",
        weightage_for_fifth: "",
      });
    } else if (editSuccess) {
      toast.success("Rider updated successfully!");
      setOpenModal(false);
      setFormState({
        rider_name: "",
        rider_type: "",
        remuneration_first: "",
        weightage_for_first: "",
        remuneration_second: "",
        weightage_for_second: "",
        remuneration_third: "",
        weightage_for_third: "",
        remuneration_fourth: "",
        weightage_for_fourth: "",
        remuneration_fifth: "",
        weightage_for_fifth: "",
      });
      dispatch(fetchRiders());
    }
  }, [createError, editError, editSuccess, success, dispatch]);
  const handleEditBranch = (branchId) => {
    dispatch(fetchRiderById(branchId));
    console.log("Branch ID for Edit:", branchId);
    console.log("Branch ID for Edit:", branchId);
  };
  const addFields = useMemo(
    () => [
      {
        name: "rider_name",
        label: "Rider Name",
        type: "text",
        placeholder: "Enter rider name",
      },
      {
        name: "rider_type",
        label: "Rider Type",
        type: "select",
        options: [
          { value: "health_sickness", label: "Health + Sickness" },
          { value: "accident_disability", label: "Accident + Disability" },
          { value: "term", label: "Term" },
          { value: "pwb", label: "PWB" },
        ],
        placeholder: "Select a Type",
        storeLabel: true
      },
      {
        name: "remuneration_first",
        label: "First Remuneration",
        type: "text",
        placeholder: "Enter first remuneration",
      },
      {
        name: "weightage_for_first",
        label: "Weightage for First",
        type: "text",
        placeholder: "Enter weightage for first remuneration",
      },
      {
        name: "remuneration_second",
        label: "Second Remuneration",
        type: "text",
        placeholder: "Enter second remuneration",
      },
      {
        name: "weightage_for_second",
        label: "Weightage for Second",
        type: "text",
        placeholder: "Enter weightage for second remuneration",
      },
      {
        name: "remuneration_third",
        label: "Third Remuneration",
        type: "text",
        placeholder: "Enter third remuneration",
      },
      {
        name: "weightage_for_third",
        label: "Weightage for Third",
        type: "text",
        placeholder: "Enter weightage for third remuneration",
      },
      {
        name: "remuneration_fourth",
        label: "Fourth Remuneration",
        type: "text",
        placeholder: "Enter fourth remuneration",
      },
      {
        name: "weightage_for_fourth",
        label: "Weightage for Fourth",
        type: "text",
        placeholder: "Enter weightage for fourth remuneration",
      },
      {
        name: "remuneration_fifth",
        label: "Fifth Remuneration",
        type: "text",
        placeholder: "Enter fifth remuneration",
      },
      {
        name: "weightage_for_fifth",
        label: "Weightage for Fifth",
        type: "text",
        placeholder: "Enter weightage for fifth remuneration",
      },
    ],
    []
  );

  const columnKeys = [
    { key: "sno", label: "S NO" },
    { key: "rider_name", label: "Rider Name" },
    { key: "rider_type", label: "Rider Type" },
    { key: "remuneration_first", label: "First Remuneration" },
    { key: "remuneration_second", label: "Second Remuneration" },
    { key: "remuneration_third", label: "Third Remuneration" },
    { key: "remuneration_fourth", label: "Fourth Remuneration" },
    { key: "remuneration_fifth", label: "Fifth Remuneration" },
    {
      key: "actions",
      label: "Actions",
      actions: ["delete", "edit"],
    },
  ];

  let activeToastId = null; // Store the currently active toast ID
  
    const handleDelete = (riderID) => {
      if (activeToastId) {
        toast.dismiss(activeToastId);
      }
  
      activeToastId = toast(
        ({ closeToast }) => (
          <div className="flex flex-col items-center gap-4">
            <p>Are you sure you want to delete this branch?</p>
            <div className="flex gap-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  dispatch(deleteRider(riderID));
                  toast.dismiss(activeToastId);
                  toast.success("Rider deleted successfully!");
                  activeToastId = null;
                }}
              >
                OK
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  toast.dismiss(activeToastId);
                  activeToastId = null;
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        ),
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
        <Typography
          variant="h4"
          className=" font-semibold text-[24px]"
          color="blue-gray"
        >
          Add Rider
        </Typography>

        <FormDynamic
          fields={addFields}
          onSubmit={handleCreateRider}
          
          //   onChange={(name, selected) => handleFieldChange(name, selected)}
          errors={formErrors}
          success={success}

        />
      </Card>

      <ReusableTable
        tableHeaders={columnKeys.map((col) => col.label)}
        tableData={riders}
        handleDelete={handleDelete}
        columnKeys={columnKeys}
        fileName="Rider"
        idKey="id"
        handleEditBranch={handleEditBranch}
        loading={loading}
      />

      <Dialog size="lg" open={openModal} handler={() => setOpenModal(false)}>
        <DialogHeader className="pb-0">Edit Rider</DialogHeader>
        <DialogBody className="pt-0">
          <FormDynamic
            fields={addFields}
            onSubmit={handleUpdateRider}
            // onChange={(name, selected) => handleFieldChange(name, selected)}
            initialValues={formState}
            errors={editFormErrors}
            isEditMode={true}
          />
        </DialogBody>
      </Dialog>

      <ToastContainer />
    </div>
  );
};

export default Rider;
