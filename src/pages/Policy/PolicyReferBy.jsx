
import {
  Card,
  Dialog,
  DialogBody,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useMemo, useState } from "react";
import Loading from "../Loading";
import TableLayout from "../TableActions/TableLayout";
import { toast, ToastContainer } from "react-toastify";
import {  useSelector } from "react-redux";
import { usePolicyReferBy } from "../../hooks/hookIndex";
import { FaRegEdit } from "react-icons/fa";
import Cookies from "js-cookie";
import Button from "../../components/ui/button/Button";
import DynamicForm from "../Tables/DynamicForm";
import ReferByConfig from "./ReferByConfig";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
const PolicyReferBy = () => {
  const [openModal, setOpenModal] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [editFormErrors, setEditFormErrors] = useState({});
  const {  fetchPolicyReferBy,getPolicyReferById,registerPolicyReferBy,togglePolicyReferByStatus,updatePolicyReferBy,policyRefList,
    createError,error,editSuccess,editError,policyRef,createSuccess,} =usePolicyReferBy();
  const userBranchId = Cookies.get("branchId");
  const userRole = Cookies.get("role");
  const isRestrictedUser =
    userBranchId && !["admin", "Admin", "superadmin"].includes(userRole);
  const [formData, setformData] = useState({
    title: "",
    bqp: "",
    relationship_manager: "",
    posp: "",
    name: "",
    gender: "",
    mobile_no: "",
    email: "",
    branch_id: isRestrictedUser ? userBranchId : "",
    aadhar_no: "",
    bank_name: "",
    bank_account_no: "",
    pancard_number: "",
    bank_account_type: "",
    bank_ifsc_code: "",
    bank_branch_code: "",
    bank_branch_name: "",
    active: "",
  });

  const flattenedMisps = useMemo(() => {
    return policyRefList?.map((item, index) => ({
      ...item,
      // sno: index + 1,
      bqp: item.bqp ? `${item.bqp.name} - ${item.bqp.employee_code}` : "",

      relationship_manager: item.relationship_manager
        ? `${item.relationship_manager.name} - ${item.relationship_manager.employee_code}`
        : "",
      posp: item.posp ? `${item.posp.name} - ${item.posp.posp_code}` : "",
    }));
  }, [policyRefList]);
  const columnKeys = [
    { key: "sno", label: "S NO" },
    { key: "title", label: "Title" },
    { key: "name", label: "Name" },
    { key: "branch_id.branch_code", label: "Branch" },
    { key: "bqp", label: "BQP" },
    { key: "relationship_manager", label: "Relationship Manager" },
    { key: "posp", label: "POSP" },
    { key: "mobile_no", label: "Mobile No" },
    { key: "gender", label: "Gender" },
    { key: "email", label: "E-mail" },
    { key: "state", label: "State" },
    { key: "city", label: "City" },
    { key: "statuses", label: "Status", actions: "toggle" },
    { key: "actions", label: "Actions", 
      render: (row) => (
                      <div className="flex justify-center">
                        {/* <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(row.id)}
                          // disabled={deletingCityId === row.id}
                          // className="text-red-600 border-red-600 hover:bg-red-50 dark:text-red-400 dark:border-red-400 dark:hover:bg-red-900/20 transition-colors duration-200"
                        >
                          {/* {deletingCityId === row.city_id ? "Deleting..." : "Delete"}
                           <MdDeleteForever className="text-2xl text-red-800" />
                        </Button> 
                        */}
                        <Button
                          size="xsm"
                          variant="outline"
                          onClick={() => handleEdit(row.id)}
                          // disabled={deletingCityId === row.id}
                          // className="text-red-600 border-red-600 hover:bg-red-50 dark:text-red-400 dark:border-red-400 dark:hover:bg-red-900/20 transition-colors duration-200"
                        >
                          {/* {deletingCityId === row.city_id ? "Deleting..." : "Delete"} */}
                          <FaRegEdit className="text-lg text-blue-600" />
                        </Button>
                      </div>
                    )
     },
  ];
  const handleToggle = async (policyRefId) => {
    (togglePolicyReferByStatus(policyRefId)); // Call Redux action
  };
  const handleSubmit = (formData) => {
    console.log(formData);
    (registerPolicyReferBy(formData));
    setOpenModal(false);
  };
  const handleEdit = (pospId) => {
    (getPolicyReferById(pospId)); // Fetch the data for the selected ID
 
  };
  const handleUpdateReferBy = (formData) => {
    (updatePolicyReferBy(policyRef.id, formData));
  };
  useEffect(() => {
    if (policyRef) {
      // Log the policyRef data and open the modal after the data is fetched

      setformData({
        title: policyRef.title || "", // Assuming title is part of policyRef
        bqp: policyRef.bqp || "", // Assuming bqp is part of policyRef
        relationship_manager: policyRef.relationship_manager || "", // Assuming relationship_manager is part of policyRef
        posp: policyRef.posp || "", // Assuming posp is part of policyRef
        name: policyRef.name || "", // Assuming name is part of policyRef
        gender: policyRef.gender || "", // Assuming gender is part of policyRef
        mobile_no: policyRef.mobile_no || "", // Assuming mobile_no is part of policyRef
        email: policyRef.email || "", // Assuming email is part of policyRef
        branch_id:
          policyRef.branch_id ?? (isRestrictedUser ? userBranchId : ""), // Assuming branch_id is part of policyRef
        aadhar_no: policyRef.aadhar_no || "", // Assuming aadhar_no is part of policyRef
        bank_name: policyRef.bank_name || "", // Assuming bank_name is part of policyRef
        bank_account_no: policyRef.bank_account_no || "", // Assuming bank_account_no is part of policyRef
        pancard_number: policyRef.pancard_number || "", // Assuming pancard_number is part of policyRef
        bank_account_type: policyRef.bank_account_type || "", // Assuming bank_account_type is part of policyRef
        bank_ifsc_code: policyRef.bank_ifsc_code || "", // Assuming bank_ifsc_code is part of policyRef
        bank_branch_code: policyRef.bank_branch_code || "", // Assuming bank_branch_code is part of policyRef
        bank_branch_name: policyRef.bank_branch_name || "", // Assuming bank_branch_name is part of policyRef
        active: policyRef.active || "", // Assuming active is part of policyRef
      });

      setShowDialog(true);
    }
  }, [policyRef, isRestrictedUser, userBranchId]);
  useEffect(() => {
    if (editError) {
      toast.dismiss(); // 👈 dismiss existing toast
      setEditFormErrors(editError.errors || {});
      setFormErrors({});
      toast.error("Please fix the errors and try again.");
    } else if (createError) {
      toast.dismiss(); // 👈 dismiss existing toast
      setFormErrors(createError.errors || {});
      if (formErrors) setOpenModal(false);
      setEditFormErrors({});
      toast.error("Please fix the errors and try again.");
    } else if (error) {
      toast.dismiss(); // 👈 dismiss existing toast
      toast.error(error);
    } else if (createSuccess) {
      toast.dismiss(); // 👈 dismiss existing toast
      toast.success("Policy ref By created successfully!");
      setOpenModal(false);
      setFormErrors({});
      const timer = setTimeout(() => {
        // (resetRefByIdStart());
        setShowDialog(false);
      }, 2000);
      return () => clearTimeout(timer);
    } else if (editSuccess) {
      toast.dismiss(); // 👈 dismiss existing toast
      toast.success("Policy ref By update successfully!");
      setShowDialog(false);
      // (resetRefByIdStart());
    }
  }, [createError, editError, createSuccess, editSuccess, error]);
  
  return (
    <div className="md:py-4 py-3 relative h-fit pb-10 w-full ">
      {/* {loading && <Loading />}
      <div className={`${loading ? "backdrop-blur-sm" : ""}`}> */}
        <PageBreadcrumb 
          pageTitle={"Add Policy Refer By"} 
        />
      {/* </div> */}
      
      <Card className="mb-5 px-5 py-4 shadow-lg rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <DynamicForm
        config={ReferByConfig(formData)}
        onSubmit={handleSubmit}
        success={createSuccess}
        errors={formErrors}
        initialValues={formData}
        containsButton={true}
        />
      </Card>

      <TableLayout
        filteredData={flattenedMisps}
        // handleDelete={handleDelete}
        tableHeaders={columnKeys.map((col) => col.label)}
        fileName="Group"
        idKey="id"
        titlename="name"
        handleToggle={handleToggle}
        handleEditBranch={handleEdit}
        columns={columnKeys}
        enableSearch={true}
        enableExcel={true}
      />
      <Dialog
        size="lg"
        open={showDialog}
        handler={() => {
          setShowDialog(false);
          // setEditFormErrors({});
          // (resetRefByIdStart()); // or relevant reset/fetch action
        }}
      >
        <DialogHeader className="pb-0">Add Official Data To POSP</DialogHeader>
        <DialogBody className="pt-0">
          <DynamicForm
            config={ReferByConfig(formData)}
            onSubmit={handleUpdateReferBy}
            idKey="id"
            initialValues={formData}
            isEditMode={true}
            errors={editFormErrors}
          />
        </DialogBody>
      </Dialog>

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
        theme="light"/>
    </div>
  );
};

