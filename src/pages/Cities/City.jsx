import {  Card, Typography } from "@material-tailwind/react";
import  { useEffect, useMemo, useState } from "react";
// import { use, useSelector } from "react-redux";

// import {
//   fetchStates,
//   createCity,
//   fetchCities,
//   deleteCity,
// } from "../../store/Actions/StateAction";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import FormComponent from "../../components/wizard/FormComponent";
import DynamicForm from "../../pages/Tables/DynamicForm.jsx";
import CityConfig from "./CityConfig";
import TableLayout from "../TableActions/TableLayout.jsx";
import Button from "../../components/ui/button/Button.jsx";
import PageBreadcrumb from "../../components/common/PageBreadCrumb.jsx";
import { useStateData } from "../../hooks/hookIndex.jsx";
const City = () => {
  const [resetAfterSubmit, setResetAfterSubmit] = useState(false);
  // const { states, cities, loading, success, error } = useSelector(
  //   (state) => state.states
  // );
  const {states, cities, loading, success,createSuccess,deleteSuccess, error ,fetchStates,createCity,fetchCities,deleteCity}= useStateData();
  const [formData, setFormData] = useState({
      stateId: "",
      cityName: "",
    });
    const [deletingCityId,setDeletingCityId]=useState(null)
   
  const handleSubmit = (formData) => {
    if (!formData.cityName?.trim()) {
          toast.error("City Name is required!");
          return;
        }
        if (!formData.stateId) {
              toast.error("State Name is required!");
              return;
            }
            console.log("is here")
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
    if (createSuccess) {
          toast.success("City created successfully!");
          setFormData({stateId:"" ,cityName:""});
          (fetchCities());
        
    // if (success) {
    //   toast.success("City created successfully!");
    //   setResetAfterSubmit(true); // Trigger form reset
    //   setFormData({stateId:"" ,cityName:""})
    //   (fetchCities()); // Fetch updated list of cities

      setTimeout(() => {
        setResetAfterSubmit(false); // Reset flag after short delay
      }, 100);
    }
  }, [error,createSuccess]);
  const columnKeys = [
    { key: "sno", label: "S NO" },
    { key: "state", label: "States" },
    { key: "city_name", label: "City Name" },
    { key: "actions", label: "Actions",
      render: (row) => (
        <div className="flex justify-center">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleDelete(row.city_id)}
            disabled={deletingCityId === row.city_id}
            className="text-red-600 border-red-600 hover:bg-red-50 dark:text-red-400 dark:border-red-400 dark:hover:bg-red-900/20 transition-colors duration-200"
          >
            {deletingCityId === row.city_id ? "Deleting..." : "Delete"}
          </Button>
        </div>
      )
    },
  ];
  // let activeToastId = null; // Store the currently active toast ID

  const handleDelete = (cityID) => {
    // if (deletingCityId) return; // Prevent multiple clicks

    // setDeletingCityId(cityID);
    // if (activeToastId) {
    //   toast.dismiss(activeToastId);
    // }

    // activeToastId = 
    toast(
      ({ closeToast }) => (
        <div className="flex flex-col items-center gap-4">
          <p>Are you sure you want to delete this City?</p>
          <div className="flex gap-4">
            <Button
              size="sm"
              variant="primary"
              // disabled={deletingCityId === cityID}
              // className="text-white px-4 py-2 rounded bg-red-600 hover:bg-red-700"
              onClick={() => {
                (deleteCity(cityID))
                .then(() => {
                toast.success("City deleted successfully!");
                fetchCities();
                // toast.dismiss(activeToastId);
                // setDeletingCityId(null);
                // activeToastId = null;
                })
                .catch(() => toast.error("Failed to delete department"));
                              closeToast();
                }}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              OK
            </Button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={closeToast}
              // onClick={() => {
              //   toast.dismiss(activeToastId);
              //   setDeletingCityId(null);
              //   activeToastId = null;
              // }}
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
    <div className="md:py-4 py-3 relative h-fit pb-10 w-full ">
          {/* {loading && <Loading />}
          <div className={`${loading ? "backdrop-blur-sm" : ""}`}> */}
            <PageBreadcrumb
              pageTitle={"Add City"} 
            />
          {/* </div> */}
          
          <Card className="mb-5 px-4 py-3 shadow-lg rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            
        <DynamicForm
          key={resetAfterSubmit} // Force re-render on reset
          config={CityConfig(formData)}
          // fields={fields}
          onSubmit={handleSubmit}
          resetAfterSubmit={resetAfterSubmit}
          containsButton={true}
          initialValues={formData}
        />
      </Card>
      
      <TableLayout
        tableHeaders={columnKeys.map((col) => col.label)}
        filteredData={cities}
        onDelete={handleDelete}
        loading={loading}
        columns={columnKeys}
        enableExcel={true}
        enableSearch={true}
      />
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

export default City;


