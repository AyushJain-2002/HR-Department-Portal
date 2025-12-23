import { Card, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
// import { use, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import DynamicForm from "../Tables/DynamicForm";
import TableLayout from "../TableActions/TableLayout";
import Button from "../../components/ui/button/Button";
import "react-toastify/dist/ReactToastify.css";
// import {
//   addZone,
//   deleteZone,
//   fetchZones,
// } from "../../store/Actions/ZoneAction";
import { useZones } from "../../hooks/hookIndex";
import Loading from "../Loading";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

const Zone = () => {

  const [formData, setFormData] = useState({zone_name:""});
  // const { zones, success, loading, error } = useSelector((state) => state.zones);
  let deleteInProgress = false;
  const{addZone,deleteZone,fetchZones,zones, addZoneSuccess, loading, error}=useZones();

  const handleAddZone = (formData) => {
    if (!formData.zone_name?.trim()) {
      toast.error("Zone Name is required!");
      return;
    }
    (addZone(formData.zone_name));
  };

  const handleReset = () => {
    setFormData({zone_name:""});
  };

  useEffect(() => {
    (fetchZones());
  }, []);

  const handleDelete = (zoneID) => {
    // if (deleteInProgress) return;
    // deleteInProgress = true;

    toast(
      ({ closeToast }) => (
        <div className="flex flex-col items-center gap-4">
          <p>Are you sure you want to delete this zone?</p>
          <div className="flex gap-4">
            <Button
              size="sm"
              variant="primary"
              onClick={() => {
                (deleteZone(zoneID))
                .then(() => {
                  toast.success("Zone deleted successfully!");
                  fetchZones();
                })
                .catch(() => toast.error("Failed to delete department"));
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
    if (error) toast.error(error);
    if (addZoneSuccess) {
      toast.success("Zone created successfully!");
      setFormData({zone_name:""});
      (fetchZones());
    }
  }, [error, addZoneSuccess, ]);


 // DynamicForm configuration
  function formConfig () {
    return{
      stepFields: [
        {
        title: "",
        className: "lg:grid lg:grid-cols-[1fr_.5fr_1fr] lg:gap-4 sm:grid-row-1 lg:w-full md:justify-center",
        fields: [
          {
            name: "zone_name",
            label: "Zone Name",
            type: "text",
            placeholder: "Enter Zone Name (e.g., East, West, etc.)",
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
  }


  // TableLayout columns configuration
  const tableColumns = [
    { key: "sno", label: "S NO" },
    { key: "zone_name", label: "Zone Name" },
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
  const tableData = zones.map((zone, index) => ({
    ...zone,
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
          <PageBreadcrumb pageTitle="Add Zones" />
        {/* Logout Button */}
      </div>
      <Card className=" mb-5  p-5 shadow-lg rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ">

        {/* DynamicForm Integration */}
        <DynamicForm
          config={formConfig(formData)}
          onSubmit={handleAddZone}
          resetAfterSubmit={addZoneSuccess}
          // submitButton={CustomSubmitButton}
          containsButton={true}
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

export default Zone;





// import {
//   Button,
//   Card,
//   Typography,
// } from "@material-tailwind/react";
// import React, { useEffect, useState } from "react";
// import { use, useSelector } from "react-redux";
// import {
//   addZone,
//   deleteZone,
//   fetchZones,
// } from "../../store/Actions/ZoneAction";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css"; 
// import ReusableTable from "../TableActions/ReusableTable";

// const Zone = () => {
//   const  = use();
//   const [zoneName, setZoneName] = useState("");
//   const { zones, addZoneSuccess, loading, error } = useSelector((state) => state.zones);
//   let deleteInProgress = false; // Prevents duplicate API calls

//   const handleAddZone = (e) => {
//     e.preventDefault();
//     (addZone(zoneName));
//   };

//   const resetClick = () => {
//     setZoneName("");
//   };

//   useEffect(() => {
//     (fetchZones());
//   }, []);

//   const columnKeys = [
//     { key: "sno", label: "S NO" },
//     { key: "zone_name", label: "Zone Name" },
//     { key: "actions", label: "Actions", actions: ["delete"] },
//   ];

//   const handleDelete = (zoneID) => {
//     if (deleteInProgress) return; // Prevents duplicate delete calls
//     deleteInProgress = true;

//     const toastId = toast(
//       ({ closeToast }) => (
//         <div className="flex flex-col items-center gap-4">
//           <p>Are you sure you want to delete this zone?</p>
//           <div className="flex gap-4">
//             <button
//               className="bg-red-500 text-white px-4 py-2 rounded"
//               onClick={() => {
//                 (deleteZone(zoneID)).then(() => {
//                   toast.success("Zone deleted successfully!");
//                   deleteInProgress = false;
//                   toast.dismiss(toastId);
//                 });
//               }}
//             >
//               OK
//             </button>
//             <button
//               className="bg-gray-500 text-white px-4 py-2 rounded"
//               onClick={() => {
//                 toast.dismiss(toastId);
//                 deleteInProgress = false;
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

//   useEffect(() => {
//     if (error) toast.error(error);
//     if (success) {
//       toast.success("Zone created successfully!");
//       setZoneName("");
//       (fetchZones());
//     }
//   }, [error, success, ]);

//   return (
//     <div className="md:py-8 py-3">
//       <Card className="w-full md:w-fit border p-5 " color="transparent">
//         <Typography variant="h4" color="blue-gray" className="font-pt_serif">
//           Add Zones
//         </Typography>

//         <form onSubmit={handleAddZone} className="mt-8 mb-2 w-full flex flex-col md:flex-row gap-4 max-w-full">
//           <div className="mb-1 flex gap-6">
//             <div className="flex flex-col w-96 gap-4">
//               <Typography variant="h6" color="blue-gray" className="-mb-3 font-pt_serif">
//                 Zone
//               </Typography>
//               <input
//                 size="lg"
//                 type="text"
//                 value={zoneName}
//                 required
//                 onChange={(e) => setZoneName(e.target.value)}
//                 placeholder="East, West, etc."
//                 className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2"
//               />
//             </div>
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <Button type="submit" className="px-4 mt-6 bg-blue-800" fullWidth>
//               Create Zone
//             </Button>
//             <Button onClick={resetClick} className="px-4 mt-6 bg-gray-700" fullWidth>
//               Reset
//             </Button>
//           </div>
//         </form>
//       </Card>

//       <ReusableTable
//         tableHeaders={columnKeys.map((col) => col.label)}
//         tableData={zones}
//         handleDelete={handleDelete}
//         columnKeys={columnKeys}
//         fileName="Zones"
//         loading={loading}
//       />
//       <ToastContainer />
//     </div>
//   );
// };

// export default Zone;
