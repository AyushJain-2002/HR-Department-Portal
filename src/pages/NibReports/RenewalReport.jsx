import { Button, Card, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
// import { use, useSelector } from "react-redux";
// import {
//   fetchStates,createCity,fetchCities,deleteCity,
// } from "../../store/Actions/StateAction";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../Loading";
import FormDynamic from "../TableActions/FormDynamic";
import ReusableTable from "../TableActions/ReusableTable";
import { useStateData } from "../../hooks/hookIndex";

const RenewalReport = () => {
  const [resetAfterSubmit, setResetAfterSubmit] = useState(false);

  // const { states, cities, loading, success, error } = useSelector(
  //   (state) => state.states
  // );
  const {states, cities, loading, success, error,fetchStates,createCity,fetchCities,deleteCity,}=useStateData();

  const handleSubmit = (formData) => {
    (createCity(formData.stateId, formData.cityName));
  };

  useEffect(() => {
    (fetchCities());
    (fetchStates()); // Fetch states and cities on component mount
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("City created successfully!");
      setResetAfterSubmit(true); // Trigger form reset
      (fetchCities()); // Fetch updated list of cities

      setTimeout(() => {
        setResetAfterSubmit(false); // Reset flag after short delay
      }, 100);
    }
  }, [error, success, ]);

  const fields = [
    {
      name: "user",
      label: "User",
      type: "select",
      options: [],
      storeLabel: false,
    },
    {
      name: "reportType",
      label: "Report Type",
      type: "select",
      options: [
        { value: "individual", label: "Individual" },
        { value: "team", label: "Team" },
      ],
    },
    {
      name: "branch",
      label: "Branch",
      type: "select",
      options: [
        { value: "branch1", label: "Branch 1" },
        { value: "branch2", label: "Branch 2" },
      ],
    },
    {
      name: "lob",
      label: "LOB",
      type: "select",
      options: [
        { value: "renewal", label: "Renewal" },
        { value: "non-renewal", label: "Non-Renewal" },
      ],
    },
    {
      name: "productType",
      label: "Product Type",
      type: "select",
      options: [
        { value: "renewal", label: "Renewal" },
        { value: "non-renewal", label: "Non-Renewal" },
      ],
    },
    {
      name: "insurer",
      label: "Insurer",
      type: "select",
      options: [
        { value: "renewal", label: "Renewal" },
        { value: "non-renewal", label: "Non-Renewal" },
      ],
    },
    {
      name: "vehicleType",
      label: "Vehicle Type",
      type: "select",
      options: [
        { value: "renewal", label: "Renewal" },
        { value: "non-renewal", label: "Non-Renewal" },
      ],
    },
    {
      name: "level1",
      label: "Level 1",
      type: "select",
      options: [
        { value: "renewal", label: "Renewal" },
        { value: "non-renewal", label: "Non-Renewal" },
      ],
    },
    {
      name: "level2",
      label: "Level 2",
      type: "select",
      options: [
        { value: "renewal", label: "Renewal" },
        { value: "non-renewal", label: "Non-Renewal" },
      ],
    },
  ];

  const columnKeys = [
    { key: "customerName", label: "Customer Name" },
    { key: "insurerName", label: "Insurer Name" },
    { key: "lob", label: "LOB" },
    { key: "vehicleClassification", label: "Vehicle Classification" },
    { key: "vehicleNo", label: "Vehicle No." },
    { key: "policyNo", label: "Policy No." },
    { key: "policyStartDT", label: "Policy Start DT." },
    { key: "policyExpiryDT", label: "Policy Expiry (Due) DT." },
    { key: "referenceName", label: "Reference Name" },
  ];

  let activeToastId = null; // Store the currently active toast ID

  const handleDelete = (cityID) => {
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
                (deleteCity(cityID));
                toast.dismiss(activeToastId);
                toast.success("City deleted successfully!");
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
        {/* <Typography variant="h4" color="blue-gray" className="font-pt_serif">
          Add City
        </Typography> */}

        <FormDynamic
          key={resetAfterSubmit} // Force re-render on reset
          fields={fields}
          onSubmit={handleSubmit}
          resetAfterSubmit={resetAfterSubmit}
        />
      </Card>
      <ReusableTable
        tableHeaders={columnKeys.map((col) => col.label)}
        tableData={cities}
        handleDelete={handleDelete}
        columnKeys={columnKeys}
        fileName="Cities"
        idKey="city_id"
        loading={loading}
      />
      <ToastContainer />
    </div>
  );
};

export default RenewalReport;





// success responmsne 
// {
//   "message": "Customer created successfully",
//   "customer": {
//       "email": "john.doe.mdjdjotorf@example.comd",
// .................

//   },
//   "file_paths": {
//       "pancard_image": "customer/2025/4/8827079303/Images/pancard_image_1744964566.jpg",
//       "aadhar_front_card": "customer/2025/4/8827079303/Images/aadhar_front_card_1744964566.jpg",
//       "aadhar_back_card": "customer/2025/4/8827079303/Images/aadhar_back_card_1744964566.png"
//   }
// }


