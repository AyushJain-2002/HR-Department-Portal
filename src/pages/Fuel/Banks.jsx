import React, { useEffect, useState } from "react";
// import { use, useSelector } from "react-redux";
import { Card, Typography } from "@material-tailwind/react";
import { toast, ToastContainer } from "react-toastify";
import DynamicForm from "../Tables/DynamicForm";
import TableLayout from "../TableActions/TableLayout";
import Button from "../../components/ui/button/Button";
import "react-toastify/dist/ReactToastify.css";
// import { addBanks, deleteBanks, fetchBanks } from "../../store/Actions/FuelAction";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Loading from "../Loading";
import { useFuel } from "../../hooks/hookIndex";
const Banks = () => {
  // const { banks, success, loading, error } = useSelector(
  //   (state) => state.fuels
  // );
  const [formData,setFormData]=useState({bank_name:""});
  const{createBank, deleteBank,banks, success, loading, error, fetchBanks}=useFuel();
  const handleAddBank = (formData) => {
    if (!formData.bank_name?.trim()) {
      toast.error("Bank Name is required!");
      return;
    }
    console.log("is here")
    (createBank(formData.bank_name));
  };

  const handleReset = () => {
    // Reset is handled by DynamicForm's resetAfterSubmit prop
  };

  let activeToastId = null;

  const handleDelete = (bankID) => {
    if (activeToastId) {
      toast.dismiss(activeToastId);
    }

    activeToastId = toast(
      ({ closeToast }) => (
        <div className="flex flex-col items-center gap-4">
          <p>Are you sure you want to delete this bank?</p>
          <div className="flex gap-4">
            <Button
              size="sm"
              variant="primary"
              onClick={() => {
                (deleteBank(bankID));
                toast.dismiss(activeToastId);
                toast.success("Bank deleted successfully!");
                activeToastId = null;
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              OK
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                toast.dismiss(activeToastId);
                activeToastId = null;
              }}
            >
              Cancel
            </Button>
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

  useEffect(() => {
    (fetchBanks());
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Bank Name created successfully!");
      (fetchBanks());
    }
  }, [error, success, ]);

  // DynamicForm configuration
  const formConfig = {
    stepFields: [
      {
        title: "",
        className: "lg:grid lg:grid-cols-[1fr_.5fr_1fr] lg:gap-4 sm:grid-row-1 lg:w-full md:justify-center",
        fields: [
          {
            name: "bank_name",
            label: "Bank Name",
            type: "text",
            placeholder: "Enter Bank Name (e.g., XYZ Bank, etc.)",
            required: true,
            className:"mb-2"
          },
          {
              name:"submit",
              label: "Submit",
              type:"submit",
              className:"md:w-48 mr-2 ml-auto "
            },
            {
              name:"reset",
              label: "Reset",
              type:"reset",
              className:"md:w-48 bg-gray-500 hover:bg-gray-600"
            }
        ]
      }
    ]
  };

  // // Custom submit button for DynamicForm
  // const CustomSubmitButton = (handleSubmit) => (
  //   <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
  //     <Button 
  //       size="md"
  //       variant="primary"
  //       onClick={handleSubmit}
  //       className="w-full md:w-auto"
  //       disabled={loading}
  //     >
  //       {loading ? "Creating..." : "Create Bank"}
  //     </Button>
  //     <Button 
  //       size="md"
  //       variant="outline"
  //       type="button"
  //       onClick={handleReset}
  //       className="w-full md:w-auto"
  //     >
  //       Reset
  //     </Button>
  //   </div>
  // );

  // TableLayout columns configuration
  const tableColumns = [
    { key: "sno", label: "S NO" },
    { key: "bank_name", label: "Bank Name" },
    { 
      key: "actions", 
      label: "Actions",
      render: (row) => (
        <Button
          size="sm"
          variant="outline"
          onClick={() => handleDelete(row.id)}
          className="text-red-600 border-red-600 hover:bg-red-50"
        >
          Delete
        </Button>
      )
    },
  ];

  // Prepare table data with serial numbers
  const tableData = banks.map((bank, index) => ({
    ...bank,
    sno: index + 1,
  }));

  return (
     <div className="md:py-4 py-3 relative h-fit pb-10 w-full ">
      {loading && <Loading />}
      <div
        className={` ${
          loading ? "backdrop-blur-sm" : ""
        }`}
      >
          <PageBreadcrumb pageTitle="Add Banks" />
        {/* Logout Button */}
      </div>
      <Card className=" mb-5  p-5 shadow-lg rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ">

        {/* DynamicForm Integration */}
        <DynamicForm
          config={formConfig}
          onSubmit={handleAddBank}
          resetAfterSubmit={success}
          initialValues={formData}
        />
      </Card>

      {/* TableLayout Integration */}
      <div className="mt-8">
        <TableLayout
          columns={tableColumns}
          filteredData={tableData}
          enableSearch={true}
          enableExcel={true}
          rowsPerPageOptions={[10, 25, 50, 100]}
          defaultRowsPerPage={10}
          loading={loading}
        />
      </div>

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

export default Banks;








// import {
//   Button,
//   ButtonGroup,
//   Card,
//   Typography,
// } from "@material-tailwind/react";
// import React, { useEffect, useState } from "react";
// import { use, useSelector } from "react-redux";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import ReusableTable from "../TableActions/ReusableTable";
// import { addBanks, deleteBanks, fetchBanks } from "../../store/Actions/FuelAction";

// const Banks = () => {
//   const  = use();
//   const [Bank, setBank] = useState(""); // Manage zone name input
//   const { banks, success, loading, error } = useSelector(
//     (state) => state.fuels
//   ); // Get zones data from store

//   const handleAddFuel = (e) => {
//     e.preventDefault();
//     (addBanks(Bank)); //  add zone action
//   };
//   const resetClick = (e) => {
//     setBank(""); // Clear state dropdown after submission
//   };
//   useEffect(() => {
//     (fetchBanks()); // Fetch zones on component mount
//   }, []);

//   let activeToastId = null; // Store the currently active toast ID

//   const handleDelete = (depID) => {
//     // Dismiss the previous toast if it exists
//     if (activeToastId) {
//       toast.dismiss(activeToastId);
//     }

//     // Show new toast and store its ID
//     activeToastId = toast(
//       ({ closeToast }) => (
//         <div className="flex flex-col items-center gap-4">
//           <p>Are you sure you want to delete this branch?</p>
//           <div className="flex gap-4">
//             <button
//               className="bg-red-500 text-white px-4 py-2 rounded"
//               onClick={() => {
//                 (deleteBanks(depID)); // Delete action
//                 toast.dismiss(activeToastId); // Dismiss toast
//                 toast.success("Bank deleted successfully!");
//                 activeToastId = null; // Reset the toast ID
//               }}
//             >
//               OK
//             </button>
//             <button
//               className="bg-gray-500 text-white px-4 py-2 rounded"
//               onClick={() => {
//                 toast.dismiss(activeToastId); // Dismiss toast
//                 activeToastId = null; // Reset the toast ID
//               }}
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       ),
//       {
//         position: "top-right",
//         autoClose: false,
//         closeButton: false,
//         draggable: false,
//       }
//     );
//   };

//   const columnKeys = [
//     { key: "sno", label: "S NO" },
//     { key: "bank_name", label: "Bank Name" },
//     { key: "actions", label: "Actions", actions: ["delete"] }, // This column will have actions like delete and edit
//   ];
//   useEffect(() => {
//     if (error) {
//       toast.error(error); // Show error toast
//     }

//     if (success) {
//       toast.success("Bank Name created successfully!"); // Show success toast
//       setBank("");
//       (fetchBanks());
//     }
//   }, [error, success, ]);
//   return (
//     <div className="md:py-8 py-3">
//       <Card className=" w-full   border p-5 " color="transparent">
//         <Typography variant="h4" className="font-pt_serif" color="blue-gray">
//           Add Banks
//         </Typography>

//         <form
//           onSubmit={handleAddFuel}
//           className="mt-8 mb-2 w-full flex-col md:flex-row flex gap-4 max-w-full"
//         >
//           <div className="mb-1 flex gap-6">
//             <div className="flex flex-col w-96 gap-4">
//               <Typography variant="h6" color="blue-gray" className="-mb-3 font-pt_serif">
//                 Bank
//               </Typography>
//               <input
//                 size="lg"
//                 type="text"
//                 value={Bank}
//                 required
//                 onChange={(e) => {
//                   const value = e.target.value;
//                   setBank(value.charAt(0).toUpperCase() + value.slice(1));
//                 }}
//                 placeholder="XYZ Bank etc."
//                 className="w-full font-pt_serif bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
//               />
//             </div>
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <Button
//               type="submit"
//               className="px-2 md:px-4 mt-7 py-2 font-pt_serif hover:bg-blue-500 bg-blue-800 lg:text-base"
//               fullWidth
//             >
//               Create Bank
//             </Button>
//             <Button
//               onClick={resetClick}
//               className="px-2 md:px-4 mt-7 py-2 font-pt_serif hover:bg-gray-700 lg:text-base"
//               fullWidth
//             >
//               Reset
//             </Button>
//           </div>
//         </form>
//       </Card>

//       <ReusableTable
//         tableHeaders={columnKeys.map((col) => col.label)}
//         tableData={banks}
//         handleDelete={handleDelete}
//         columnKeys={columnKeys}
//         fileName="Bank"
//         loading={loading}
//       />

//       <ToastContainer />
//     </div>
//   );
// };

// export default Banks;
