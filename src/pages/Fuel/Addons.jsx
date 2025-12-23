import {
  Card,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TableLayout from "../TableActions/TableLayout";
import DynamicForm from "../Tables/DynamicForm";
import Button from "../../components/ui/button/Button";
import { addAddon, deleteAddon, fetchAddons } from "../../store/Actions/AddonAction";

const Addons = () => {
  const dispatch = useDispatch();
  const { addons, success, loading, error } = useSelector((state) => state.addons);

  useEffect(() => {
    dispatch(fetchAddons());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Addon created successfully!");
      dispatch(fetchAddons());
    }
  }, [error, success, dispatch]);

  const handleAddAddon = (formData) => {
    if (!formData.addon_name?.trim()) {
      toast.error("Addon Name is required!");
      return;
    }
    dispatch(addAddon({ 
      addon_name: formData.addon_name, 
      type: formData.type 
    }));
  };

  const [deletingAddonId, setDeletingAddonId] = useState(null);

  const handleDelete = (addonID) => {
    if (deletingAddonId) return;

    setDeletingAddonId(addonID);

    const toastId = toast(
      <div className="flex flex-col items-center ">
        <p>Are you sure you want to delete this Addon?</p>
        <div className="flex gap-4">
          <Button
            className="px-2 md:px-4 mt-7 py-2 hover:shadow-red-500/40 hover:shadow-xl bg-red-700 text-white text-[16px] rounded"
            onClick={() => {
              dispatch(deleteAddon(addonID))
                .then(() => {
                  toast.success("Addon deleted successfully!");
                  setDeletingAddonId(null);
                })
                .catch(() => {
                  toast.error("Failed to delete addon!");
                  setDeletingAddonId(null);
                });
              toast.dismiss(toastId);
            }}
            disabled={deletingAddonId === addonID}
          >
            OK
          </Button>
          <Button
            className="px-2 md:px-4 mt-7 py-2 hover:shadow-gray-500/40 hover:shadow-xl bg-gray-700 text-white text-[16px] rounded"
            onClick={() => {
              toast.dismiss(toastId);
              setDeletingAddonId(null);
            }}
          >
            CANCEL
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

  // Table columns configuration
  const tableColumns = [
    { 
      key: "sno", 
      label: "S NO" 
    },
    { 
      key: "type", 
      label: "Type" 
    },
    { 
      key: "addon_name", 
      label: "Addon Name" 
    },
    { 
      key: "actions", 
      label: "Actions",
      render: (row) => (
        <Button
          size="sm"
          variant="outline"
          onClick={() => handleDelete(row.id || row.addonID)}
          disabled={deletingAddonId === (row.id || row.addonID)}
          className="text-red-600 border-red-600 hover:bg-red-50 dark:text-red-400 dark:border-red-400 dark:hover:bg-red-900/20"
        >
          {deletingAddonId === (row.id || row.addonID) ? "Deleting..." : "Delete"}
        </Button>
      )
    },
  ];

  // Prepare table data with serial numbers
  const tableData = addons.map((addon, index) => ({
    ...addon,
    sno: index + 1,
    id: addon.id || addon.addonID, // Ensure id field is available
  }));

  // Form configuration
  const formConfig = {
    stepFields: [
      {
        title: "",
        fields: [
          {
            name: "type",
            type: "select",
            label: "Type",
            required: true,
            placeholder: "Select Type",
            options: [
              { value: "Motor", label: "Motor" },
              { value: "Non-Motor", label: "Non Motor" },
              { value: "Health", label: "Health" },
              { value: "Life", label: "Life" }
            ]
          },
          {
            name: "addon_name", 
            type: "text",
            label: "Addon Name",
            placeholder: "Enter Addon Name",
            required: true
          }
        ]
      }
    ]
  };

  const CustomSubmitButton = ({ handleSubmit }) => (
    <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
      <Button 
        size="md"
        variant="primary"
        onClick={handleSubmit}
        className="w-full md:w-auto"
      >
        Create Addon
      </Button>
      <Button 
        size="sm"
        variant="outline"
        type="button"
        onClick={() => {
          toast.info("Form reset");
        }}
        className="w-full md:w-auto"
      >
        Reset
      </Button>
    </div>
  );

  return (
    <div className="md:py-8 py-3">
      <Card className="w-full border p-5" color="transparent">
        <Typography variant="h4" color="blue-gray">
          Add Addons
        </Typography>

        <DynamicForm 
          config={formConfig}
          onSubmit={handleAddAddon}
          resetAfterSubmit={success}
          submitButton={CustomSubmitButton}
        />
      </Card>

      <div className="mt-8">
        <TableLayout
          columns={tableColumns}
          data={tableData}
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

export default Addons;





// original


// import {
//   Button,
//   Card,
//   Typography,
// } from "@material-tailwind/react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import ReusableTable from "../TableActions/ReusableTable";
// import { addAddon, deleteAddon, fetchAddons } from "../../store/Actions/AddonAction";

// const Addons = () => {
//   const dispatch = useDispatch();
//   const [addonName, setAddonName] = useState("");
//   const [type, setType] = useState(""); // Default value

//   const { addons, success, loading, error } = useSelector((state) => state.addons);

//   useEffect(() => {
//     dispatch(fetchAddons()); // Fetch addons on component mount
//   }, [dispatch]);

//   useEffect(() => {
//     if (error) {
//       toast.error(error); // Show error toast
//     }
//     if (success) {
//       toast.success("Addon created successfully!"); // Show success toast
//       setAddonName("");
//       setType("Health");
//       dispatch(fetchAddons()); // Refresh addons after creation
//     }
//   }, [error, success, dispatch]);

//   const handleAddAddon = (e) => {
//     e.preventDefault();
//     if (!addonName.trim()) {
//       toast.error("Addon Name is required!");
//       return;
//     }
//     dispatch(addAddon({ addon_name: addonName, type })); // Dispatch add action
//   };

//   const [deletingAddonId, setDeletingAddonId] = useState(null);

//   const handleDelete = (addonID) => {
//     if (deletingAddonId) return; // Prevent multiple clicks

//     setDeletingAddonId(addonID); // Set the ID to disable further clicks

//     const toastId = toast(
//       <div className="flex flex-col items-center">
//         <p>Are you sure you want to delete this Addon?</p>
//         <div className="flex gap-4">
//           <button
//             className="px-2 md:px-4 mt-7 py-2 hover:shadow-red-500/40 hover:shadow-xl bg-red-700 text-white text-[16px] rounded"
//             onClick={() => {
//               dispatch(deleteAddon(addonID))
//                 .then(() => {
//                   toast.success("Addon deleted successfully!");
//                   setDeletingAddonId(null); // Reset deleting ID
//                 })
//                 .catch(() => {
//                   toast.error("Failed to delete addon!");
//                   setDeletingAddonId(null); // Reset on failure
//                 });
//               toast.dismiss(toastId);
//             }}
//             disabled={deletingAddonId === addonID} // Disable button
//           >
//             OK
//           </button>
//           <button
//             className="px-2 md:px-4 mt-7 py-2 hover:shadow-gray-500/40 hover:shadow-xl bg-gray-700 text-white text-[16px] rounded"
//             onClick={() => {
//               toast.dismiss(toastId);
//               setDeletingAddonId(null);
//             }}
//           >
//             CANCEL
//           </button>
//         </div>
//       </div>,
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
//     { key: "type", label: "Type" },

//     { key: "addon_name", label: "Addon Name" },
//     { key: "actions", label: "Actions", actions: ["delete"] }, // This column will have delete action
//   ];

//   return (
//     <div className="md:py-8 py-3">
//       <Card className="w-full border p-5" color="transparent">
//         <Typography variant="h4" color="blue-gray">
//           Add Addons
//         </Typography>

//         <form onSubmit={handleAddAddon} className="mt-8 mb-2 w-full flex-col md:flex-row flex gap-4 max-w-full">
//           <div className="mb-1 flex gap-6">

//             <div className="flex flex-col w-96 gap-4">
//               <Typography variant="h6"
//                 // color="blue-gray" 

//                 // className="-mb-3 text-[16px] font-roboto font-normal"
//                 className="block antialiased tracking-normal text-blue-gray-900 -mb-3 font-times text-[16px] font-medium"
//               >
//                 Type
//               </Typography>
//               <select

//                 className="w-full bg-transparent text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2"
//                 value={type}
//                 onChange={(e) => setType(e.target.value)}
//                 required
//               >
//                 <option value="" disabled>Select Type</option>
//                 <option value="Motor">Motor</option>
//                 <option value="Non-Motor">Non Motor</option>
//                 <option value="Health">Health</option>
//                 <option value="Life">Life</option>
//               </select>


//             </div>
//             <div className="flex flex-col w-96 gap-4">
//               <Typography variant="h6"
//                 className="block antialiased tracking-normal text-blue-gray-900 -mb-3 font-times text-[16px] font-medium"

//               >
//                 Addon
//               </Typography>
//               <input
//                 size="lg"
//                 type="text"
//                 value={addonName}
//                 required
//                 onChange={(e) => setAddonName(e.target.value)}
//                 placeholder="Enter Addon Name"
//                 className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
//               />
//             </div>


//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <Button type="submit"

//               // className="px-2 md:px-4 mt-7 py-2 hover:bg-blue-500 bg-blue-800 lg:text-base" fullWidth

//               className="px-2 md:px-4 mt-7 py-2 hover:shadow-blue-500/40 hover:shadow-xl  bg-blue-700 text-white  text-[16px] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none tracking-wider
// "
//             >
//               Create Addon
//             </Button>


//             <Button onClick={() => { setAddonName(""); setType("Health"); }}
//               //  className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none fullwidth py-2 px-2 rounded-lg bg-gray-700 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-gray-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
//               className="px-2 md:px-4 mt-7 py-2 hover:shadow-gray-500/40 hover:shadow-xl  bg-gray-700 text-white  text-[16px] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none tracking-wider"

//             >
//               Reset
//             </Button>
//           </div>
//         </form>
//       </Card>

//       <ReusableTable
//         tableHeaders={columnKeys.map((col) => col.label)}
//         tableData={addons}
//         handleDelete={handleDelete}
//         columnKeys={columnKeys}
//         fileName="Addon"
//         loading={loading}
//       />

//       <ToastContainer />
//     </div>
//   );
// };

// export default Addons;