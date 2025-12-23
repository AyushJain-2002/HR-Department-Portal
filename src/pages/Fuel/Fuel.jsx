import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Card from "@material-tailwind/react/components/Card";
import Typography from "@material-tailwind/react/components/Typography";

import TableLayout from "../TableActions/TableLayout";
import DynamicForm from "../Tables/DynamicForm";

import Button from "../../components/ui/button/Button"; // custom button

import {
  addFuels,
  deleteFuels,
  fetchFuels,
} from "../../store/Actions/FuelAction";

const Fuel = () => {
  const dispatch = useDispatch();
  const { fuels, success, loading, error } = useSelector(
    (state) => state.fuels
  );
  // const [searchQuery, setSearchQuery] = useState("");
  const [deletingFuelId, setDeletingFuelId] = useState(null);

  const fuelFormConfig = {
    stepFields: [
      {
        title: "Add Fuel",
        className: "grid grid-cols-2 w-1/2",
        fields: [
          {
            name: "fuelName",
            label: "Fuel Name",
            type: "text",
            placeholder: "Diesel, Petrol etc.",
            required: true,
            className: "w-1/2"
          },
        ],
      },
    ],
  };

  const handleAddFuel = (data) => {
    dispatch(addFuels(data.fuelName));
  };

  const handleDelete = (fuelId) => {
    if (deletingFuelId) return; // Prevent multiple clicks

    setDeletingFuelId(fuelId);

    const toastId = toast(
      <div className="flex flex-col items-center gap-4">
        <p className="text-center">Are you sure you want to delete this fuel?</p>

        <div className="flex gap-4">
          <Button
            size="sm"
            variant="primary"
            onClick={() => {
              dispatch(deleteFuels(fuelId))
                .then(() => {
                  toast.success("Fuel deleted successfully!");
                  setDeletingFuelId(null);
                })
                .catch(() => {
                  toast.error("Failed to delete fuel!");
                  setDeletingFuelId(null);
                });
              toast.dismiss(toastId);
            }}
            disabled={deletingFuelId === fuelId}
            className="bg-red-600 hover:bg-red-700"
          >
            {deletingFuelId === fuelId ? "Deleting..." : "Delete"}
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              toast.dismiss(toastId);
              setDeletingFuelId(null);
            }}
          >
            Cancel
          </Button>
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

  useEffect(() => {
    dispatch(fetchFuels());
  }, [dispatch]);

  useEffect(() => {
    if (error) toast.error(error);
    if (success) {
      toast.success("Fuel created successfully!");
      dispatch(fetchFuels());
    }
  }, [error, success, dispatch]);

  // Table columns configuration
  const tableColumns = [
    { 
      key: "sno", 
      label: "S NO" 
    },
    { 
      key: "fuel_name", 
      label: "Fuel Name" 
    },
    { 
      key: "actions", 
      label: "Actions",
      render: (row) => (
        <div className="flex justify-center">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleDelete(row.id)}
            disabled={deletingFuelId === row.id}
            className="text-red-600 border-red-600 hover:bg-red-50 dark:text-red-400 dark:border-red-400 dark:hover:bg-red-900/20 transition-colors duration-200"
          >
            {deletingFuelId === row.id ? "Deleting..." : "Delete"}
          </Button>
        </div>
      )
    },
  ];


  // Prepare table data
  const tableData = fuels?.map((fuel, index) => ({
    sno: index + 1,
    fuel_name: fuel?.fuel_name,
    id: fuel?.id,
  })) || [];

  //  const filteredData = useMemo(() => {
  //   if (!searchQuery) return tableData;
  
  //   const lower = searchQuery.toLowerCase();
  
  //   return tableData.filter((item) =>
  //     Object.values(item).some((value) =>
  //       String(value).toLowerCase().includes(lower)
  //     )
  //   );
  // }, [tableData, searchQuery]);
  return (
    <div className="md:py-8 py-3">
      <Card className="w-full border p-5" color="transparent">
        
        
        <DynamicForm
          config={fuelFormConfig}
          onSubmit={handleAddFuel}
          containsButton={true}
          resetAfterSubmit={success}
          submitButton={(submit) => (
            <div className="flex flex-col md:flex-row gap-4 w-full ">
              <Button 
                size="md" 
                variant="primary" 
                onClick={submit}
                className="w-full md:w-auto"
              >
                Create Fuel
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                type="button"
                onClick={() => {
                  // Reset form logic can be added here
                  toast.info("Form reset");
                }}
                className="w-full md:w-auto"
              >
                Reset
              </Button>
            </div>
          )}
        />       
      </Card>

      <div className="mt-8">
        <TableLayout
          columns={tableColumns}
          filteredData={tableData}
          enableSearch={true}
          enableExcel={true}
          loading={loading}
          // onChange={setSearchQuery}
          // searchQuery={searchQuery}

        />
      </div>

      <ToastContainer 
        className="mt-16"
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

export default Fuel;




// import {
//   Button,
//   ButtonGroup,
//   Card,
//   Typography,
// } from "@material-tailwind/react";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css"; 
// // import ReusableTable from "../TableActions/ReusableTable";
// import TableLayout from "../TableActions/TableLayout";
// import Input from "../../components/form/input/InputField";
// import DynamicForm from "../Tables/DynamicForm";
// import { addFuels, deleteFuels, fetchFuels } from "../../store/Actions/FuelAction";

// const Fuel = () => {
//   const dispatch = useDispatch();
//   const [fuelName, setFuelName] = useState(""); // Manage zone name input
//   const { fuels, success, loading, error } = useSelector(
//     (state) => state.fuels
//   ); // Get zones data from store

//   const handleAddFuel = (e) => {
//     e.preventDefault();
//     dispatch(addFuels(fuelName)); // Dispatch add zone action
//   };
//   const resetClick = (e) => {
//     setFuelName(""); // Clear state dropdown after submission
//   };
//   useEffect(() => {
//     dispatch(fetchFuels()); // Fetch zones on component mount
//   }, [dispatch]);

//   const handleDelete = (depID) => {
//     const toastId = toast(
//       <div className="flex flex-col items-center gap-4">
//         <p>Are you sure you want to delete this Department?</p>
//         <div className="flex gap-4">
//           <button
//             className="bg-red-500 text-white px-4 py-2 rounded"
//             onClick={() => {
//               dispatch(deleteFuels(depID)); // Proceed with the delete action
//               toast.dismiss(toastId); // Dismiss the confirmation toast
//               toast.success("Fuel data deleted successfully!"); // Show success toast
//             }}
//           >
//             OK
//           </button>
//           <button
//             className="bg-gray-500 text-white px-4 py-2 rounded"
//             onClick={() => toast.dismiss(toastId)} // Dismiss the confirmation toast without doing anything
//           >
//             Cancel
//           </button>
//         </div>
//       </div>,
//       {
//         position: "top-right",
//         autoClose: false, // Keep the toast open until dismissed
//         closeButton: false, // Disable the close button
//         draggable: false,
//       }
//     );
//   };
//   const columnKeys = [
//     { key: "sno", label: "S NO" },
//     { key: "fuel_name", label: "Fuel Name" },
//     { key: "actions", label: "Actions", actions: ["delete"] }, // This column will have actions like delete and edit
//   ];
//   useEffect(() => {
//     if (error) {
//       toast.error(error); // Show error toast
//     }

//     if (success) {
//       toast.success("Fuel created successfully!"); // Show success toast
//       setFuelName("");
//       dispatch(fetchFuels());
//     }
//   }, [error, success, dispatch]);
//   return (
//     <div className="md:py-8 py-3">
//       <Card className=" w-full   border p-5 " color="transparent">
//         <Typography variant="h4" color="blue-gray">
//           Add Fuel
//         </Typography>

//         <form
//           onSubmit={handleAddFuel}
//           className="mt-8 mb-2 w-full flex-col md:flex-row flex gap-4 max-w-full"
//         >
//           <div className="mb-1 flex gap-6">
//             <div className="flex flex-col w-96 gap-4">
//               <Typography variant="h6" color="blue-gray" className="-mb-3">
//                 Fuel
//               </Typography>
//      <Input
//         size="lg"
//         type="text"
//         value={fuelName}
//         required
//         onChange={(e) => {
//           const value = e.target.value;
//           setFuelName(value.charAt(0).toUpperCase() + value.slice(1));
//         }}
//         placeholder="Diesel, Petrol etc."
//         className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2"
//       />

//             </div>
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <Button
//               type="submit"
//               className="px-2 md:px-4 mt-7 py-2 hover:bg-blue-500 bg-blue-800 lg:text-base"
//               fullWidth
//             >
//               Create Fuel
//             </Button>
//             <Button
//               onClick={resetClick}
//               className="px-2 md:px-4 mt-7 py-2 hover:bg-gray-700 lg:text-base"
//               fullWidth
//             >
//               Reset
//             </Button>
//           </div>
//         </form>
//       </Card>


//     <TableLayout
//         columns={[
//           { key: "sno", label: "S NO" },
//           { key: "fuel_name", label: "Fuel Name" },
//           { key: "actions", label: "Actions" },
//         ]}
//         data={fuels?.map((fuel, index) => ({
//           sno: index + 1,
//           fuel_name: fuel?.fuel_name,
//           id: fuel?.fuel_id, 
//         }))}

//         handleDelete={(row) => handleDelete(row)} 
//         enableSearch
//         enableExcel
//       />

//    <ToastContainer />
//     </div>
//   );
// };

// export default Fuel;