export default PolicyReferBy;








// import {
//   Card,
//   Dialog,
//   DialogBody,
//   DialogHeader,
//   Typography,
// } from "@material-tailwind/react";
// import React, { useEffect, useMemo, useState } from "react";
// import FormDynamic from "../TableActions/FormDynamic";
// import Loading from "../Loading";
// import ReusableTable from "../TableActions/ReusableTable";
// import { toast, ToastContainer } from "react-toastify";
// import { fetchBanks } from "../../store/Actions/FuelAction";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchRefBy,
//   getRefById,
//   registerRefBy,
//   togglePolicyRefStatus,
//   updateRefBy,
// } from "../../store/Actions/PolicyReferByActions";
// import {
//   fetchBqp,
//   fetchRelationshipManager,
//   fetchPosp,
// } from "../../store/Actions/OperationAction";
// import Cookies from "js-cookie";
// import { fetchBranches } from "../../store/Actions/BranchAction";
// import { resetRefByIdStart } from "../../store/Reducers/PolicyReferBySlice";

// const PolicyReferBy = () => {
//   const [openModal, setOpenModal] = useState(false);
//   const { bqpList, relationshipManagers, reportingManager, pospTypes } =
//     useSelector((state) => state.operationData);
//   const dispatch = useDispatch();
//   const { banks } = useSelector((state) => state.fuels);
//   const { branches } = useSelector((state) => state.branches);

