import {
  Card,
  Dialog,
  DialogBody,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useMemo, useState } from "react";
import FormDynamic from "../TableActions/FormDynamic";
import { toast, ToastContainer } from "react-toastify";
import DynamicForm from "../Tables/DynamicForm";
import TableLayout from "../TableActions/TableLayout";
import Button from "../../components/ui/button/Button";
import {
  createInsuranceCompany,
  deleteInsuranceCompany,
  fetchInsuranceCompanies,
  fetchInsuranceCompaniesById,
  fetchInsuranceCompaniesByType,
  updateInsuranceCompany,
} from "../../store/Actions/InsurerBranchAction";
import { useDispatch, useSelector } from "react-redux";

const InsuranceCompany = () => {
  const [openModal, setOpenModal] = useState(false);
  const [branchToEdit, setBranchToEdit] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [editFormErrors, setEditFormErrors] = useState({});
  const [resetAfterSubmit, setResetAfterSubmit] = useState(false);
  const dispatch = useDispatch();
  const {
    insuranceCompany,
    insuranceCompanies,
    insuranceByTypeCompanies,
    loading,
    success,
    error,
    createError,
    editError,
    editSuccess,
  } = useSelector((state) => state.insuranceCompany);
  
  const [formState, setFormState] = useState({
    company_name: "",
    company_url: "",
    type_of_insurance: "",
  });

  const handleCreateBranch = (formData) => {
    dispatch(createInsuranceCompany(formData));
    setOpenModal(false); 
    console.log("Creating new branch");
  };

  const handleUpdateBranch = (formData) => {
    dispatch(updateInsuranceCompany(insuranceCompany.id, formData));
    console.log("Updating branch:", branchToEdit);
  };

  const handleEditCompany = (branchId) => {
    dispatch(fetchInsuranceCompaniesById(branchId));
  };

  useEffect(() => {
    dispatch(fetchInsuranceCompanies());
  }, [dispatch]);

  useEffect(() => {
    if (editError) {
      setEditFormErrors(editError.message || {});
      setFormErrors({});
      toast.error("Please fix the errors and try again.");
    } else if (createError) {
      setFormErrors(createError.message || {});
      if (formErrors) setOpenModal(false);
      setEditFormErrors({});
      toast.error("Please fix the errors and try again.");
    } else if (error) {
      toast.error(error);
    } else if (success) {
      toast.success("Successfully Created an Insurer Company!");
      setOpenModal(false);
      setFormState({
        company_name: "",
        company_url: "",
        type_of_insurance: "",
      });
      setEditFormErrors({});
      setFormErrors({});
      dispatch(fetchInsuranceCompanies());
    } else if (editSuccess) {
      toast.success("Successfully Update an Insurer Company!");
      setOpenModal(false);
      setFormState({
        company_name: "",
        company_url: "",
        type_of_insurance: "",
      });
      setEditFormErrors({});
      setFormErrors({});
      dispatch(fetchInsuranceCompanies());
    }
  }, [createError, editError, editSuccess, success, branchToEdit, dispatch, error, formErrors]);

  useEffect(() => {
    if (insuranceCompany) {
      console.log("Fetched Branch Data:", insuranceCompany);
      setFormState({
        company_name: insuranceCompany.company_name,
        company_url: insuranceCompany.company_url,
        type_of_company: insuranceCompany.type_of_company,
      });
      setOpenModal(true);
    }
  }, [insuranceCompany]);

  const types = [
    { id: 1, type: "Life Insurance" },
    { id: 2, type: "Non Life Insurance" },
  ];
  
  // DynamicForm configuration
  const formConfig = {
    stepFields: [
      {
        title: "",
        fields: [
          {
            name: "type_of_company",
            label: "Type of Company",
            type: "select",
            options: types.map((tp) => ({
              value: tp.id,
              label: tp.type,
            })),
            placeholder: "Select a Type",
            required: true,
          },
          {
            name: "company_name",
            label: "Company Name",
            type: "text",
            placeholder: "Enter Company Name",
            required: true,
          },
          {
            name: "company_url",
            label: "Company URL",
            type: "text",
            placeholder: "Enter Company URL",
            required: true,
          },
        ]
      }
    ]
  };

  // Custom submit button for DynamicForm
  const CustomSubmitButton = (handleSubmit) => (
    <div className="flex justify-center gap-4 mt-6">
      <Button 
        size="md"
        variant="primary"
        onClick={handleSubmit}
        className="w-full md:w-auto"
      >
        Create Company
      </Button>
      <Button 
        size="md"
        variant="outline"
        type="button"
        onClick={() => {
          setFormState({
            company_name: "",
            company_url: "",
            type_of_insurance: "",
          });
          setFormErrors({});
        }}
        className="w-full md:w-auto"
      >
        Reset
      </Button>
    </div>
  );

  // TableLayout columns configuration
  const tableColumns = [
    { key: "sno", label: "S NO" },
    { key: "type_of_company", label: "Type" },
    { key: "company_name", label: "Company Name" },
    { key: "company_url", label: "Company URL" },
    { 
      key: "actions", 
      label: "Actions",
      render: (row) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleEditCompany(row.id)}
            className="text-blue-600 border-blue-600 hover:bg-blue-50"
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleDelete(row.id)}
            className="text-red-600 border-red-600 hover:bg-red-50"
          >
            Delete
          </Button>
        </div>
      )
    },
  ];

  // Prepare table data with serial numbers
  const tableData = insuranceCompanies.map((company, index) => ({
    ...company,
    sno: index + 1,
  }));

  const [isDeleteToastOpen, setIsDeleteToastOpen] = useState(false);

  const handleDelete = (companyId) => {
    if (isDeleteToastOpen) return;

    setIsDeleteToastOpen(true);

    toast(
      ({ closeToast }) => (
        <div className="flex flex-col items-center gap-4">
          <p>Are you sure you want to delete this company?</p>
          <div className="flex gap-4">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => {
                dispatch(deleteInsuranceCompany(companyId));
                closeToast();
                setIsDeleteToastOpen(false);
                toast.success("Successfully Deleted an insurer company!", {
                  toastId: "delete-success",
                });
              }}
            >
              OK
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={() => {
                closeToast();
                setIsDeleteToastOpen(false);
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
        toastId: "delete-confirm",
      }
    );
  };

  return (
    <div className="md:py-8 py-3">
      <Card className="w-full border p-5" color="transparent">
        <Typography variant="h4" color="blue-gray">
          Add Insurance Company
        </Typography>
        
        {/* DynamicForm Integration */}
        <DynamicForm
          config={formConfig}
          onSubmit={handleCreateBranch}
          resetAfterSubmit={success}
          submitButton={CustomSubmitButton}
        />
      </Card>

      {/* TableLayout Integration */}
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

      {/* Edit Modal */}
      <Dialog
        size="lg"
        open={openModal}
        handler={() => {
          setOpenModal(false);  
        }}
      >
        <DialogHeader className="pb-0">Edit Company</DialogHeader>
        <DialogBody className="pt-0">
          <FormDynamic
            fields={formConfig.stepFields[0].fields}
            onSubmit={handleUpdateBranch}
            storeLabel={true}
            idKey="id"
            initialValues={formState}
            isEditMode={true}
            errors={editFormErrors}
          />
        </DialogBody>
      </Dialog>

      <ToastContainer />
    </div>
  );
};

