import React, { useEffect, useState } from "react";
// import { use, useSelector } from "react-redux";
import { Card, Typography } from "@material-tailwind/react";
import { toast, ToastContainer } from "react-toastify";
import DynamicForm from "../Tables/DynamicForm";
import TableLayout from "../TableActions/TableLayout";
import Button from "../../components/ui/button/Button";
import "react-toastify/dist/ReactToastify.css";
// import {
//   addRegion,deleteRegion,fetchRegions,
// } from "../../store/Actions/ZoneAction";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Loading from "../Loading";
import { useZones } from "../../hooks/hookIndex";

const Region = () => {
  // const { region, success, loading, error } = useSelector(
  //   (state) => state.zones
  // );
  const [formData, setFormData] = useState({region_name:""});
  const {region, addRegionSuccess, loading, error,addRegion,deleteRegion,fetchRegions}=useZones();

   useEffect(() => {
      (fetchRegions());
    }, []);
  
  const handleAddRegion = (formData) => {
    if (!formData.region_name?.trim()) {
      toast.error("Region Name is required!");
      return;
    }
    (addRegion(formData.region_name));
  };

  const handleReset = () => {
    // Reset is handled by DynamicForm's resetAfterSubmit prop
    setFormData({region_name:""}); // Clear state dropdown after submission
  };
    const handleDelete = (regionID) => {
      toast.dismiss();
  
      toast(
        ({ closeToast }) => (
          <div className="flex flex-col items-center gap-4">
            <p>Are you sure you want to delete this Region?</p>
            <div className="flex gap-4">
              <Button
                size="sm"
                variant="primary"
                onClick={() => {
                  (deleteRegion(regionID))
                    .then(() => {
                      toast.success("Region deleted successfully!");
                      (fetchRegions());
                    })
                    .catch(() => toast.error("Failed to delete Region"));
                  closeToast();
                }}
                className="bg-red-600 hover:bg-red-700"
              >
                OK
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={closeToast}
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
    if (error) {
      toast.error(error);
    }
    if (addRegionSuccess) {
      toast.success("Region created successfully!");
      setFormData({region_name:""});
      (fetchRegions());
    }
  }, [error, addRegionSuccess, ]);

 function formConfig () {
    return{
      stepFields: [
        {
        title: "",
        className: "lg:grid lg:grid-cols-[1fr_.5fr_1fr] lg:gap-4 sm:grid-row-1 lg:w-full md:justify-center",
        fields: [
          {
            name: "region_name",
            label: "Region Name",
            type: "text",
            placeholder: "Enter Region Name",
            required: true,
            className:"mb-2",
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
  }


  // TableLayout columns configuration
  const tableColumns = [
    { key: "sno", label: "S NO" },
    { key: "region_name", label: "Region Name" },
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
  const tableData = region.map((regionItem, index) => ({
    ...regionItem,
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
              <PageBreadcrumb pageTitle="Add Regions" />
            {/* Logout Button */}
          </div>
          <Card className=" mb-5  p-5 shadow-lg rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ">
    
        {/* DynamicForm Integration */}
        <DynamicForm
          config={formConfig(formData)}
          onSubmit={handleAddRegion}
          resetAfterSubmit={addRegionSuccess}
          // submitButton={CustomSubmitButton}
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

export default Region;





// import React, { useState, useEffect } from "react";
// import { use, useSelector } from "react-redux";
// import {
//   Button,
//   Card,
//   CardBody,
//   CardHeader,
//   Typography,
// } from "@material-tailwind/react";
// import {
//   addRegion,
//   deleteRegion,
//   fetchRegions,
// } from "../../store/Actions/ZoneAction";
// import { toast, ToastContainer } from "react-toastify";
// import ReusableTable from "../TableActions/ReusableTable";
// import Loading from "../Loading";

// const Region = () => {
//   const  = use();
//   const [regionName, setRegionName] = useState("");
//   const { region, success, loading, error } = useSelector(
//     (state) => state.zones
//   );
//   const columnKeys = [
//     { key: "sno", label: "S NO" },
//     { key: "region_name", label: "Region Name" },
//     { key: "actions", label: "Actions", actions: ["delete"] }, // This column will have actions like delete and edit
//   ];
//   const handleAddRegion = (e) => {
//     e.preventDefault();
//     (addRegion(regionName));
//   };
//   const resetClick = (e) => {
//     setRegionName(""); // Clear state dropdown after submission
//   };
  
//   let activeToastId = null; // Store the currently active toast ID
  
//     const handleDelete = (regionID) => {
//       if (activeToastId) {
//         toast.dismiss(activeToastId);
//       }
  
//       activeToastId = toast(
//         ({ closeToast }) => (
//           <div className="flex flex-col items-center gap-4">
//             <p>Are you sure you want to delete this branch?</p>
//             <div className="flex gap-4">
//               <button
//                 className="bg-red-500 text-white px-4 py-2 rounded"
//                 onClick={() => {
//                   (deleteRegion(regionID));
//                   toast.dismiss(activeToastId);
//                   toast.success("Region deleted successfully!");
//                   activeToastId = null;
//                 }}
//               >
//                 OK
//               </button>
//               <button
//                 className="bg-gray-500 text-white px-4 py-2 rounded"
//                 onClick={() => {
//                   toast.dismiss(activeToastId);
//                   activeToastId = null;
//                 }}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         ),
//         {
//           position: "top-right",
//           autoClose: false,
//           closeButton: false,
//           draggable: false,
//         }
//       );
//     };

//   useEffect(() => {
//     (fetchRegions());
//   }, []);

//   useEffect(() => {
//     if (error) toast.error(error);
//     if (success) {
//       toast.success("Region created successfully!");
//       setRegionName("");
//       (fetchRegions());
//     }
//   }, [error, success]);

//   return (
//     <div className="md:py-8 py-3">
//       <Card className="w-full   border p-5" color="transparent">
//         <Typography variant="h4" color="blue-gray" className="font-pt_serif">
//           Add Regions
//         </Typography>
//         <form
//           onSubmit={handleAddRegion}
//           className="mt-8 mb-2 w-full flex flex-col md:flex-row gap-4 max-w-full"
//         >
//           <div className="mb-1 flex gap-6">
//             <div className="flex flex-col w-96 gap-4">
//               <Typography
//                 variant="h6"
//                 color="blue-gray"
//                 className="font-pt_serif"
//               >
//                 Region
//               </Typography>
//               <input
//                 type="text"
//                 value={regionName}
//                 required
//                 onChange={(e) => setRegionName(e.target.value)}
//                 placeholder="Region Name"
//                 className="w-full bg-transparent font-pt_serif placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              
//               />
//             </div>
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <Button
//               type="submit"
//               className="px-2 md:px-4 mt-9  h-12 py-0 font-pt_serif hover:bg-blue-500 bg-blue-800 lg:text-base"
                    
//               fullWidth
//             >
//               Create Region
//             </Button>
//             <Button
//               onClick={resetClick}
//               className="px-2 font-pt_serif md:px-4 mt-9  h-12 hover:bg-gray-700 lg:text-base"
//               fullWidth
//             >
//               Reset
//             </Button>
//           </div>
//         </form>
//       </Card>

//       <ReusableTable
//         tableHeaders={columnKeys.map((col) => col.label)}
//         tableData={region}
//         handleDelete={handleDelete}
//         columnKeys={columnKeys}
//         fileName="Region"
//         loading={loading}

//       />

//       <ToastContainer />
//     </div>
//   );
// };

// export default Region;