//   const userBranchId = Cookies.get("branchId");
//   const userRole = Cookies.get("role");
//   const isRestrictedUser =
//     userBranchId && !["admin", "Admin", "superadmin"].includes(userRole);
//   const parsedBranchId = Number(userBranchId);
//   const {
//     policyRefList,
//     createError,
//     error,
//     editSuccess,
//     editError,
//     policyRef,
//     createSuccess,
//   } = useSelector((state) => state.policyRef);
//   const [formData, setformData] = useState({
//     title: "",
//     bqp: "",
//     relationship_manager: "",
//     posp: "",
//     name: "",
//     gender: "",
//     mobile_no: "",
//     email: "",
//     branch_id: isRestrictedUser ? userBranchId : "",
//     aadhar_no: "",
//     bank_name: "",
//     bank_account_no: "",
//     pancard_number: "",
//     bank_account_type: "",
//     bank_ifsc_code: "",
//     bank_branch_code: "",
//     bank_branch_name: "",
//     active: "",
//   });

//   const flattenedMisps = useMemo(() => {
//     return policyRefList?.map((item, index) => ({
//       ...item,
//       // sno: index + 1,
//       bqp: item.bqp ? `${item.bqp.name} - ${item.bqp.employee_code}` : "",

//       relationship_manager: item.relationship_manager
//         ? `${item.relationship_manager.name} - ${item.relationship_manager.employee_code}`
//         : "",
//       posp: item.posp ? `${item.posp.name} - ${item.posp.posp_code}` : "",
//     }));
//   }, [policyRefList]);
//   const columnKeys = [
//     { key: "sno", label: "S NO" },
//     { key: "title", label: "Title" },
//     { key: "name", label: "Name" },
//     { key: "branch_id.branch_code", label: "Branch" },
//     { key: "bqp", label: "BQP" },
//     { key: "relationship_manager", label: "Relationship Manager" },
//     { key: "posp", label: "POSP" },
//     { key: "mobile_no", label: "Mobile No" },
//     { key: "gender", label: "Gender" },
//     { key: "email", label: "E-mail" },
//     { key: "state", label: "State" },
//     { key: "city", label: "City" },
//     { key: "statuses", label: "Status", actions: "toggle" },
//     { key: "actions", label: "Actions", actions: ["edit"] },
//   ];
//   const handleToggle = async (policyRefId) => {
//     dispatch(togglePolicyRefStatus(policyRefId)); // Call Redux action
//   };
//   useEffect(() => {
//     if (!bqpList?.length) dispatch(fetchBqp());
//     if (!banks || banks.length === 0) dispatch(fetchBanks());
//     if (!policyRefList || policyRefList.length === 0) dispatch(fetchRefBy());
//     if (!branches || branches.length === 0) dispatch(fetchBranches());
//   }, [dispatch]);
//   const handleSubmit = (formData) => {
//     // console.log("console = "+branchToEdit,branch)
//     // if (branchToEdit) {
//     //   // Edit operation
//     //   dispatch(updateBranch(branchToEdit, formData));
//     //   setBranchToEdit(null);
//     //   console.log(branchToEdit)
//     //   console.log(" for update");
//     // } else {
//     //   // Add operation
//     //   console.log("for create");
//     // }
//     console.log(formData);
//     dispatch(registerRefBy(formData));
//     setOpenModal(false);
//   };
//   const titles = [
//     { id: 1, title: "Mr." },
//     { id: 2, title: "Mrs." },
//     { id: 3, title: "Miss." },
//   ];
//   const addFields = useMemo(
//     () => [
//       {
//         name: "bqp",
//         label: "BQP",
//         type: "select",
//         options: bqpList?.map((bqp) => ({
//           value: bqp.id,
//           label: bqp.name + " - " + bqp.code,
//         })),
//         placeholder: "Select BQP",
//         required: true,
//         storeLabel: false,
//       },
//       {
//         name: "relationship_manager",
//         label: "Relationship Manager",
//         type: "select",
//         options: relationshipManagers?.map((rm) => ({
//           value: rm.id,
//           label: rm.name + " - " + rm.code,
//         })),
//         placeholder: "Select Relationship Manager",
//         required: true,
//         storeLabel: false,
//       },
//       {
//         name: "posp",
//         label: "POSP",
//         type: "select",
//         options: pospTypes?.map((pos) => ({
//           value: pos.id,
//           label: pos.name + " - " + pos.code,
//         })),
//         placeholder: "Select POSP",
//         required: true,
//         storeLabel: false,
//       },
//       {
//         name: "title",
//         label: "Title",
//         type: "select",
//         options: titles.map((tit) => ({
//           value: tit.id,
//           label: tit.title,
//         })),
//         placeholder: "Select a Title",
//         required: true,
//         storeLabel: true,
//       },
//       {
//         name: "name",
//         label: "Policy Refer By Name",
//         type: "text",
//         placeholder: "Enter Policy Refer By name",
//         required: true,
//       },
//       {
//         name: "gender",
//         label: "Gender",
//         type: "select",
//         options: [
//           { value: "Male", label: "Male" },
//           { value: "Female", label: "Female" },
//           { value: "Other", label: "Other" },
//         ],
//         placeholder: "Select Gender",
//         required: true,
//         storeLabel: true,
//       },
//       {
//         name: "mobile_no",
//         label: "Mobile Number",
//         type: "text",
//         placeholder: "Enter mobile number",
//         required: true,
//       },
//       {
//         name: "branch_id",
//         label: "Branch",
//         type: "select",
//         options: (branches || []).map((branch) => ({
//           value: branch.id,
//           label: branch.branch_code,
//         })),
//         placeholder: "Select Branch",
//         required: true,
//         step: 2,
//         storeLabel: false,
//         disabled: !!formData.branch_id, // Disable if restricted user
//         defaultValue: !!formData.branch_id
//           ? {
//               value: Number(formData.branch_id),
//               label:
//                 branches?.find(
//                   (branch) => branch.id === Number(formData.branch_id)
//                 )?.branch_code || "Unknown Branch",
//             }
//           : undefined,
//       },
//       {
//         name: "email",
//         label: "E-mail",
//         type: "text",
//         placeholder: "Enter Email ID",
//         required: true,
//       },
//       {
//         name: "aadhar_no",
//         label: "Aadhar Number",
//         type: "text",
//         placeholder: "Aadhar Number",
//         required: false,
//       },
//       {
//         name: "pancard_number",
//         label: "Pancard Number",
//         type: "text",
//         placeholder: "Pancard Number",
//         required: false,
//       },
//       {
//         name: "bank_name",
//         label: "Bank Name",
//         type: "select",
//         options: banks?.map((bank) => ({
//           value: bank.id,
//           label: bank.bank_name,
//         })),
//         placeholder: "Bank Name",
//         required: true,
//         storeLabel: true,
//         step: 3,
//       },
//       {
//         name: "bank_branch_code",
//         label: "Bank Branch code",
//         type: "text",
//         placeholder: "Bank Branch code",
//         required: true,
//         step: 1,
//       },
//       {
//         name: "bank_branch_name",
//         label: "Bank Branch Name",
//         type: "text",
//         placeholder: "Bank Branch Name",
//         required: true,
//         step: 1,
//       },
//       {
//         name: "bank_ifsc_code",
//         label: "IFSC Code",
//         type: "text",
//         placeholder: "IFSC Code",
//         required: true,
//         step: 1,
//       },
//       {
//         name: "bank_account_no",
//         label: "Account Number",
//         type: "text",
//         placeholder: "Account Number",
//         required: true,
//         step: 1,
//       },
//       {
//         name: "bank_account_type",
//         label: "Account Type",
//         type: "select",
//         options: [
//           { value: "Savings", label: "Savings" },
//           { value: "Current", label: "Current" },
//         ],
//         placeholder: "Select Account Type",
//         required: true,
//         storeLabel: true,
//         step: 3,
//       },
//     ],
//     [
//       titles,
//       bqpList,
//       relationshipManagers,
//       pospTypes,
//       banks,
//       branches,
//       isRestrictedUser,
//       parsedBranchId,
//     ]
//   );
//   const [showDialog, setShowDialog] = useState(false);
//   const [formErrors, setFormErrors] = useState({});
//   const [editFormErrors, setEditFormErrors] = useState({});
//   const handleEdit = (pospId) => {
//     console.log("pospId for Edit:", pospId);
//     dispatch(getRefById(pospId)); // Fetch the data for the selected ID
//     // setShowDialog(true);
//   };
//   const handleUpdateReferBy = (formData) => {
//     console.log(formData);
//     dispatch(updateRefBy(policyRef.id, formData));
//     // setShowDialog(false);
//   };
//   useEffect(() => {
//     if (policyRef) {
//       // Log the policyRef data and open the modal after the data is fetched
//       console.log("Fetched policyRef Data:", policyRef);