export default InsuranceCompany;




// import {
//   Card,
//   Dialog,
//   DialogBody,
//   DialogHeader,
//   Typography,
// } from "@material-tailwind/react";
// import React, { useEffect, useMemo, useState } from "react";
// import FormDynamic from "../TableActions/FormDynamic";
// import ReusableTable from "../TableActions/ReusableTable";
// import { toast, ToastContainer } from "react-toastify";
// import DynamicForm from "../Tables/DynamicForm";
// import TableLayout from "../TableActions/TableLayout";
// import Button from "../../components/ui/button/Button";
// import {
//   createInsuranceCompany,
//   deleteInsuranceCompany,
//   fetchInsuranceCompanies,
//   fetchInsuranceCompaniesById,
//   fetchInsuranceCompaniesByType,
//   updateInsuranceCompany,
// } from "../../store/Actions/InsurerBranchAction";
// import { useDispatch, useSelector } from "react-redux";

// const InsuranceCompany = () => {
//   const [openModal, setOpenModal] = useState(false);
//   const [branchToEdit, setBranchToEdit] = useState(null);
//   const [formErrors, setFormErrors] = useState({});
//   const [editFormErrors, setEditFormErrors] = useState({});
//   const [resetAfterSubmit, setResetAfterSubmit] = useState(false);
//   const dispatch = useDispatch();
//   const {
//     insuranceCompany,
//     insuranceCompanies,
//     insuranceByTypeCompanies,
//     loading,
//     success,
//     error,
//     createError,
//     editError,
//     editSuccess,
//   } = useSelector((state) => state.insuranceCompany);
//   const [formState, setFormState] = useState({
//     company_name: "",
//     company_url: "",
//     type_of_insurance: "",
//   });
//   const handleCreateBranch = (formData) => {
//     dispatch(createInsuranceCompany(formData));
//     setOpenModal(false); 
//     console.log("Creating new branch");
//   };

