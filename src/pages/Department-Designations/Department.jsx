import { Card, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
// import { use, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import DynamicForm from "../Tables/DynamicForm";
import TableLayout from "../TableActions/TableLayout";
import Button from "../../components/ui/button/Button";
import "react-toastify/dist/ReactToastify.css";
// import {
//   addDepartments,deleteDepartment,fetchDepartments,
// } from "../../store/Actions/Department_Designation_Action";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Loading from "../Loading";
import { useDepartment } from "../../hooks/hookIndex";

const Department = () => {

  const [formData, setFormData] = useState({department_name:""});
  // const { departments, success, loading, error } = useSelector(
  //   (state) => state.departments
  // );
  const{  createDepartment,deleteDepartment,fetchDepartments,departments, success, loading, error}=useDepartment();

  useEffect(() => {
    (fetchDepartments());
  }, []);

  const handleAddDepartment = (formData) => {
    if (!formData.department_name?.trim()) {
      toast.error("Department Name is required!");
      return;
    }
    (createDepartment(formData.department_name));
  };

  const handleReset = () => {
    setFormData({department_name:""});
  };

  const handleDelete = (depID) => {
    toast.dismiss();

    toast(
      ({ closeToast }) => (
        <div className="flex flex-col items-center gap-4">
          <p>Are you sure you want to delete this department?</p>
          <div className="flex gap-4">
            <Button
              size="sm"
              variant="primary"
              onClick={() => {
                (deleteDepartment(depID))
                  .then(() => {
                    toast.success("Department deleted successfully!");
                    (fetchDepartments());
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
      if (error) {
        toast.error(error);
      }
      if (success) {
        toast.success("Department created successfully!");
        setFormData({department_name:""});
        (fetchDepartments());
      }
    }, [error, success, ]);

  // DynamicForm configuration
  function formConfig () {
    return{
      stepFields: [
        {
        title: "",
        className: "lg:grid lg:grid-cols-[1fr_.5fr_1fr] lg:gap-4 sm:grid-row-1 lg:w-full md:justify-center",
        fields: [
          {
            name: "department_name",
            label: "Department Name",
            type: "text",
            placeholder: "Enter Department Name",
            className:"mb-2",
            required: true
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
    { key: "department_name", label: "Department Name" },
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
  const tableData = departments.map((department, index) => ({
    ...department,
    sno: index + 1,
  }));
// console.log(formConfig())
  return (
    <div className="md:py-4 py-3 relative h-fit pb-10 w-full ">
      {loading && <Loading />}
      <div
        className={` ${
          loading ? "backdrop-blur-sm" : ""
        }`}
      >
          <PageBreadcrumb pageTitle="Add Departments" />
        {/* Logout Button */}
      </div>
      <Card className=" mb-2  p-4 shadow-lg rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ">

        {/* DynamicForm Integration */}
        <DynamicForm
          config={formConfig(formData)}
          onSubmit={handleAddDepartment}
          resetAfterSubmit={success}
          // submitButton={CustomSubmitButton}
          // containsButton={true}
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

export default Department;





// import { Button, Card, Typography } from "@material-tailwind/react";
// import React, { useEffect, useState } from "react";
// import { use, useSelector } from "react-redux";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css"; // Import toast styles
// import {
//   addDepartments,
//   deleteDepartment,
//   fetchDepartments,
// } from "../../store/Actions/Department_Designation_Action";
// import ReusableTable from "../TableActions/ReusableTable";

// const Department = () => {
//   const  = use();
//   const [departmentName, setDepartmentName] = useState(""); // Manage department name input
//   const { departments, success, loading, error } = useSelector(
//     (state) => state.departments
//   ); // Get department data from store

//   useEffect(() => {
//     (fetchDepartments()); // Fetch departments on component mount
//   }, []);

//   const handleAddDepartment = (e) => {
//     e.preventDefault();
//     (addDepartments(departmentName)); //  add department action
//   };

//   const resetClick = () => {
//     setDepartmentName(""); // Clear input field
//   };

//   const handleDelete = (depID) => {
//     toast.dismiss(); // Dismiss previous toasts if any

//     toast(
//       ({ closeToast }) => (
//         <div className="flex flex-col items-center gap-4">
//           <p>Are you sure you want to delete this department?</p>
//           <div className="flex gap-4">
//             <button
//               className="bg-red-500 text-white px-4 py-2 rounded"
//               onClick={() => {
//                 (deleteDepartment(depID)) //  delete action
//                   .then(() => {
//                     toast.success("Department deleted successfully!");
//                     (fetchDepartments()); // Refresh department list
//                   })
//                   .catch(() => toast.error("Failed to delete department"));
//                 closeToast();
//               }}
//             >
//               OK
//             </button>
//             <button
//               className="bg-gray-500 text-white px-4 py-2 rounded"
//               onClick={closeToast}
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
//       toast.success("Department created successfully!"); // Show success toast
//       setDepartmentName("");
//       (fetchDepartments()); // Refresh the department list
//     }
//   }, [error, success, ]);

//   const columnKeys = [
//     { key: "sno", label: "S NO" },
//     { key: "department_name", label: "Department Name" },
//     { key: "actions", label: "Actions", actions: ["delete"] },
//   ];

//   return (
//     <div className="md:py-8 py-3">
//       <Card className="w-full border p-5" color="transparent">
//         <Typography variant="h4" color="blue-gray" className="font-pt_serif">
//           Add Departments
//         </Typography>

//         <form
//           onSubmit={handleAddDepartment}
//           className="mt-8 mb-2 w-full flex flex-col md:flex-row gap-4 max-w-full"
//         >
//           <div className="mb-1 flex gap-6">
//             <div className="flex flex-col w-96 gap-4">
//               <Typography
//                 variant="h6"
//                 color="blue-gray"
//                 className="-mb-3 font-pt_serif"
//               >
//                 Department
//               </Typography>
//               <input
//                 size="lg"
//                 type="text"
//                 value={departmentName}
//                 required
//                 onChange={(e) => {
//                   const value = e.target.value;
//                   setDepartmentName(
//                     value.charAt(0).toUpperCase() + value.slice(1)
//                   );
//                 }}
//                 placeholder="Department Name"
//                 className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
//               />
//             </div>
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <Button
//               type="submit"
//               className="px-2 md:px-4 mt-7 py-2 font-pt_serif hover:bg-blue-500 bg-blue-800 lg:text-base"
//               fullWidth
//             >
//               Create Department
//             </Button>
//             <Button
//               onClick={resetClick}
//               className="px-2 font-pt_serif md:px-4 mt-7 py-2 hover:bg-gray-700 lg:text-base"
//               fullWidth
//             >
//               Reset
//             </Button>
//           </div>
//         </form>
//       </Card>

//       <ReusableTable
//         tableHeaders={columnKeys.map((col) => col.label)}
//         tableData={departments}
//         handleDelete={handleDelete}
//         columnKeys={columnKeys}
//         fileName="Departments"
//         loading={loading}
//       />

//       <ToastContainer />
//     </div>
//   );
// };

// export default Department;