//       setformData({
//         title: policyRef.title || "", // Assuming title is part of policyRef
//         bqp: policyRef.bqp || "", // Assuming bqp is part of policyRef
//         relationship_manager: policyRef.relationship_manager || "", // Assuming relationship_manager is part of policyRef
//         posp: policyRef.posp || "", // Assuming posp is part of policyRef
//         name: policyRef.name || "", // Assuming name is part of policyRef
//         gender: policyRef.gender || "", // Assuming gender is part of policyRef
//         mobile_no: policyRef.mobile_no || "", // Assuming mobile_no is part of policyRef
//         email: policyRef.email || "", // Assuming email is part of policyRef
//         branch_id:
//           policyRef.branch_id ?? (isRestrictedUser ? userBranchId : ""), // Assuming branch_id is part of policyRef
//         aadhar_no: policyRef.aadhar_no || "", // Assuming aadhar_no is part of policyRef
//         bank_name: policyRef.bank_name || "", // Assuming bank_name is part of policyRef
//         bank_account_no: policyRef.bank_account_no || "", // Assuming bank_account_no is part of policyRef
//         pancard_number: policyRef.pancard_number || "", // Assuming pancard_number is part of policyRef
//         bank_account_type: policyRef.bank_account_type || "", // Assuming bank_account_type is part of policyRef
//         bank_ifsc_code: policyRef.bank_ifsc_code || "", // Assuming bank_ifsc_code is part of policyRef
//         bank_branch_code: policyRef.bank_branch_code || "", // Assuming bank_branch_code is part of policyRef
//         bank_branch_name: policyRef.bank_branch_name || "", // Assuming bank_branch_name is part of policyRef
//         active: policyRef.active || "", // Assuming active is part of policyRef
//       });