//   const handleUpdateBranch = (formData) => {
//     // Handle update operation
//     dispatch(updateInsuranceCompany(insuranceCompany.id, formData));
//     console.log("Updating branch:", branchToEdit);
//   };
//   const handleEditCompany = (branchId) => {
//     // Dispatch action to fetch the branch by ID
//     dispatch(fetchInsuranceCompaniesById(branchId));
//   };

//   useEffect(() => {
//     dispatch(fetchInsuranceCompanies());
//   }, [dispatch]);

//   useEffect(() => {
//     if (editError) {
//       setEditFormErrors(editError.message || {});
//       setFormErrors({}); // Display backend validation errors
//       toast.error("Please fix the errors and try again.");
//     } else if (createError) {
//       setFormErrors(createError.message || {});
//       if (formErrors) setOpenModal(false);
//       setEditFormErrors({});
//       // Handle validation errors
//       toast.error("Please fix the errors for and try again.");
//     } else if (error) {
//       toast.error(error);
//     } else if (success) {
//       toast.success("Successfully Created  an Insurer Company!");
//       setOpenModal(false);
//       setFormState({
//         company_name: "",
//         company_url: "",
//         type_of_insurance: "",
//       });
//       setEditFormErrors({});
//       setFormErrors({});
//       dispatch(fetchInsuranceCompanies());
//     }else if (editSuccess ) {
//       toast.success("Successfully Update an Insurer Company!");
//       setOpenModal(false);
//       setFormState({
//         company_name: "",
//         company_url: "",
//         type_of_insurance: "",
//       });
//       setEditFormErrors({});
//       setFormErrors({});
//       dispatch(fetchInsuranceCompanies());
//     }
//   }, [createError, editError, editSuccess, success, branchToEdit, dispatch]);

//   useEffect(() => {
//     if (insuranceCompany) {
//       // Log the branch data and open the modal after the data is fetched
//       console.log("Fetched Branch Data:", insuranceCompany);
//       setFormState({
//         company_name: insuranceCompany.company_name,
//         company_url: insuranceCompany.company_url,
//         type_of_company: insuranceCompany.type_of_company,
//       });

//       setOpenModal(true);
//     }
//   }, [insuranceCompany]);

