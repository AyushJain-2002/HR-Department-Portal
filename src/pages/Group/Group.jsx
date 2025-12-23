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
import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import {
//   createBranch,
//   deleteBranch,
//   fetchBranchById,
//   fetchBranches,
//   fetchBranchManagers,
//   updateBranch,
// } from "../../store/Actions/BranchAction";
// import { fetchRegions, fetchZones } from "../../store/Actions/ZoneAction";
import Loading from "../Loading";
// import ReusableTable from "../TableActions/ReusableTable";
// import {
//   fetchDepartments,
//   fetchDesignation,
// } from "../../store/Actions/Department_Designation_Action";
// import {
//   fetchGroupById,
//   fetchGroups,
// } from "../../store/Actions/GroupAction";
import {useGroup, useZones, useBranch,useStateData,useDepartment} from "../../hooks/hookIndex"
import GroupConfig from "./GroupConfig";
import FormComponent from "../../components/wizard/FormComponent";
import TableLayout from "../TableActions/TableLayout";
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
// import { GrUserManager } from "react-icons/gr";
import Button from "../../components/ui/button/Button";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
const Group = () => {
  const [openModal, setOpenModal] = useState(false);
  const [branchToEdit, setBranchToEdit] = useState(null);
  // const { designations } = useSelector((state) => state.departments);

  const {createBranch,deleteBranch,fetchBranchById,fetchBranches,fetchBranchManagers,updateBranch}=useBranch();
  const {fetchRegions, fetchZones}=useZones();
  const {fetchDepartments,fetchDesignation,designations}=useDepartment();
  const {fetchGroupById,fetchGroups,groups, group, editSuccess, loading, error, success}=useGroup();
  const {  fetchCities,fetchCitiesByState,fetchStates,}=useStateData();
  // const { states = [], cities = { city: [] } } = useSelector(
  //   (state) => state.states
  // );
  // Set default values for states and cities
  const [formState, setFormState] = useState({
    title: "",
    group_name: "",
    name: "",
    designation: "",
    state: "",
    city: "",
    email: "",
    mobile_no: "",
    active: "",
    branch_id: "",
  });

  // Fetch all states on component mount
  useEffect(() => {
    // (fetchCities());
    // (fetchStates());
    (fetchGroups());
    (fetchDesignation());
  }, []);

  // Handle state and city changes
  const handleFieldChange = (name, selected) => {
    console.log(selected);
    if (name === "state") {
      setFormState((prev) => ({
        ...prev,
        [name]: selected.label, // Set the selected state
        city: "", // Reset city field when state changes
      }));
      // Optionally, you can fetch the cities again for the selected state
      (fetchCitiesByState(selected.value));
    } else {
      setFormState((prev) => ({
        ...prev,
        [name]: selected.label,
      }));
    }
  };
  const handleEditBranch = (groupId) => {
    //  action to fetch the branch by ID
    (fetchGroupById(groupId));
    setBranchToEdit(groupId);
    console.log("Branch ID for Edit:", groupId);
  };

  useEffect(() => {
    if (group) {
      // Log the group data and open the modal after the data is fetched
      console.log("Fetched group Data:", group);
      setFormState({
        group_name: group.group_name,
        title: group.title,
        designation: group.designation,
        name: group.name,
        email: group.email,
        mobile_no: group.mobile_no,
        state: group.state,
        city: group.city,
        active: group.active || "", // Assuming comment can be null
        branch_id: group.branch_id || "",
      });

      // Now open the modal after the state has been updated
      setOpenModal(true);
    }
  }, [group]); // This hook runs whenever the `branch` data is updated
  //   // This effect runs when `branch` changes
  // const titles = [
  //   { id: 1, title: "Mr." },
  //   { id: 2, title: "Mrs." },
  //   { id: 3, title: "Miss." },
  // ];
  // const addFields = useMemo(
  //   () => [
  //     {
  //       name: "title",
  //       label: "Title",
  //       type: "select",
  //       options: titles.map((tit) => ({
  //         value: tit.id,
  //         label: tit.title,
  //       })),
  //       placeholder: "Select a Title",
  //       required: true,
  //       storeLabel: true,
  //     },
  //     {
  //       name: "group_name",
  //       label: "Group Name",
  //       type: "text",
  //       placeholder: "Enter Group name",
  //       required: true,
  //     },
  //     {
  //       name: "name",
  //       label: "Name",
  //       type: "text",
  //       placeholder: "Enter Your name",
  //       required: true,
  //     },

  //     {
  //       name: "designation",
  //       label: "Designation",
  //       type: "select",
  //       options:
  //         designations?.map((des) => ({
  //           value: des.id,
  //           label: des.designation_name,
  //         })) || [],
  //       placeholder: "Select Designation",
  //       storeLabel: true,
  //     },
  //     {
  //       name: "email",
  //       label: "E-mail",
  //       type: "text",
  //       placeholder: "Enter Email ID",
  //     },
  //     {
  //       name: "mobile_no",
  //       label: "Mobile Number",
  //       type: "text",
  //       placeholder: "Enter mobile number",
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
  //       required: true,
  //       storeLabel: true,
  //     },
  //     {
  //       name: "city",
  //       label: "City",
  //       type: "select",
  //       options:  (cities.cities || []).map((city) => ({
  //             value: city.city_id,
  //             label: city.city_name,
  //           }))
  //         ,
  //       placeholder: "Select a city",
  //       required: true,
  //       storeLabel: true,
  //     },
  //     {
  //       name: "active",
  //       label: "Active",
  //       type: "select",
  //       options: [
  //         { value: 1, label: "Yes" }, // 1 for true
  //         { value: 0, label: "No" }, // 0 for false
  //       ],
  //       placeholder: "Select active status",
  //       required: true,
  //       storeLabel: false,
  //     },
  //   ],
  //   [titles, designations, formState.state, states, cities]
  // );

  const handleSubmit = (formData) => {
    console.log("console = "+branchToEdit)
    if (branchToEdit) {
      // Edit operation
      (updateBranch(branchToEdit, formData));
      setBranchToEdit(null);
      console.log(branchToEdit)
      console.log(" for update");
    } else {
      // Add operation
      (createBranch(formData));
      console.log("for create");
    }
    console.log(formData);
    setOpenModal(false);
  };

  useEffect(() => {
    if (error) {
      toast.error(error); // Show error toast
    }

    if (success) {
      // Show appropriate success message
      toast.success("Branch Manager created successfully!");
      // Fetch branches after successful operation
      (fetchBranchManagers());
    }
    if (editSuccess) {
      // Show appropriate success message
      toast.success("Branch Manager update successfully!");
      setOpenModal(false);
      // Fetch branches after successful operation
      (fetchBranchManagers());
    }
  }, [error, success, editSuccess, ]);

  const columnKeys = [
    { key: "sno", label: "S NO" },
    { key: "group_name", label: "Group Name" },
    { key: "name", label: "Name" },
    { key: "mobile_no", label: "Mobile No" },
    { key: "email", label: "E-mail" },
    { key: "designation", label: "Designation" },
    { key: "state", label: "State" },
    { key: "city", label: "City" },
    // { key: "actions", label: "Actions", actions: ["delete", "edit"] },
    { key: "actions", label: "Actions",
              render: (row) => (
                <div className="flex justify-center">
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
                    // className="text-red-600 border-red-600 hover:bg-red-50 dark:text-red-400 dark:border-red-400 dark:hover:bg-red-900/20 transition-colors duration-200"
                  >
                    {/* {deletingCityId === row.city_id ? "Deleting..." : "Delete"} */}<FaRegEdit className="text-2xl text-blue-600" />
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
    <div className="relative h-fit pb-10 w-full ">
      {loading && <Loading />}
      <div
        className={` ${
          loading ? "backdrop-blur-sm" : ""
        }`}
      >
          <PageBreadcrumb pageTitle="Add Group" />
        {/* Logout Button */}
      </div>
      <Card className=" mb-5  px-2 shadow-lg rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ">
        <FormComponent
          // fields={addFields}
          config={GroupConfig(formState)}
          onSubmit={handleSubmit}
          onChange={handleFieldChange}
          storeLabel={true}
        />
      </Card>
      
        {/* <ReusableTable
          tableData={groups}
          handleDelete={handleDelete}
          columnKeys={columnKeys}
          fileName="Group"
          idKey="id"
          titlename="name"
          handleEditBranch={handleEditBranch}
        /> */}
        <TableLayout
          filteredData={groups}
          handleDelete={handleDelete}
          columns={columnKeys}
          fileName="Group"
          idKey="id"
          titlename="name"
          handleEditBranch={handleEditBranch}
        />
      <Dialog
        size="lg"
        open={openModal}
        handler={() => {
          setOpenModal(false); // Close the modal
          setBranchToEdit(null); // Reset branchToEdit to null when modal is closed
        }}
      >
        <DialogHeader className="pb-0">Edit Group</DialogHeader>
        <DialogBody className="pt-0">
          <FormComponent
            // fields={addFields}
            config={GroupConfig(formState)}
            onSubmit={handleSubmit}
            onChange={handleFieldChange}
            storeLabel={true}
            idKey="id"
            initialValues={formState}
            isEditMode={true}
          />
        </DialogBody>
      </Dialog>

      <ToastContainer />
    </div>
  );
};

export default Group;