//       setShowDialog(true);
//     }
//   }, [policyRef, isRestrictedUser, userBranchId]);
//   useEffect(() => {
//     if (editError) {
//       toast.dismiss(); // 👈 dismiss existing toast
//       setEditFormErrors(editError.errors || {});
//       setFormErrors({});
//       toast.error("Please fix the errors and try again.");
//     } else if (createError) {
//       toast.dismiss(); // 👈 dismiss existing toast
//       setFormErrors(createError.errors || {});
//       if (formErrors) setOpenModal(false);
//       setEditFormErrors({});
//       toast.error("Please fix the errors and try again.");
//     } else if (error) {
//       toast.dismiss(); // 👈 dismiss existing toast
//       toast.error(error);
//     } else if (createSuccess) {
//       toast.dismiss(); // 👈 dismiss existing toast
//       toast.success("Policy ref By created successfully!");
//       setOpenModal(false);
//       setFormErrors({});
//       const timer = setTimeout(() => {
//         dispatch(resetRefByIdStart());
//         setShowDialog(false);
//       }, 2000);
//       return () => clearTimeout(timer);
//     } else if (editSuccess) {
//       toast.dismiss(); // 👈 dismiss existing toast
//       toast.success("Policy ref By update successfully!");
//       setShowDialog(false);
//       dispatch(resetRefByIdStart());
//     }
//   }, [createError, editError, createSuccess, editSuccess, error, dispatch]);
  