//   const types = [
//     { id: 1, type: "Life Insurance" },
//     { id: 2, type: "Non Life Insurance" },
//   ];
  
//   const addFields = useMemo(
//     () => [
//       {
//         name: "type_of_company",
//         label: "Type of Company",
//         type: "select",
//         options: types.map((tp) => ({
//           value: tp.id,
//           label: tp.type,
//         })),
//         placeholder: "Select a Type",
//         // required: true,
//         storeLabel: true,
//       },
//       {
//         name: "company_name",
//         label: "Company Name",
//         type: "text",
//         placeholder: "Enter Branch Name",
//         // required: true,
//       },
//       {
//         name: "company_url",
//         label: "Company URL",
//         type: "text",
//         placeholder: "Enter Branch URL",
//         // required: true,
//       },
//     ],
//     [types]
//   );

//   const columnKeys = [
//     { key: "sno", label: "S NO" },
//     { key: "type_of_company", label: "Type" },
//     { key: "company_name", label: "Company Name" },
//     { key: "company_url", label: "Company URL" },
//     { key: "actions", label: "Actions", actions: ["delete", "edit"] },
//   ];
  

//   const [isDeleteToastOpen, setIsDeleteToastOpen] = useState(false);

// const handleDelete = (companyId) => {
//   if (isDeleteToastOpen) return; // Prevent opening another alert

//   setIsDeleteToastOpen(true);

//   toast(
//     ({ closeToast }) => (
//       <div className="flex flex-col items-center gap-4">
//         <p>Are you sure you want to delete this city?</p>
//         <div className="flex gap-4">
//           <button
//             className="bg-red-500 text-white px-4 py-2 rounded"
//             onClick={() => {
//               dispatch(deleteInsuranceCompany(companyId));
//               closeToast(); // Close only this toast
//               setIsDeleteToastOpen(false); // Reset state
//               toast.success("Successfully Deleted an insurer company!", {
//                 toastId: "delete-success",
//               });
//             }}
//           >
//             OK
//           </button>
//           <button
//             className="bg-gray-500 text-white px-4 py-2 rounded"
//             onClick={() => {
//               closeToast(); // Close only this toast
//               setIsDeleteToastOpen(false); // Reset state
//             }}
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     ),
//     {
//       position: "top-right",
//       autoClose: false,
//       closeButton: false,
//       draggable: false,
//       toastId: "delete-confirm", // Same toast ID prevents multiple alerts
//     }
//   );
// };

  
  
//   return (
//     <div className="md:py-8 py-3">
//       <Card className="w-full border p-5" color="transparent">
//         <Typography variant="h4" color="blue-gray">
//           Add Insurance Company
//         </Typography>
//         <DynamicForm
//           fields={addFields}
//           onSubmit={handleCreateBranch}
//           resetAfterSubmit={resetAfterSubmit}
//           errors={formErrors}
//           success={success}
//         />
//       </Card>
//       <TableLayout
//         tableHeaders={columnKeys.map((col) => col.label)}
//         tableData={insuranceCompanies}
//         handleDelete={handleDelete}
//         columnKeys={columnKeys}
//         fileName="Companies"
//         idKey="id"
//         handleEditBranch={handleEditCompany}
//         loading={loading}
//       />
//       <Dialog
//         size="lg"
//         open={openModal}
//         handler={() => {
//           setOpenModal(false);  
//         }}
//       >
//         <DialogHeader className="pb-0">Edit Branch</DialogHeader>
//         <DialogBody className="pt-0">
//           <FormDynamic
//             fields={addFields}
//             onSubmit={handleUpdateBranch}
//             // onChange={handleFieldChange}
//             storeLabel={true}
//             idKey="id"
//             initialValues={formState}
//             isEditMode={true}
//             errors={editFormErrors}
//           />
//         </DialogBody>
//       </Dialog>

//       <ToastContainer />
//     </div>
//   );
// };

// export default InsuranceCompany;
