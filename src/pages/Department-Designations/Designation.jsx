import { Card, Typography } from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import DynamicForm from "../Tables/DynamicForm";
import TableLayout from "../TableActions/TableLayout";
import Button from "../../components/ui/button/Button";
import "react-toastify/dist/ReactToastify.css";
// import {
//   addDesignation,
//   deleteDesignation,
//   fetchDesignation,
// } from "../../store/Actions/Department_Designation_Action";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Loading from "../Loading";
import { useDepartment } from "../../hooks/hookIndex";
import { useLocation, useParams } from "react-router";

const Designation = () => {
  // const dispatch = useDispatch();
  const [formData, setFormData] = useState({designationName:""});
  const location = useLocation();
  const {id} =useParams();
  // const { designations, success, loading, error } = useSelector(
  //   (state) => state.departments
  // );
  const { designations=[], success, loading, error , createDesignation,deleteDesignation,fetchDesignation}=useDepartment()
  const isResetMode=!!id;
  useEffect(() => {
    (fetchDesignation());
  }, [location.pathname]);

  const handleSubmit = (formData) => {
    if (!formData.designation_name?.trim()) {
      toast.error("Designation Name is required!");
      return;
    }
    (createDesignation(formData.designation_name));
  };

  const handleReset = () => {
    setFormData(prev => ({
        ...prev,
        designationName:""
      }));
  };
  // const handleEdit=()=>{
  //   setFormData(prev=>({
  //     ...prev,
  //     designationName:"updatedName"
  //   }))
  // }

  // ✅ FIX: persistent toast reference
  const activeToastId = useRef(null);

  const handleDelete = (depID) => {
    if (activeToastId.current) {
      toast.dismiss(activeToastId.current);
    }

    activeToastId.current = toast(
      () => (
        <div className="flex flex-col items-center gap-4">
          <p>Are you sure you want to delete this designation?</p>
          <div className="flex gap-4">
            <Button
              size="sm"
              variant="primary"
              onClick={() => {
                (deleteDesignation(depID));
                toast.dismiss(activeToastId.current);
                toast.success("Designation deleted successfully!");
                activeToastId.current = null;
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              OK
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                toast.dismiss(activeToastId.current);
                activeToastId.current = null;
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
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Designation created successfully!");
      setFormData(prev => ({
        ...prev,
        designationName:""
      }));
      (fetchDesignation());
    }
  }, [error, success]);

  // DynamicForm configuration
  function formConfig () {
    return{
      stepFields: [
        {
          title: "",
          // className: "grid grid-cols-[1fr_.5fr_1fr] gap-4 w-full",
        className: "lg:grid lg:grid-cols-[1fr_.5fr_1fr] lg:gap-4 sm:grid-row-1 lg:w-full md:justify-center",
          fields: [
            {
              name: "designation_name",
              label: "Designation Name",
              type: "text",
              placeholder: "Enter Designation Name",
              required: true,
              className: "mb-2"
            },
            {
              name:"submit",
              label: "Submit",
              type:"submit",
              className:"md:w-48  mr-2 ml-auto "
            },
            {
              name:"reset",
              label: "Reset",
              type:"reset",
              className:"md:w-48  bg-gray-500 hover:bg-gray-600"
            }
          ]
        }
      ]
    };
  }

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
  //       {loading ? "Creating..." : "Create Designation"}
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
    { key: "designation_name", label: "Designation Name" },
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
  const tableData = designations.map((designation, index) => ({
    ...designation,
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
          <PageBreadcrumb pageTitle="Add Designation" />
        {/* Logout Button */}
      </div>
      <Card className=" mb-5  p-5 shadow-lg rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ">

        {/* DynamicForm Integration */}
        <DynamicForm
          config={formConfig(formData)}
          // onSubmit={handleAddDesignation}
          onSubmit={isResetMode ? handleReset : handleSubmit}
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

export default Designation;




// import { Button, Card, Typography } from "@material-tailwind/react";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css"; // Import toast styles
// import Loading from "../Loading";
// import {
//   addDepartments,
//   addDesignation,
//   deleteDepartment,
//   deleteDesignation,
//   fetchDepartments,
//   fetchDesignation,
// } from "../../store/Actions/Department_Designation_Action";
// import ReusableTable from "../TableActions/ReusableTable";

// const Designation = () => {
//   const dispatch = useDispatch();
//   const [designationName, setDesignationName] = useState(""); // Manage zone name input
//   const { designations, success, loading, error } = useSelector(
//     (state) => state.departments
//   ); // Get zones data from store
//   const columnKeys = [
//     { key: "sno", label: "S NO" },
//     { key: "designation_name", label: "Designation Name" },
//     { key: "actions", label: "Actions", actions: ["delete"] }, // This column will have actions like delete and edit
//   ];
//   const handleAddZone = (e) => {
//     e.preventDefault();
//     dispatch(addDesignation(designationName)); // Dispatch add zone action
//   };
//   const resetClick = (e) => {
//     setDesignationName(""); // Clear state dropdown after submission
//   };
//   useEffect(() => {
//     dispatch(fetchDesignation()); // Fetch zones on component mount
//   }, [dispatch]);

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
//                 dispatch(deleteDesignation(depID)); // Delete action
//                 toast.dismiss(activeToastId); // Dismiss toast
//                 toast.success("Designation deleted successfully!");
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


//   useEffect(() => {
//     if (error) {
//       toast.error(error); // Show error toast
//     }

//     if (success) {
//       toast.success("designation created successfully!"); // Show success toast
//       setDesignationName("");
//       dispatch(fetchDesignation());
//     }
//   }, [error, success, dispatch]);

//   return (
//     <div className="md:py-8 py-3">
//       <Card className=" w-full   border p-5 " color="transparent">
//         <Typography
//           variant="h4"
//           className="font-pt_serif font-semibold text-[28px]"
//           color="blue-gray"
//         >
//           Add Designation
//         </Typography>

//         <form
//           onSubmit={handleAddZone}
//           className="mt-8 mb-2 w-full flex flex-col md:flex-row gap-4 max-w-full"
//         >
//           <div className="mb-1 flex gap-6">
//             <div className="flex flex-col w-96 gap-4">
//               <Typography
//                 variant="h6"
//                 color="blue-gray"
//                 className="-mb-3 font-pt_serif text-lg font-medium"
//               >
//                 Designation
//               </Typography>
//               <input
//                 size="lg"
//                 type="text"
//                 value={designationName}
//                 required
//                 onChange={(e) => {
//                   const value = e.target.value;
//                   setDesignationName(
//                     value.charAt(0).toUpperCase() + value.slice(1)
//                   );
//                 }}
//                 placeholder="Designation"
//                 className="w-full bg-transparent  placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
//               />
//             </div>
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <Button
//               type="submit"
//               className="mt-6 font-pt_serif px-2 md:px-4 bg-blue-800 lg:text-base"
//               fullWidth
//             >
//               Create Designation
//             </Button>
//             <Button
//               onClick={resetClick}
//               className="mt-6 font-pt_serif lg:text-base"
//               fullWidth
//             >
//               Reset
//             </Button>
//           </div>
//         </form>
//       </Card>

//       <ReusableTable
//         tableHeaders={columnKeys.map((col) => col.label)}
//         tableData={designations}
//         handleDelete={handleDelete}
//         columnKeys={columnKeys}
//         fileName="Designation"
//         loading={loading}
//       />

//       <ToastContainer />
//     </div>
//   );
// };

// export default Designation;
