import {
  Card,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import { toast, ToastContainer } from "react-toastify";
// import FormDynamic from "../TableActions/FormDynamic";
// import {
//   fetchCities,
//   fetchCitiesByState,
//   fetchStates,
// } from "../../store/Actions/StateAction";
import { useEffect, useMemo, useState } from "react";
// import { use, useSelector } from "react-redux";
// import {
//   createBranch,
//   createBranchManager,
//   deleteBranch,
//   fetchBranchById,
//   fetchBranches,
//   updateBranch,
// } from "../../store/Actions/BranchAction";
// import { fetchRegions, fetchZones } from "../../store/Actions/ZoneAction";
import Loading from "../Loading";
// import {
//   fetchDepartments,
//   fetchDesignation,
// } from "../../store/Actions/Department_Designation_Action";
import TableLayout from "../TableActions/TableLayout";
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { GrUserManager } from "react-icons/gr";
import {addFields,editFields} from "./CreateBranchConfig";
import DynamicForm from "../Tables/DynamicForm";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Button from "../../components/ui/button/Button";
import { useStateData,useDepartment,useBranch,useZones } from "../../hooks/hookIndex";
const Branch = () => {
  const [openModal, setOpenModal] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [editFormErrors, setEditFormErrors] = useState({});
  const { fetchStates, states = [], cities = { cities: [] } } =useStateData();
  const {fetchDepartments,fetchDesignation,departments, designations } =useDepartment();
  const {  createBranch,createBranchManager,deleteBranch,fetchBranchById,fetchBranches,updateBranch,
    branches,createError,editError,editSuccess,branch,loading,success,error} = useBranch();
  const {zones, region,fetchRegions, fetchZones} =useZones();
  // const { 
  //   branches,createError,editError,editSuccess,branch,loading,success,error,
  // } = useSelector((state) => state.branches);
  // const { states = [], cities = { cities: [] } } = useSelector(
  //   (state) => state.states
  // ); // Set default values for states and cities
  // const { departments, designations } = useSelector(
  //   (state) => state.departments
  // );
  // const { zones, region } = useSelector((state) => state.zones); // Set default values for states and cities
  const [formData, setFormData] = useState({
    branch_code: "",
    branch_name: "",
    state: "",
    city: "",
    address: "",
    zone: "",
    region: "",
    landline_number: "",
    mobile_number: "",
    gst_number: "",
    broker_pancard_number: "",
  });
  const [managerformData, setmanagerformData] = useState({
    title: "",
    branch_manager_name: "",
    designation: "",
    department: "",
    branch_manager_email: "",
    branch_manager_mobile_number: "",
    branch_id: "",
  });

  // Fetch all states on component mount
  useEffect(() => {
    (fetchBranches());
    (fetchDepartments());
    (fetchDesignation());
    (fetchStates());
    (fetchRegions());
    (fetchZones());
  }, []);
  const titles = [
    { id: 1, title: "Mr." },
    { id: 2, title: "Mrs." },
    { id: 3, title: "Miss." },
  ];
  // Handle state and city changes
//   const handleFieldChange = (name, selected) => {
//     // console.log(selected);
//     // Check if the field belongs to the branch form or branch manager form
//     if (addFields.some((field) => field.name === name)) {
//       // If field is part of the branch form, update formData
//       if (name === "state") {
//         // When the state changes, reset the city field
//         setFormData((prev) => ({
//           ...prev,
//           [name]: selected.label, // Set the selected state
//           city: "", // Reset city field when state changes
//         }));
// console.log(name,selected)
//         // Optionally, fetch cities again based on the selected state
//         (fetchCitiesByState(selected.value));
//       } else {
//         setFormData((prev) => ({
//           ...prev,
//           [name]: selected.label,
//         }));
//       }
//     } else if (addFieldsManager.some((field) => field.name === name)) {
//       // If field is part of the branch manager form, update managerformData
//       setmanagerformData((prev) => ({
//         ...prev,
//         [name]: selected.label,
//       }));
//     }
//   };
  //  const handleChange = (selectedOption, actionMeta) => {
  //   // console.log("selectedOption with action meta",selectedOption,actionMeta)
  //   if(actionMeta.errors){
  //     console.log(actionMeta)
  //     return;
  //   }
  //     console.log("he me yaha u")
  //   const name = actionMeta?.name;
  //   // console.log("selectedopt",selectedOption)
  //   const value =selectedOption?.value || "";

  //   // console.log(`value ${value} on name ${name}`)
  //   setFormData((prev) => {
  //     let updatedFormData = { ...prev, [name]: value };

  //     if (name === "state") {
  //       updatedFormData.city = "";
  //       // updatedFormData[name] = selectedOption?.label; // Set state name as label
  //       (fetchCitiesByState(value));
  //     } else if (
  //       name === "title" ||
  //       name === "role" ||
  //       name === "department" ||
  //       name === "designation" ||
  //       // name === "bank_name" ||
  //       // name === "current_address_city" ||
  //       // name === "permanent_address_city" ||
  //       name === "city" 
  //       // name === "bankname" ||
  //       // name === "gender" ||
  //       // name === "education_level" ||
  //       // name === "account_type" ||
  //       // name === "marital_status" ||
  //       // name === "language" ||
  //       // name === "branch_id"
  //     ) {
  //         updatedFormData[name]=selectedOption?.value;
  //       }
  //     return updatedFormData;
  //   });
  // };
  const handleEditBranch = (branchId) => {
    (fetchBranchById(branchId));
  };
  useEffect(() => {
    if (branch) {
      // Log the branch data and open the modal after the data is fetched
      // console.log("Fetched Branch Data:", branch);
      setFormData({
        branch_name: branch.branch_name,
        branch_code: branch.branch_code,
        broker_pancard_number: branch.broker_pancard_number,
        branch_type: branch.branch_type,
        state: branch.state,
        city: branch.city,
        zone: branch.zone,
        region: branch.region,
        gst_number: branch.gst_number,
        address: branch.address,
        landline_number: branch.landline_number,
        mobile_number: branch.mobile_number,
        comment: branch.comment || "", // Assuming comment can be null
      });
      setOpenModal(true);
    }
  }, [branch]); 
  const addConfig = addFields({
  states,
  cities,
  zones,
  region,
  departments,
  designations,
  titles,
  formData
});
// const editConfig=editFields(addFields(branches))
const editConfig=editFields(formData,addFields(formData),{
  states,
  cities,
  zones,
  region,
  departments,
  designations,
  titles,
  formData
})

  // const addFields = useMemo(
  //   () => [
  //     {
  //       name: "branch_name",
  //       label: "Branch Name",
  //       type: "text",
  //       placeholder: "Enter branch name",
  //       // required: true,
  //     },
  //     {
  //       name: "state",
  //       label: "State",
  //       type: "select",
  //       options: states.map((state) => ({
  //         value: state.id,
  //         label: state.state_name,
  //       })),
  //       placeholder: "Select a state",
  //       // required: true,
  //       storeLabel: true,
  //     },
  //     {
  //       name: "city",
  //       label: "City",
  //       type: "select",
  //       options: formData.state
  //         ? (cities.cities || []).map((city) => ({
  //             value: city.city_id,
  //             label: city.city_name,
  //           }))
  //         : [],
  //       placeholder: "Select a city",
  //       // required: true,
  //       storeLabel: true,
  //     },
  //     {
  //       name: "address",
  //       label: "Address",
  //       type: "text",
  //       placeholder: "Enter address",
  //       // required: true,
  //     },
  //     {
  //       name: "zone",
  //       label: "Zone",
  //       type: "select",
  //       options: zones.map((zone) => ({
  //         value: zone.id,
  //         label: zone.zone_name,
  //       })),
  //       placeholder: "Select zone",
  //       // required: true,
  //       storeLabel: true,
  //     },
  //     {
  //       name: "region",
  //       label: "Region",
  //       type: "select",
  //       options: region.map((reg) => ({
  //         value: reg.id,
  //         label: reg.region_name,
  //       })),
  //       placeholder: "Select region",
  //       // required: true,
  //       storeLabel: true,
  //     },
  //     {
  //       name: "landline_number",
  //       label: "Landline Number",
  //       type: "text",
  //       placeholder: "Enter landline number",
  //     },
  //     {
  //       name: "mobile_number",
  //       label: "Mobile Number",
  //       type: "text",
  //       placeholder: "Enter mobile number",
  //     },
  //     {
  //       name: "gst_number",
  //       label: "GST Number",
  //       type: "text",
  //       placeholder: "Enter GST number",
  //       // required: true,
  //     },
  //     {
  //       name: "broker_pancard_number",
  //       label: "Broker Pancard Number",
  //       type: "text",
  //       placeholder: "Enter broker pancard number",
  //       // required: true,
  //     },
  //   ],
  //   [states, cities, zones, region, formData.state]
  // );
  // const editFields = useMemo(
  //   () => [
  //     {
  //       name: "branch_code",
  //       label: "Branch Code",
  //       type: "text",
  //       placeholder: "Branch code",
  //       readOnly: true, // Make branch_code field read-only
  //     },
  //     ...addFields, // Include all other fields from addFields
  //   ],
  //   [addFields]
  // );
  const handleSubmit = (formData) => {
    console.log("Creating new branch");
    (createBranch(formData));
    setOpenModal(false); 
  };

  const handleUpdateBranch = (formData) => {
    (updateBranch(branch.id, formData));
  };
  useEffect(() => {
    if (editError) {
      setEditFormErrors(editError.message || {});
      setFormErrors({}); // Display backend validation errors
      toast.error("Please fix the errors and try again.");
    } else if (createError) {
      setFormErrors(createError.message || {});
      if (formErrors) setOpenModal(false);
      setEditFormErrors({});
      // Handle validation errors
      toast.error("Please fix the errors for and try again.");
    } else if (error) {
      toast.error(error);
    } else if (success) {
      toast.success("Branch created successfully!");
      setOpenModal(false);
      setFormData({
        branch_code: "",
        branch_name: "",
        state: "",
        city: "",
        address: "",
        zone: "",
        region: "",
        landline_number: "",
        mobile_number: "",
        gst_number: "",
        broker_pancard_number: "",
      });
      setmanagerformData({
        title: "",
        branch_manager_name: "",
        designation: "",
        department: "",
        branch_manager_email: "",
        branch_manager_mobile_number: "",
        branch_id: "",
      });
      setFormErrors({});
      (fetchBranches());
    } else if (editSuccess) {
      toast.success("Branch update successfully!");
      setOpenModal(false);
      setFormData({
        branch_code: "",
        branch_name: "",
        state: "",
        city: "",
        address: "",
        zone: "",
        region: "",
        landline_number: "",
        mobile_number: "",
        gst_number: "",
        broker_pancard_number: "",
      });
      (fetchBranches());
    }
  }, [createError, editError, editSuccess, success, ]);

  const addFieldsManager = useMemo(
    () => [
      {
        name: "title",
        label: "Title",
        type: "select",
        options: titles.map((tit) => ({
          value: tit.id,
          label: tit.title,
        })),
        placeholder: "Select a Title",
        // required: true,
        storeLabel: true,
      },
      {
        name: "branch_manager_name",
        label: "Branch Manager Name",
        type: "text",
        placeholder: "Enter branch name",
        // required: true,
      },
      {
        name: "department",
        label: "Department",
        type: "select",
        options:
          departments?.map((dep) => ({
            value: dep.id,
            label: dep.department_name,
          })) || [],
        placeholder: "Select Department",
        storeLabel: true,
      },
      {
        name: "designation",
        label: "Designation",
        type: "select",
        options:
          designations?.map((des) => ({
            value: des.id,
            label: des.designation_name,
          })) || [],
        placeholder: "Select Designation",
        storeLabel: true,
      },
      {
        name: "branch_manager_email",
        label: "E-mail",
        type: "text",
        placeholder: "Enter Email ID",
      },
      {
        name: "branch_manager_mobile_number",
        label: "Mobile Number",
        type: "text",
        placeholder: "Enter mobile number",
      },
    ],
    [departments, titles, designations]
  );
  const columnKeys = [
    { key: "sno", label: "S NO" },
    { key: "branch_code", label: "Branch Code" },
    { key: "branch_name", label: "Branch Name" },
    { key: "mobile_number", label: "Branch Name" },
    { key: "address", label: "Address" },
    { key: "state", label: "States" },
    { key: "city", label: "City Name" },
    { key: "actions", label: "Actions",
          render: (row) => (
            <div className="flex gap-2 justify-center">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleDelete(row.id)}
                // disabled={deletingCityId === row.id}
                // className="text-red-600 border-red-600 hover:bg-red-50 dark:text-red-400 dark:border-red-400 dark:hover:bg-red-900/20 transition-colors duration-200"
              >
                {/* {deletingCityId === row.city_id ? "Deleting..." : "Delete"} */}<MdDeleteForever className="text-2xl text-red-800" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleEditBranch(row.id)}
                // disabled={deletingCityId === row.id}
                // className="text-red-600 p-0 border-none border-red-600 hover:bg-red-50 dark:text-red-400 dark:border-red-400 dark:hover:bg-red-900/20 transition-colors duration-200"
              >
                {/* {deletingCityId === row.city_id ? "Deleting..." : "Delete"} */}<FaRegEdit className="text-2xl text-blue-600" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleDelete(row.id)}
                // disabled={deletingCityId === row.id}
                // className="text-red-600 border-red-600 hover:bg-red-50 dark:text-red-400 dark:border-red-400 dark:hover:bg-red-900/20 transition-colors duration-200"
              >
                {/* {deletingCityId === row.city_id ? "Deleting..." : "Delete"} */}<GrUserManager className="text-2xl text-green-700"  />
              </Button>
            </div>
          )
        },
  ];
  const handleDelete = (branchID) => {
    const toastId = toast(
      <div className="flex flex-col items-center gap-4">
        <p>Are you sure you want to delete this city?</p>
        <div className="flex gap-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => {
              (deleteBranch(branchID)); // Delete city action
              toast.dismiss(toastId); // Dismiss toast
              toast.success("City deleted successfully!");
            }}
          >
            OK
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={() => toast.dismiss(toastId)} // Cancel delete
          >
            Cancel
          </button>
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
  return (
    <div className="md:py-4 py-3 relative h-fit pb-10 w-full ">
      {loading && <Loading />}
      <div
        className={` ${
          loading ? "backdrop-blur-sm" : ""
        }`}
      >
          <PageBreadcrumb pageTitle="Add Branch"  />
        {/* Logout Button */}
      </div>
      <Card className=" mb-5  p-5 shadow-lg rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ">
        <DynamicForm
          config={addFields(formData)}
          otherFields={addFieldsManager}
          onSubmit={handleSubmit}
          // onChange={handleChange}
          otherHead="Branch Contact Person"
          errors={formErrors}
          success={success}
          // containsButton={false}
          initialValues={formData}
          resetValue={formData}
        />
        </Card>
      <TableLayout
        tableHeaders={columnKeys.map((col) => col.label)}
        filteredData={branches}
        handleDelete={handleDelete}
        columns={columnKeys}
        // fileName="Branch"
        // idKey="id"
        enableSearch={true}
        enableExcel={true}
        handleEditBranch={handleEditBranch}
        loading={loading}
      />
      <Dialog
        size="lg"
        open={openModal}
        handler={() => {
          setOpenModal(false); 
          setEditFormErrors({});
        }}
      >
        <DialogHeader className="pb-0">Edit Branch</DialogHeader>
        <DialogBody className="pt-0">
          <DynamicForm
            config={editConfig}
            onSubmit={handleUpdateBranch}
            // onChange={handleChange}
            // storeLabel={true}
            idKey="id"
            initialValues={formData}
            isEditMode={true}
            errors={editFormErrors}
          />
        </DialogBody>
      </Dialog>

      <ToastContainer />
    </div>
  );
};

export default Branch;