//   return (
//     <div className="md:py-8 py-3">
//       <Card className="w-full border p-5" color="transparent">
//         <Typography variant="h4" className="font-gdsherpa" color="blue-gray">
//           Add Policy Refer By
//         </Typography>

//         <FormDynamic
//           fields={addFields}
//           onSubmit={handleSubmit}
//           success={createSuccess}
//           errors={formErrors}
//           initialValues={formData}
//           // onChange={handleFieldChange}
//         />
//       </Card>

//       <ReusableTable
//         tableData={flattenedMisps}
//         // handleDelete={handleDelete}
//         columnKeys={columnKeys}
//         fileName="Group"
//         idKey="id"
//         titlename="name"
//         handleToggle={handleToggle}
//         handleEditBranch={handleEdit}
//       />
//       <Dialog
//         size="lg"
//         open={showDialog}
//         handler={() => {
//           setShowDialog(false);
//           // setEditFormErrors({});
//           dispatch(resetRefByIdStart()); // or relevant reset/fetch action
//         }}
//       >
//         <DialogHeader className="pb-0">Add Official Data To POSP</DialogHeader>
//         <DialogBody className="pt-0">
//           <FormDynamic
//             fields={addFields}
//             onSubmit={handleUpdateReferBy}
//             idKey="id"
//             initialValues={formData}
//             isEditMode={true}
//             errors={editFormErrors}
//           />
//         </DialogBody>
//       </Dialog>

//       <ToastContainer />
//     </div>
//   );
// };

// export default PolicyReferBy;
